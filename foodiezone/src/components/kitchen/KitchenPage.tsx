'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useOrders, KanbanColumn, Order } from '@/context/OrderContext'
import OrderCard, { KitchenOrder } from './OrderCard'

const COLUMNS: { key: KanbanColumn; label: string; accentColor: string; chipBg: string }[] = [
  { key: 'pending',    label: 'Incoming',    accentColor: '#CC0000', chipBg: 'rgba(204,0,0,0.08)'   },
  { key: 'inProgress', label: 'Cooking',     accentColor: '#1D4ED8', chipBg: 'rgba(29,78,216,0.08)' },
  { key: 'completed',  label: 'Ready',       accentColor: '#16A34A', chipBg: 'rgba(22,163,74,0.08)' },
]

function orderToKitchen(o: Order): KitchenOrder {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    items: o.items.map((i) => `${i.quantity}× ${i.name}`),
    customer: o.customerName,
    customerPhone: o.customerPhone ?? '',
    time: o.createdAt,
    column: o.column,
  }
}

export default function KitchenPage() {
  const { logout } = useAuth()
  const { orders, updateOrderColumn, clearDelivered } = useOrders()
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const getOrders = (col: KanbanColumn) => orders.filter((o) => o.column === col)
  const pendingCount   = getOrders('pending').length
  const cookingCount   = getOrders('inProgress').length
  const completedCount = getOrders('completed').length

  return (
    <div className="min-h-screen pb-8" style={{ background: '#F5F5F5' }}>

      {/* Header */}
      <header style={{ background: '#0A0A0A', borderBottom: '3px solid #CC0000' }}>
        <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div>
              {/* Brand strip */}
              <div className="brand-label mb-2">FOODIE ZONE</div>
              <h1 className="font-heading font-black text-white text-[26px] uppercase leading-none tracking-tight">
                Kitchen
              </h1>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <p className="font-heading font-black text-white text-[24px] tabular-nums">{time}</p>
              <button
                onClick={logout}
                className="text-[11px] font-body font-semibold uppercase tracking-wide px-3 py-1.5 transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#AAA', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: 'Incoming', value: pendingCount,   bg: 'rgba(204,0,0,0.15)',  color: '#FF6B6B' },
              { label: 'Cooking',  value: cookingCount,   bg: 'rgba(29,78,216,0.15)', color: '#93BBFD' },
              { label: 'Ready',    value: completedCount, bg: 'rgba(22,163,74,0.15)', color: '#86EFAC' },
            ].map((s) => (
              <div key={s.label} className="px-3 py-2.5 flex items-center justify-between" style={{ background: s.bg }}>
                <p className="text-[11px] font-body font-semibold uppercase tracking-wide" style={{ color: s.color }}>{s.label}</p>
                <p className="font-heading font-black text-[22px]" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Kanban board */}
      <div className="px-4 pt-4">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3">
          {COLUMNS.map((col) => {
            const colOrders = getOrders(col.key)
            return (
              <div key={col.key}>
                {/* Column header */}
                <div className="flex items-center justify-between mb-2.5">
                  <h2
                    className="font-heading font-black text-[12px] uppercase tracking-[0.15em]"
                    style={{ color: col.accentColor }}
                  >
                    {col.label}
                  </h2>
                  <span
                    className="text-[11px] font-heading font-black w-6 h-6 flex items-center justify-center"
                    style={{ background: col.chipBg, color: col.accentColor }}
                  >
                    {colOrders.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-2.5 min-h-[80px]">
                  {colOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={orderToKitchen(order)}
                      onMove={updateOrderColumn}
                    />
                  ))}
                  {colOrders.length === 0 && (
                    <div
                      className="py-8 flex items-center justify-center"
                      style={{ border: '1px dashed #DDD', background: '#FAFAFA' }}
                    >
                      <p className="text-[11px] font-body uppercase tracking-wide" style={{ color: '#CCC' }}>Empty</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Clear completed */}
        {completedCount > 0 && (
          <div className="max-w-3xl mx-auto mt-4 flex justify-end">
            <button
              onClick={clearDelivered}
              className="text-[11px] font-body font-semibold uppercase tracking-wide px-4 py-2 transition-colors"
              style={{ background: '#E5E5E5', color: '#888', border: '1px solid #DDD' }}
            >
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
