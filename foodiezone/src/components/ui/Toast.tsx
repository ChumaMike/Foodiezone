'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
}

interface ToastProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), 2800)
    return () => clearTimeout(t)
  }, [toast.id, onRemove])

  const bg =
    toast.type === 'success' ? '#166534' : toast.type === 'error' ? '#7f1d1d' : '#1e3a5f'
  const icon = toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      style={{ background: bg, border: '1px solid rgba(255,255,255,0.12)' }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white text-sm font-body max-w-xs cursor-pointer"
      onClick={() => onRemove(toast.id)}
    >
      <span className="text-base leading-none">{icon}</span>
      <span>{toast.message}</span>
    </motion.div>
  )
}

export function ToastContainer({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
