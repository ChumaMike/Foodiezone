'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerFast, fadeUp } from '@/lib/motion'

// Cycle of bright kasi block colors per tile
const BLOCK_COLORS = ['#FF7A1A', '#FFD43B', '#FF3D8C', '#11A66A', '#2A6BFF', '#2A2A2A']

const CATEGORIES = [
  { label: 'Burgers',       image: '/images/catalogue/burgers/burger-1.png',          count: 6 },
  { label: 'Smash',         image: '/images/catalogue/smash-burgers/smash-1.png',     count: 4 },
  { label: 'Wingzz',        image: '/images/catalogue/wings/wings-1.png',             count: 8 },
  { label: 'Dagwoods',      image: '/images/catalogue/dagwoods/dagwood-1.png',        count: 7 },
  { label: 'Loaded Chips',  image: '/images/catalogue/loaded-chips/loaded-1.png',     count: 8 },
  { label: 'Grilled Chick', image: '/images/catalogue/grilled-chicken/chicken-1.png', count: 6 },
  { label: 'Prego Rolls',   image: '/images/catalogue/prego-roll/prego-1.png',        count: 4 },
  { label: 'Wraps',         image: '/images/catalogue/wraps/wrap-1.png',              count: 5 },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function CategoryShowcase() {
  return (
    <section className="py-24 px-6 relative" style={{ background: '#FFF8EC' }}>
      {/* Decorative grid block */}
      <div
        aria-hidden
        className="absolute top-12 right-8 hidden lg:block"
        style={{
          width: 110, height: 110,
          background:
            'repeating-linear-gradient(45deg, #131312 0 2px, transparent 2px 14px)',
          opacity: 0.18,
        }}
      />

      <div className="max-w-container mx-auto relative">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-12"
        >
          <span className="kasi-pill" style={{ background: '#FFD43B' }}>
            What we serve
          </span>
          <h2
            className="font-display mt-4 leading-none"
            style={{ color: '#131312', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            THE <span style={{ color: '#FF7A1A' }}>MENU</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {CATEGORIES.map((cat, i) => {
            const blockColor = BLOCK_COLORS[i % BLOCK_COLORS.length]
            const isDark = blockColor === '#2A2A2A' || blockColor === '#FF3D8C' || blockColor === '#2A6BFF' || blockColor === '#11A66A'
            const inkOnTile = isDark ? '#FFF8EC' : '#131312'
            return (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Link
                  href="/menu"
                  className="group relative block overflow-hidden"
                  style={{
                    aspectRatio: '3/4',
                    background: blockColor,
                    border: '2.5px solid #131312',
                    borderRadius: 18,
                  }}
                >
                  {/* Photo top half */}
                  <div className="relative h-3/5 overflow-hidden" style={{ borderBottom: '2.5px solid #131312' }}>
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>

                  {/* Item count badge */}
                  <div
                    className="absolute top-3 left-3 font-heading font-extrabold text-[10px] uppercase px-2.5 py-1"
                    style={{
                      background: '#FFF8EC',
                      color: '#131312',
                      letterSpacing: '0.14em',
                      border: '2px solid #131312',
                      borderRadius: 999,
                    }}
                  >
                    {cat.count} items
                  </div>

                  {/* Title bottom */}
                  <div className="px-4 py-4 flex items-center justify-between">
                    <p
                      className="font-display leading-none"
                      style={{ color: inkOnTile, fontSize: 22 }}
                    >
                      {cat.label.toUpperCase()}
                    </p>
                    <span
                      className="font-heading font-extrabold text-xs"
                      style={{ color: inkOnTile, opacity: 0.7 }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
