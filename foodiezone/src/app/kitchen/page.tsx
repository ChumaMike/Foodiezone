'use client'

import RouteGuard from '@/components/auth/RouteGuard'
import KitchenPage from '@/components/kitchen/KitchenPage'

export default function Kitchen() {
  return (
    <RouteGuard required="kitchen">
      <KitchenPage />
    </RouteGuard>
  )
}
