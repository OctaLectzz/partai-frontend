import { createCouncil, deleteCouncil, getCouncils, showCouncil, updateCouncil } from '@/api/council'
import type { CouncilCreateFormValues, CouncilUpdateFormValues } from '@/schemas/council-schema'
import type { APIErrorResponse } from '@/types'
import type { Council } from '@/types/council'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useCouncils = () => {
  return useQuery<Council[], AxiosError>({
    queryKey: ['councils'],
    queryFn: getCouncils
  })
}

export const useCouncil = (id: number) => {
  return useQuery<Council, AxiosError>({
    queryKey: ['councils', id],
    queryFn: () => showCouncil(id),
    enabled: !!id
  })
}

export const useCreateCouncil = () => {
  const queryClient = useQueryClient()

  return useMutation<Council, AxiosError<APIErrorResponse>, CouncilCreateFormValues>({
    mutationFn: createCouncil,
    onSuccess: () => {
      toast.success(t('dashboard.council.response.successCreateMsg'))
      queryClient.invalidateQueries({
        queryKey: ['councils'],
        refetchType: 'active'
      })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.council.response.failedCreateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.council.response.failedCreateMsg'))
    }
  })
}

export const useUpdateCouncil = () => {
  const queryClient = useQueryClient()

  return useMutation<Council, AxiosError<APIErrorResponse>, CouncilUpdateFormValues & { id: number }>({
    mutationFn: updateCouncil,
    onSuccess: (_, variables) => {
      toast.success(t('dashboard.council.response.successUpdateMsg'))
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['councils'] }),
        queryClient.invalidateQueries({ queryKey: ['councils', variables.id] })
      ])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.council.response.failedUpdateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.council.response.failedUpdateMsg'))
    }
  })
}

export const useDeleteCouncil = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCouncil(id),
    onSuccess: () => {
      toast.success(t('dashboard.council.response.successDeleteMsg'))
      queryClient.invalidateQueries({ queryKey: ['councils'] })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.council.response.failedDeleteMsg'))
      toast.error(t('dashboard.council.response.failedDeleteMsg'))
    }
  })
}
