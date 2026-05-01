import type { CouncilReportFormValues } from '@/schemas/council-report-schema'
import type { CouncilReport } from '@/types/council-report'
import server from '@/utils/axios'

export const getCouncilReports = async (): Promise<CouncilReport[]> => {
  const { data } = await server.get('/council-reports')

  return data.data
}

export const showCouncilReport = async (id: number): Promise<CouncilReport> => {
  const { data } = await server.get(`/council-reports/${id}`)

  return data.data
}

export const createCouncilReport = async (values: CouncilReportFormValues): Promise<CouncilReport> => {
  const formData = buildFormData(values)

  const { data } = await server.post<{ data: CouncilReport }>('/council-reports', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const updateCouncilReport = async (values: CouncilReportFormValues & { id: number }): Promise<CouncilReport> => {
  if (!values.id) {
    throw new Error('ID is required for updates')
  }

  const formData = buildFormData(values)
  formData.append('_method', 'PUT')

  const { data } = await server.post<{ data: CouncilReport }>(`/council-reports/${values.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.data
}

export const deleteCouncilReport = async (id: number): Promise<void> => {
  await server.delete(`/council-reports/${id}`)
}

export const deleteCouncilReportMedia = async (reportId: number, mediaId: number): Promise<void> => {
  await server.delete(`/council-reports/${reportId}/media/${mediaId}`)
}

/**
 * Build FormData from council report form values, handling media files and captions.
 */
function buildFormData(values: CouncilReportFormValues): FormData {
  const formData = new FormData()

  // Append text fields
  formData.append('title', values.title)
  formData.append('description', values.description)
  formData.append('report_type', values.report_type)
  formData.append('activity_date', values.activity_date)
  formData.append('location', values.location)
  formData.append('status', values.status)

  if (values.start_time) formData.append('start_time', values.start_time)
  if (values.end_time) formData.append('end_time', values.end_time)
  if (values.agenda) formData.append('agenda', values.agenda)
  if (values.result) formData.append('result', values.result)
  if (values.recommendation) formData.append('recommendation', values.recommendation)
  if (values.participants_count != null) formData.append('participants_count', String(values.participants_count))
  if (values.rejection_note) formData.append('rejection_note', values.rejection_note)

  // Append media files
  if (values.media?.length) {
    values.media.forEach((file) => {
      formData.append('media[]', file)
    })
  }

  // Append media captions
  if (values.media_captions?.length) {
    values.media_captions.forEach((caption, index) => {
      formData.append(`media_captions[${index}]`, caption || '')
    })
  }

  return formData
}
