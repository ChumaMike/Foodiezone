'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { staggerFast, fadeUp } from '@/lib/motion'

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Admin', href: '/admin' },
]

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: 'Login', href: '/login' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,248,236,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '2px solid #131312' : '2px solid transparent',
      }}
    >
      <div className="max-w-container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span
            className="font-display leading-none"
            style={{ color: '#131312', fontSize: 28, letterSpacing: 1 }}
          >
            FOODIE<span style={{ color: '#FF7A1A' }}>ZONE</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative font-heading font-bold text-sm uppercase pb-1"
                style={{
                  color: active ? '#131312' : '#2A2A2A',
                  letterSpacing: '0.12em',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF7A1A')}
                onMouseLeave={e => (e.currentTarget.style.color = active ? '#131312' : '#2A2A2A')}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: '#FF7A1A' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="font-heading font-bold text-sm uppercase px-3 py-2 transition-colors"
            style={{ color: '#2A2A2A', letterSpacing: '0.12em' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF7A1A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#2A2A2A')}
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/menu"
              className="font-heading font-extrabold text-sm uppercase px-5 py-2.5"
              style={{
                background: '#FF7A1A',
                color: '#131312',
                letterSpacing: '0.12em',
                border: '2px solid #131312',
                borderRadius: 999,
              }}
            >
              Order Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col justify-center gap-[5px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="block w-6 h-0.5 origin-center"
            style={{ background: '#131312' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="block w-6 h-0.5"
            style={{ background: '#131312' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="block w-6 h-0.5 origin-center"
            style={{ background: '#131312' }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: '#FFF8EC', borderTop: '2px solid #131312' }}
          >
            <motion.div
              variants={staggerFast}
              initial="hidden"
              animate="show"
              className="px-6 pb-8 pt-4 flex flex-col gap-4"
            >
              {MOBILE_LINKS.map((l) => (
                <motion.div key={l.href} variants={fadeUp}>
                  <Link
                    href={l.href}
                    className="font-display text-3xl leading-none block"
                    style={{ color: pathname === l.href ? '#FF7A1A' : '#131312' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUp}>
                <Link
                  href="/menu"
                  className="font-heading font-extrabold text-sm uppercase px-6 py-4 text-center block mt-2"
                  style={{
                    background: '#FF7A1A',
                    color: '#131312',
                    border: '2px solid #131312',
                    borderRadius: 999,
                    letterSpacing: '0.14em',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Order Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
