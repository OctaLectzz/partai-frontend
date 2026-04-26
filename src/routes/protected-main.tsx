import { useAuth } from '@/contexts/auth-context'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedAuth() {
  const { type } = useAuth()

  if (type && type === 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
