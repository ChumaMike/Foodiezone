'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'

const PERKS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    title: '25–35 Min Delivery',
    desc: 'Hot food, fast. From our kitchen to your door.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Made Fresh Daily',
    desc: 'No frozen shortcuts. Every order made to order.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Live Order Tracking',
    desc: 'Watch your order travel from kitchen to door in real time.',
  },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function PromoStrip() {
  return (
    <>
      {/* Delivery banner */}
      <div className="py-5 px-5 text-center" style={{ background: '#CC0000' }}>
        <p className="font-heading font-black text-white uppercase tracking-widest text-sm md:text-base">
          FREE DELIVERY ON ALL ORDERS OVER R100 &nbsp;·&nbsp; ORLANDO EAST, SOWETO
        </p>
      </div>

      {/* Why Foodie Zone */}
      <section className="py-20 px-5" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="text-center mb-14"
          >
            <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#CC0000' }}>Why us</p>
            <h2 className="font-heading font-black text-white uppercase text-4xl md:text-5xl leading-none tracking-tight">
              WHY FOODIE ZONE
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {PERKS.map((perk) => (
              <motion.div
                key={perk.title}
                variants={fadeUp}
                className="p-8 flex flex-col items-start gap-4"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  style={{ color: '#CC0000' }}
                >
                  {perk.icon}
                </motion.div>
                <div>
                  <h3 className="font-heading font-black text-white uppercase text-lg tracking-tight mb-2">{perk.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video section */}
      <section className="relative overflow-hidden" style={{ height: '60vh', background: '#0A0A0A' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        >
          <source src="/videos/smash-burgers.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.2) 60%)' }} />
        <div className="relative z-10 h-full flex items-center px-5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#FF6B00' }}>
                Fresh every day
              </p>
              <h2 className="font-heading font-black text-white uppercase leading-none tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
                HAND-PRESSED.<br />
                <span style={{ color: '#CC0000' }}>FLAME HOT.</span>
              </h2>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  href="/menu"
                  className="inline-block font-heading font-black uppercase tracking-widest px-8 py-3 text-sm"
                  style={{ background: '#CC0000', color: '#fff' }}
                >
                  ORDER NOW →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
