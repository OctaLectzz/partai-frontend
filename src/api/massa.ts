import type { MassaFormValues } from '@/schemas/massa-schema'
import type { Massa } from '@/types/massa'
import server from '@/utils/axios'
import { objectToFormData } from '@/utils/form-data'

export const getMassas = async (): Promise<Massa[]> => {
  const { data } = await server.get('/massas')

  return data.data
}

export const showMassa = async (id: number): Promise<Massa> => {
  const { data } = await server.get(`/massas/${id}`)

  return data.data
}

export const createMassa = async (values: MassaFormValues): Promise<Massa> => {
  const formData = objectToFormData({
    ...values,
    photo: values.photo instanceof File ? values.photo : null
  })

  const { data } = await server.post<{ data: Massa }>('/massas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const updateMassa = async (values: MassaFormValues & { id: number }): Promise<Massa> => {
  if (!values.id) {
    throw new Error('ID is required for updates')
  }

  const formData = objectToFormData({
    ...values,
    photo: values.photo instanceof File ? values.photo : null,
    _method: 'PUT'
  })

  const { data } = await server.post<{ data: Massa }>(`/massas/${values.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const deleteMassa = async (id: number): Promise<void> => {
  await server.delete(`/massas/${id}`)
}
