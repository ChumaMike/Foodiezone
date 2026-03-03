'use client'

import { useState, useEffect } from 'react'

export type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'delivering'

const STEPS: OrderStatus[] = ['confirmed', 'preparing', 'ready', 'delivering']

interface OrderSocketResult {
  status: OrderStatus
  step: number
}

export function useOrderSocket(): OrderSocketResult {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return {
    status: STEPS[step],
    step,
  }
}
