'use client'

import { useAuth } from '@/context/AuthContext'
import { useOrders, Order } from '@/context/OrderContext'
import BottomNav from '@/components/BottomNav'

function TruckIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="12" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

interface DriverOrderCardProps {
  order: Order
  action: { label: string; onPress: () => void }
  accentColor: string
}

function DriverOrderCard({ order, action, accentColor }: DriverOrderCardProps) {
  return (
    <div
      className="overflow-hidden shadow-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <div className="px-3 pt-3 pb-2 flex items-start justify-between">
        <div>
          <p className="font-heading font-black text-[13px] uppercase tracking-tight" style={{ color: '#0A0A0A' }}>
            {order.orderNumber}
          </p>
          <p className="text-[11px] font-body mt-0.5" style={{ color: '#888' }}>{order.customerName}</p>
          {order.customerPhone && (
            <p className="text-[10px] font-body" style={{ color: '#AAA' }}>{order.customerPhone}</p>
          )}
        </div>
        <span className="text-[11px] font-body" style={{ color: '#AAA' }}>{order.createdAt}</span>
      </div>

      {/* Address */}
      {order.address && (
        <div className="px-3 pb-2 flex items-start gap-1.5" style={{ color: '#888' }}>
          <span className="mt-0.5 shrink-0"><MapPinIcon /></span>
          <p className="text-[11px] font-body" style={{ color: '#555' }}>{order.address}</p>
        </div>
      )}

      {/* Items */}
      <ul className="px-3 pb-2.5 space-y-0.5">
        {order.items.slice(0, 3).map((item, idx) => (
          <li key={idx} className="text-[11px] font-body flex items-start gap-1.5">
            <span style={{ color: accentColor }}>·</span>
            <span style={{ color: '#555' }}>{item.quantity}× {item.name}</span>
          </li>
        ))}
        {order.items.length > 3 && (
          <li className="text-[11px] font-body" style={{ color: '#CCC' }}>
            +{order.items.length - 3} more items
          </li>
        )}
      </ul>

      <div className="mx-3 h-px" style={{ background: '#F0F0F0' }} />

      {/* Total + action */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <div>
          <span className="font-heading font-black text-[14px]" style={{ color: '#FF6B00' }}>
            R{order.total}
          </span>
          <span className="text-[10px] font-body ml-1.5" style={{ color: '#CCC' }}>
            {order.paymentMethod === 'cash' ? 'Cash' : order.paymentMethod === 'snap' ? 'SnapScan' : 'Capitec'}
          </span>
        </div>
        <button
          onClick={action.onPress}
          className="text-white text-[11px] font-heading font-black px-4 py-2.5 uppercase tracking-wider active:scale-[0.97] transition-all duration-150"
          style={{ background: accentColor }}
        >
          {action.label} →
        </button>
      </div>
    </div>
  )
}

export default function DriverDashboard() {
  const { logout } = useAuth()
  const { orders, updateOrderStatus } = useOrders()

  const readyOrders     = orders.filter((o) => o.column === 'completed' && o.status === 'ready')
  const deliveringOrders = orders.filter((o) => o.status === 'delivering')

  const now = new Date()
  const timeString = now.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen pb-24" style={{ background: '#F5F5F5' }}>

      {/* Header */}
      <header style={{ background: '#0A0A0A', borderBottom: '3px solid #CC0000' }}>
        <div className="max-w-md mx-auto px-4 pt-10 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="brand-label mb-2">FOODIE ZONE</div>
              <h1 className="font-heading font-black text-white text-[28px] uppercase leading-none tracking-tight">
                Deliveries
              </h1>
              <p className="text-[11px] font-body mt-0.5" style={{ color: '#666' }}>
                {timeString} · Driver View
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 mt-1">
              <div className="flex gap-2">
                <div
                  className="px-3 py-2 text-center"
                  style={{ background: 'rgba(204,0,0,0.15)' }}
                >
                  <p className="font-heading font-black text-[20px] leading-none" style={{ color: '#FF6B6B' }}>
                    {readyOrders.length}
                  </p>
                  <p className="text-[9px] font-heading font-black uppercase tracking-wider mt-0.5" style={{ color: '#FF6B6B' }}>
                    Ready
                  </p>
                </div>
                <div
                  className="px-3 py-2 text-center"
                  style={{ background: 'rgba(29,78,216,0.15)' }}
                >
                  <p className="font-heading font-black text-[20px] leading-none" style={{ color: '#93BBFD' }}>
                    {deliveringOrders.length}
                  </p>
                  <p className="text-[9px] font-heading font-black uppercase tracking-wider mt-0.5" style={{ color: '#93BBFD' }}>
                    En Route
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-[11px] font-body font-semibold uppercase tracking-wide px-3 py-1.5 transition-all active:opacity-70"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#AAA',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-md mx-auto space-y-5">

        {/* Ready for Pickup */}
        {readyOrders.length > 0 && (
          <section>
            <h2
              className="font-heading font-black text-[11px] uppercase tracking-[0.15em] mb-2.5"
              style={{ color: '#CC0000' }}
            >
              Ready for Pickup
            </h2>
            <div className="space-y-2.5">
              {readyOrders.map((order) => (
                <DriverOrderCard
                  key={order.id}
                  order={order}
                  action={{ label: 'Pick Up', onPress: () => updateOrderStatus(order.id, 'delivering') }}
                  accentColor="#CC0000"
                />
              ))}
            </div>
          </section>
        )}

        {/* En Route */}
        {deliveringOrders.length > 0 && (
          <section>
            <h2
              className="font-heading font-black text-[11px] uppercase tracking-[0.15em] mb-2.5"
              style={{ color: '#1D4ED8' }}
            >
              En Route
            </h2>
            <div className="space-y-2.5">
              {deliveringOrders.map((order) => (
                <DriverOrderCard
                  key={order.id}
                  order={order}
                  action={{ label: 'Mark Delivered', onPress: () => updateOrderStatus(order.id, 'delivered') }}
                  accentColor="#1D4ED8"
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {readyOrders.length === 0 && deliveringOrders.length === 0 && (
          <div
            className="py-16 text-center mt-4"
            style={{ border: '1px dashed #DDD', background: '#FFFFFF' }}
          >
            <div className="flex justify-center mb-3">
              <TruckIcon size={40} color="#DDD" />
            </div>
            <p className="font-heading font-black text-sm uppercase tracking-wide" style={{ color: '#888' }}>
              No deliveries right now
            </p>
            <p className="text-xs font-body mt-1" style={{ color: '#CCC' }}>
              Orders marked ready by kitchen will appear here
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
