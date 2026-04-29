import type { User } from './user'

export type Religion = 'islam' | 'christian' | 'catholic' | 'hindu' | 'buddhist' | 'confucian'
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'
export type Education = 'high_school' | 'associate_degree' | 'bachelors_degree' | 'masters_degree' | 'doctorate'

export interface Council extends User {
  religion: Religion | null
  marital_status: MaritalStatus | null
  education: Education | null
}
