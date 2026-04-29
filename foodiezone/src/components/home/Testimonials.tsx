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
    color: '#FF7A1A',
  },
  {
    name: 'Lerato K.',
    location: 'Pimville',
    rating: 5,
    text: 'Ordered the dagwood and loaded chips combo. Got it in 28 minutes, still hot. This place doesn\'t miss. The tracking feature is chef\'s kiss.',
    item: 'Chicken Dagwood + Loaded Chips',
    color: '#FFD43B',
  },
  {
    name: 'Sipho N.',
    location: 'Diepkloof',
    rating: 5,
    text: 'The wings are dunked PROPERLY. Not that dry nonsense you get elsewhere. Foodie Zone is now my go-to, no debate.',
    item: '10 Wings Combo',
    color: '#FF3D8C',
  },
  {
    name: 'Zanele D.',
    location: 'Protea Glen',
    rating: 5,
    text: 'I ordered for the whole family. Burgers, wraps, chips. Everyone was happy. The app is clean and ordering was easy. Will definitely order again.',
    item: 'Family Order',
    color: '#2A6BFF',
  },
  {
    name: 'Mandla T.',
    location: 'Soweto',
    rating: 5,
    text: 'Death by Bacon is not playing around. That thing is dangerous. Best R125 I ever spent on food, no cap.',
    item: 'Death by Bacon',
    color: '#11A66A',
  },
  {
    name: 'Nomsa P.',
    location: 'Orlando West',
    rating: 5,
    text: 'Prego roll was perfectly seasoned and the chips were crispy. Fast delivery, friendly service. This is what Soweto deserves.',
    item: 'Prego Roll + Chips',
    color: '#FF7A1A',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF7A1A" stroke="#131312" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

const VIEWPORT = { once: true, margin: '-80px' }

export default function Testimonials() {
  return (
    <section className="py-24 px-6 overflow-hidden" style={{ background: '#FFF8EC' }}>
      <div className="max-w-container mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-14"
        >
          <span className="kasi-pill" style={{ background: '#FF3D8C' }}>
            Real customers
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4">
            <h2
              className="font-display leading-none"
              style={{ color: '#131312', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              WHAT THE<br /><span style={{ color: '#FF7A1A' }}>PEOPLE SAY</span>
            </h2>
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{
                background: '#FFD43B',
                border: '2.5px solid #131312',
                borderRadius: 18,
                boxShadow: '4px 4px 0 0 #131312',
              }}
            >
              <div>
                <div className="font-display leading-none" style={{ color: '#131312', fontSize: 36 }}>4.8</div>
                <Stars count={5} />
              </div>
              <div className="pl-3" style={{ borderLeft: '2px solid #131312' }}>
                <div className="font-heading font-extrabold text-[10px] uppercase" style={{ color: '#131312', letterSpacing: '0.16em' }}>
                  Average rating
                </div>
                <div className="font-heading font-extrabold text-[10px] uppercase mt-0.5" style={{ color: '#131312', letterSpacing: '0.16em' }}>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="p-6 flex flex-col gap-4"
              style={{
                background: '#FFF8EC',
                border: '2.5px solid #131312',
                borderRadius: 18,
                boxShadow: '6px 6px 0 0 #131312',
              }}
            >
              {/* Stars + item */}
              <div className="flex items-center justify-between gap-2">
                <Stars count={review.rating} />
                <span
                  className="text-[10px] font-heading font-extrabold uppercase px-2.5 py-1"
                  style={{
                    background: review.color,
                    color: '#131312',
                    border: '2px solid #131312',
                    borderRadius: 999,
                    letterSpacing: '0.12em',
                  }}
                >
                  {review.item}
                </span>
              </div>

              {/* Quote */}
              <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#2A2A2A' }}>
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3" style={{ borderTop: '2px solid #131312' }}>
                <div
                  className="w-10 h-10 flex items-center justify-center font-display flex-shrink-0"
                  style={{
                    background: review.color,
                    color: '#131312',
                    border: '2px solid #131312',
                    borderRadius: 999,
                    fontSize: 18,
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading font-extrabold uppercase text-sm" style={{ color: '#131312' }}>{review.name}</div>
                  <div className="font-body text-xs" style={{ color: '#2A2A2A' }}>{review.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
