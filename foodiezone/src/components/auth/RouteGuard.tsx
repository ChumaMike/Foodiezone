'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, UserRole } from '@/context/AuthContext'

interface RouteGuardProps {
  required: UserRole
  children: React.ReactNode
}

export default function RouteGuard({ required, children }: RouteGuardProps) {
  const { role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // role is null before localStorage rehydrates — skip on first render
    if (role === null) {
      router.replace('/login')
    } else if (role !== required) {
      if (role === 'kitchen') {
        router.replace('/kitchen')
      } else if (role === 'driver') {
        router.replace('/driver')
      } else {
        router.replace('/menu')
      }
    }
  }, [role, required, router])

  if (role !== required) return null
  return <>{children}</>
}
