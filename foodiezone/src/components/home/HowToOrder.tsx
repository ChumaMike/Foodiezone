'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'

const STEPS = [
  {
    number: '01',
    title: 'Pick Your Food',
    desc: 'Browse our menu — burgers, wings, dagwoods, wraps and more. Everything made fresh.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Place Your Order',
    desc: 'Add items to your cart, choose your extras, and checkout in seconds. No account needed.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Track & Receive',
    desc: 'Watch your order live — from our kitchen in Pimville to your door in 25–35 minutes.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function HowToOrder() {
  return (
    <section className="py-24 px-5" style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mb-16"
        >
          <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#FF6B00' }}>
            Simple as that
          </p>
          <h2 className="font-heading font-black text-white uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            HOW TO<br /><span style={{ color: '#CC0000' }}>ORDER</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) — animates scaleX in */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-px origin-left"
            style={{ background: 'linear-gradient(to right, transparent, rgba(204,0,0,0.3), rgba(204,0,0,0.3), transparent)' }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-3 gap-0"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="flex flex-col items-center text-center px-8 py-10 relative"
                style={i < STEPS.length - 1 ? { borderRight: '1px solid rgba(255,255,255,0.05)' } : {}}
              >
                {/* Step number */}
                <div
                  className="font-display text-8xl leading-none mb-6 select-none"
                  style={{ color: 'rgba(204,0,0,0.08)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {step.number}
                </div>

                {/* Icon circle */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="w-16 h-16 flex items-center justify-center mb-6 -mt-20"
                  style={{
                    background: 'rgba(204,0,0,0.1)',
                    border: '1px solid rgba(204,0,0,0.25)',
                    color: '#CC0000',
                  }}
                >
                  {step.icon}
                </motion.div>

                <h3 className="font-heading font-black text-white uppercase text-xl tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 260 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mt-14"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/menu"
              className="inline-block font-heading font-black uppercase tracking-widest px-12 py-4 text-sm"
              style={{ background: '#CC0000', color: '#fff', letterSpacing: '0.15em' }}
            >
              Start Your Order →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
