'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, UserRole } from '@/context/AuthContext'

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="12" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
    </svg>
  )
}

type RoleTab = 'customer' | 'kitchen' | 'driver'

const ROLE_TABS: { id: RoleTab; label: string; icon: React.ReactNode; desc: string; needsPassword: boolean; destination: string }[] = [
  { id: 'customer', label: 'Customer', icon: <UserIcon />,  desc: 'Browse & order food',    needsPassword: false, destination: '/menu'    },
  { id: 'kitchen',  label: 'Staff',    icon: <GridIcon />,  desc: 'Kitchen dashboard',       needsPassword: true,  destination: '/kitchen' },
  { id: 'driver',   label: 'Driver',   icon: <TruckIcon />, desc: 'Delivery management',     needsPassword: true,  destination: '/driver'  },
]

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<RoleTab>('customer')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const currentTab = ROLE_TABS.find((t) => t.id === activeTab)!

  const handleTabChange = (tab: RoleTab) => {
    setActiveTab(tab)
    setPassword('')
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const ok = login(activeTab as UserRole, currentTab.needsPassword ? password : undefined)
      if (ok) {
        router.push(currentTab.destination)
      } else {
        setError('Incorrect password. Try again.')
        setPassword('')
      }
      setLoading(false)
    }, 400)
  }

  const handleCustomerLogin = () => {
    login('customer')
    router.push('/menu')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(#E5E5E5 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="w-full max-w-sm">

        {/* Brand mark */}
        <div className="mb-10">
          <div style={{ borderLeft: '4px solid #CC0000', paddingLeft: '14px' }}>
            <span
              className="font-heading font-black uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#CC0000' }}
            >
              FOODIE ZONE
            </span>
            <h1
              className="font-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: '46px', color: '#0A0A0A', marginTop: '2px' }}
            >
              ORDER<br />
              <span style={{ color: '#CC0000' }}>FRESH.</span>
            </h1>
          </div>
          <p className="font-body text-[13px] mt-3 pl-[18px]" style={{ color: '#888' }}>
            Soweto&apos;s finest — straight to your door
          </p>
        </div>

        {/* Role selector */}
        <div className="flex mb-5" style={{ border: '2px solid #0A0A0A' }}>
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-150"
              style={{
                background: activeTab === tab.id ? '#0A0A0A' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : '#888',
                borderRight: tab.id !== 'driver' ? '2px solid #0A0A0A' : 'none',
              }}
            >
              {tab.icon}
              <span className="text-[10px] font-heading font-black uppercase tracking-wide leading-none">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Action area */}
        {!currentTab.needsPassword ? (
          <div>
            <p className="text-[12px] font-body mb-4" style={{ color: '#888' }}>
              {currentTab.desc}
            </p>
            <button
              onClick={handleCustomerLogin}
              className="w-full py-4 font-heading font-black text-[15px] uppercase tracking-wide text-white transition-all duration-150 active:scale-[0.98]"
              style={{ background: '#CC0000', boxShadow: '0 6px 20px rgba(204,0,0,0.25)' }}
            >
              Browse Menu →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-[12px] font-body" style={{ color: '#888' }}>
              {currentTab.desc}
            </p>
            <div>
              <label
                className="block text-[11px] font-body font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: '#888' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3.5 font-body text-[14px] text-black focus:outline-none transition-all"
                style={{
                  background: '#F5F5F5',
                  border: `2px solid ${error ? '#CC0000' : focused ? '#0A0A0A' : '#E5E5E5'}`,
                }}
              />
              {error && (
                <p className="text-[12px] font-body mt-1.5" style={{ color: '#CC0000' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full py-4 font-heading font-black text-[15px] uppercase tracking-wide text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-40"
              style={{ background: '#0A0A0A' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                  Checking…
                </span>
              ) : (
                `Enter ${currentTab.label} →`
              )}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: '#E5E5E5' }} />
          <div className="flex gap-1">
            <span className="w-3 h-3 rounded-full" style={{ background: '#CC0000' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#0A0A0A' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#1D4ED8' }} />
          </div>
          <div className="h-px flex-1" style={{ background: '#E5E5E5' }} />
        </div>
        <p className="text-center text-[11px] font-body mt-3" style={{ color: '#CCC' }}>
          Orlando East, Soweto
        </p>
      </div>
    </div>
  )
}
