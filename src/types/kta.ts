import type { District, Province, Regency, Village } from './region'

export interface Kta {
  id: number
  nik: string
  kta_number: string | null
  name: string
  phone_number: string
  place_of_birth: string | null
  date_of_birth: string
  gender: 'M' | 'F'
  position: string
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
  photo: string | null
  is_council: boolean
  created_at: string
  updated_at: string
  deleted_at?: string | null
}
