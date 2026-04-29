'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'

const FEATURED = [
  {
    name: 'Cheesey Smash Burger',
    desc: '200g smash patty, melted cheddar. Served with chips.',
    price: 95,
    badge: 'Best Seller',
    image: '/images/smash/smash-double.png',
    badgeColor: '#FF3D8C',
  },
  {
    name: '5 Dunked Wings',
    desc: 'Wings tossed in our signature sauce. Sticky, saucy, irresistible.',
    price: 55,
    badge: 'Popular',
    image: '/images/wings/dunked-wings.png',
    badgeColor: '#FFD43B',
  },
  {
    name: 'Death by Bacon',
    desc: '200g smash patty, cheddar, triple bacon. Go big or go home.',
    price: 125,
    badge: 'Fan Fave',
    image: '/images/smash/smash-double.png',
    badgeColor: '#11A66A',
  },
  {
    name: 'Chicken Wrap + Chips',
    desc: 'Chicken strips, lettuce, gherkins, creamy & signature sauces. With chips.',
    price: 65,
    badge: 'Popular',
    image: '/images/wraps/chicken-wrap.png',
    badgeColor: '#2A6BFF',
  },
]

const VIEWPORT = { once: true, margin: '-80px' }

export default function FeaturedItems() {
  return (
    <section className="py-20 px-6" style={{ background: '#F5E9CC' }}>
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex items-end justify-between mb-10 flex-wrap gap-4"
        >
          <div>
            <span className="kasi-pill" style={{ background: '#FF7A1A' }}>
              Most ordered
            </span>
            <h2
              className="font-display mt-4 leading-none"
              style={{ color: '#131312', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              FAN <span style={{ color: '#FF3D8C' }}>FAVES</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:inline-block font-heading font-extrabold text-sm uppercase px-5 py-2.5 transition-all"
            style={{
              border: '2px solid #131312',
              color: '#131312',
              borderRadius: 999,
              letterSpacing: '0.14em',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#131312'; e.currentTarget.style.color = '#FFF8EC' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#131312' }}
          >
            Full Menu →
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FEATURED.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Link
                href="/menu"
                className="group flex flex-col overflow-hidden h-full"
                style={{
                  background: '#FFF8EC',
                  border: '2.5px solid #131312',
                  borderRadius: 18,
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 200, borderBottom: '2.5px solid #131312' }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span
                    className="absolute top-3 left-3 text-[10px] font-heading font-extrabold uppercase tracking-wide px-2.5 py-1"
                    style={{
                      background: item.badgeColor,
                      color: '#131312',
                      border: '2px solid #131312',
                      borderRadius: 999,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="font-heading font-extrabold uppercase text-sm leading-snug tracking-tight mb-1"
                    style={{ color: '#131312' }}
                  >
                    {item.name}
                  </h3>
                  <p className="font-body text-xs leading-relaxed flex-1" style={{ color: '#2A2A2A' }}>
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span
                      className="font-display"
                      style={{ color: '#FF7A1A', fontSize: 24, lineHeight: 1 }}
                    >
                      R{item.price}
                    </span>
                    <span
                      className="text-xs font-heading font-extrabold uppercase px-3 py-1.5"
                      style={{
                        background: '#FF7A1A',
                        color: '#131312',
                        border: '2px solid #131312',
                        borderRadius: 999,
                        letterSpacing: '0.12em',
                      }}
                    >
                      + Add
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile full menu link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-6 text-center sm:hidden"
        >
          <Link
            href="/menu"
            className="inline-block font-heading font-extrabold text-sm uppercase px-8 py-3"
            style={{
              border: '2px solid #131312',
              color: '#131312',
              borderRadius: 999,
              letterSpacing: '0.14em',
            }}
          >
            Full Menu →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
