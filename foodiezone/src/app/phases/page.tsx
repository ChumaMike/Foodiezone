import Navbar from '@/components/home/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Build Phases — Foodie Zone (Internal)',
  description: 'Development roadmap and phase tracker for Foodie Zone.',
}

const phases = [
  {
    number: '01',
    title: 'Landing Page',
    status: 'done',
    price: 'R 1 800',
    description: 'The full homepage — your first impression, better than any chain.',
    benefits: [
      'Instant brand credibility over KFC & Steers',
      'Video hero drives more first-time orders',
      'Mobile-first design works on every device',
    ],
    features: [
      'Sticky Navbar (mobile responsive)',
      'HeroSection with video background',
      'CategoryShowcase grid',
      'FeaturedItems product cards',
      'PromoStrip announcement banner',
      'Footer with links & socials',
    ],
    route: '/',
    routeLabel: 'View Page',
  },
  {
    number: '02',
    title: 'Menu & Ordering',
    status: 'done',
    price: 'R 2 400',
    description: 'Full online menu with cart, filters, and checkout — order-ready.',
    benefits: [
      'Customers order directly — no WhatsApp chaos',
      'Upsell with variants (sizes, extras)',
      'Reduces missed or wrong orders',
    ],
    features: [
      'Grid / list view toggle',
      'Category filters with hero banners',
      'Product cards with real food photos',
      'Add to cart with variant modal',
      'Sticky cart bar (live total)',
      'Checkout screen with order summary',
    ],
    route: '/menu',
    routeLabel: 'View Menu',
  },
  {
    number: '03',
    title: 'Animations',
    status: 'pending',
    price: 'R 900',
    description: 'Framer Motion polish — the difference between good and premium.',
    benefits: [
      'Feels like a world-class app, not a website',
      'Scroll reveals keep users engaged longer',
      'Cart animations reduce drop-off at checkout',
    ],
    features: [
      'Install Framer Motion',
      'Stagger reveal on section entry',
      'Parallax hero scrolling',
      'Cart spring bounce animation',
      'Page transition fades',
    ],
    route: null,
    routeLabel: null,
  },
  {
    number: '04',
    title: 'Gallery & About',
    status: 'partial',
    price: 'R 1 200',
    description: 'Visual storytelling pages that build trust and show off your food.',
    benefits: [
      'Real food photography builds appetite & trust',
      'About page builds community connection',
      'Gallery shareable on social media',
    ],
    features: [
      'Gallery page with masonry grid',
      'Full-screen lightbox image viewer',
      'About page — "Born in Soweto" hero',
      'Story section with stats bar',
      '4.8★ rating, 25min delivery, 8+ categories',
    ],
    route: '/gallery',
    routeLabel: 'View Gallery',
    route2: '/about',
    routeLabel2: 'View About',
  },
  {
    number: '05',
    title: 'PWA & Performance',
    status: 'pending',
    price: 'R 1 500',
    description: 'Installs like a native app, loads like lightning.',
    benefits: [
      'Customers add it to home screen — no App Store needed',
      'Works offline (view menu without internet)',
      'Faster load = more orders, less bounce',
    ],
    features: [
      'Web App Manifest (installable)',
      'Service Worker offline caching',
      'next/image optimisation audit',
      'Lighthouse 90+ performance score',
      'iOS & Android install prompt',
    ],
    route: null,
    routeLabel: null,
  },
  {
    number: '06',
    title: 'Admin Dashboard',
    status: 'partial',
    price: 'R 1 000',
    description: 'Full owner control — see your sales, manage stock, and track every order in one place.',
    benefits: [
      'Know exactly what\'s selling and what\'s sitting',
      'Stop running out of stock mid-service',
      'Real-time sales data means smarter daily decisions',
    ],
    features: [
      'Sales overview (daily / weekly / monthly revenue)',
      'Best-selling items chart',
      'Order history & status management',
      'Stock/inventory tracker with low-stock alerts',
      'Menu item toggle (mark items as unavailable)',
      'Password-protected admin route',
    ],
    route: '/admin',
    routeLabel: 'View Admin',
  },
]

