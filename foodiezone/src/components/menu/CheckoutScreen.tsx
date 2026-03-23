'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useProfile } from '@/context/ProfileContext'
import { useToast } from '@/context/ToastContext'
import { useState, useEffect } from 'react'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import { slideUpSheet, backdropVariants, fadeUp, staggerContainer } from '@/lib/motion'

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
  const { show: showToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [placing, setPlacing] = useState(false)
  const [address, setAddress] = useState('')
  const [addressFocused, setAddressFocused] = useState(false)
  const [addressError, setAddressError] = useState('')
  const addressControls = useAnimationControls()

  useEffect(() => {
    if (profile?.defaultAddress && !address) {
      setAddress(profile.defaultAddress)
    }
  }, [profile?.defaultAddress, address])

  const handlePlaceOrder = async () => {
    if (!address.trim() || address.trim().length < 6) {
      setAddressError('Please enter your full delivery address')
      addressControls.start({ x: [0, -8, 8, -6, 6, -4, 0], transition: { duration: 0.35 } })
      return
    }
    setAddressError('')
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
    showToast('Order placed! Tracking your delivery…')
    router.push('/tracking')
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            variants={slideUpSheet}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div
              className="rounded-t-[24px] max-h-[92vh] overflow-y-auto max-w-md mx-auto"
              style={{ background: '#161616', borderTop: '2px solid #CC0000' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              </div>

              <div className="px-5 pb-8 pt-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-display text-[20px] uppercase tracking-tight text-white">
                      Your Order
                    </h2>
                    {profile && (
                      <p className="text-[12px] font-body mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {profile.name} · {profile.phone}
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold"
                    style={{ background: '#2a2a2a', color: 'rgba(255,255,255,0.5)' }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Items */}
                {items.length > 0 ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-2 mb-4"
                  >
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={fadeUp}
                          layout
                          exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-start justify-between gap-3 p-3"
                          style={{ background: '#222222', borderLeft: '3px solid #CC0000' }}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                              {item.quantity}× {item.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-heading font-bold text-[13px]" style={{ color: '#FF6B00' }}>
                              R{item.total}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 flex items-center justify-center text-[11px] font-bold"
                              style={{ background: '#333', color: 'rgba(255,255,255,0.4)' }}
                            >
                              ✕
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <div className="py-8 text-center mb-4">
                    <div className="flex justify-center mb-2" style={{ color: '#555' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    </div>
                    <p className="text-sm font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>Your cart is empty</p>
                  </div>
                )}

                {/* Totals */}
                <div className="mb-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex justify-between px-4 py-2.5 text-[13px] font-body" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>Subtotal</span>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>R{total}</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-[13px] font-body" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>Delivery fee</span>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>R{DELIVERY_FEE}</span>
                  </div>
                  {profile && (
                    <div className="flex justify-between px-4 py-2 text-[12px] font-body" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(204,0,0,0.06)' }}>
                      <span style={{ color: '#CC0000' }}>Rep earned this order</span>
                      <span className="font-heading font-bold" style={{ color: '#CC0000' }}>+10 pts</span>
                    </div>
                  )}
                  <div className="flex justify-between px-4 py-3" style={{ background: '#0A0A0A' }}>
                    <span className="font-heading font-bold text-white text-[14px] uppercase tracking-wide">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="font-heading font-bold text-[14px]"
                      style={{ color: '#FF6B00' }}
                    >
                      R{total + DELIVERY_FEE}
                    </motion.span>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Delivery Address
                  </label>
                  <motion.div animate={addressControls}>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); if (addressError) setAddressError('') }}
                      onFocus={() => setAddressFocused(true)}
                      onBlur={() => setAddressFocused(false)}
                      placeholder="e.g. 12 Vilakazi Street, Orlando West"
                      className="w-full px-4 py-3 text-[13px] font-body text-white focus:outline-none"
                      style={{
                        background: '#1E1E1E',
                        border: `2px solid ${addressError ? '#CC0000' : addressFocused ? 'rgba(204,0,0,0.7)' : 'rgba(255,255,255,0.1)'}`,
                        transition: 'border-color 0.15s',
                      }}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {addressError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[11px] font-body mt-1"
                        style={{ color: '#CC0000' }}
                      >
                        {addressError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Payment */}
                <div className="mb-6">
                  <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((m) => (
                      <motion.label
                        key={m.id}
                        whileTap={{ scale: 0.99 }}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                        style={{
                          background: paymentMethod === m.id ? 'rgba(204,0,0,0.08)' : '#1E1E1E',
                          border: `2px solid ${paymentMethod === m.id ? '#CC0000' : 'rgba(255,255,255,0.1)'}`,
                          transition: 'background 0.15s, border-color 0.15s',
                        }}
                      >
                        <span style={{ color: paymentMethod === m.id ? '#CC0000' : 'rgba(255,255,255,0.35)' }}>{m.icon}</span>
                        <div className="flex-1">
                          <p className="text-[13px] font-body font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{m.label}</p>
                          <p className="text-[11px] font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.desc}</p>
                        </div>
                        <div
                          className="w-5 h-5 flex items-center justify-center shrink-0"
                          style={{
                            border: `2px solid ${paymentMethod === m.id ? '#CC0000' : 'rgba(255,255,255,0.2)'}`,
                            background: paymentMethod === m.id ? '#CC0000' : 'transparent',
                            borderRadius: '50%',
                            transition: 'background 0.15s, border-color 0.15s',
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
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  whileTap={{ scale: placing || items.length === 0 ? 1 : 0.97 }}
                  onClick={handlePlaceOrder}
                  disabled={placing || items.length === 0}
                  className="w-full text-white font-heading font-bold py-4 text-[15px] uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: placing ? '#555' : '#CC0000', transition: 'background 0.2s' }}
                >
                  {placing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Placing Order…
                    </span>
                  ) : (
                    `Place Order — R${total + DELIVERY_FEE}`
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
