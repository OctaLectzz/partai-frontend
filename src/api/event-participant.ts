import type { EventParticipantFormValues } from '@/schemas/event-participant-schema'
import type { EventParticipant } from '@/types/event-participant'
import server from '@/utils/axios'
import { objectToFormData } from '@/utils/form-data'

export const getEventParticipants = async (eventSlug: string): Promise<EventParticipant[]> => {
  const { data } = await server.get(`/events/${eventSlug}/participants`)

  return data.data
}

export const registerEventParticipant = async (eventSlug: string, values: EventParticipantFormValues): Promise<EventParticipant> => {
  const formData = objectToFormData({
    ...values,
    photo: values.photo instanceof File ? values.photo : null
  })

  const { data } = await server.post<{ data: EventParticipant }>(`/events/${eventSlug}/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const updateParticipantStatus = async (
  eventSlug: string,
  participantId: number,
  status: 'registered' | 'attended'
): Promise<EventParticipant> => {
  const { data } = await server.patch<{ data: EventParticipant }>(`/events/${eventSlug}/participants/${participantId}`, { status })

  return data.data
}

export const scanParticipantQr = async (eventSlug: string, participantCode: string): Promise<EventParticipant & { message?: string }> => {
  const { data } = await server.post<{ data: EventParticipant; message?: string }>(`/events/${eventSlug}/participants/scan/${participantCode}`)

  return { ...data.data, message: data.message }
}

export const downloadParticipantTicket = async (participantCode: string): Promise<void> => {
  const response = await server.get(`/tickets/${participantCode}/download`, {
    responseType: 'blob'
  })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${participantCode}.png`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