const statusConfig = {
  done: { label: 'COMPLETE', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  partial: { label: 'IN PROGRESS', color: '#FF6B00', bg: 'rgba(255,107,0,0.1)', border: 'rgba(255,107,0,0.25)' },
  pending: { label: 'PENDING', color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)' },
}

const totalPrice = phases.reduce((sum, p) => {
  const val = parseInt(p.price.replace(/\D/g, ''), 10)
  return sum + val
}, 0)

const paidPrice = phases
  .filter((p) => p.status === 'done')
  .reduce((sum, p) => {
    const val = parseInt(p.price.replace(/\D/g, ''), 10)
    return sum + val
  }, 0)

export default function PhasesPage() {
  const done = phases.filter((p) => p.status === 'done').length
  const partial = phases.filter((p) => p.status === 'partial').length

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#CC0000' }}>
            Internal · Build Tracker
          </p>
          <h1
            className="font-heading font-black text-white uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            FOODIEZONE<br />
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>PHASES</span>
          </h1>
          <p className="font-body text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Every phase, its features, what it costs, and why it matters for your business.
          </p>

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { label: 'Total Phases', value: String(phases.length) },
              { label: 'Completed', value: String(done), accent: '#22c55e' },
              { label: 'Phases Done Value', value: `R ${paidPrice.toLocaleString()}`, accent: '#FF6B00' },
              { label: 'Full Project', value: `R ${totalPrice.toLocaleString()}`, accent: '#CC0000' },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="font-heading font-black text-2xl"
                  style={{ color: s.accent ?? '#fff' }}
                >
                  {s.value}
                </div>
                <div className="font-body text-xs mt-1 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-8 max-w-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-heading font-black text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Overall Progress
              </span>
              <span className="font-heading font-black text-sm" style={{ color: '#CC0000' }}>
                {done + partial}/{phases.length} phases
              </span>
            </div>
            <div className="h-1.5 w-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full"
                style={{
                  width: `${((done + partial * 0.5) / phases.length) * 100}%`,
                  background: 'linear-gradient(90deg, #CC0000, #FF6B00)',
                }}
              />
            </div>
            <div className="flex gap-5 mt-3">
              {[
                { dot: '#22c55e', label: `${done} Complete` },
                { dot: '#FF6B00', label: `${partial} In Progress` },
                { dot: 'rgba(255,255,255,0.2)', label: `${phases.length - done - partial} Pending` },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.dot }} />
                  <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phase cards */}
      <section className="pb-24 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto pt-12 space-y-6">
          {phases.map((phase) => {
            const s = statusConfig[phase.status as keyof typeof statusConfig]
            return (
              <div
                key={phase.number}
                className="relative overflow-hidden"
                style={{
                  background: phase.status === 'done' ? 'rgba(255,255,255,0.02)' : '#111111',
                  border: `1px solid ${phase.status === 'done' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {/* Phase number watermark */}
                <div
                  className="absolute right-6 top-1/2 -translate-y-1/2 font-heading font-black pointer-events-none select-none hidden md:block"
                  style={{ fontSize: '8rem', color: 'rgba(255,255,255,0.02)', lineHeight: 1 }}
                >
                  {phase.number}
                </div>

                <div className="relative z-10 p-7 md:p-10">

                  {/* Top row: phase label + title + price + status */}
                  <div className="flex flex-wrap items-start gap-4 mb-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="font-heading font-black text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>
                        PHASE {phase.number}
                      </span>
                      <h2 className="font-heading font-black text-white uppercase text-xl md:text-2xl tracking-tight">
                        {phase.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Price */}
                      <div
                        className="font-heading font-black text-lg"
                        style={{ color: phase.status === 'done' ? '#22c55e' : '#FF6B00' }}
                      >
                        {phase.price}
                      </div>
                      {/* Status badge */}
                      <span
                        className="font-heading font-black text-xs uppercase tracking-widest px-3 py-1.5"
                        style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-sm mb-7" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {phase.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        Features Included
                      </h3>
                      <ul className="space-y-2">
                        {phase.features.map((item) => (
                          <li key={item} className="flex items-center gap-2.5">
                            <div
                              className="w-4 h-4 shrink-0 flex items-center justify-center"
                              style={{
                                background: phase.status === 'done' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${phase.status === 'done' ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
                              }}
                            >
                              {phase.status === 'done' && (
                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2.5 2.5L8 2.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                              {(phase.status === 'partial' || phase.status === 'pending') && (
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: phase.status === 'partial' ? '#FF6B00' : 'rgba(255,255,255,0.2)' }} />
                              )}
                            </div>
                            <span className="font-body text-sm" style={{ color: phase.status === 'done' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)' }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        Business Benefits
                      </h3>
                      <ul className="space-y-3">
                        {phase.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5">
                            <div
                              className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center"
                              style={{ background: 'rgba(204,0,0,0.12)', border: '1px solid rgba(204,0,0,0.3)' }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#CC0000' }} />
                            </div>
                            <span className="font-body text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.45)' }}>
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Links */}
                  {(phase.route || phase.route2) && (
                    <div className="flex gap-3 mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      {phase.route && (
                        <Link
                          href={phase.route}
                          className="font-heading font-black text-xs uppercase tracking-widest px-4 py-2.5 transition-all hover:brightness-110"
                          style={{ background: '#CC0000', color: '#fff' }}
                        >
                          {phase.routeLabel} →
                        </Link>
                      )}
                      {phase.route2 && (
                        <Link
                          href={phase.route2}
                          className="font-heading font-black text-xs uppercase tracking-widest px-4 py-2.5 transition-colors hover:text-white"
                          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                        >
                          {phase.routeLabel2} →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Total cost summary */}
        <div
          className="max-w-5xl mx-auto mt-10 p-8 md:p-10"
          style={{ border: '1px solid rgba(204,0,0,0.25)', background: 'rgba(204,0,0,0.05)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-heading font-black text-xs uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Full Project Investment
              </p>
              <div className="font-heading font-black text-white uppercase leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                R {totalPrice.toLocaleString()}
              </div>
              <p className="font-body text-sm mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                All 5 phases · Full web app · No hidden costs
              </p>
            </div>
            <div className="space-y-2 text-right">
              <div className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Delivered value so far: <span className="font-heading font-black" style={{ color: '#22c55e' }}>R {paidPrice.toLocaleString()}</span>
              </div>
              <div className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Remaining phases: <span className="font-heading font-black" style={{ color: '#FF6B00' }}>
                  R {(totalPrice - paidPrice).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-center py-8 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="font-body text-xs mb-1" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Temporary internal page — not linked in production nav
        </p>
        <a
          href="https://skhokholabs.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading font-black text-xs uppercase tracking-widest transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Built by <span style={{ color: '#CC0000' }}>skhokholabs.xyz</span>
        </a>
      </div>
    </main>
  )
}
