'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'

const PERKS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    title: '25–35 Min Delivery',
    desc: 'Hot food, fast. From our kitchen to your door.',
    color: '#FF7A1A',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Made Fresh Daily',
    desc: 'No frozen shortcuts. Every order made to order.',
    color: '#FF3D8C',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Live Order Tracking',
    desc: 'Watch your order travel from kitchen to door in real time.',
    color: '#11A66A',
  },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function PromoStrip() {
  return (
    <>
      {/* ── Township flyer band — magenta with chunky kerned Anton ── */}
      <div
        className="py-6 px-5 text-center relative overflow-hidden"
        style={{ background: '#FF3D8C', borderTop: '3px solid #131312', borderBottom: '3px solid #131312' }}
      >
        {/* Decorative yellow stars */}
        <span aria-hidden className="absolute left-6 top-1/2 -translate-y-1/2 hidden sm:block" style={{ color: '#FFD43B', fontSize: 32 }}>✦</span>
        <span aria-hidden className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:block" style={{ color: '#FFD43B', fontSize: 32 }}>✦</span>

        <p
          className="font-display uppercase"
          style={{
            color: '#131312',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
          }}
        >
          FREE DELIVERY · ORDERS OVER R100 · ORLANDO EAST, SOWETO
        </p>
      </div>

      {/* ── Why Foodie Zone (perks) ── */}
      <section className="py-20 px-6" style={{ background: '#FFF8EC' }}>
        <div className="max-w-container mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="text-center mb-14"
          >
            <span className="kasi-pill" style={{ background: '#11A66A', color: '#FFF8EC' }}>
              Why us
            </span>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PERKS.map((perk) => (
              <motion.div
                key={perk.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="p-7 flex flex-col items-start gap-4"
                style={{
                  background: '#FFF8EC',
                  border: '2.5px solid #131312',
                  borderRadius: 18,
                  boxShadow: '6px 6px 0 0 #131312',
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    background: perk.color,
                    border: '2.5px solid #131312',
                    color: '#131312',
                    borderRadius: 999,
                  }}
                >
                  {perk.icon}
                </div>
                <div>
                  <h3
                    className="font-display uppercase mb-2 leading-none"
                    style={{ color: '#131312', fontSize: 22 }}
                  >
                    {perk.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#2A2A2A' }}>
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Video section — taxi-yellow band wrapping the video card ── */}
      <section className="py-12 px-6" style={{ background: '#FFD43B', borderTop: '3px solid #131312', borderBottom: '3px solid #131312' }}>
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <span className="kasi-pill" style={{ background: '#FFF8EC' }}>
              Fresh every day
            </span>
            <h2
              className="font-display mt-4 leading-none mb-6"
              style={{ color: '#131312', fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
            >
              HAND-PRESSED.<br />
              <span style={{ color: '#FF3D8C' }}>FLAME HOT.</span>
            </h2>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link href="/menu" className="btn-mango">
                Order Now →
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative w-full aspect-video overflow-hidden"
            style={{
              border: '3px solid #131312',
              borderRadius: 18,
              boxShadow: '8px 8px 0 0 #131312',
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/smash-burgers.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>
    </>
  )
}
