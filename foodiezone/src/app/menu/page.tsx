'use client'

import RouteGuard from '@/components/auth/RouteGuard'
import MenuPage from '@/components/menu/MenuPage'

export default function Menu() {
  return (
    <RouteGuard required="customer">
      <MenuPage />
    </RouteGuard>
  )
}
