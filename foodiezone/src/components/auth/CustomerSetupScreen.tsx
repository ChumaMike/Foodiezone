'use client'

import { useState } from 'react'
import { useProfile } from '@/context/ProfileContext'

export default function CustomerSetupScreen() {
  const { saveProfile } = useProfile()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    saveProfile({ name: name.trim(), phone: phone.trim(), defaultAddress: address.trim() })
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-5"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(#E5E5E5 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8" style={{ borderLeft: '4px solid #CC0000', paddingLeft: '14px' }}>
          <span className="font-heading font-black uppercase text-[11px] tracking-[0.22em]" style={{ color: '#CC0000' }}>
            FOODIE ZONE
          </span>
          <h1 className="font-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: '38px', color: '#0A0A0A', marginTop: '2px' }}>
            WHO ARE<br />
            <span style={{ color: '#CC0000' }}>YOU?</span>
          </h1>
          <p className="font-body text-[13px] mt-2" style={{ color: '#888' }}>
            Quick setup — takes 30 seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#888' }}>
              Your Name <span style={{ color: '#CC0000' }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. Sipho"
              autoFocus
              className="w-full px-4 py-3.5 font-body text-[14px] text-black focus:outline-none transition-all"
              style={{
                background: '#F5F5F5',
                border: `2px solid ${focusedField === 'name' ? '#0A0A0A' : '#E5E5E5'}`,
              }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#888' }}>
              Phone Number <span style={{ color: '#CC0000' }}>*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. 078 123 4567"
              className="w-full px-4 py-3.5 font-body text-[14px] text-black focus:outline-none transition-all"
              style={{
                background: '#F5F5F5',
                border: `2px solid ${focusedField === 'phone' ? '#0A0A0A' : '#E5E5E5'}`,
              }}
            />
          </div>

          {/* Address (optional) */}
          <div>
            <label className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#888' }}>
              Default Address <span style={{ color: '#CCC' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={() => setFocusedField('address')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. 12 Vilakazi Street, Orlando West"
              className="w-full px-4 py-3.5 font-body text-[14px] text-black focus:outline-none transition-all"
              style={{
                background: '#F5F5F5',
                border: `2px solid ${focusedField === 'address' ? '#0A0A0A' : '#E5E5E5'}`,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-4 font-heading font-black text-[15px] uppercase tracking-wide text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed mt-2"
            style={{ background: '#CC0000', boxShadow: canSubmit ? '0 6px 20px rgba(204,0,0,0.25)' : 'none' }}
          >
            Start Ordering →
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: '#E5E5E5' }} />
          <div className="flex gap-1">
            <span className="w-3 h-3 rounded-full" style={{ background: '#CC0000' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#0A0A0A' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#1D4ED8' }} />
          </div>
          <div className="h-px flex-1" style={{ background: '#E5E5E5' }} />
        </div>
        <p className="text-center text-[11px] font-body mt-2" style={{ color: '#CCC' }}>
          Your info is stored on this device only
        </p>
      </div>
    </div>
  )
}
