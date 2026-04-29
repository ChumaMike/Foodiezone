'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, popIn } from '@/lib/motion'

const VIEWPORT = { once: true, margin: '-80px' }

const STATS = [
  { value: '8+', label: 'Menu Categories' },
  { value: '4.8★', label: 'Customer Rating' },
  { value: '25min', label: 'Avg Delivery' },
]

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/catalogue/smash-burgers/smash-1.png"
            alt="Smash Burger"
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
          <motion.p variants={fadeUp} className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#CC0000' }}>
            Our story
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-heading font-black text-white uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            BORN IN<br /><span style={{ color: '#CC0000' }}>SOWETO</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            From the streets of Orlando East to your door. Foodie Zone is more than just a takeaway.
            It&apos;s real food, made with heart, delivered with speed.
          </motion.p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-20 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/5' }}
          >
            <Image
              src="/images/catalogue/burgers/burger-2.png"
              alt="Our burgers"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#CC0000' }}>
              Who we are
            </p>
            <h2 className="font-heading font-black text-white uppercase text-4xl leading-none tracking-tight mb-6">
              NO SHORTCUTS.<br />JUST REAL FOOD.
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <p>
                Foodie Zone started with a simple belief: people in Soweto deserve restaurant-quality food
                without the restaurant prices. We hand-press every patty, marinate every wing, and build
                every dagwood fresh, no frozen shortcuts.
              </p>
              <p>
                Based in Orlando East, we serve the community we grew up in. Every order is a promise:
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
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="font-heading font-black text-white text-2xl">{s.value}</div>
                  <div className="font-body text-xs mt-1 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="py-20 px-5 text-center"
        style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h2 className="font-heading font-black text-white uppercase text-4xl md:text-5xl leading-none tracking-tight mb-6">
          HUNGRY?<br /><span style={{ color: '#CC0000' }}>ORDER NOW.</span>
        </h2>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
          <Link
            href="/menu"
            className="inline-block font-heading font-black uppercase tracking-widest px-10 py-4 text-base"
            style={{ background: '#CC0000', color: '#fff' }}
          >
            SEE THE MENU →
          </Link>
        </motion.div>
      </motion.section>

      {/* Built by */}
      <div className="text-center py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
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
    </>
  )
}
