export interface Region {
  id: string
  name: string
}

export interface Province extends Region {}

export interface Regency extends Region {
  province_id: string
}

export interface District extends Region {
  regency_id: string
}

export interface Village extends Region {
  district_id: string
}
