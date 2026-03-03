'use client'

import Image from 'next/image'

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

const CATEGORY_FALLBACK: Record<string, string> = {
  'Burgers':       'linear-gradient(145deg, #CC0000, #880000)',
  'Smash Burgers': 'linear-gradient(145deg, #880000, #440000)',
  'Dagwoods':      'linear-gradient(145deg, #1D4ED8, #1e3a8a)',
  'Wingzz':        'linear-gradient(145deg, #CC0000, #FF6B00)',
  'Loaded Chips':  'linear-gradient(145deg, #FF6B00, #CC0000)',
  'Prego Rolls':   'linear-gradient(145deg, #1D4ED8, #0A1628)',
  'Wraps & Salads':'linear-gradient(145deg, #1D4ED8, #1e3a8a)',
  'Chicken':       'linear-gradient(145deg, #CC0000, #FF6B00)',
}

const CATEGORY_MONOGRAM: Record<string, string> = {
  'Burgers':       'B',
  'Smash Burgers': 'SB',
  'Dagwoods':      'D',
  'Wingzz':        'W',
  'Loaded Chips':  'LC',
  'Prego Rolls':   'PR',
  'Wraps & Salads':'WR',
  'Chicken':       'CH',
}

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'Popular':     { bg: '#CC0000',    color: '#fff' },
  'Best Seller': { bg: '#0A0A0A',    color: '#fff' },
  'Best Value':  { bg: '#1D4ED8',    color: '#fff' },
  'New':         { bg: '#1D4ED8',    color: '#fff' },
  'Spicy 🌶️':  { bg: 'rgba(204,0,0,0.1)', color: '#CC0000' },
}

export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  const fallback = CATEGORY_FALLBACK[item.category] || 'linear-gradient(145deg, #0A0A0A, #333)'
  const badge = item.badge ? BADGE_STYLES[item.badge] : null
  const isSpecial = item.hasVariant || item.hasFlavour

  return (
    <div
      className="flex overflow-hidden transition-all duration-150 active:scale-[0.98] cursor-pointer"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderLeft: isSpecial ? '3px solid #1D4ED8' : '3px solid #CC0000',
      }}
      onClick={() => onAdd(item)}
    >
      {/* Photo / fallback */}
      <div className="relative w-[88px] h-[88px] shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="88px"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: fallback }}
          >
            <span className="font-heading font-black text-white opacity-60" style={{ fontSize: '18px', letterSpacing: '-0.02em' }}>
              {CATEGORY_MONOGRAM[item.category] ?? 'FZ'}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 px-3 py-2.5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="font-heading font-black text-[13px] leading-snug uppercase tracking-tight" style={{ color: '#0A0A0A' }}>
              {item.name}
            </h3>
            {badge && (
              <span
                className="shrink-0 text-[9px] font-heading font-black px-2 py-0.5 uppercase tracking-wide"
                style={{ background: badge.bg, color: badge.color }}
              >
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] font-body mt-0.5 line-clamp-2 leading-relaxed" style={{ color: '#888' }}>
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <div>
            <span className="font-heading font-black text-[15px]" style={{ color: '#FF6B00' }}>
              R{item.price}
            </span>
            {item.hasVariant && item.doublePriceExtra && (
              <span className="text-[10px] font-body ml-1.5" style={{ color: '#CCC' }}>
                / R{item.price + item.doublePriceExtra}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(item) }}
            className="text-[11px] font-heading font-black px-3 py-1.5 uppercase tracking-wide transition-all duration-150 active:scale-95"
            style={
              isSpecial
                ? { background: '#1D4ED8', color: '#fff' }
                : { background: '#CC0000', color: '#fff' }
            }
          >
            {isSpecial ? 'Build →' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
