import { useProfile } from '@/hooks/use-auth'
import type { LoginResponse } from '@/types/auth'
import { t } from '@/utils/i18n'
import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface AuthContextType {
  user: LoginResponse['user'] | null
  token: string | null
  type: string | null
  isLoading: boolean
  setAuth: (data: LoginResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [type, setType] = useState<string | null>(() => Cookies.get('type') || null)
  const [token, setToken] = useState<string | null>(() => Cookies.get('token') || null)

  const navigate = useNavigate()

  const shouldFetchProfile = !!token && !user

  const { data, isSuccess, isError, isLoading } = useProfile(shouldFetchProfile)

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)
      setType(data.type)
      Cookies.set('type', data.type, { expires: 30 })
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError && token) {
      logout()
      toast.error(t('auth.response.sessionExpiredMsg'))
      navigate('/')
      window.location.reload()
    }
  }, [isError, token, navigate])

  const setAuth = (data: LoginResponse) => {
    setUser(data.user)
    setToken(data.access_token)
    setType(data.user.type)
    Cookies.set('token', data.access_token, { expires: 30 })
    Cookies.set('type', data.user.type, { expires: 30 })
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    Cookies.remove('token')
    Cookies.remove('type')
    Cookies.remove('vite-ui-theme')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        type,
        isLoading: shouldFetchProfile && isLoading,
        setAuth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
