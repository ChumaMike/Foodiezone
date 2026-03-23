'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#0A0A0A' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <div
          className="font-display text-white select-none leading-none"
          style={{ fontSize: 'clamp(8rem, 30vw, 18rem)', color: 'rgba(204,0,0,0.08)' }}
        >
          404
        </div>
        <h1
          className="font-display text-white uppercase leading-none -mt-8 md:-mt-16 mb-4"
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
        >
          LOST?
        </h1>
        <p className="font-body mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>
          This page doesn&apos;t exist. But the food does.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
          <Link
            href="/menu"
            className="inline-block font-heading font-black uppercase tracking-widest px-10 py-4 text-sm"
            style={{ background: '#CC0000', color: '#fff', letterSpacing: '0.15em' }}
          >
            Back to Menu →
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
