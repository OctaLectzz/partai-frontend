import { login, logout, profile, register, updatePassword, updateProfile } from '@/api/auth'
import { useAuth as useAuthContext } from '@/contexts/auth-context'
import type { Login, PasswordFormValues, ProfileFormValues, Register } from '@/schemas/auth-schema'
import type { APIErrorResponse } from '@/types'
import type { User } from '@/types/user'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: Register) => register(data),
    onSuccess: () => {
      toast.success(t('auth.response.successRegisterMsg'))
      navigate('/auth/login')
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('auth.response.failedRegisterMsg'))
      toast.error(err.response?.data?.message || t('auth.response.failedRegisterMsg'))
    }
  })
}

export const useLogin = () => {
  const { setAuth } = useAuthContext()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (res) => {
      const { user } = res.data

      setAuth(res.data)
      toast.success(t('auth.response.successLoginMsg'))

      if (user.type === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('auth.response.failedLoginMsg'))
      toast.error(t('auth.response.failedLoginMsg'))
    }
  })
}

export const useLogout = () => {
  const { logout: contextLogout } = useAuthContext()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      contextLogout()
      toast.success(t('auth.response.successLogoutMsg'))
      navigate('/')
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('auth.response.failedLogoutMsg'))
      toast.error(t('auth.response.failedLogoutMsg'))
    }
  })
}

export const useProfile = (enabled: boolean) => {
  return useQuery<User, AxiosError>({
    queryKey: ['auth', 'profile'],
    queryFn: profile,
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false
  })
}

export const useProfileUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<User, AxiosError<APIErrorResponse>, ProfileFormValues>({
    mutationFn: updateProfile,
    onSuccess: async () => {
      toast.success(t('auth.response.successProfileMsg'))
      const freshUser = await queryClient.fetchQuery({
        queryKey: ['auth', 'profile'],
        queryFn: profile
      })
      queryClient.setQueryData(['auth', 'profile'], freshUser)
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('auth.response.failedProfileMsg'))
      toast.error(err.response?.data?.message || t('auth.response.failedProfileMsg'))
    }
  })
}

export const usePasswordUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<User, AxiosError<APIErrorResponse>, PasswordFormValues>({
    mutationFn: updatePassword,
    onSuccess: (updatedUser) => {
      toast.success(t('auth.response.successPasswordMsg'))
      queryClient.setQueryData(['auth', 'profile'], updatedUser)
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('auth.response.failedPasswordMsg'))
      toast.error(err.response?.data?.message || t('auth.response.failedPasswordMsg'))
    }
  })
}

export function useRequireAuth() {
  const { token } = useAuthContext()
  const [open, setOpen] = useState(false)

  const requireAuth = (fn: () => void) => {
    if (!token) {
      setOpen(true)
      return
    }
    fn()
  }

  return {
    requireAuth,
    authDialogOpen: open,
    setAuthDialogOpen: setOpen
  }
}
