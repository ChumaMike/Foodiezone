'use client'

import { useState, useEffect } from 'react'

type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'delivering'

interface DriverCardProps {
  status: OrderStatus
}

const INITIAL_ETA = 12 * 60

function TruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="12" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

export default function DriverCard({ status }: DriverCardProps) {
  const [eta, setEta] = useState(INITIAL_ETA)

  useEffect(() => {
    if (status !== 'delivering') return
    const id = setInterval(() => {
      setEta((p) => (p > 0 ? p - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [status])

  const mins = Math.floor(eta / 60)
  const secs = eta % 60
  const isLive = status === 'delivering'

  const statusSubline =
    status === 'confirmed' ? 'Pending confirmation' :
    status === 'preparing' ? 'Order being prepared' :
    'Order ready — assigning driver'

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
      {/* Status stripe */}
      <div
        className="h-1 transition-all duration-700"
        style={{ background: isLive ? 'linear-gradient(90deg, #CC0000, #1D4ED8)' : '#E5E5E5' }}
      />

      <div className="p-4">
        <div className="flex items-center gap-3.5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-14 h-14 flex items-center justify-center"
              style={{ background: isLive ? '#CC0000' : '#0A0A0A' }}
            >
              <TruckIcon />
            </div>
            {isLive && (
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 animate-pulse-dot"
                style={{ border: '2px solid #fff', borderRadius: '50%' }}
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-heading font-black text-[14px] uppercase tracking-tight" style={{ color: '#0A0A0A' }}>
              {isLive ? 'Driver En Route' : 'Awaiting Assignment'}
            </p>
            <p className="text-[11px] font-body" style={{ color: '#888' }}>
              {isLive ? 'Foodie Zone Delivery' : statusSubline}
            </p>
            {isLive && (
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[11px]" style={{ color: '#CC0000' }}>★</span>
                ))}
                <span className="text-[11px] ml-1" style={{ color: '#888' }}>4.9</span>
              </div>
            )}
          </div>

          {/* ETA */}
          <div className="text-right shrink-0">
            {isLive ? (
              <>
                <p
                  className="font-heading font-black text-[24px] leading-none tabular-nums"
                  style={{ color: '#CC0000' }}
                >
                  {mins}:{secs.toString().padStart(2, '0')}
                </p>
                <p className="text-[10px] font-heading font-black uppercase tracking-widest mt-0.5" style={{ color: '#888' }}>ETA</p>
              </>
            ) : (
              <>
                <p className="font-heading font-black text-[24px] leading-none" style={{ color: '#E5E5E5' }}>—</p>
                <p className="text-[10px] font-heading font-black uppercase tracking-widest mt-0.5" style={{ color: '#CCC' }}>
                  {status === 'confirmed' ? 'Pending' : status === 'preparing' ? 'Cooking' : 'Packing'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Contact buttons */}
        <div className="flex gap-2 mt-3.5">
          <button
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-heading font-black uppercase tracking-wide transition-all active:scale-95"
            style={{ background: '#F5F5F5', color: '#0A0A0A', border: '1px solid #E5E5E5' }}
          >
            <PhoneIcon /> Call
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-heading font-black uppercase tracking-wide transition-all active:scale-95"
            style={{ background: '#1D4ED8', color: '#fff' }}
          >
            <ChatIcon /> Chat
          </button>
        </div>
      </div>
    </div>
  )
}
