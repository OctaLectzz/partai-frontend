import {
  createCouncilReport,
  deleteCouncilReport,
  deleteCouncilReportMedia,
  getCouncilReports,
  showCouncilReport,
  updateCouncilReport
} from '@/api/council-report'
import type { CouncilReportFormValues } from '@/schemas/council-report-schema'
import type { APIErrorResponse } from '@/types'
import type { CouncilReport } from '@/types/council-report'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useCouncilReports = () => {
  return useQuery<CouncilReport[], AxiosError>({
    queryKey: ['council-reports'],
    queryFn: getCouncilReports
  })
}

export const useCouncilReport = (id: number) => {
  return useQuery<CouncilReport, AxiosError>({
    queryKey: ['council-reports', id],
    queryFn: () => showCouncilReport(id),
    enabled: !!id
  })
}

export const useCreateCouncilReport = () => {
  const queryClient = useQueryClient()

  return useMutation<CouncilReport, AxiosError<APIErrorResponse>, CouncilReportFormValues>({
    mutationFn: createCouncilReport,
    onSuccess: () => {
      toast.success(t('dashboard.councilReport.response.successCreateMsg'))
      queryClient.invalidateQueries({
        queryKey: ['council-reports'],
        refetchType: 'active'
      })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.councilReport.response.failedCreateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.councilReport.response.failedCreateMsg'))
    }
  })
}

export const useUpdateCouncilReport = () => {
  const queryClient = useQueryClient()

  return useMutation<CouncilReport, AxiosError<APIErrorResponse>, CouncilReportFormValues & { id: number }>({
    mutationFn: updateCouncilReport,
    onSuccess: (_, variables) => {
      toast.success(t('dashboard.councilReport.response.successUpdateMsg'))
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['council-reports'] }),
        queryClient.invalidateQueries({ queryKey: ['council-reports', variables.id] })
      ])
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.councilReport.response.failedUpdateMsg'))
      toast.error(err.response?.data?.message || t('dashboard.councilReport.response.failedUpdateMsg'))
    }
  })
}

export const useDeleteCouncilReport = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCouncilReport(id),
    onSuccess: () => {
      toast.success(t('dashboard.councilReport.response.successDeleteMsg'))
      queryClient.invalidateQueries({ queryKey: ['council-reports'] })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.councilReport.response.failedDeleteMsg'))
      toast.error(t('dashboard.councilReport.response.failedDeleteMsg'))
    }
  })
}

export const useDeleteCouncilReportMedia = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reportId, mediaId }: { reportId: number; mediaId: number }) => deleteCouncilReportMedia(reportId, mediaId),
    onSuccess: (_, variables) => {
      toast.success(t('dashboard.councilReport.response.successDeleteMediaMsg'))
      queryClient.invalidateQueries({ queryKey: ['council-reports', variables.reportId] })
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.error(err.response?.data?.message || t('dashboard.councilReport.response.failedDeleteMediaMsg'))
      toast.error(t('dashboard.councilReport.response.failedDeleteMediaMsg'))
    }
  })
}
