'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerFast, fadeUp } from '@/lib/motion'

const CATEGORIES = [
  { label: 'Burgers',       image: '/images/catalogue/burgers/burger-1.png',          count: 6,  color: '#CC0000' },
  { label: 'Smash',         image: '/images/catalogue/smash-burgers/smash-1.png',      count: 4,  color: '#CC0000' },
  { label: 'Wingzz',        image: '/images/catalogue/wings/wings-1.png',              count: 8,  color: '#FF6B00' },
  { label: 'Dagwoods',      image: '/images/catalogue/dagwoods/dagwood-1.png',         count: 7,  color: '#1D4ED8' },
  { label: 'Loaded Chips',  image: '/images/catalogue/loaded-chips/loaded-1.png',      count: 8,  color: '#FF6B00' },
  { label: 'Grilled Chick', image: '/images/catalogue/grilled-chicken/chicken-1.png',  count: 6,  color: '#CC0000' },
  { label: 'Prego Rolls',   image: '/images/catalogue/prego-roll/prego-1.png',         count: 4,  color: '#1D4ED8' },
  { label: 'Wraps',         image: '/images/catalogue/wraps/wrap-1.png',               count: 5,  color: '#1D4ED8' },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function CategoryShowcase() {
  return (
    <section className="py-24 px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-container mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-12"
        >
          <p
            className="font-heading font-semibold text-xs uppercase mb-3"
            style={{ color: '#CC0000', letterSpacing: '0.22em' }}
          >
            What we serve
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl leading-none">
            THE MENU
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Link
                href="/menu"
                className="group relative overflow-hidden block"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Base gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.2) 55%, transparent 100%)' }}
                />

                {/* Hover colour tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${cat.color}88 0%, transparent 55%)` }}
                />

                {/* Item count */}
                <div
                  className="absolute top-3 left-3 font-heading font-semibold text-xs uppercase px-2.5 py-1"
                  style={{
                    background: 'rgba(10,10,10,0.75)',
                    color: cat.color,
                    letterSpacing: '0.14em',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {cat.count} items
                </div>

                {/* Category name */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display text-white text-2xl leading-none">
                    {cat.label.toUpperCase()}
                  </p>
                  <p
                    className="font-heading font-semibold text-xs uppercase mt-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: cat.color, letterSpacing: '0.16em' }}
                  >
                    Order →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
