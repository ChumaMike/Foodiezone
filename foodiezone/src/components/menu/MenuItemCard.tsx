'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  badge?: string
  popular?: boolean
  hasVariant?: boolean
  doublePriceExtra?: number
  hasFlavour?: boolean
}

interface MenuItemCardProps {
  item: MenuItem
  onAdd: (item: MenuItem) => void
}

const CATEGORY_GRADIENT: Record<string, string> = {
  'Burgers':       'linear-gradient(145deg,#7A0000,#CC0000)',
  'Smash Burgers': 'linear-gradient(145deg,#3D0000,#880000)',
  'Dagwoods':      'linear-gradient(145deg,#0f2460,#1D4ED8)',
  'Wingzz':        'linear-gradient(145deg,#7A3300,#FF6B00)',
  'Loaded Chips':  'linear-gradient(145deg,#7A3300,#FF6B00)',
  'Prego Rolls':   'linear-gradient(145deg,#0f2460,#1D4ED8)',
  'Wraps & Salads':'linear-gradient(145deg,#0f2460,#1D4ED8)',
  'Chicken':       'linear-gradient(145deg,#7A0000,#CC0000)',
}

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'Popular':     { bg: '#CC0000', color: '#fff' },
  'Best Seller': { bg: '#fff',    color: '#0A0A0A' },
  'Best Value':  { bg: '#1D4ED8', color: '#fff' },
  'New':         { bg: '#1D4ED8', color: '#fff' },
  'Spicy 🌶️':  { bg: 'rgba(204,0,0,0.15)', color: '#FF6B00' },
}

export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  const [added, setAdded] = useState(false)
  const gradient = CATEGORY_GRADIENT[item.category] ?? 'linear-gradient(145deg,#1a1a1a,#333)'
  const badge = item.badge ? BADGE_STYLES[item.badge] : null
  const isSpecial = item.hasVariant || item.hasFlavour

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isSpecial) {
      setAdded(true)
      setTimeout(() => setAdded(false), 550)
    }
    onAdd(item)
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="group flex flex-col overflow-hidden cursor-pointer"
      style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={() => onAdd(item)}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}

        {/* Gradient fade bottom */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.7) 0%, transparent 60%)' }} />

        {/* Badge */}
        {badge && (
          <span
            className="absolute top-2.5 left-2.5 text-[10px] font-heading font-semibold px-2.5 py-1 uppercase"
            style={{ background: badge.bg, color: badge.color, letterSpacing: '0.1em' }}
          >
            {item.badge}
          </span>
        )}

        {/* Special indicator */}
        {isSpecial && (
          <span
            className="absolute top-2.5 right-2.5 text-[9px] font-heading font-semibold px-2 py-1 uppercase"
            style={{ background: 'rgba(29,78,216,0.9)', color: '#fff', letterSpacing: '0.08em' }}
          >
            Customise
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3.5">
        <h3
          className="font-heading font-semibold text-sm uppercase leading-snug mb-1"
          style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.05em' }}
        >
          {item.name}
        </h3>
        <p
          className="font-body text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}
        >
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-display text-lg leading-none" style={{ color: '#FF6B00' }}>
              R{item.price}
            </span>
            {item.hasVariant && item.doublePriceExtra && (
              <span className="font-body text-[10px] ml-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                · R{item.price + item.doublePriceExtra}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className="font-heading font-semibold text-[11px] uppercase px-3.5 py-2"
            animate={{
              background: added ? '#15803d' : isSpecial ? '#1D4ED8' : '#CC0000',
            }}
            transition={{ duration: 0.15 }}
            style={{ color: '#fff', letterSpacing: '0.1em' }}
          >
            {added ? '✓ Added' : isSpecial ? 'Build →' : '+ Add'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
