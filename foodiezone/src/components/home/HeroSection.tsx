'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, popIn } from '@/lib/motion'

const STATS = [
  { value: '4.8', unit: '★', label: 'Rating' },
  { value: '25', unit: 'min', label: 'Avg delivery' },
  { value: '8', unit: '+', label: 'Categories' },
]

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false)

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
      style={{ background: '#FFF8EC' }}
    >
      {/* ── Color blocks behind everything ── */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full"
        style={{ background: '#FFD43B' }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-32 w-[380px] h-[380px] rounded-full"
        style={{ background: '#FF3D8C', mixBlendMode: 'multiply', opacity: 0.92 }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/3 w-[260px] h-[260px]"
        style={{ background: '#2A6BFF', opacity: 0.18, transform: 'rotate(18deg)' }}
      />
      {/* Diagonal mango strip */}
      <div
        aria-hidden
        className="absolute -bottom-10 -right-10 hidden md:block"
        style={{
          width: 520,
          height: 120,
          background: '#FF7A1A',
          transform: 'rotate(-8deg)',
          transformOrigin: 'bottom right',
        }}
      />

      {/* ── Layout: two-column (copy / photo card) ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full"
      >
        {/* ── Left: copy ── */}
        <div className="lg:col-span-7">
          <motion.div variants={fadeUp}>
            <span className="kasi-pill mb-6">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: '#131312', animation: 'pulseDot 1.4s ease-in-out infinite' }}
              />
              Soweto-Bred · Pimville Pickup
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display leading-[0.92] mb-6"
            style={{ color: '#131312', fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '0.005em' }}
          >
            REAL <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background: '#FFD43B',
                  transform: 'rotate(-2deg) translate(2px, 4px)',
                  borderRadius: 6,
                }}
              />
              <span className="relative px-2">FOOD.</span>
            </span><br />
            REAL <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background: '#FF3D8C',
                  transform: 'rotate(1.5deg) translate(-2px, 4px)',
                  borderRadius: 6,
                }}
              />
              <span className="relative px-2" style={{ color: '#FFF8EC' }}>FAST.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body mb-9 max-w-md"
            style={{ color: '#2A2A2A', fontSize: 18, fontWeight: 500, lineHeight: 1.55 }}
          >
            Burgers · Wings · Dagwoods · Grilled Chicken.<br />
            Made fresh in <span style={{ color: '#FF7A1A', fontWeight: 700 }}>Pimville, Soweto</span>{' '}
            and brought hot to your door in 25–35 min.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4 mb-12">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/menu" className="btn-mango">
                Order Now →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/gallery" className="btn-outline">
                See The Food
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            className="flex items-center gap-8 sm:gap-12"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={popIn} className="text-left">
                <div
                  className="font-display"
                  style={{ color: '#131312', fontSize: 36, letterSpacing: '0.01em', lineHeight: 1 }}
                >
                  {s.value}
                  <span style={{ color: '#FF7A1A', fontSize: 24 }}>{s.unit}</span>
                </div>
                <div
                  className="font-heading font-bold text-[10px] uppercase mt-1"
                  style={{ color: '#2A2A2A', letterSpacing: '0.18em' }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: photo card (video clipped into yellow rounded rect) ── */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-5 relative"
        >
          <div
            className="relative w-full max-w-[460px] mx-auto aspect-[4/5] overflow-hidden"
            style={{
              background: '#FFD43B',
              borderRadius: 28,
              border: '3px solid #131312',
              boxShadow: '12px 12px 0 0 #131312',
              transform: 'rotate(-1.5deg)',
            }}
          >
            {/* Loading placeholder */}
            {!videoReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display"
                  style={{ color: '#131312', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '0.04em' }}
                >
                  FOODIE ZONE
                </span>
              </div>
            )}

            <video
              autoPlay
              muted
              loop
              playsInline
              onCanPlay={() => setVideoReady(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.6s ease' }}
            >
              <source src="/videos/wings.mp4" type="video/mp4" />
              <source src="/videos/smash-burgers.mp4" type="video/mp4" />
            </video>

            {/* Pricing tag overlay */}
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 px-4 py-3"
              style={{
                background: '#FFF8EC',
                border: '2px solid #131312',
                borderRadius: 999,
              }}
            >
              <span
                className="font-heading font-extrabold uppercase text-[11px]"
                style={{ color: '#131312', letterSpacing: '0.16em' }}
              >
                Free delivery R100+
              </span>
              <span
                className="font-display"
                style={{ color: '#FF3D8C', fontSize: 18 }}
              >
                25–35 MIN
              </span>
            </div>
          </div>

          {/* Floating mango sticker */}
          <div
            className="hidden md:flex absolute -top-6 -left-6 w-24 h-24 items-center justify-center"
            style={{
              background: '#FF7A1A',
              borderRadius: '50%',
              border: '3px solid #131312',
              transform: 'rotate(-12deg)',
            }}
          >
            <span className="font-display text-center leading-tight" style={{ color: '#131312', fontSize: 13, letterSpacing: '0.08em' }}>
              HOT &<br />FRESH
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 0.7 }}
      >
        <span
          className="font-heading font-bold text-[10px] uppercase"
          style={{ color: '#131312', letterSpacing: '0.2em' }}
        >
          Scroll
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#131312" strokeWidth="2.5" strokeLinecap="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  )
}
