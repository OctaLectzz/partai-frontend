import {
  downloadParticipantTicket,
  getEventParticipants,
  registerEventParticipant,
  scanParticipantQr,
  updateParticipantStatus
} from '@/api/event-participant'
import type { EventParticipantFormValues } from '@/schemas/event-participant-schema'
import type { APIErrorResponse } from '@/types'
import type { EventParticipant } from '@/types/event-participant'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useEventParticipants = (eventSlug: string) => {
  return useQuery<EventParticipant[], AxiosError>({
    queryKey: ['events', eventSlug, 'participants'],
    queryFn: () => getEventParticipants(eventSlug),
    enabled: !!eventSlug
  })
}

export const useEventParticipantsLive = (eventSlug: string, interval = 5000) => {
  return useQuery<EventParticipant[], AxiosError>({
    queryKey: ['events', eventSlug, 'participants'],
    queryFn: () => getEventParticipants(eventSlug),
    enabled: !!eventSlug,
    refetchInterval: interval
  })
}

export const useRegisterEventParticipant = (eventSlug: string) => {
  const queryClient = useQueryClient()

  return useMutation<EventParticipant, AxiosError<APIErrorResponse>, EventParticipantFormValues>({
    mutationFn: (values) => registerEventParticipant(eventSlug, values),
    onSuccess: () => {
      toast.success(t('dashboard.events.response.successRegisterMsg'))
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['events', eventSlug, 'participants'] }),
        queryClient.invalidateQueries({ queryKey: ['events', eventSlug] }),
        queryClient.invalidateQueries({ queryKey: ['events'] }),
        queryClient.invalidateQueries({ queryKey: ['massas'] })
      ])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedRegisterMsg'))
      toast.error(err.response?.data?.message || t('dashboard.events.response.failedRegisterMsg'))
    }
  })
}

export const useUpdateParticipantStatus = (eventSlug: string) => {
  const queryClient = useQueryClient()

  return useMutation<EventParticipant, AxiosError<APIErrorResponse>, { participantId: number; status: 'registered' | 'attended' }>({
    mutationFn: ({ participantId, status }) => updateParticipantStatus(eventSlug, participantId, status),
    onSuccess: () => {
      toast.success(t('dashboard.events.response.successUpdateStatusMsg'))
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['events', eventSlug, 'participants'] }),
        queryClient.invalidateQueries({ queryKey: ['events', eventSlug] })
      ])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedUpdateStatusMsg'))
      toast.error(err.response?.data?.message || t('dashboard.events.response.failedUpdateStatusMsg'))
    }
  })
}

export const useScanParticipantQr = (eventSlug: string) => {
  const queryClient = useQueryClient()

  return useMutation<EventParticipant & { message?: string }, AxiosError<APIErrorResponse>, string>({
    mutationFn: (participantCode) => scanParticipantQr(eventSlug, participantCode),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['events', eventSlug, 'participants'] }),
        queryClient.invalidateQueries({ queryKey: ['events', eventSlug] })
      ])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedScanMsg'))
    }
  })
}

export const useDownloadParticipantTicket = () => {
  return useMutation<void, AxiosError<APIErrorResponse>, string>({
    mutationFn: (participantCode) => downloadParticipantTicket(participantCode),
    onSuccess: () => {
      toast.success(t('dashboard.events.response.successDownloadTicketMsg'))
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.events.response.failedDownloadTicketMsg'))
      toast.error(err.response?.data?.message || t('dashboard.events.response.failedDownloadTicketMsg'))
    }
  })
}
