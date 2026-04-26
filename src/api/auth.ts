import type { Login, PasswordFormValues, ProfileFormValues, Register } from '@/schemas/auth-schema'
import type { ApiResponse } from '@/types'
import type { LoginResponse, RegisterResponse } from '@/types/auth'
import type { User } from '@/types/user'
import server from '@/utils/axios'
import { objectToFormData } from '@/utils/form-data'

export const login = (data: Login): Promise<{ data: LoginResponse }> => {
  return server.post('/auth/login', data)
}

export const register = (data: Register): Promise<{ data: RegisterResponse }> => {
  return server.post('/auth/register', data)
}

export const logout = (): Promise<{ data: { status: string } }> => {
  return server.post('/auth/logout')
}

export const profile = async (): Promise<User> => {
  const response = await server.get<ApiResponse<User>>('/auth/profile')

  return response.data.data
}

export const updateProfile = async (values: ProfileFormValues): Promise<User> => {
  const formData = objectToFormData({
    ...values,
    avatar: values.avatar instanceof File ? values.avatar : null
  })

  const { data } = await server.post<{ data: User }>('/auth/profile/edit?_method=PUT', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const updatePassword = async (values: PasswordFormValues): Promise<User> => {
  const formData = objectToFormData(values)

  const { data } = await server.post<{ data: User }>('/auth/profile/changepassword', formData)

  return data.data
}
