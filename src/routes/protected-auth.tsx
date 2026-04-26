import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedAuth() {
  const { token, type } = useAuth()

  if (token && type) {
    if (type === 'admin') {
      return <Navigate to="/dashboard" replace />
    } else {
      return <Navigate to="/" replace />
    }
  }

  return <Outlet />
}
