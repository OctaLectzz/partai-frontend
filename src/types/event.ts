export interface EventCategory {
  id: number
  name: string
  slug: string
  description: string | null
}

export interface EventParticipant {
  id: number
  event_id: number
  participant_code: string
  name: string
  nik: string
  email: string
  whatsapp_number: string
  province_id: string
  regency_id: string
  district_id: string
  village_id: string
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  category_id: number
  category?: EventCategory
  name: string
  slug: string
  description: string | null
  organizer: string
  participants?: EventParticipant[]
  participants_count?: number
  target_participants: number | null
  start_date: string
  start_time: string
  end_date: string | null
  end_time: string | null
  location: string
  status: string
  created_at: string
  updated_at: string
}
