import type { District, Province, Regency, Village } from './region'

export interface Massa {
  id: number
  nik: string
  full_name: string
  gender: 'M' | 'F'
  place_of_birth: string | null
  date_of_birth: string
  phone_number: string
  email: string
  address: string
  rt: string
  rw: string
  province_id: string
  regency_id: string
  district_id: string
  village_id: string
  province?: Province
  regency?: Regency
  district?: District
  village?: Village
  postal_code: string
  latitude: number | string
  longitude: number | string
  profession: string | null
  photo: string | null
  notes: string | null
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
  deleted_at: string | null
}
