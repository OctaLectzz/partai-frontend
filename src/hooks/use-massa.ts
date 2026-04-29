import { createMassa, deleteMassa, getMassas, showMassa, updateMassa } from '@/api/massa'
import type { MassaFormValues } from '@/schemas/massa-schema'
import type { APIErrorResponse } from '@/types'
import type { Massa } from '@/types/massa'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useMassas = () => {
  return useQuery<Massa[], AxiosError>({
    queryKey: ['massas'],
    queryFn: getMassas
  })
}

export const useMassa = (id: number) => {
  return useQuery<Massa, AxiosError>({
    queryKey: ['massas', id],
    queryFn: () => showMassa(id),
    enabled: !!id
  })
}

export const useCreateMassa = () => {
  const queryClient = useQueryClient()

  return useMutation<Massa, AxiosError<APIErrorResponse>, MassaFormValues>({
    mutationFn: createMassa,
    onSuccess: () => {
      toast.success(t('dashboard.massa.response.successCreateMsg'))
      queryClient.invalidateQueries({
        queryKey: ['massas'],
        refetchType: 'active'
      })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.massa.response.failedCreateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.massa.response.failedCreateMsg'))
    }
  })
}

export const useUpdateMassa = () => {
  const queryClient = useQueryClient()

  return useMutation<Massa, AxiosError<APIErrorResponse>, MassaFormValues & { id: number }>({
    mutationFn: updateMassa,
    onSuccess: (_, variables) => {
      toast.success(t('dashboard.massa.response.successUpdateMsg'))
      Promise.all([queryClient.invalidateQueries({ queryKey: ['massas'] }), queryClient.invalidateQueries({ queryKey: ['massas', variables.id] })])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.massa.response.failedUpdateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.massa.response.failedUpdateMsg'))
    }
  })
}

export const useDeleteMassa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteMassa(id),
    onSuccess: () => {
      toast.success(t('dashboard.massa.response.successDeleteMsg'))
      queryClient.invalidateQueries({ queryKey: ['massas'] })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.massa.response.failedDeleteMsg'))
      toast.error(t('dashboard.massa.response.failedDeleteMsg'))
    }
  })
}
