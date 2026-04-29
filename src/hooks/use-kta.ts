import { createKta, deleteKta, getKtas, showKta, updateKta } from '@/api/kta'
import type { KtaCreateFormValues, KtaUpdateFormValues } from '@/schemas/kta-schema'
import type { APIErrorResponse } from '@/types'
import type { Kta } from '@/types/kta'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useKtas = () => {
  return useQuery<Kta[], AxiosError>({
    queryKey: ['ktas'],
    queryFn: getKtas
  })
}

export const useKta = (id: number) => {
  return useQuery<Kta, AxiosError>({
    queryKey: ['ktas', id],
    queryFn: () => showKta(id),
    enabled: !!id
  })
}

export const useCreateKta = () => {
  const queryClient = useQueryClient()

  return useMutation<Kta, AxiosError<APIErrorResponse>, KtaCreateFormValues>({
    mutationFn: createKta,
    onSuccess: () => {
      toast.success(t('dashboard.kta.response.successCreateMsg'))
      queryClient.invalidateQueries({
        queryKey: ['ktas'],
        refetchType: 'active'
      })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.kta.response.failedCreateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.kta.response.failedCreateMsg'))
    }
  })
}

export const useUpdateKta = () => {
  const queryClient = useQueryClient()

  return useMutation<Kta, AxiosError<APIErrorResponse>, KtaUpdateFormValues & { id: number }>({
    mutationFn: updateKta,
    onSuccess: (_, variables) => {
      toast.success(t('dashboard.kta.response.successUpdateMsg'))
      Promise.all([queryClient.invalidateQueries({ queryKey: ['ktas'] }), queryClient.invalidateQueries({ queryKey: ['ktas', variables.id] })])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.kta.response.failedUpdateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.kta.response.failedUpdateMsg'))
    }
  })
}

export const useDeleteKta = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteKta(id),
    onSuccess: () => {
      toast.success(t('dashboard.kta.response.successDeleteMsg'))
      queryClient.invalidateQueries({ queryKey: ['ktas'] })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.kta.response.failedDeleteMsg'))
      toast.error(t('dashboard.kta.response.failedDeleteMsg'))
    }
  })
}
