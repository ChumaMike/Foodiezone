'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useProfile, getTier, TIERS, CustomerProfile } from '@/context/ProfileContext'
import { useOrders } from '@/context/OrderContext'
import BottomNav from '@/components/BottomNav'

function EditProfileForm({ profile, onSave, onCancel }: {
  profile: CustomerProfile
  onSave: (data: { name: string; phone: string; defaultAddress: string }) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  const [address, setAddress] = useState(profile.defaultAddress)
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave({ name: name.trim(), phone: phone.trim(), defaultAddress: address.trim() }) }}
      className="space-y-3 px-4 py-4"
      style={{ background: '#F5F5F5', borderTop: '2px solid #0A0A0A' }}
    >
      <p className="font-heading font-black text-[11px] uppercase tracking-widest" style={{ color: '#888' }}>Edit Profile</p>
      {[
        { key: 'name',    label: 'Name',    value: name,    set: setName,    type: 'text', placeholder: 'Your name' },
        { key: 'phone',   label: 'Phone',   value: phone,   set: setPhone,   type: 'tel',  placeholder: '078 000 0000' },
        { key: 'address', label: 'Address', value: address, set: setAddress, type: 'text', placeholder: '12 Vilakazi St, Orlando West' },
      ].map((f) => (
        <div key={f.key}>
          <label className="block text-[10px] font-body font-semibold uppercase tracking-widest mb-1" style={{ color: '#888' }}>
            {f.label}
          </label>
          <input
            type={f.type}
            value={f.value}
            onChange={(e) => f.set(e.target.value)}
            onFocus={() => setFocused(f.key)}
            onBlur={() => setFocused(null)}
            placeholder={f.placeholder}
            className="w-full px-3 py-2.5 font-body text-[13px] text-black focus:outline-none"
            style={{ background: '#FFFFFF', border: `2px solid ${focused === f.key ? '#0A0A0A' : '#E5E5E5'}` }}
          />
        </div>
      ))}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 text-[12px] font-heading font-black uppercase tracking-wide transition-all active:scale-[0.97]"
          style={{ background: '#E5E5E5', color: '#888' }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!name.trim() || !phone.trim()}
          className="flex-1 py-2.5 text-[12px] font-heading font-black uppercase tracking-wide text-white transition-all active:scale-[0.97] disabled:opacity-40"
          style={{ background: '#0A0A0A' }}
        >
          Save →
        </button>
      </div>
    </form>
  )
}

