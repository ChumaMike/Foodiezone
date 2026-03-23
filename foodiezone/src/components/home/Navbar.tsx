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
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div className="max-w-container mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-display text-white leading-none" style={{ fontSize: 28, letterSpacing: 1 }}>
            FOODIE<span style={{ color: '#CC0000' }}>ZONE</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative font-heading font-semibold text-sm uppercase tracking-widest pb-1"
              style={{
                color: pathname === l.href ? '#fff' : 'rgba(255,255,255,0.55)',
                letterSpacing: '0.12em',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? '#fff' : 'rgba(255,255,255,0.55)')}
            >
              {l.label}
              {pathname === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: '#CC0000' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="font-heading font-semibold text-sm uppercase tracking-widest px-4 py-2 transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/menu"
              className="font-heading font-bold text-sm uppercase tracking-widest px-6 py-3"
              style={{ background: '#CC0000', color: '#fff', letterSpacing: '0.12em' }}
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
            className="block w-6 h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="block w-6 h-0.5 bg-white origin-center"
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
            style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <motion.div
              variants={staggerFast}
              initial="hidden"
              animate="show"
              className="px-6 pb-8 pt-4 flex flex-col gap-5"
            >
              {MOBILE_LINKS.map((l) => (
                <motion.div key={l.href} variants={fadeUp}>
                  <Link
                    href={l.href}
                    className="font-display text-white text-3xl leading-none block"
                    style={{ color: pathname === l.href ? '#CC0000' : '#fff' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUp}>
                <Link
                  href="/menu"
                  className="font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 text-center block mt-2"
                  style={{ background: '#CC0000', color: '#fff' }}
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
