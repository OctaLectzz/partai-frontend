import type { EventFormValues } from '@/schemas/event-schema'
import type { Event } from '@/types/event'
import server from '@/utils/axios'

export const getEvents = async (): Promise<Event[]> => {
  const { data } = await server.get('/events')

  return data.data
}

export const showEvent = async (slug: string): Promise<Event> => {
  const { data } = await server.get(`/events/${slug}`)

  return data.data
}

export const createEvent = async (values: EventFormValues): Promise<Event> => {
  const { data } = await server.post<{ data: Event }>('/events', values)

  return data.data
}

export const updateEvent = async (values: EventFormValues & { slug: string }): Promise<Event> => {
  if (!values.slug) {
    throw new Error('Slug is required for updates')
  }

  const { data } = await server.put<{ data: Event }>(`/events/${values.slug}`, values)

  return data.data
}

export const deleteEvent = async (slug: string): Promise<void> => {
  await server.delete(`/events/${slug}`)
}
