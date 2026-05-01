export type CouncilReportType = 'meeting' | 'visit' | 'socialization' | 'supervision' | 'aspiration' | 'other'
export type CouncilReportStatus = 'draft' | 'submitted' | 'approved' | 'rejected'
export type MediaType = 'photo' | 'video' | 'document'

export interface CouncilReportUser {
  id: number
  name: string
  email: string
  photo: string | null
}

export interface CouncilReportMedia {
  id: number
  file_path: string | null
  file_name: string
  media_type: MediaType
  caption: string | null
  sort_order: number
  created_at: string
}

export interface CouncilReport {
  id: number
  user_id: number
  user?: CouncilReportUser
  title: string
  description: string
  report_type: CouncilReportType
  activity_date: string
  start_time: string | null
  end_time: string | null
  location: string
  agenda: string | null
  result: string | null
  recommendation: string | null
  participants_count: number | null
  status: CouncilReportStatus
  rejection_note: string | null
  media?: CouncilReportMedia[]
  media_count?: number
  created_at: string
  updated_at: string
}
