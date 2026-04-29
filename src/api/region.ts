import type { District, Province, Regency, Village } from '@/types/region'
import server from '@/utils/axios'

export const getProvinces = async (): Promise<Province[]> => {
  const { data } = await server.get('/regions/provinces')
  return data
}

export const getRegencies = async (provinceId: string): Promise<Regency[]> => {
  const { data } = await server.get(`/regions/regencies/${provinceId}`)
  return data
}

export const getDistricts = async (regencyId: string): Promise<District[]> => {
  const { data } = await server.get(`/regions/districts/${regencyId}`)
  return data
}

export const getVillages = async (districtId: string): Promise<Village[]> => {
  const { data } = await server.get(`/regions/villages/${districtId}`)
  return data
}
