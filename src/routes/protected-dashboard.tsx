import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedDashboard() {
  const { token, type } = useAuth()

  if (!token) {
    return <Navigate to="/auth/login" replace />
  } else if (type && type !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
