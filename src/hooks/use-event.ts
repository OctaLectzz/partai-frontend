import { createEvent, deleteEvent, getEvents, showEvent, updateEvent } from '@/api/event'
import type { EventFormValues } from '@/schemas/event-schema'
import type { APIErrorResponse } from '@/types'
import type { Event } from '@/types/event'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useEvents = () => {
  return useQuery<Event[], AxiosError>({
    queryKey: ['events'],
    queryFn: getEvents
  })
}

export const useEvent = (slug: string) => {
  return useQuery<Event, AxiosError>({
    queryKey: ['events', slug],
    queryFn: () => showEvent(slug),
    enabled: !!slug
  })
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation<Event, AxiosError<APIErrorResponse>, EventFormValues>({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success(t('dashboard.events.response.successCreateMsg'))
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'active'
      })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedCreateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.events.response.failedCreateMsg'))
    }
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation<Event, AxiosError<APIErrorResponse>, EventFormValues & { slug: string }>({
    mutationFn: updateEvent,
    onSuccess: (_, variables) => {
      toast.success(t('dashboard.events.response.successUpdateMsg'))
      Promise.all([queryClient.invalidateQueries({ queryKey: ['events'] }), queryClient.invalidateQueries({ queryKey: ['events', variables.slug] })])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedUpdateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.events.response.failedUpdateMsg'))
    }
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => deleteEvent(slug),
    onSuccess: () => {
      toast.success(t('dashboard.events.response.successDeleteMsg'))
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedDeleteMsg'))
      toast.error(t('dashboard.events.response.failedDeleteMsg'))
    }
  })
}
