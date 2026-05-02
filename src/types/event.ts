import type { EventParticipant } from './event-participant'

export interface EventCategory {
  id: number
  name: string
  slug: string
  description: string | null
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
  status: 'draft' | 'published' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}
