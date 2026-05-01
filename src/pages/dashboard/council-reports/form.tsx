import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MediaUpload } from '@/components/ui/media-upload'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCouncilReport, useCreateCouncilReport, useDeleteCouncilReportMedia, useUpdateCouncilReport } from '@/hooks/use-council-report'
import { councilReportSchema, type CouncilReportFormValues } from '@/schemas/council-report-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, FileText, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function CouncilReportForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const numericId = Number(id)

  const { data: reportData, isLoading: isLoadingReport } = useCouncilReport(numericId)
  const { mutateAsync: createReport, isPending: isCreating } = useCreateCouncilReport()
  const { mutateAsync: updateReport, isPending: isUpdating } = useUpdateCouncilReport()
  const { mutateAsync: deleteMedia, isPending: isDeletingMedia } = useDeleteCouncilReportMedia()

  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaCaptions, setMediaCaptions] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<CouncilReportFormValues>({
    resolver: zodResolver(councilReportSchema),
    defaultValues: { status: 'draft' }
  })

  const currentStatus = watch('status')

  useEffect(() => {
    if (isEdit && reportData) {
      reset({
        title: reportData.title,
        description: reportData.description,
        report_type: reportData.report_type,
        activity_date: reportData.activity_date,
        start_time: reportData.start_time || '',
        end_time: reportData.end_time || '',
        location: reportData.location,
        agenda: reportData.agenda || '',
        result: reportData.result || '',
        recommendation: reportData.recommendation || '',
        participants_count: reportData.participants_count ?? '',
        status: reportData.status,
        rejection_note: reportData.rejection_note || ''
      })
    }
  }, [isEdit, reportData, reset])

  const reportTypeOptions = [
    { label: t('dashboard.councilReport.reportType.meeting'), value: 'meeting' },
    { label: t('dashboard.councilReport.reportType.visit'), value: 'visit' },
    { label: t('dashboard.councilReport.reportType.socialization'), value: 'socialization' },
    { label: t('dashboard.councilReport.reportType.supervision'), value: 'supervision' },
    { label: t('dashboard.councilReport.reportType.aspiration'), value: 'aspiration' },
    { label: t('dashboard.councilReport.reportType.other'), value: 'other' }
  ]

  const statusOptions = [
    { label: t('dashboard.councilReport.status.draft'), value: 'draft' },
    { label: t('dashboard.councilReport.status.submitted'), value: 'submitted' },
    { label: t('dashboard.councilReport.status.approved'), value: 'approved' },
    { label: t('dashboard.councilReport.status.rejected'), value: 'rejected' }
  ]

  const onSubmit = async (values: CouncilReportFormValues) => {
    const payload = {
      ...values,
      media: mediaFiles.length > 0 ? mediaFiles : undefined,
      media_captions: mediaCaptions.length > 0 ? mediaCaptions : undefined
    }

    if (isEdit && numericId) {
      await updateReport({ ...payload, id: numericId })
    } else {
      await createReport(payload)
    }
    navigate('/dashboard/council-activity-reports')
  }

  const handleDeleteExistingMedia = async (mediaId: number) => {
    if (numericId) {
      await deleteMedia({ reportId: numericId, mediaId })
    }
  }

  if (isEdit && isLoadingReport) {
    return <div className="p-6 text-center">{t('public.loadingText')}</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/council-activity-reports')}
          className="border-card-border bg-card text-muted hover:text-foreground h-9 gap-2 rounded-lg border px-3 transition-colors"
          icon={<ArrowLeft size={16} />}
        >
          {t('public.backToList')}
        </Button>

        <div>
          <h1 className="text-foreground text-2xl font-bold">
            {isEdit ? t('dashboard.councilReport.form.editTitle') : t('dashboard.councilReport.form.createTitle')}
          </h1>
          <p className="text-muted mt-1 text-sm">
            {isEdit ? t('dashboard.councilReport.form.editSubtitle') : t('dashboard.councilReport.form.createSubtitle')}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-3">
          {/* Main Content (Left Column) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('dashboard.councilReport.form.titleLabel')}
                  placeholder={t('dashboard.councilReport.form.titlePlaceholder')}
                  error={errors.title?.message}
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label={t('dashboard.councilReport.form.descriptionLabel')}
                  placeholder={t('dashboard.councilReport.form.descriptionPlaceholder')}
                  error={errors.description?.message}
                  required
                  {...field}
                />
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Controller
                name="activity_date"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    label={t('dashboard.councilReport.form.activityDateLabel')}
                    error={errors.activity_date?.message}
                    required
                    {...field}
                  />
                )}
              />
              <Controller
                name="start_time"
                control={control}
                render={({ field }) => (
                  <Input
                    type="time"
                    label={t('dashboard.councilReport.form.startTimeLabel')}
                    error={errors.start_time?.message}
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />
              <Controller
                name="end_time"
                control={control}
                render={({ field }) => (
                  <Input
                    type="time"
                    label={t('dashboard.councilReport.form.endTimeLabel')}
                    error={errors.end_time?.message}
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />
            </div>

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  icon={<MapPin size={18} />}
                  label={t('dashboard.councilReport.form.locationLabel')}
                  placeholder={t('dashboard.councilReport.form.locationPlaceholder')}
                  error={errors.location?.message}
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="agenda"
              control={control}
              render={({ field }) => (
                <Textarea
                  label={t('dashboard.councilReport.form.agendaLabel')}
                  placeholder={t('dashboard.councilReport.form.agendaPlaceholder')}
                  error={errors.agenda?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />

            <Controller
              name="result"
              control={control}
              render={({ field }) => (
                <Textarea
                  label={t('dashboard.councilReport.form.resultLabel')}
                  placeholder={t('dashboard.councilReport.form.resultPlaceholder')}
                  error={errors.result?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />

            <Controller
              name="recommendation"
              control={control}
              render={({ field }) => (
                <Textarea
                  label={t('dashboard.councilReport.form.recommendationLabel')}
                  placeholder={t('dashboard.councilReport.form.recommendationPlaceholder')}
                  error={errors.recommendation?.message}
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="border-card-border bg-card-hover/20 flex h-fit flex-col gap-6 rounded-xl border p-6">
            <Controller
              name="report_type"
              control={control}
              render={({ field }) => (
                <Select
                  options={reportTypeOptions}
                  value={field.value}
                  onChange={field.onChange}
                  label={t('dashboard.councilReport.form.reportTypeLabel')}
                  error={errors.report_type?.message}
                  placeholder={t('dashboard.councilReport.form.reportTypePlaceholder')}
                  required
                  className="w-full"
                />
              )}
            />

            <Controller
              name="participants_count"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label={t('dashboard.councilReport.form.participantsCountLabel')}
                  placeholder={t('dashboard.councilReport.form.participantsCountPlaceholder')}
                  error={errors.participants_count?.message}
                  onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                  value={field.value ?? ''}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  options={statusOptions}
                  value={field.value}
                  onChange={field.onChange}
                  label={t('dashboard.councilReport.form.statusLabel')}
                  error={errors.status?.message}
                  placeholder={t('dashboard.councilReport.form.statusPlaceholder')}
                  required
                  className="w-full"
                />
              )}
            />

            {currentStatus === 'rejected' && (
              <Controller
                name="rejection_note"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label={t('dashboard.councilReport.form.rejectionNoteLabel')}
                    placeholder={t('dashboard.councilReport.form.rejectionNotePlaceholder')}
                    error={errors.rejection_note?.message}
                    {...field}
                    value={field.value || ''}
                  />
                )}
              />
            )}

            {/* Media Upload */}
            <MediaUpload
              label={t('dashboard.councilReport.form.mediaLabel')}
              description={t('dashboard.councilReport.form.mediaDescription')}
              value={mediaFiles}
              onChange={setMediaFiles}
              captions={mediaCaptions}
              onCaptionsChange={setMediaCaptions}
              existingMedia={reportData?.media || []}
              onDeleteExisting={isEdit ? handleDeleteExistingMedia : undefined}
              isDeletingMedia={isDeletingMedia}
            />

            <div className="border-card-border mt-4 border-t pt-6">
              <Button
                type="submit"
                className="bg-primary shadow-primary/20 hover:bg-primary-dark w-full gap-2 py-4 text-base font-bold text-slate-900 shadow-lg"
                isLoading={isCreating || isUpdating}
                icon={<FileText size={20} />}
              >
                {isEdit ? t('dashboard.councilReport.form.submitUpdate') : t('dashboard.councilReport.form.submitCreate')}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
