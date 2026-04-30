import * as regionApi from '@/api/region'
import { useQuery } from '@tanstack/react-query'

export const useProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: regionApi.getProvinces
  })
}

export const useRegencies = (provinceId?: string) => {
  return useQuery({
    queryKey: ['regencies', provinceId],
    queryFn: () => regionApi.getRegencies(provinceId!),
    enabled: !!provinceId
  })
}

export const useDistricts = (regencyId?: string) => {
  return useQuery({
    queryKey: ['districts', regencyId],
    queryFn: () => regionApi.getDistricts(regencyId!),
    enabled: !!regencyId
  })
}

export const useVillages = (districtId?: string) => {
  return useQuery({
    queryKey: ['villages', districtId],
    queryFn: () => regionApi.getVillages(districtId!),
    enabled: !!districtId
  })
}

export const useAllRegencies = () => {
  return useQuery({
    queryKey: ['all-regencies'],
    queryFn: regionApi.getAllRegencies
  })
}

export const useAllDistricts = () => {
  return useQuery({
    queryKey: ['all-districts'],
    queryFn: regionApi.getAllDistricts
  })
}

export const useAllVillages = () => {
  return useQuery({
    queryKey: ['all-villages'],
    queryFn: regionApi.getAllVillages
  })
}
