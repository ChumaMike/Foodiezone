import RouteGuard from '@/components/auth/RouteGuard'
import ProfilePage from '@/components/profile/ProfilePage'

export default function Profile() {
  return (
    <RouteGuard required="customer">
      <ProfilePage />
    </RouteGuard>
  )
}
