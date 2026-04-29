'use client'

import dynamic from 'next/dynamic'
import { useOrders } from '@/context/OrderContext'
import OrderStepper from './OrderStepper'
import DriverCard from './DriverCard'
import BottomNav from '@/components/BottomNav'

const MapView = dynamic(() => import('./MapView'), { ssr: false })

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  confirmed:  { label: 'Order Confirmed',  color: '#FFF8EC',  bg: 'rgba(0,0,0,0.07)'           },
  preparing:  { label: 'Being Prepared',   color: '#2A6BFF',  bg: 'rgba(42,107,255,0.1)'        },
  ready:      { label: 'Ready for Pickup', color: '#16A34A',  bg: 'rgba(22,163,74,0.1)'        },
  delivering: { label: 'On the Way',       color: '#FF7A1A',  bg: 'rgba(255,122,26,0.1)'          },
  delivered:  { label: 'Delivered',        color: '#16A34A',  bg: 'rgba(22,163,74,0.1)'        },
}

const STATUS_TO_STEP: Record<string, number> = {
  confirmed: 0, preparing: 1, ready: 2, delivering: 3, delivered: 3,
}

export default function TrackingPage() {
  const { activeOrder } = useOrders()

  const status = activeOrder?.status ?? 'confirmed'
  const step   = STATUS_TO_STEP[status] ?? 0
  const meta   = STATUS_META[status] ?? STATUS_META.confirmed

  return (
    <div className="min-h-screen pb-24" style={{ background: '#FFFFFF' }}>

      {/* Header */}
      <header style={{ background: '#FFF8EC', borderBottom: '3px solid #FF7A1A' }}>
        <div className="max-w-md mx-auto px-4 pt-10 pb-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-body mb-0.5" style={{ color: '#888' }}>Order</p>
              <p className="font-heading font-black text-[#131312] text-[13px] tracking-wide uppercase">
                {activeOrder?.orderNumber ?? '#FZ-...'}
              </p>
            </div>
            <div
              className="px-3 py-1.5 text-[12px] font-heading font-black uppercase tracking-wide"
              style={{ background: meta.bg, color: meta.color }}
            >
              {meta.label}
            </div>
          </div>
          <div className="brand-label">FOODIE ZONE</div>
          <h1 className="font-heading font-black text-[#131312] text-[28px] uppercase leading-none tracking-tight mt-1">
            Tracking
          </h1>
        </div>
      </header>

      <div className="px-4 py-4 max-w-md mx-auto space-y-3">
        {/* Map */}
        <MapView />

        {/* Driver */}
        <DriverCard status={status as 'confirmed' | 'preparing' | 'ready' | 'delivering'} />

        {/* Stepper */}
        <OrderStepper step={step} />

        {/* Order summary */}
        {activeOrder ? (
          <div style={{ border: '1px solid #E5E5E5' }}>
            <div className="px-4 py-3" style={{ background: '#FFF8EC' }}>
              <h3 className="font-heading font-black text-[#131312] text-[12px] uppercase tracking-widest">Order Summary</h3>
            </div>
            <div className="divide-y" style={{ borderColor: '#F0F0F0' }}>
              {activeOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between px-4 py-2.5">
                  <span className="text-[13px] font-body" style={{ color: '#555' }}>
                    {item.quantity}× {item.name}
                  </span>
                  <span className="text-[13px] font-semibold" style={{ color: '#FFF8EC' }}>R{item.total}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-[13px] font-body" style={{ color: '#555' }}>Delivery fee</span>
                <span className="text-[13px] font-semibold" style={{ color: '#FFF8EC' }}>R{activeOrder.deliveryFee}</span>
              </div>
            </div>
            <div className="flex justify-between px-4 py-3" style={{ background: '#F5F5F5', borderTop: '2px solid #FFF8EC' }}>
              <span className="font-heading font-black text-[14px] uppercase tracking-wide" style={{ color: '#FFF8EC' }}>Total paid</span>
              <span className="font-heading font-black text-[14px]" style={{ color: '#FF3D8C' }}>R{activeOrder.total}</span>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center" style={{ border: '1px dashed #E5E5E5' }}>
            <div className="flex justify-center mb-3" style={{ color: '#CCC' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
                <rect x="9" y="11" width="14" height="10" rx="2"/>
                <circle cx="12" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
              </svg>
            </div>
            <p className="font-heading font-black text-sm uppercase tracking-wide" style={{ color: '#888' }}>No Active Order</p>
            <p className="text-xs font-body mt-1" style={{ color: '#CCC' }}>Place an order to start tracking</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
