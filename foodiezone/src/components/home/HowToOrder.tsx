'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'

const STEPS = [
  {
    number: '01',
    title: 'Pick Your Food',
    desc: 'Browse our menu: burgers, wings, dagwoods, wraps and more. Everything made fresh.',
    color: '#FFD43B',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    color: '#FF3D8C',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Track & Receive',
    desc: 'Watch your order live, from our kitchen in Pimville to your door in 25–35 minutes.',
    color: '#11A66A',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function HowToOrder() {
  return (
    <section className="py-24 px-6" style={{ background: '#FFF8EC' }}>
      <div className="max-w-container mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mb-16"
        >
          <span className="kasi-pill" style={{ background: '#2A6BFF', color: '#FFF8EC', borderColor: '#131312' }}>
            Simple as that
          </span>
          <h2
            className="font-display mt-4 leading-none"
            style={{ color: '#131312', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            HOW TO <span style={{ color: '#FF7A1A' }}>ORDER</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative flex flex-col items-start text-left p-8"
              style={{
                background: '#FFF8EC',
                border: '2.5px solid #131312',
                borderRadius: 18,
                boxShadow: '6px 6px 0 0 #131312',
              }}
            >
              {/* Step number */}
              <div
                className="font-display absolute top-3 right-5 leading-none select-none"
                style={{ color: step.color, fontSize: 72, fontVariantNumeric: 'tabular-nums', opacity: 0.85 }}
              >
                {step.number}
              </div>

              {/* Icon block */}
              <div
                className="w-14 h-14 flex items-center justify-center mb-6"
                style={{
                  background: step.color,
                  border: '2.5px solid #131312',
                  color: '#131312',
                  borderRadius: 14,
                }}
              >
                {step.icon}
              </div>

              <h3
                className="font-display uppercase mb-3 leading-none"
                style={{ color: '#131312', fontSize: 26 }}
              >
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#2A2A2A' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center mt-14"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link href="/menu" className="btn-mango">
              Start Your Order →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
