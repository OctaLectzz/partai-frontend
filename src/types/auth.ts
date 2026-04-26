import type { User } from '@/types/user'

export interface LoginResponse {
  access_token: string
  token_type: string
  user: User
}

export interface RegisterResponse {
  access_token: string
  token_type: string
  user: User
}
