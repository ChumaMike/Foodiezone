'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { CartItem } from './CartContext'

export type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered'
export type KanbanColumn = 'pending' | 'inProgress' | 'completed'

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  customerName: string
  customerPhone: string
  address: string
  paymentMethod: string
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  column: KanbanColumn
  createdAt: string // HH:MM
  createdTs: number // timestamp for sorting
}

interface OrderContextType {
  orders: Order[]
  activeOrder: Order | null // most recent order for tracking
  placeOrder: (params: {
    items: CartItem[]
    address: string
    paymentMethod: string
    subtotal: number
    deliveryFee: number
    customerName: string
    customerPhone: string
  }) => Order
  updateOrderColumn: (orderId: string, column: KanbanColumn) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  clearDelivered: () => void
}

const OrderContext = createContext<OrderContextType | null>(null)

const STORAGE_KEY = 'fz-orders'
let orderCounter = 2409 // starts at FZ-2409

function statusFromColumn(col: KanbanColumn): OrderStatus {
  if (col === 'pending') return 'confirmed'
  if (col === 'inProgress') return 'preparing'
  return 'ready'
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setOrders(parsed)
        // Re-sync counter
        parsed.forEach((o: Order) => {
          const num = parseInt(o.orderNumber.replace('#FZ-', ''), 10)
          if (!isNaN(num) && num >= orderCounter) orderCounter = num + 1
        })
      }
    } catch {}
  }, [])

  // Cross-tab sync: listen for storage events from other browser tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setOrders(parsed)
          // Re-sync counter
          parsed.forEach((o: Order) => {
            const num = parseInt(o.orderNumber.replace('#FZ-', ''), 10)
            if (!isNaN(num) && num >= orderCounter) orderCounter = num + 1
          })
        } catch {}
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(orders)) } catch {}
  }, [orders])

  const placeOrder = useCallback((params: {
    items: CartItem[]
    address: string
    paymentMethod: string
    subtotal: number
    deliveryFee: number
    customerName: string
    customerPhone: string
  }): Order => {
    const now = new Date()
    const newOrder: Order = {
      id: `o-${Date.now()}`,
      orderNumber: `#FZ-${orderCounter++}`,
      items: params.items,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      address: params.address,
      paymentMethod: params.paymentMethod,
      subtotal: params.subtotal,
      deliveryFee: params.deliveryFee,
      total: params.subtotal + params.deliveryFee,
      status: 'confirmed',
      column: 'pending',
      createdAt: now.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
      createdTs: now.getTime(),
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }, [])

  const updateOrderColumn = useCallback((orderId: string, column: KanbanColumn) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, column, status: statusFromColumn(column) }
          : o,
      ),
    )
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, status } : o)
    )
  }, [])

  const clearDelivered = useCallback(() => {
    setOrders((prev) => prev.filter((o) => o.column !== 'completed'))
  }, [])

  // activeOrder: most recent order (for customer tracking)
  const activeOrder = orders.length > 0 ? orders[0] : null

  return (
    <OrderContext.Provider value={{ orders, activeOrder, placeOrder, updateOrderColumn, updateOrderStatus, clearDelivered }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