export default function ProfilePage() {
  const { logout } = useAuth()
  const { profile, updateProfile } = useProfile()
  const { orders } = useOrders()
  const [editing, setEditing] = useState(false)

  if (!profile) return null

  const tier = getTier(profile.repScore)
  const nextTier = TIERS.find((t) => t.min > tier.min)
  const progressToNext = nextTier
    ? ((profile.repScore - tier.min) / (nextTier.min - tier.min)) * 100
    : 100

  // Orders belonging to this customer
  const myOrders = orders.filter((o) => o.customerName === profile.name)
  const totalSpent = myOrders.reduce((acc, o) => acc + o.total, 0)

  const memberDate = new Date(profile.memberSince)
  const memberSinceLabel = memberDate.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })

  const STATUS_COLORS: Record<string, { color: string; bg: string; label: string }> = {
    confirmed:  { color: '#888',    bg: 'rgba(0,0,0,0.07)',       label: 'Confirmed'  },
    preparing:  { color: '#1D4ED8', bg: 'rgba(29,78,216,0.1)',    label: 'Preparing'  },
    ready:      { color: '#16A34A', bg: 'rgba(22,163,74,0.1)',    label: 'Ready'      },
    delivering: { color: '#CC0000', bg: 'rgba(204,0,0,0.1)',      label: 'Delivering' },
    delivered:  { color: '#16A34A', bg: 'rgba(22,163,74,0.1)',    label: 'Delivered'  },
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: '#F5F5F5' }}>

      {/* Header */}
      <header style={{ background: '#0A0A0A', borderBottom: '3px solid #CC0000' }}>
        <div className="max-w-md mx-auto px-4 pt-10 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="brand-label mb-2">FOODIE ZONE</div>
              <h1 className="font-heading font-black text-white text-[28px] uppercase leading-none tracking-tight">
                My Profile
              </h1>
              <p className="text-[12px] font-body mt-1" style={{ color: '#888' }}>
                Member since {memberSinceLabel}
              </p>
            </div>
            <button
              onClick={logout}
              className="mt-1 text-[11px] font-body font-semibold uppercase tracking-wide px-3 py-1.5 transition-all active:opacity-70"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#AAA', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-md mx-auto space-y-4">

        {/* Rep Score Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderTop: `3px solid ${tier.color}` }}>
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-heading font-black text-[11px] uppercase tracking-widest" style={{ color: '#888' }}>Rep Score</p>
                <p className="font-heading font-black text-[48px] leading-none" style={{ color: tier.color }}>
                  {profile.repScore}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="font-heading font-black text-[11px] uppercase tracking-widest px-3 py-1.5 block"
                  style={{ background: tier.color, color: '#fff' }}
                >
                  {tier.label}
                </span>
                {nextTier && (
                  <p className="text-[10px] font-body mt-1" style={{ color: '#888' }}>
                    {nextTier.min - profile.repScore} pts to {nextTier.label}
                  </p>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full" style={{ background: '#F0F0F0' }}>
              <div
                className="h-full transition-all duration-700"
                style={{ width: `${Math.min(progressToNext, 100)}%`, background: tier.color }}
              />
            </div>
            {nextTier && (
              <div className="flex justify-between mt-1">
                <span className="text-[10px] font-body" style={{ color: '#CCC' }}>{tier.label} {tier.min}</span>
                <span className="text-[10px] font-body" style={{ color: '#CCC' }}>{nextTier.label} {nextTier.min}</span>
              </div>
            )}
          </div>

          {/* Tier guide */}
          <div className="grid grid-cols-4 gap-0" style={{ borderTop: '1px solid #F0F0F0' }}>
            {TIERS.map((t) => (
              <div
                key={t.label}
                className="py-2 text-center"
                style={{ background: profile.repScore >= t.min ? `${t.color}15` : 'transparent', borderRight: '1px solid #F0F0F0' }}
              >
                <p className="font-heading font-black text-[9px] uppercase tracking-wider" style={{ color: profile.repScore >= t.min ? t.color : '#CCC' }}>
                  {t.label}
                </p>
                <p className="text-[9px] font-body mt-0.5" style={{ color: '#CCC' }}>{t.min}+</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Orders', value: profile.ordersCount.toString() },
            { label: 'Spent',  value: `R${totalSpent}` },
            { label: 'Points', value: `${profile.repScore}` },
          ].map((s) => (
            <div key={s.label} className="py-3 text-center" style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <p className="font-heading font-black text-[18px]" style={{ color: '#0A0A0A' }}>{s.value}</p>
              <p className="text-[10px] font-body uppercase tracking-wide mt-0.5" style={{ color: '#888' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Profile details */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
            <p className="font-heading font-black text-[11px] uppercase tracking-widest" style={{ color: '#888' }}>Account</p>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-[11px] font-heading font-black uppercase tracking-wide px-3 py-1 transition-all active:opacity-70"
                style={{ background: '#F5F5F5', color: '#888', border: '1px solid #E5E5E5' }}
              >
                Edit
              </button>
            )}
          </div>
          {editing ? (
            <EditProfileForm
              profile={profile}
              onSave={(data) => { updateProfile(data); setEditing(false) }}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <div>
              {[
                { label: 'Name',    value: profile.name },
                { label: 'Phone',   value: profile.phone },
                { label: 'Address', value: profile.defaultAddress || 'Not set' },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F5' : 'none' }}
                >
                  <span className="text-[11px] font-body uppercase tracking-wide" style={{ color: '#AAA' }}>{row.label}</span>
                  <span className="text-[13px] font-body font-semibold" style={{ color: row.value === 'Not set' ? '#CCC' : '#0A0A0A' }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order history */}
        {myOrders.length > 0 && (
          <div>
            <h2 className="font-heading font-black text-[11px] uppercase tracking-[0.15em] mb-2" style={{ color: '#888' }}>
              Order History
            </h2>
            <div className="space-y-2">
              {myOrders.map((order) => {
                const sc = STATUS_COLORS[order.status] ?? STATUS_COLORS.confirmed
                return (
                  <div
                    key={order.id}
                    style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
                  >
                    <div className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="font-heading font-black text-[13px] uppercase tracking-tight" style={{ color: '#0A0A0A' }}>
                          {order.orderNumber}
                        </p>
                        <p className="text-[11px] font-body mt-0.5" style={{ color: '#888' }}>
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {order.createdAt}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="text-[9px] font-heading font-black px-2 py-0.5 uppercase tracking-widest"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {sc.label}
                        </span>
                        <span className="font-heading font-black text-[13px]" style={{ color: '#FF6B00' }}>
                          R{order.total}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {myOrders.length === 0 && (
          <div className="py-10 text-center" style={{ border: '1px dashed #E5E5E5', background: '#FFFFFF' }}>
            <p className="font-heading font-black text-sm uppercase tracking-wide" style={{ color: '#888' }}>No orders yet</p>
            <p className="text-xs font-body mt-1" style={{ color: '#CCC' }}>Place your first order to earn rep points</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
