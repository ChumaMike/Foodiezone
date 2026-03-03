import RouteGuard from '@/components/auth/RouteGuard'
import DriverDashboard from '@/components/driver/DriverPage'

export default function Driver() {
  return (
    <RouteGuard required="driver">
      <DriverDashboard />
    </RouteGuard>
  )
}
