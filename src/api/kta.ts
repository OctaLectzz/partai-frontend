import type { KtaCreateFormValues, KtaUpdateFormValues } from '@/schemas/kta-schema'
import type { Kta } from '@/types/kta'
import server from '@/utils/axios'
import { objectToFormData } from '@/utils/form-data'

export const getKtas = async (): Promise<Kta[]> => {
  const { data } = await server.get('/ktas')

  return data.data
}

export const showKta = async (id: number): Promise<Kta> => {
  const { data } = await server.get(`/ktas/${id}`)

  return data.data
}

export const createKta = async (values: KtaCreateFormValues): Promise<Kta> => {
  const formData = objectToFormData({
    ...values,
    photo: values.photo
  })

  const { data } = await server.post<{ data: Kta }>('/ktas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const updateKta = async (values: KtaUpdateFormValues & { id: number }): Promise<Kta> => {
  if (!values.id) {
    throw new Error('ID is required for updates')
  }

  const formData = objectToFormData({
    ...values,
    photo: values.photo,
    _method: 'PUT'
  })

  const { data } = await server.post<{ data: Kta }>(`/ktas/${values.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const deleteKta = async (id: number): Promise<void> => {
  await server.delete(`/ktas/${id}`)
}
