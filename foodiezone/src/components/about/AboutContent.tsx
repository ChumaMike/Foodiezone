'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, popIn } from '@/lib/motion'
import PromoStrip from '@/components/home/PromoStrip'
import Testimonials from '@/components/home/Testimonials'

const VIEWPORT = { once: true, margin: '-80px' }

const STATS = [
  { value: '8+', label: 'Menu Categories' },
  { value: '4.8★', label: 'Customer Rating' },
  { value: '25min', label: 'Avg Delivery' },
]

const PERKS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    title: '25–35 Min Delivery',
    desc: 'Hot food, fast. From our kitchen in Pimville to your door — tracked live.',
    color: '#FF7A1A',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Made Fresh Daily',
    desc: 'No frozen shortcuts. Every patty pressed, every wing dunked, every order made fresh.',
    color: '#FF3D8C',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Live Order Tracking',
    desc: 'Watch your order travel from kitchen to door in real time. No guessing.',
    color: '#11A66A',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Free Delivery R100+',
    desc: 'Spend over R100 and we bring it to your door at no extra charge.',
    color: '#FFD43B',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Community First',
    desc: 'Born and raised in Soweto. We serve the people we grew up with — always.',
    color: '#2A6BFF',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Real Quality Control',
    desc: 'Every order checked before it leaves the kitchen. We don\'t send out anything we wouldn\'t eat ourselves.',
    color: '#131312',
  },
]

export default function AboutContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/outside/outside-1.webp"
            alt="Foodie Zone"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.15)' }}
          />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#FF7A1A' }}>
            Our story
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-heading font-black text-[#131312] uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            BORN IN<br /><span style={{ color: '#FF7A1A' }}>SOWETO</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(19,19,18,0.5)' }}
          >
            From the streets of Orlando East to your door. Foodie Zone is more than just a takeaway.
            It&apos;s real food, made with heart, delivered with speed.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 px-5" style={{ borderTop: '1px solid rgba(19,19,18,0.06)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-2 gap-2"
          >
            <div className="relative overflow-hidden" style={{ height: 500 }}>
              <Image src="/images/outside/outside-1.webp" alt="Foodie Zone outside" fill className="object-cover" />
            </div>
            <div className="relative overflow-hidden" style={{ height: 500 }}>
              <Image src="/images/outside/outside-3.png" alt="Foodie Zone outside" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#FF7A1A' }}>
              Who we are
            </p>
            <h2 className="font-heading font-black text-[#131312] uppercase text-4xl leading-none tracking-tight mb-6">
              NO SHORTCUTS.<br />JUST REAL FOOD.
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(19,19,18,0.5)' }}>
              <p>
                Foodie Zone started with a simple belief: people in Soweto deserve restaurant-quality food
                without the restaurant prices. We hand-press every patty, marinate every wing, and build
                every dagwood fresh — no frozen shortcuts.
              </p>
              <p>
                Based in Pimville, we serve the community we grew up in. Every order is a promise:
                hot food, fast delivery, and flavour that hits different.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="grid grid-cols-3 gap-4 mt-10"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={popIn}
                  className="text-center p-4"
                  style={{ border: '1px solid rgba(19,19,18,0.08)' }}
                >
                  <div className="font-heading font-black text-[#131312] text-2xl">{s.value}</div>
                  <div className="font-body text-xs mt-1 uppercase tracking-widest" style={{ color: 'rgba(19,19,18,0.3)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-24 px-6" style={{ background: '#FFF8EC', borderTop: '3px solid #131312' }}>
        <div className="max-w-container mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mb-14"
          >
            <span className="kasi-pill" style={{ background: '#11A66A', color: '#FFF8EC' }}>Why us</span>
            <h2
              className="font-display mt-4 leading-none"
              style={{ color: '#131312', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              WHY <span style={{ color: '#FF3D8C' }}>FOODIE ZONE</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PERKS.map((perk) => {
              const isDark = perk.color === '#131312'
              return (
                <motion.div
                  key={perk.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="p-7 flex flex-col items-start gap-4"
                  style={{
                    background: isDark ? '#131312' : '#FFF8EC',
                    border: '2.5px solid #131312',
                    borderRadius: 18,
                    boxShadow: '6px 6px 0 0 #131312',
                  }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ background: perk.color, border: '2.5px solid #131312', color: isDark ? '#FFF8EC' : '#131312', borderRadius: 999 }}
                  >
                    {perk.icon}
                  </div>
                  <div>
                    <h3 className="font-display uppercase mb-2 leading-none" style={{ color: isDark ? '#FFF8EC' : '#131312', fontSize: 22 }}>
                      {perk.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: isDark ? 'rgba(255,248,236,0.6)' : '#2A2A2A' }}>
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Hand-Pressed video ── */}
      <PromoStrip />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="py-20 px-5 text-center"
        style={{ background: '#F5E9CC', borderTop: '3px solid #131312' }}
      >
        <h2 className="font-heading font-black text-[#131312] uppercase text-4xl md:text-5xl leading-none tracking-tight mb-6">
          HUNGRY?<br /><span style={{ color: '#FF7A1A' }}>ORDER NOW.</span>
        </h2>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
          <Link
            href="/menu"
            className="inline-block font-heading font-black uppercase tracking-widest px-10 py-4 text-base"
            style={{ background: '#FF7A1A', color: '#131312', border: '2.5px solid #131312', boxShadow: '4px 4px 0 #131312' }}
          >
            SEE THE MENU →
          </Link>
        </motion.div>
      </motion.section>

      {/* Built by */}
      <div className="text-center py-6" style={{ borderTop: '1px solid rgba(19,19,18,0.04)' }}>
        <a
          href="https://skhokholabs.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading font-black text-xs uppercase tracking-widest transition-colors hover:text-[#131312]"
          style={{ color: 'rgba(19,19,18,0.2)' }}
        >
          Built by <span style={{ color: '#FF7A1A' }}>skhokholabs.xyz</span>
        </a>
      </div>
    </>
  )
}
