'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Mock Data ───────────────────────────────────────────────────────────────

const SALES_WEEK = [
  { day: 'MON', value: 1200 },
  { day: 'TUE', value: 980 },
  { day: 'WED', value: 2100 },
  { day: 'THU', value: 1750 },
  { day: 'FRI', value: 2840 },
  { day: 'SAT', value: 3200 },
  { day: 'SUN', value: 2650 },
]
const SALES_MAX = Math.max(...SALES_WEEK.map((d) => d.value))
const TODAY_IDX = 4 // FRI = today

const BEST_SELLERS = [
  { name: 'Cheese Burger',     category: 'Burgers',  sold: 48, revenue: 2880 },
  { name: 'Loaded Fries',      category: 'Sides',    sold: 61, revenue: 1220 },
  { name: 'Spicy Wings',       category: 'Starters', sold: 39, revenue: 1755 },
  { name: 'Vanilla Milkshake', category: 'Drinks',   sold: 27, revenue: 810  },
  { name: 'BBQ Wrap',          category: 'Wraps',    sold: 22, revenue: 990  },
]

const STOCK_ITEMS = [
  { name: 'Beef Patties',      current: 18, max: 50  },
  { name: 'Burger Buns',       current: 42, max: 100 },
  { name: 'Chicken Wings',     current: 8,  max: 30  },
  { name: 'Potato',            current: 55, max: 80  },
  { name: 'Cheddar Cheese',    current: 6,  max: 20  },
  { name: 'Vanilla Ice Cream', current: 24, max: 40  },
]

const RECENT_ORDERS = [
  { id: '#FZ-0041', items: 'Cheese Burger × 2, Loaded Fries',    total: 220, status: 'Delivered'  },
  { id: '#FZ-0040', items: 'Spicy Wings × 1, Vanilla Milkshake', total: 115, status: 'Ready'      },
  { id: '#FZ-0039', items: 'BBQ Wrap × 2, Coke',                 total: 130, status: 'Preparing'  },
  { id: '#FZ-0038', items: 'Cheese Burger × 1, Fries',           total: 95,  status: 'Delivered'  },
  { id: '#FZ-0037', items: 'Grilled Chicken, Coleslaw',          total: 105, status: 'Delivered'  },
  { id: '#FZ-0036', items: 'Loaded Fries × 3',                   total: 60,  status: 'Preparing'  },
]

