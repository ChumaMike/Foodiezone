'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useProfile, getTier } from '@/context/ProfileContext'

function ForkKnifeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
      <path d="M7 2v20"/>
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
      <rect x="9" y="11" width="14" height="10" rx="2"/>
      <circle cx="12" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

const ALL_NAV_ITEMS = [
  { href: '/',         label: 'Home',    icon: <HomeIcon />,      roles: ['customer'] as string[] },
  { href: '/menu',     label: 'Menu',    icon: <ForkKnifeIcon />, roles: ['customer'] as string[] },
  { href: '/tracking', label: 'Track',   icon: <MapPinIcon />,    roles: ['customer'] as string[] },
  { href: '/profile',  label: 'Profile', icon: <UserIcon />,      roles: ['customer'] as string[] },
  { href: '/kitchen',  label: 'Kitchen', icon: <GridIcon />,      roles: ['kitchen']  as string[] },
  { href: '/driver',   label: 'Deliver', icon: <TruckIcon />,     roles: ['driver']   as string[] },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { count } = useCart()
  const { role } = useAuth()
  const { profile } = useProfile()
  const tier = profile ? getTier(profile.repScore) : null

  const navItems = ALL_NAV_ITEMS.filter((item) => role && item.roles.includes(role))

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center h-16 max-w-md mx-auto">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-opacity duration-150"
            >
              {active && (
                <span
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: '#CC0000' }}
                />
              )}

              <div className="relative" style={{ color: active ? '#CC0000' : 'rgba(255,255,255,0.35)' }}>
                {icon}
                {href === '/menu' && count > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 text-white text-[10px] font-heading font-bold min-w-[16px] h-4 flex items-center justify-center px-0.5 animate-badge-pop"
                    style={{ background: '#CC0000' }}
                  >
                    {count > 9 ? '9+' : count}
                  </span>
                )}
                {href === '/profile' && tier && (
                  <span
                    className="absolute -top-1 -right-2.5 text-white text-[8px] font-heading font-bold px-1 py-0.5 leading-none"
                    style={{ background: tier.color }}
                  >
                    {tier.label.toUpperCase().slice(0, 3)}
                  </span>
                )}
              </div>

              <span
                className="text-[10px] font-heading font-semibold uppercase leading-none"
                style={{ color: active ? '#CC0000' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
