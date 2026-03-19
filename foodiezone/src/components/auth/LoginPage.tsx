'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, UserRole } from '@/context/AuthContext'

type RoleTab = 'customer' | 'kitchen' | 'driver'

const ROLES: {
  id: RoleTab
  label: string
  desc: string
  needsPassword: boolean
  destination: string
  icon: React.ReactNode
}[] = [
  {
    id: 'customer',
    label: 'Customer',
    desc: 'Browse the menu & order',
    needsPassword: false,
    destination: '/menu',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    desc: 'Manage incoming orders',
    needsPassword: true,
    destination: '/kitchen',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'driver',
    label: 'Driver',
    desc: 'Delivery management',
    needsPassword: true,
    destination: '/driver',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
        <rect x="9" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
]

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [activeRole, setActiveRole] = useState<RoleTab>('customer')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const current = ROLES.find((r) => r.id === activeRole)!

  const handleRoleChange = (role: RoleTab) => {
    setActiveRole(role)
    setPassword('')
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const ok = login(activeRole as UserRole, current.needsPassword ? password : undefined)
      if (ok) {
        router.push(current.destination)
      } else {
        setError('Incorrect password. Try again.')
        setPassword('')
      }
      setLoading(false)
    }, 400)
  }

  const handleCustomerGo = () => {
    login('customer')
    router.push('/menu')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0A0A0A' }}>

      {/* ── LEFT — Video / Brand panel ── */}
      <div className="hidden md:flex relative flex-1 flex-col justify-end p-12 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.28)' }}
        >
          <source src="/videos/smash-burgers.mp4" type="video/mp4" />
          <source src="/videos/wings.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.1) 60%, transparent 100%)' }}
        />

        <div className="relative z-10">
          <div className="font-display text-white mb-4 leading-none" style={{ fontSize: 64 }}>
            FOODIE<span style={{ color: '#CC0000' }}>ZONE</span>
          </div>
          <p className="font-body text-base mb-10" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
            Orlando East, Soweto
          </p>

          <div className="flex gap-10">
            {[
              { val: '4.8★', label: 'Rating' },
              { val: '25min', label: 'Avg delivery' },
              { val: 'R100+', label: 'Free delivery' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-white text-2xl leading-none">{s.val}</div>
                <div
                  className="font-heading font-semibold text-xs uppercase mt-1"
                  style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT — Form panel ── */}
      <div
        className="w-full md:w-[460px] flex flex-col justify-center px-8 py-16 md:px-12"
        style={{ background: '#111111', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Mobile logo */}
        <div className="md:hidden mb-10">
          <div className="font-display text-white leading-none" style={{ fontSize: 40 }}>
            FOODIE<span style={{ color: '#CC0000' }}>ZONE</span>
          </div>
          <p className="font-body text-sm mt-2" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
            Orlando East, Soweto
          </p>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <p
            className="font-heading font-semibold text-xs uppercase mb-3"
            style={{ color: '#CC0000', letterSpacing: '0.2em' }}
          >
            Welcome back
          </p>
          <h1 className="font-display text-white leading-none" style={{ fontSize: 52 }}>
            SIGN IN
          </h1>
        </div>

        {/* Role cards */}
        <div className="flex flex-col gap-3 mb-8">
          {ROLES.map((role) => {
            const isActive = activeRole === role.id
            return (
              <button
                key={role.id}
                onClick={() => handleRoleChange(role.id)}
                className="flex items-center gap-4 p-4 text-left transition-all duration-150"
                style={{
                  background: isActive ? 'rgba(204,0,0,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${isActive ? '#CC0000' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div style={{ color: isActive ? '#CC0000' : 'rgba(255,255,255,0.3)' }}>
                  {role.icon}
                </div>
                <div className="flex-1 text-left">
                  <p
                    className="font-heading font-semibold text-sm uppercase"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}
                  >
                    {role.label}
                  </p>
                  <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
                    {role.desc}
                  </p>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#CC0000' }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Action area */}
        {!current.needsPassword ? (
          <button
            onClick={handleCustomerGo}
            className="w-full py-4 font-heading font-bold text-sm uppercase text-white transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: '#CC0000', letterSpacing: '0.15em' }}
          >
            Browse Menu →
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block font-heading font-semibold text-xs uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.16em' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3.5 font-body text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${error ? '#CC0000' : 'rgba(255,255,255,0.1)'}`,
                  fontWeight: 400,
                }}
              />
              {error && (
                <p className="font-body text-xs mt-2" style={{ color: '#CC0000', fontWeight: 400 }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full py-4 font-heading font-bold text-sm uppercase text-white transition-all hover:bg-white hover:text-black active:scale-[0.98] disabled:opacity-30"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2.5">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block" />
                  Checking…
                </span>
              ) : (
                `Enter as ${current.label} →`
              )}
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <a
            href="https://skhokholabs.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-semibold text-xs uppercase transition-colors"
            style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.16em' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#CC0000')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
          >
            Built by skhokholabs.xyz
          </a>
        </div>
      </div>
    </div>
  )
}
