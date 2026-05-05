import type { Massa } from './massa'

export interface EventParticipant {
  id: number
  event_id: number
  massa_id: number
  massa?: Massa
  participant_code: string
  message: string | null
  status: 'registered' | 'attended'
  attended_at: string | null
  created_at: string
  updated_at: string
}
