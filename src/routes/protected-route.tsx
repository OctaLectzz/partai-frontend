import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}
