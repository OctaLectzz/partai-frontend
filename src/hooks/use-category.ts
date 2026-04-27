import { getCategories, type Category, type CategoryQueryParams } from '@/api/category'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export const useCategories = (params?: CategoryQueryParams) => {
  return useQuery<Category[], AxiosError>({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params)
  })
}
