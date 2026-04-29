import { Card, CardContent } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { KtaFormValues } from '@/schemas/kta-schema'
import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IdentityFormProps {
  control: Control<KtaFormValues>
  errors: FieldErrors<KtaFormValues>
}

export const IdentityForm = ({ control, errors }: IdentityFormProps) => {
  const { t } = useTranslation()

  return (
    <Card className="overflow-visible shadow-sm">
      <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <h3 className="mb-4 border-b pb-2 text-lg font-bold">{t('dashboard.kta.form.identitySection')}</h3>
        </div>

        <div className="flex justify-center pb-4 md:col-span-2">
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                label={t('public.image.photoLabel')}
                description={t('public.image.description')}
                error={errors.photo?.message as string}
                aspect={3 / 4}
              />
            )}
          />
        </div>

        <Controller
          name="nik"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.kta.form.nikLabel')}
              placeholder={t('dashboard.kta.form.nikPlaceholder')}
              error={errors.nik?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.kta.form.nameLabel')}
              placeholder={t('dashboard.kta.form.namePlaceholder')}
              error={errors.name?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.kta.form.phoneNumberLabel')}
              placeholder={t('dashboard.kta.form.phoneNumberPlaceholder')}
              error={errors.phone_number?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.kta.form.positionLabel')}
              placeholder={t('dashboard.kta.form.positionPlaceholder')}
              error={errors.position?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="place_of_birth"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.kta.form.placeOfBirthLabel')}
              placeholder={t('dashboard.kta.form.placeOfBirthPlaceholder')}
              error={errors.place_of_birth?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <Input type="date" label={t('dashboard.kta.form.dateOfBirthLabel')} error={errors.date_of_birth?.message} required {...field} />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              label={t('public.gender.label')}
              options={[
                { label: t('public.gender.male'), value: 'M' },
                { label: t('public.gender.female'), value: 'F' }
              ]}
              value={field.value}
              onChange={field.onChange}
              error={errors.gender?.message}
              required
            />
          )}
        />
      </CardContent>
    </Card>
  )
}
