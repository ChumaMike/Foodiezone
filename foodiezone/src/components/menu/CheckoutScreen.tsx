'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useProfile } from '@/context/ProfileContext'
import { useState, useEffect } from 'react'

interface CheckoutScreenProps {
  show: boolean
  onClose: () => void
}

function CashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <path d="M1 10h22"/>
    </svg>
  )
}

function PhonePayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 22V11M12 22V11M21 22V11"/>
      <path d="M2 11h20M12 2 2 7h20L12 2z"/>
    </svg>
  )
}

const PAYMENT_METHODS = [
  { id: 'cash',    label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: <CashIcon /> },
  { id: 'snap',    label: 'SnapScan',          desc: 'Scan QR code at the door',    icon: <PhonePayIcon /> },
  { id: 'capitec', label: 'Capitec Pay',       desc: 'Pay via Capitec banking app', icon: <BankIcon /> },
]

const DELIVERY_FEE = 15

export default function CheckoutScreen({ show, onClose }: CheckoutScreenProps) {
  const router = useRouter()
  const { items, total, removeItem, clearCart } = useCart()
  const { placeOrder } = useOrders()
  const { profile, incrementRep } = useProfile()
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [placing, setPlacing] = useState(false)
  const [address, setAddress] = useState('')
  const [addressFocused, setAddressFocused] = useState(false)

  // Pre-fill address from profile
  useEffect(() => {
    if (profile?.defaultAddress && !address) {
      setAddress(profile.defaultAddress)
    }
  }, [profile?.defaultAddress, address])

  const handlePlaceOrder = async () => {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 700))
    placeOrder({
      items,
      address,
      paymentMethod,
      subtotal: total,
      deliveryFee: DELIVERY_FEE,
      customerName: profile?.name ?? 'Customer',
      customerPhone: profile?.phone ?? '',
    })
    incrementRep()
    clearCart()
    router.push('/tracking')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div
          className="rounded-t-[24px] max-h-[92vh] overflow-y-auto max-w-md mx-auto"
          style={{ background: '#FFFFFF', borderTop: '3px solid #CC0000' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: '#E5E5E5' }} />
          </div>

          <div className="px-5 pb-8 pt-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-heading font-black text-[20px] uppercase tracking-tight" style={{ color: '#0A0A0A' }}>
                  Your Order
                </h2>
                {profile && (
                  <p className="text-[12px] font-body mt-0.5" style={{ color: '#888' }}>
                    {profile.name} · {profile.phone}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold transition-colors"
                style={{ background: '#F5F5F5', color: '#888', borderRadius: 0 }}
              >
                ✕
              </button>
            </div>

            {/* Items */}
            {items.length > 0 ? (
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 p-3"
                    style={{ background: '#F5F5F5', borderLeft: '3px solid #CC0000' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-[13px] font-semibold" style={{ color: '#0A0A0A' }}>
                        {item.quantity}× {item.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-heading font-bold text-[13px]" style={{ color: '#FF6B00' }}>
                        R{item.total}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 flex items-center justify-center text-[11px] font-bold transition-colors"
                        style={{ background: '#E5E5E5', color: '#888' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center mb-4">
                <div className="flex justify-center mb-2" style={{ color: '#CCC' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <p className="text-sm font-body" style={{ color: '#888' }}>Your cart is empty</p>
              </div>
            )}

            {/* Totals */}
            <div className="mb-4" style={{ border: '1px solid #E5E5E5' }}>
              <div className="flex justify-between px-4 py-2.5 text-[13px] font-body" style={{ borderBottom: '1px solid #E5E5E5' }}>
                <span style={{ color: '#888' }}>Subtotal</span>
                <span style={{ color: '#0A0A0A', fontWeight: 600 }}>R{total}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-[13px] font-body" style={{ borderBottom: '1px solid #E5E5E5' }}>
                <span style={{ color: '#888' }}>Delivery fee</span>
                <span style={{ color: '#0A0A0A', fontWeight: 600 }}>R{DELIVERY_FEE}</span>
              </div>
              {profile && (
                <div className="flex justify-between px-4 py-2 text-[12px] font-body" style={{ borderBottom: '1px solid #E5E5E5', background: 'rgba(204,0,0,0.03)' }}>
                  <span style={{ color: '#CC0000' }}>Rep earned this order</span>
                  <span className="font-heading font-black" style={{ color: '#CC0000' }}>+10 pts</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3" style={{ background: '#0A0A0A' }}>
                <span className="font-heading font-black text-white text-[14px] uppercase tracking-wide">Total</span>
                <span className="font-heading font-black text-[14px]" style={{ color: '#FF6B00' }}>R{total + DELIVERY_FEE}</span>
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#888' }}>
                Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setAddressFocused(true)}
                onBlur={() => setAddressFocused(false)}
                placeholder="e.g. 12 Vilakazi Street, Orlando West"
                className="w-full px-4 py-3 text-[13px] font-body text-black focus:outline-none transition-colors"
                style={{
                  background: '#F5F5F5',
                  border: `2px solid ${addressFocused ? '#0A0A0A' : '#E5E5E5'}`,
                }}
              />
            </div>

            {/* Payment */}
            <div className="mb-6">
              <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-2" style={{ color: '#888' }}>
                Payment Method
              </label>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150"
                    style={{
                      background: paymentMethod === m.id ? 'rgba(204,0,0,0.05)' : '#F5F5F5',
                      border: `2px solid ${paymentMethod === m.id ? '#CC0000' : '#E5E5E5'}`,
                    }}
                  >
                    <span style={{ color: paymentMethod === m.id ? '#CC0000' : '#888' }}>{m.icon}</span>
                    <div className="flex-1">
                      <p className="text-[13px] font-body font-semibold" style={{ color: '#0A0A0A' }}>{m.label}</p>
                      <p className="text-[11px] font-body" style={{ color: '#888' }}>{m.desc}</p>
                    </div>
                    <div
                      className="w-5 h-5 flex items-center justify-center shrink-0 transition-all"
                      style={{
                        border: `2px solid ${paymentMethod === m.id ? '#CC0000' : '#CCC'}`,
                        background: paymentMethod === m.id ? '#CC0000' : 'transparent',
                        borderRadius: '50%',
                      }}
                    >
                      {paymentMethod === m.id && <span className="text-white text-[10px] font-black">✓</span>}
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing || items.length === 0}
              className="w-full text-white font-heading font-black py-4 transition-all duration-150 text-[15px] uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
              style={{ background: placing ? '#888' : '#CC0000' }}
            >
              {placing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Placing Order…
                </span>
              ) : (
                `Place Order — R${total + DELIVERY_FEE}`
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
