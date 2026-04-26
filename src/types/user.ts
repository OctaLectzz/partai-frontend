export interface User {
  id: number
  nik: string | null
  kta_number: string | null
  name: string
  email: string
  email_verified_at: string | null
  phone_number: string | null
  place_of_birth: string | null
  date_of_birth: string | null
  gender: 'M' | 'F' | null
  religion: string | null
  marital_status: string | null
  education: string | null
  profession: string | null
  address: string | null
  rt: string | null
  rw: string | null
  province_id: string | null
  regency_id: string | null
  district_id: string | null
  village_id: string | null
  postal_code: string | null
  photo: string | null
  ktp_photo: string | null
  role: 'admin' | 'board_member' | 'member' | 'sympathizer' | string
  type: 'admin' | 'user' | 'member' | string
  status: boolean
  created_at: string
  updated_at: string
}
