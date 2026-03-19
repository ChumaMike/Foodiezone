'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          {[
            { label: 'Menu', href: '/menu' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'About', href: '/about' },
            { label: 'Phases', href: '/phases' },
            { label: 'Admin', href: '/admin' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-heading font-semibold text-sm uppercase tracking-widest transition-colors"
              style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="font-heading font-semibold text-sm uppercase tracking-widest transition-colors px-4 py-2"
            style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            Login
          </Link>
          <Link
            href="/menu"
            className="font-heading font-bold text-sm uppercase tracking-widest px-6 py-3 transition-all hover:brightness-110 active:scale-95"
            style={{ background: '#CC0000', color: '#fff', letterSpacing: '0.12em' }}
          >
            Order Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 flex flex-col justify-center gap-[5px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-200"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(1px, 6px)' : 'none' }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-200"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(1px, -6px)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-8 pt-2 flex flex-col gap-6"
          style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { label: 'Menu', href: '/menu' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'About', href: '/about' },
            { label: 'Phases', href: '/phases' },
            { label: 'Admin', href: '/admin' },
            { label: 'Login', href: '/login' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-white text-3xl leading-none"
              onClick={() => setMenuOpen(false)}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/menu"
            className="font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 text-center mt-2"
            style={{ background: '#CC0000', color: '#fff' }}
            onClick={() => setMenuOpen(false)}
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  )
}
