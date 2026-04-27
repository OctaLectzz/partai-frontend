import server from '@/utils/axios'

export interface Category {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface CategoryQueryParams {
  search?: string
  per_page?: number
  page?: number
}

export const getCategories = async (params?: CategoryQueryParams): Promise<Category[]> => {
  const { data } = await server.get('/categories', { params })
  return data.data
}
