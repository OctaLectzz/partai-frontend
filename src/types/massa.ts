import type { District, Province, Regency, Village } from './region'

export interface MassaEventPivot {
  participant_code: string
  qr_code: string | null
  status: 'registered' | 'attended'
  attended_at: string | null
  message: string | null
}

export interface MassaEvent {
  id: number
  name: string
  start_date: string
  end_date: string | null
  location: string
  pivot: MassaEventPivot
}

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
  events?: MassaEvent[]
  created_at: string
  updated_at: string
  deleted_at: string | null
}
