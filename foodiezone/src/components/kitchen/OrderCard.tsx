'use client'

import { KanbanColumn } from '@/context/OrderContext'

export type { KanbanColumn }

export interface KitchenOrder {
  id: string
  orderNumber: string
  items: string[]
  customer: string
  customerPhone: string
  time: string
  column: KanbanColumn
}

const COLUMN_CONFIG: Record<KanbanColumn, {
  actionLabel: string
  target: KanbanColumn | null
  actionBg: string
  actionColor: string
  accentColor: string
  chipBg: string
  chipText: string
  chipLabel: string
}> = {
  pending:    {
    actionLabel: 'Start Cooking',
    target: 'inProgress',
    actionBg: '#CC0000',
    actionColor: '#fff',
    accentColor: '#CC0000',
    chipBg: 'rgba(204,0,0,0.1)',
    chipText: '#CC0000',
    chipLabel: 'NEW',
  },
  inProgress: {
    actionLabel: 'Mark Ready',
    target: 'completed',
    actionBg: '#1D4ED8',
    actionColor: '#fff',
    accentColor: '#1D4ED8',
    chipBg: 'rgba(29,78,216,0.1)',
    chipText: '#1D4ED8',
    chipLabel: 'COOKING',
  },
  completed:  {
    actionLabel: 'Done',
    target: null,
    actionBg: '#16A34A',
    actionColor: '#fff',
    accentColor: '#16A34A',
    chipBg: 'rgba(22,163,74,0.1)',
    chipText: '#16A34A',
    chipLabel: 'DONE',
  },
}

interface OrderCardProps {
  order: KitchenOrder
  onMove: (orderId: string, to: KanbanColumn) => void
}

export default function OrderCard({ order, onMove }: OrderCardProps) {
  const cfg = COLUMN_CONFIG[order.column]

  return (
    <div
      className="overflow-hidden transition-all duration-200 hover:shadow-lg group"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderTop: `3px solid ${cfg.accentColor}`,
      }}
    >
      {/* Header */}
      <div className="px-3 pt-3 pb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-heading font-black text-[13px] uppercase tracking-tight" style={{ color: '#0A0A0A' }}>
            {order.orderNumber}
          </p>
          <p className="text-[11px] font-body mt-0.5" style={{ color: '#888' }}>{order.customer}</p>
          {order.customerPhone && (
            <p className="text-[10px] font-body" style={{ color: '#AAA' }}>{order.customerPhone}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-[11px] font-body" style={{ color: '#AAA' }}>{order.time}</span>
          <span
            className="text-[9px] font-heading font-black px-2 py-0.5 tracking-widest"
            style={{ background: cfg.chipBg, color: cfg.chipText }}
          >
            {cfg.chipLabel}
          </span>
        </div>
      </div>

      {/* Items */}
      <ul className="px-3 pb-2.5 space-y-1">
        {order.items.map((item, idx) => (
          <li key={idx} className="text-[11px] font-body flex items-start gap-1.5" style={{ color: '#555' }}>
            <span className="mt-0.5 shrink-0 font-bold" style={{ color: cfg.accentColor }}>·</span>
            {item}
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="mx-3 h-px" style={{ background: '#F0F0F0' }} />

      {/* Action */}
      <div className="px-3 py-2.5">
        {cfg.target ? (
          <button
            onClick={() => cfg.target && onMove(order.id, cfg.target)}
            className="w-full text-white text-[11px] font-heading font-black py-2.5 uppercase tracking-wider active:scale-[0.97] transition-all duration-150"
            style={{ background: cfg.actionBg }}
          >
            {cfg.actionLabel} →
          </button>
        ) : (
          <p className="text-center text-[11px] font-heading font-black uppercase tracking-widest py-1 flex items-center justify-center gap-1.5" style={{ color: '#16A34A' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
            Completed
          </p>
        )}
      </div>
    </div>
  )
}
