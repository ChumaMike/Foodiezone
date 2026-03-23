// Shared Framer Motion variants — import from here to keep animations consistent
import type { Variants } from 'framer-motion'

// Cubic bezier as const tuples (required by Framer Motion strict types)
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const EASE_IN = [0.32, 0.72, 0, 1] as [number, number, number, number]

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const popIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
}

// Bottom sheet / modal slide-up (with spring in, fast ease out)
export const slideUpSheet: Variants = {
  hidden: { y: '100%' },
  show: {
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 35 },
  },
  exit: {
    y: '100%',
    transition: { duration: 0.25, ease: EASE_IN },
  },
}

// Backdrop / overlay
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Slide in from right (for hero category crossfade)
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.18, ease: EASE_IN },
  },
}
