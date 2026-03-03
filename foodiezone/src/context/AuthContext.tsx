'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export type UserRole = 'customer' | 'kitchen' | 'driver'

interface AuthContextType {
  role: UserRole | null
  login: (role: UserRole, password?: string) => boolean
  logout: () => void
  isKitchen: boolean
  isDriver: boolean
}

const KITCHEN_PASSWORD = 'staff123'
const DRIVER_PASSWORD  = 'drive123'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fz-role')
      if (stored === 'customer' || stored === 'kitchen' || stored === 'driver') {
        setRole(stored)
      }
    } catch {}
  }, [])

  const login = useCallback((requestedRole: UserRole, password?: string): boolean => {
    if (requestedRole === 'kitchen') {
      if (password !== KITCHEN_PASSWORD) return false
    }
    if (requestedRole === 'driver') {
      if (password !== DRIVER_PASSWORD) return false
    }
    setRole(requestedRole)
    try { localStorage.setItem('fz-role', requestedRole) } catch {}
    return true
  }, [])

  const logout = useCallback(() => {
    setRole(null)
    try { localStorage.removeItem('fz-role') } catch {}
  }, [])

  return (
    <AuthContext.Provider value={{ role, login, logout, isKitchen: role === 'kitchen', isDriver: role === 'driver' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
