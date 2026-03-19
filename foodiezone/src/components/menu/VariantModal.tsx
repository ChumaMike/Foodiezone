'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MenuItem } from './MenuItemCard'

const FLAVOURS = ['Mild', 'Lemon & Herb', 'Tikka', 'Peri Peri', 'Sweet Chilli', 'Hottt 🔥']

interface VariantModalProps {
  item: MenuItem
  onClose: () => void
  onAddToCart: (displayName: string, variant: string, flavour: string, total: number) => void
}

export default function VariantModal({ item, onClose, onAddToCart }: VariantModalProps) {
  const [isDouble, setIsDouble] = useState(false)
  const [flavour, setFlavour] = useState('')

  const extra = item.doublePriceExtra ?? 0
  const livePrice = isDouble ? item.price + extra : item.price
  const doublePrice = item.price + extra

  const variantLabel = isDouble ? 'Double Patty' : 'Single Patty'
  const canAdd = !item.hasFlavour || flavour !== ''

  const handleAdd = () => {
    const displayName = [
      item.name,
      item.hasVariant && isDouble ? '(Double)' : '',
      item.hasFlavour && flavour ? `· ${flavour}` : '',
    ].filter(Boolean).join(' ')
    onAddToCart(displayName, variantLabel, flavour, livePrice)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md mx-auto overflow-hidden animate-modal-up"
        style={{ background: '#161616', borderTop: '2px solid #CC0000' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero */}
        <div className="relative h-36 w-full">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill className="object-cover brightness-75" />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #CC0000, #0A0A0A)' }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Name on photo */}
          <div className="absolute bottom-3 left-4 right-12">
            <p className="font-heading font-bold text-white text-[18px] uppercase leading-tight tracking-tight">{item.name}</p>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-7 pt-4">
          {/* Live price */}
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-[11px] font-heading font-bold uppercase tracking-[0.15em]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Your Price
            </p>
            <p className="font-display text-[28px] leading-none" style={{ color: '#FF6B00' }}>
              R{livePrice}
            </p>
          </div>

          {/* Single / Double selector */}
          {item.hasVariant && (
            <div className="mb-4">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Patty Size
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsDouble(false)}
                  className="p-3.5 text-left transition-all duration-150"
                  style={{
                    border: `2px solid ${!isDouble ? '#CC0000' : 'rgba(255,255,255,0.1)'}`,
                    background: !isDouble ? 'rgba(204,0,0,0.12)' : '#252525',
                  }}
                >
                  <p className="font-heading font-bold text-sm uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>Single Patty</p>
                  <p className="font-display text-[13px] mt-0.5" style={{ color: '#FF6B00' }}>R{item.price}</p>
                </button>
                <button
                  onClick={() => setIsDouble(true)}
                  className="p-3.5 text-left transition-all duration-150"
                  style={{
                    border: `2px solid ${isDouble ? '#CC0000' : 'rgba(255,255,255,0.1)'}`,
                    background: isDouble ? 'rgba(204,0,0,0.12)' : '#252525',
                  }}
                >
                  <p className="font-heading font-bold text-sm uppercase tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>Double Patty</p>
                  <p className="font-display text-[13px] mt-0.5" style={{ color: '#FF6B00' }}>R{doublePrice}</p>
                  <p className="text-[10px] font-body mt-0.5" style={{ color: '#CC0000' }}>+R{extra}</p>
                </button>
              </div>
            </div>
          )}

          {/* Flavour selector */}
          {item.hasFlavour && (
            <div className="mb-4">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Flavour{!flavour && <span className="ml-1 normal-case" style={{ color: '#CC0000' }}>(choose one)</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {FLAVOURS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlavour(f)}
                    className="px-3.5 py-2 text-[12px] font-heading font-bold uppercase tracking-wide transition-all duration-150"
                    style={{
                      border: `2px solid ${flavour === f ? '#CC0000' : 'rgba(255,255,255,0.1)'}`,
                      background: flavour === f ? '#CC0000' : '#252525',
                      color: flavour === f ? '#fff' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="w-full text-white font-heading font-bold py-4 transition-all duration-150 active:scale-[0.98] text-[15px] uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: canAdd ? '#CC0000' : '#2a2a2a' }}
          >
            Add to Cart — R{livePrice}
          </button>
        </div>
      </div>
    </div>
  )
}
