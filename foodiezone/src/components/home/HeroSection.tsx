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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Video loading placeholder */}
      {!videoReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-display text-white select-none"
            style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', letterSpacing: '0.04em' }}
          >
            FOODIE ZONE
          </motion.div>
        </div>
      )}

      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.3)', opacity: videoReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        <source src="/videos/wings.mp4" type="video/mp4" />
        <source src="/videos/smash-burgers.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, transparent 40%, rgba(10,10,10,0.85) 100%)' }}
      />

      {/* Content — orchestrated stagger */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Live badge */}
        <motion.div variants={fadeUp}>
          <div
            className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5"
            style={{ background: 'rgba(204,0,0,0.12)', border: '1px solid rgba(204,0,0,0.35)' }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#CC0000', boxShadow: '0 0 6px #CC0000', animation: 'pulseDot 1.4s ease-in-out infinite' }}
            />
            <span
              className="font-heading font-semibold text-xs uppercase"
              style={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '0.18em' }}
            >
              Free delivery · R100+ · 25–35 min
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-white leading-none mb-6"
          style={{ fontSize: 'clamp(4.5rem, 13vw, 9rem)', letterSpacing: '0.01em' }}
        >
          REAL FOOD.<br />
          <span style={{ color: '#CC0000' }}>REAL FAST.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          className="font-body text-lg mb-10 max-w-md mx-auto"
          style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, lineHeight: 1.7 }}
        >
          Burgers · Wings · Dagwoods · Chicken<br />
          <span style={{ color: '#FF6B00', fontWeight: 500 }}>Pimville, Soweto</span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/menu"
              className="font-heading font-bold text-sm uppercase tracking-widest px-10 py-4 block text-center"
              style={{ background: '#CC0000', color: '#fff', letterSpacing: '0.15em', minWidth: 200 }}
            >
              Order Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/gallery"
              className="font-heading font-semibold text-sm uppercase tracking-widest px-10 py-4 block text-center transition-all hover:bg-white hover:text-black"
              style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', minWidth: 200 }}
            >
              See The Food
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row — inner stagger */}
        <motion.div
          variants={staggerContainer}
          className="flex items-center justify-center gap-12 mt-16"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={popIn} className="text-center">
              <div className="font-display text-white" style={{ fontSize: 32, letterSpacing: '0.02em' }}>
                {s.value}<span style={{ color: '#CC0000', fontSize: 22 }}>{s.unit}</span>
              </div>
              <div
                className="font-heading font-semibold text-xs uppercase mt-1"
                style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="font-heading text-xs text-white uppercase" style={{ letterSpacing: '0.2em' }}>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  )
}
