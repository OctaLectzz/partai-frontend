import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCategories } from '@/hooks/use-category'
import { useCreateEvent, useEvent, useUpdateEvent } from '@/hooks/use-event'
import { eventSchema, type EventFormValues } from '@/schemas/event-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export default function EventForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { slug } = useParams()
  const isEdit = Boolean(slug)

  const { data: categoriesData } = useCategories()
  const { data: eventData, isLoading: isLoadingEvent } = useEvent(slug || '')
  const { mutateAsync: createEvent, isPending: isCreating } = useCreateEvent()
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'draft'
    }
  })

  useEffect(() => {
    if (isEdit && eventData) {
      reset({
        name: eventData.name,
        description: eventData.description || '',
        category_id: eventData.category_id,
        organizer: eventData.organizer,
        target_participants: eventData.target_participants || 0,
        start_date: eventData.start_date,
        start_time: eventData.start_time,
        end_date: eventData.end_date || '',
        end_time: eventData.end_time || '',
        location: eventData.location,
        status: eventData.status as any
      })
    }
  }, [isEdit, eventData, reset])

  const categoryOptions = useMemo(() => {
    return (categoriesData || []).map((cat) => ({
      label: cat.name,
      value: String(cat.id)
    }))
  }, [categoriesData])

  const statusOptions = [
    { label: t('dashboard.events.status.draft'), value: 'draft' },
    { label: t('dashboard.events.status.published'), value: 'published' },
    { label: t('dashboard.events.status.completed'), value: 'completed' },
    { label: t('dashboard.events.status.cancelled'), value: 'cancelled' }
  ]

  const onSubmit = async (values: EventFormValues) => {
    if (isEdit && slug) {
      await updateEvent({ ...values, slug })
    } else {
      await createEvent(values)
    }
    navigate('/dashboard/events')
  }

  if (isEdit && isLoadingEvent) {
    return <div className="p-6 text-center">{t('public.loadingText')}</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/events')}
          className="text-muted hover:text-foreground border-card-border bg-card h-9 gap-2 rounded-lg border px-3 transition-colors"
          icon={<ArrowLeft size={16} />}
        >
          {t('dashboard.events.form.backToList')}
        </Button>

        <div>
          <h1 className="text-foreground text-2xl font-bold">
            {isEdit ? t('dashboard.events.form.editTitle') : t('dashboard.events.form.createTitle')}
          </h1>
          <p className="text-muted mt-1 text-sm">{isEdit ? t('dashboard.events.form.editSubtitle') : t('dashboard.events.form.createSubtitle')}</p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-3">
          {/* Main Content (Left Column) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('dashboard.events.form.nameLabel')}
                  placeholder={t('dashboard.events.form.namePlaceholder')}
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label={t('dashboard.events.form.descriptionLabel')}
                  placeholder={t('dashboard.events.form.descriptionPlaceholder')}
                  error={errors.description?.message}
                  {...field}
                />
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <Input type="date" label={t('dashboard.events.form.startDateLabel')} error={errors.start_date?.message} {...field} />
                )}
              />
              <Controller
                name="start_time"
                control={control}
                render={({ field }) => (
                  <Input type="time" label={t('dashboard.events.form.startTimeLabel')} error={errors.start_time?.message} {...field} />
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <Input type="date" label={t('dashboard.events.form.endDateLabel')} error={errors.end_date?.message} {...field} />
                )}
              />
              <Controller
                name="end_time"
                control={control}
                render={({ field }) => (
                  <Input type="time" label={t('dashboard.events.form.endTimeLabel')} error={errors.end_time?.message} {...field} />
                )}
              />
            </div>

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  icon={<MapPin size={18} />}
                  label={t('dashboard.events.form.locationLabel')}
                  placeholder={t('dashboard.events.form.locationPlaceholder')}
                  error={errors.location?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="bg-card-hover/20 border-card-border flex h-fit flex-col gap-6 rounded-xl border p-6">
            <Controller
              name="organizer"
              control={control}
              render={({ field }) => (
                <Input
                  label={t('dashboard.events.form.organizerLabel')}
                  placeholder={t('dashboard.events.form.organizerPlaceholder')}
                  error={errors.organizer?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="target_participants"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label={t('dashboard.events.form.targetParticipantsLabel')}
                  placeholder={t('dashboard.events.form.targetParticipantsPlaceholder')}
                  error={errors.target_participants?.message}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                />
              )}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-foreground text-sm font-medium">{t('dashboard.events.form.categoryLabel')}</label>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    options={categoryOptions}
                    value={String(field.value || '')}
                    onChange={(val) => field.onChange(Number(val))}
                    placeholder={t('dashboard.events.form.categoryPlaceholder')}
                    className="w-full"
                  />
                )}
              />
              {errors.category_id && <p className="text-xs text-red-400">{errors.category_id.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-foreground text-sm font-medium">{t('dashboard.events.form.statusLabel')}</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    options={statusOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t('dashboard.events.form.statusPlaceholder')}
                    className="w-full"
                  />
                )}
              />
              {errors.status && <p className="text-xs text-red-400">{errors.status.message}</p>}
            </div>

            <div className="border-card-border mt-4 border-t pt-6">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-dark shadow-primary/20 w-full gap-2 py-4 text-base font-bold text-slate-900 shadow-lg"
                isLoading={isCreating || isUpdating}
                icon={<CalendarDays size={20} />}
              >
                {isEdit ? t('dashboard.events.form.submitUpdate') : t('dashboard.events.form.submitCreate')}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
