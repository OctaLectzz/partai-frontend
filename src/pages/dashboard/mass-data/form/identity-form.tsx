import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { MassaFormValues } from '@/schemas/massa-schema'
import { User } from 'lucide-react'
import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IdentityFormProps {
  control: Control<MassaFormValues>
  errors: FieldErrors<MassaFormValues>
}

export const IdentityForm = ({ control, errors }: IdentityFormProps) => {
  const { t } = useTranslation()

  const genderOptions = [
    { label: t('public.gender.male'), value: 'M' },
    { label: t('public.gender.female'), value: 'F' }
  ]

  return (
    <Card className="flex flex-col gap-6 overflow-visible p-8 shadow-xl">
      <div className="border-primary border-b pb-4">
        <h3 className="text-foreground text-lg font-bold">{t('dashboard.massa.form.identitySection')}</h3>
      </div>

      <div className="flex flex-col gap-6">
        <Controller
          name="nik"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              label={t('dashboard.massa.form.nikLabel')}
              placeholder={t('dashboard.massa.form.nikPlaceholder')}
              description={t('dashboard.massa.form.nikDescription')}
              error={errors.nik?.message}
              required
              {...field}
            />
          )}
        />

        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <Input
              icon={<User size={18} />}
              label={t('dashboard.massa.form.fullNameLabel')}
              placeholder={t('dashboard.massa.form.fullNamePlaceholder')}
              description={t('dashboard.massa.form.fullNameDescription')}
              error={errors.full_name?.message}
              required
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="place_of_birth"
            control={control}
            render={({ field }) => (
              <Input
                label={t('dashboard.massa.form.placeOfBirthLabel')}
                placeholder={t('dashboard.massa.form.placeOfBirthPlaceholder')}
                error={errors.place_of_birth?.message}
                {...field}
                value={field.value || ''}
              />
            )}
          />
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field }) => (
              <Input type="date" label={t('dashboard.massa.form.dateOfBirthLabel')} error={errors.date_of_birth?.message} required {...field} />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                options={genderOptions}
                value={field.value}
                onChange={field.onChange}
                label={t('dashboard.massa.form.genderLabel')}
                error={errors.gender?.message}
                placeholder={t('dashboard.massa.form.genderPlaceholder')}
                required
                className="w-full"
              />
            )}
          />

          <Controller
            name="profession"
            control={control}
            render={({ field }) => (
              <Input
                label={t('dashboard.massa.form.professionLabel')}
                placeholder={t('dashboard.massa.form.professionPlaceholder')}
                error={errors.profession?.message}
                {...field}
                value={field.value || ''}
              />
            )}
          />
        </div>
      </div>
    </Card>
  )
}
