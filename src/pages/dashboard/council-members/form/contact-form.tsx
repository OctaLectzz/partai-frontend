import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { CouncilFormValues } from '@/schemas/council-schema'
import { Save } from 'lucide-react'
import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface ContactFormProps {
  control: Control<CouncilFormValues>
  errors: FieldErrors<CouncilFormValues>
  isCreating: boolean
  isUpdating: boolean
  isEdit: boolean
}

export const ContactForm = ({ control, errors, isCreating, isUpdating, isEdit }: ContactFormProps) => {
  const { t } = useTranslation()

  const statusOptions = [
    { label: t('public.status.active'), value: 'true' },
    { label: t('public.status.inactive'), value: 'false' }
  ]

  return (
    <Card className="flex h-fit flex-col gap-6 p-6 shadow-lg">
      <div className="border-primary border-b pb-4">
        <h3 className="text-foreground text-lg font-bold">{t('dashboard.council.form.contactSection')}</h3>
      </div>

      <div className="flex flex-col gap-6">
        <Controller
          name="photo"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ImageUpload
              label={t('dashboard.council.form.photoLabel')}
              description={t('dashboard.massa.form.photoDescription')}
              error={errors.photo?.message}
              value={value as string | File | null}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="ktp_photo"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ImageUpload
              label={t('dashboard.council.form.ktpPhotoLabel')}
              description={t('dashboard.massa.form.photoDescription')}
              error={errors.ktp_photo?.message}
              value={value as string | File | null}
              onChange={onChange}
              aspect={16 / 9}
            />
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              label={t('dashboard.council.form.phoneNumberLabel')}
              placeholder={t('dashboard.council.form.phoneNumberPlaceholder')}
              error={errors.phone_number?.message}
              {...field}
              value={field.value || ''}
              required
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              options={statusOptions}
              value={String(field.value)}
              onChange={(val) => field.onChange(val === 'true')}
              label={t('dashboard.council.form.statusLabel')}
              error={errors.status?.message}
              placeholder={t('dashboard.council.form.statusPlaceholder')}
              className="w-full"
            />
          )}
        />

        <div className="border-card-border mt-4 border-t pt-6">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-dark shadow-primary/20 w-full gap-2 py-4 text-base font-bold text-slate-900 shadow-lg transition-all active:scale-95"
            isLoading={isCreating || isUpdating}
            icon={<Save size={20} />}
          >
            {isEdit ? t('dashboard.council.form.submitUpdate') : t('dashboard.council.form.submitCreate')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
