'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'

const REVIEWS = [
  {
    name: 'Thabo M.',
    location: 'Orlando East',
    rating: 5,
    text: 'Bro the smash burger is INSANE. I\'ve been to Steers, Fishaways, all of them. Nothing hits like this. The sauce alone is worth it.',
    item: 'Cheesey Smash Burger',
    color: '#CC0000',
  },
  {
    name: 'Lerato K.',
    location: 'Pimville',
    rating: 5,
    text: 'Ordered the dagwood and loaded chips combo. Got it in 28 minutes, still hot. This place doesn\'t miss. The tracking feature is chef\'s kiss.',
    item: 'Chicken Dagwood + Loaded Chips',
    color: '#FF6B00',
  },
  {
    name: 'Sipho N.',
    location: 'Diepkloof',
    rating: 5,
    text: 'The wings are dunked PROPERLY. Not that dry nonsense you get elsewhere. Foodie Zone is now my go-to, no debate.',
    item: '10 Wings Combo',
    color: '#CC0000',
  },
  {
    name: 'Zanele D.',
    location: 'Protea Glen',
    rating: 5,
    text: 'I ordered for the whole family. Burgers, wraps, chips. Everyone was happy. The app is clean and ordering was easy. Will definitely order again.',
    item: 'Family Order',
    color: '#1D4ED8',
  },
  {
    name: 'Mandla T.',
    location: 'Soweto',
    rating: 5,
    text: 'Death by Bacon is not playing around. That thing is dangerous 😭. Best R125 I ever spent on food, no cap.',
    item: 'Death by Bacon',
    color: '#CC0000',
  },
  {
    name: 'Nomsa P.',
    location: 'Orlando West',
    rating: 5,
    text: 'Prego roll was perfectly seasoned and the chips were crispy. Fast delivery, friendly service. This is what Soweto deserves.',
    item: 'Prego Roll + Chips',
    color: '#FF6B00',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF6B00" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

const VIEWPORT = { once: true, margin: '-80px' }

export default function Testimonials() {
  return (
    <section className="py-24 px-5 overflow-hidden" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-14"
        >
          <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#CC0000' }}>
            Real customers
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-heading font-black text-white uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              WHAT THE<br /><span style={{ color: '#CC0000' }}>PEOPLE SAY</span>
            </h2>
            <div className="flex items-center gap-3 pb-1">
              <div>
                <div className="font-display text-white text-4xl leading-none">4.8</div>
                <Stars count={5} />
              </div>
              <div className="pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="font-heading font-black text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Average rating
                </div>
                <div className="font-heading font-black text-xs uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  200+ reviews
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="p-6 flex flex-col gap-4"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: `2px solid ${review.color}`,
              }}
            >
              {/* Stars + item */}
              <div className="flex items-center justify-between">
                <Stars count={review.rating} />
                <span
                  className="text-[10px] font-heading font-black uppercase tracking-widest px-2.5 py-1"
                  style={{ background: 'rgba(255,255,255,0.04)', color: review.color }}
                >
                  {review.item}
                </span>
              </div>

              {/* Quote */}
              <p className="font-body text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  className="w-9 h-9 flex items-center justify-center font-heading font-black text-sm flex-shrink-0"
                  style={{ background: review.color, color: '#fff' }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading font-black text-white text-sm uppercase tracking-tight">{review.name}</div>
                  <div className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{review.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
