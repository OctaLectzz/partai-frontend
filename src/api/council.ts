import type { CouncilCreateFormValues, CouncilUpdateFormValues } from '@/schemas/council-schema'
import type { Council } from '@/types/council'
import server from '@/utils/axios'
import { objectToFormData } from '@/utils/form-data'

export const getCouncils = async (): Promise<Council[]> => {
  const { data } = await server.get('/councils')

  return data.data
}

export const showCouncil = async (id: number): Promise<Council> => {
  const { data } = await server.get(`/councils/${id}`)

  return data.data
}

export const createCouncil = async (values: CouncilCreateFormValues): Promise<Council> => {
  const formData = objectToFormData({
    ...values,
    status: values.status ? 1 : 0,
    photo: values.photo instanceof File ? values.photo : null,
    ktp_photo: values.ktp_photo instanceof File ? values.ktp_photo : null
  })

  const { data } = await server.post<{ data: Council }>('/councils', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const updateCouncil = async (values: CouncilUpdateFormValues & { id: number }): Promise<Council> => {
  if (!values.id) {
    throw new Error('ID is required for updates')
  }

  const formData = objectToFormData({
    ...values,
    status: values.status ? 1 : 0,
    photo: values.photo instanceof File ? values.photo : null,
    ktp_photo: values.ktp_photo instanceof File ? values.ktp_photo : null,
    _method: 'PUT'
  })

  const { data } = await server.post<{ data: Council }>(`/councils/${values.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const deleteCouncil = async (id: number): Promise<void> => {
  await server.delete(`/councils/${id}`)
}