const MENU_ITEMS_INIT = [
  { id: 1,  name: 'Cheese Burger',          available: true  },
  { id: 2,  name: 'Loaded Fries',           available: true  },
  { id: 3,  name: 'Spicy Wings',            available: true  },
  { id: 4,  name: 'Vanilla Milkshake',      available: false },
  { id: 5,  name: 'BBQ Wrap',               available: true  },
  { id: 6,  name: 'Grilled Chicken',        available: true  },
  { id: 7,  name: 'Strawberry Milkshake',   available: true  },
  { id: 8,  name: 'Coleslaw',               available: false },
  { id: 9,  name: 'Dagwood Sandwich',       available: true  },
  { id: 10, name: 'Chocolate Brownie',      available: true  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stockPct(current: number, max: number) {
  return Math.round((current / max) * 100)
}
function isLowStock(current: number, max: number) {
  return stockPct(current, max) < 30
}

const statusColors: Record<string, { color: string; bg: string; border: string }> = {
  Delivered: { color: '#22c55e', bg: 'rgba(34,197,94,0.10)',   border: 'rgba(34,197,94,0.25)'  },
  Ready:     { color: '#FF6B00', bg: 'rgba(255,107,0,0.10)',   border: 'rgba(255,107,0,0.25)'  },
  Preparing: { color: '#1D4ED8', bg: 'rgba(29,78,216,0.12)',   border: 'rgba(29,78,216,0.30)'  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading font-black text-xs uppercase tracking-[0.25em] mb-6"
       style={{ color: 'rgba(255,255,255,0.25)' }}>
      {children}
    </p>
  )
}

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`p-6 ${className}`}
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', ...style }}
    >
      {children}
    </div>
  )
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative shrink-0 transition-all duration-200"
      style={{
        width: 42,
        height: 24,
        borderRadius: 12,
        background: on ? '#CC0000' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${on ? 'rgba(204,0,0,0.5)' : 'rgba(255,255,255,0.15)'}`,
      }}
      aria-label="Toggle availability"
    >
      <span
        className="absolute top-0.5 transition-all duration-200"
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          left: on ? 20 : 2,
          top: 2,
          display: 'block',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}
      />
    </button>
  )
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function AdminLogin({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function attempt() {
    if (pw === (process.env.NEXT_PUBLIC_ADMIN_PW ?? 'admin123')) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: '#0A0A0A' }}
    >
      <div
        className="w-full max-w-sm p-10"
        style={{
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.02)',
          animation: shake ? 'shake 0.4s ease' : 'none',
        }}
      >
        {/* Logo mark */}
        <div className="mb-8">
          <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#CC0000' }}>
            Foodie Zone
          </p>
          <h1 className="font-display text-white uppercase leading-none" style={{ fontSize: '2.5rem' }}>
            ADMIN
          </h1>
          <p className="font-body text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Owner access only
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-heading font-black text-xs uppercase tracking-widest block mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false) }}
              onKeyDown={(e) => e.key === 'Enter' && attempt()}
              placeholder="Enter admin password"
              className="w-full font-body text-sm text-white outline-none px-4 py-3 transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${error ? '#CC0000' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff',
              }}
              autoFocus
            />
            {error && (
              <p className="font-body text-xs mt-2" style={{ color: '#CC0000' }}>
                Incorrect password.
              </p>
            )}
          </div>

          <button
            onClick={attempt}
            className="w-full font-heading font-black text-sm uppercase tracking-widest py-3.5 transition-all hover:brightness-110 active:scale-95"
            style={{ background: '#CC0000', color: '#fff' }}
          >
            Unlock Dashboard →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </main>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLock }: { onLock: () => void }) {
  const [menuItems, setMenuItems] = useState(MENU_ITEMS_INIT)

  function toggleItem(id: number) {
    setMenuItems((prev) => prev.map((item) => item.id === id ? { ...item, available: !item.available } : item))
  }

  const today = new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-heading font-black text-xs uppercase tracking-[0.25em] px-3 py-1"
            style={{ background: '#CC0000', color: '#fff' }}
          >
            Admin
          </span>
          <Link href="/" className="font-display text-white uppercase leading-none" style={{ fontSize: 22, letterSpacing: 1 }}>
            FOODIE<span style={{ color: '#CC0000' }}>ZONE</span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-body text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {today}
          </span>
          <button
            onClick={onLock}
            className="font-heading font-black text-xs uppercase tracking-widest px-4 py-2 transition-all hover:brightness-110"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
          >
            Lock
          </button>
        </div>
      </header>

      <div className="max-w-container mx-auto px-5 py-10 space-y-10">

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Today's Revenue",  value: 'R 2,840', sub: '+12% vs yesterday', accent: '#CC0000'  },
            { label: 'Orders Today',     value: '34',       sub: '6 in the last hour', accent: '#FF6B00' },
            { label: 'Items Sold',       value: '127',      sub: 'across 8 categories', accent: '#1D4ED8' },
            { label: 'Low Stock Alerts', value: '3',        sub: 'items need restocking', accent: '#CC0000', urgent: true },
          ].map((kpi) => (
            <Card key={kpi.label} style={kpi.urgent ? { border: '1px solid rgba(204,0,0,0.3)', background: 'rgba(204,0,0,0.04)' } : {}}>
              <div className="font-display text-white uppercase leading-none mb-1" style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: kpi.accent }}>
                {kpi.value}
              </div>
              <div className="font-heading font-black text-xs uppercase tracking-widest mt-2 mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {kpi.label}
              </div>
              <div className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {kpi.sub}
              </div>
            </Card>
          ))}
        </div>

        {/* ── Sales Chart + Best Sellers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sales bar chart */}
          <Card>
            <SectionLabel>7-Day Sales</SectionLabel>
            <div className="flex items-end gap-2 h-40">
              {SALES_WEEK.map((d, i) => {
                const pct = (d.value / SALES_MAX) * 100
                const isToday = i === TODAY_IDX
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end" style={{ height: 112 }}>
                      <div
                        className="w-full transition-all duration-300"
                        style={{
                          height: `${pct}%`,
                          background: isToday
                            ? 'linear-gradient(180deg, #FF6B00, rgba(255,107,0,0.5))'
                            : 'linear-gradient(180deg, #CC0000, rgba(204,0,0,0.4))',
                          boxShadow: isToday ? '0 0 12px rgba(255,107,0,0.4)' : 'none',
                        }}
                      />
                    </div>
                    <span
                      className="font-heading font-black text-xs"
                      style={{ color: isToday ? '#FF6B00' : 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}
                    >
                      {d.day}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Week total: <span className="font-heading font-black text-white">R {SALES_WEEK.reduce((s, d) => s + d.value, 0).toLocaleString()}</span>
              </span>
              <span className="font-body text-xs" style={{ color: '#FF6B00' }}>
                ↑ Today highlighted
              </span>
            </div>
          </Card>

          {/* Best sellers */}
          <Card>
            <SectionLabel>Best Sellers</SectionLabel>
            <div className="space-y-0">
              {BEST_SELLERS.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < BEST_SELLERS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-display text-sm w-6 shrink-0"
                      style={{ color: i === 0 ? '#FF6B00' : 'rgba(255,255,255,0.2)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="font-heading font-black text-sm text-white">{item.name}</div>
                      <div className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading font-black text-sm" style={{ color: '#22c55e' }}>
                      R {item.revenue.toLocaleString()}
                    </div>
                    <div className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {item.sold} sold
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Stock Tracker ── */}
        <Card>
          <SectionLabel>Stock Tracker</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STOCK_ITEMS.map((item) => {
              const pct = stockPct(item.current, item.max)
              const low = isLowStock(item.current, item.max)
              return (
                <div
                  key={item.name}
                  className="p-4"
                  style={{
                    background: low ? 'rgba(204,0,0,0.04)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${low ? 'rgba(204,0,0,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-black text-sm text-white">{item.name}</span>
                    {low && (
                      <span
                        className="font-heading font-black text-xs uppercase px-2 py-0.5"
                        style={{ background: 'rgba(204,0,0,0.15)', color: '#CC0000', border: '1px solid rgba(204,0,0,0.3)' }}
                      >
                        Low
                      </span>
                    )}
                  </div>
                  {/* Bar */}
                  <div className="h-1.5 w-full mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: low
                          ? 'linear-gradient(90deg, #CC0000, #FF6B00)'
                          : 'linear-gradient(90deg, #1D4ED8, rgba(29,78,216,0.6))',
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {item.current} / {item.max} units
                    </span>
                    <span
                      className="font-heading font-black text-xs"
                      style={{ color: low ? '#CC0000' : 'rgba(255,255,255,0.4)' }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* ── Recent Orders + Menu Toggles ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent orders */}
          <Card>
            <SectionLabel>Recent Orders</SectionLabel>
            <div className="space-y-0">
              {RECENT_ORDERS.map((order, i) => {
                const s = statusColors[order.status]
                return (
                  <div
                    key={order.id}
                    className="flex items-start justify-between py-3.5"
                    style={{ borderBottom: i < RECENT_ORDERS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-black text-sm text-white">{order.id}</span>
                      </div>
                      <p className="font-body text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {order.items}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-heading font-black text-sm" style={{ color: '#22c55e' }}>
                        R {order.total}
                      </span>
                      <span
                        className="font-heading font-black text-xs uppercase tracking-wider px-2.5 py-1"
                        style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Menu availability toggles */}
          <Card>
            <SectionLabel>Menu Availability</SectionLabel>
            <div className="space-y-0">
              {menuItems.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < menuItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  <div>
                    <span
                      className="font-heading font-black text-sm"
                      style={{ color: item.available ? '#fff' : 'rgba(255,255,255,0.3)' }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="font-body text-xs ml-2"
                      style={{ color: item.available ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.2)' }}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <Toggle on={item.available} onToggle={() => toggleItem(item.id)} />
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center py-6 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Foodie Zone Admin · Built by{' '}
          <a href="https://skhokholabs.xyz" target="_blank" rel="noopener noreferrer"
             className="hover:text-white transition-colors" style={{ color: '#CC0000' }}>
            skhokholabs.xyz
          </a>
        </p>
      </div>
    </main>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  return unlocked
    ? <Dashboard onLock={() => setUnlocked(false)} />
    : <AdminLogin onUnlock={() => setUnlocked(true)} />
}
