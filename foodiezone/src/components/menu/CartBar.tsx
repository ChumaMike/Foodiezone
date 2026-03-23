'use client'

import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { popIn } from '@/lib/motion'

interface CartBarProps {
  onViewCart: () => void
}

export default function CartBar({ onViewCart }: CartBarProps) {
  const { count, total } = useCart()

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="fixed bottom-16 left-0 right-0 z-30 px-4 pb-2"
    >
      <div className="max-w-md mx-auto">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onViewCart}
          className="w-full flex items-center justify-between text-white px-4 py-3.5"
          style={{ background: '#CC0000', boxShadow: '0 4px 20px rgba(204,0,0,0.35)' }}
        >
          {/* Left: count + label */}
          <div className="flex items-center gap-2.5">
            <motion.span
              key={count}
              variants={popIn}
              initial="hidden"
              animate="show"
              className="text-[11px] font-heading font-bold min-w-[22px] h-[22px] flex items-center justify-center px-1"
              style={{ background: 'rgba(0,0,0,0.3)', color: '#fff' }}
            >
              {count}
            </motion.span>
            <span className="font-heading font-bold text-[13px] uppercase tracking-wide">View Cart</span>
          </div>

          {/* Right: total */}
          <div className="flex items-center gap-1.5">
            <motion.span
              key={total}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="font-heading font-black text-[16px]"
            >
              R{total}
            </motion.span>
            <span className="text-white/70 text-sm font-bold">›</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}
