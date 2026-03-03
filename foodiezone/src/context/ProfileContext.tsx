'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface CustomerProfile {
  name: string
  phone: string
  defaultAddress: string
  repScore: number
  ordersCount: number
  memberSince: string // ISO date string
}

interface ProfileContextType {
  profile: CustomerProfile | null
  hasProfile: boolean
  saveProfile: (p: { name: string; phone: string; defaultAddress: string }) => void
  updateProfile: (p: { name: string; phone: string; defaultAddress: string }) => void
  incrementRep: () => void
}

const STORAGE_KEY = 'fz-profile'
const REP_PER_ORDER = 10

export const TIERS = [
  { label: 'Newcomer', min: 0,   max: 99,  color: '#888',    next: 100 },
  { label: 'Regular',  min: 100, max: 299,  color: '#FF6B00', next: 300 },
  { label: 'VIP',      min: 300, max: 699,  color: '#1D4ED8', next: 700 },
  { label: 'Legend',   min: 700, max: Infinity, color: '#CC0000', next: null },
]

export function getTier(score: number) {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0]
}

const ProfileContext = createContext<ProfileContextType | null>(null)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<CustomerProfile | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProfile(JSON.parse(raw))
    } catch {}
  }, [])

  const persist = useCallback((p: CustomerProfile) => {
    setProfile(p)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch {}
  }, [])

  const saveProfile = useCallback((p: { name: string; phone: string; defaultAddress: string }) => {
    persist({
      ...p,
      repScore: 0,
      ordersCount: 0,
      memberSince: new Date().toISOString(),
    })
  }, [persist])

  const updateProfile = useCallback((p: { name: string; phone: string; defaultAddress: string }) => {
    if (!profile) return
    persist({ ...profile, ...p })
  }, [profile, persist])

  const incrementRep = useCallback(() => {
    if (!profile) return
    persist({
      ...profile,
      repScore: profile.repScore + REP_PER_ORDER,
      ordersCount: profile.ordersCount + 1,
    })
  }, [profile, persist])

  return (
    <ProfileContext.Provider value={{
      profile,
      hasProfile: profile !== null,
      saveProfile,
      updateProfile,
      incrementRep,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
