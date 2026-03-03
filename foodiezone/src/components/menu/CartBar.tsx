'use client'

import { useCart } from '@/context/CartContext'

interface CartBarProps {
  onViewCart: () => void
}

export default function CartBar({ onViewCart }: CartBarProps) {
  const { count, total } = useCart()

  if (count === 0) return null

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 px-4 pb-2">
      <div className="max-w-md mx-auto">
        <button
          onClick={onViewCart}
          className="w-full flex items-center justify-between text-white px-4 py-3.5 active:scale-[0.98] transition-all duration-150"
          style={{ background: '#CC0000', boxShadow: '0 4px 20px rgba(204,0,0,0.35)' }}
        >
          {/* Left: count + label */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-[11px] font-black min-w-[22px] h-[22px] flex items-center justify-center px-1"
              style={{ background: '#FFFFFF', color: '#CC0000', borderRadius: 0 }}
            >
              {count}
            </span>
            <span className="font-heading font-black text-[13px] uppercase tracking-wide">View Cart</span>
          </div>

          {/* Right: total */}
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-black text-[16px]">R{total}</span>
            <span className="text-white/70 text-sm font-bold">›</span>
          </div>
        </button>
      </div>
    </div>
  )
}
