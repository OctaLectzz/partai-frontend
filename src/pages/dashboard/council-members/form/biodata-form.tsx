import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import type { CouncilFormValues } from '@/schemas/council-schema'
import { CalendarDays, FileText, MapPin, Users } from 'lucide-react'
import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface BiodataFormProps {
  control: Control<CouncilFormValues>
  errors: FieldErrors<CouncilFormValues>
}

export function BiodataForm({ control, errors }: BiodataFormProps) {
  const { t } = useTranslation()

  const genderOptions = [
    { label: t('dashboard.council.form.genderMale'), value: 'M' },
    { label: t('dashboard.council.form.genderFemale'), value: 'F' }
  ]

  const religionOptions = [
    { label: t('dashboard.council.form.religion.islam'), value: 'islam' },
    { label: t('dashboard.council.form.religion.christian'), value: 'christian' },
    { label: t('dashboard.council.form.religion.catholic'), value: 'catholic' },
    { label: t('dashboard.council.form.religion.hindu'), value: 'hindu' },
    { label: t('dashboard.council.form.religion.buddhist'), value: 'buddhist' },
    { label: t('dashboard.council.form.religion.confucian'), value: 'confucian' }
  ]

  const maritalStatusOptions = [
    { label: t('dashboard.council.form.maritalStatus.single'), value: 'single' },
    { label: t('dashboard.council.form.maritalStatus.married'), value: 'married' },
    { label: t('dashboard.council.form.maritalStatus.divorced'), value: 'divorced' },
    { label: t('dashboard.council.form.maritalStatus.widowed'), value: 'widowed' }
  ]

  const educationOptions = [
    { label: t('dashboard.council.form.education.high_school'), value: 'high_school' },
    { label: t('dashboard.council.form.education.associate_degree'), value: 'associate_degree' },
    { label: t('dashboard.council.form.education.bachelors_degree'), value: 'bachelors_degree' },
    { label: t('dashboard.council.form.education.masters_degree'), value: 'masters_degree' },
    { label: t('dashboard.council.form.education.doctorate'), value: 'doctorate' }
  ]

  return (
    <Card className="flex flex-col gap-6 overflow-visible p-6 shadow-sm">
      <div className="border-card-border mb-2 flex items-center gap-2 border-b pb-4">
        <FileText className="text-primary-dark h-5 w-5" />
        <h2 className="text-foreground text-lg font-bold">{t('dashboard.council.form.biodataSection')}</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Controller
          name="place_of_birth"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.council.form.placeOfBirthLabel')}
              placeholder={t('dashboard.council.form.placeOfBirthPlaceholder')}
              error={errors.place_of_birth?.message}
              icon={<MapPin size={18} />}
              {...field}
              value={field.value || ''}
            />
          )}
        />

        <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <Input
              type="date"
              label={t('dashboard.council.form.dateOfBirthLabel')}
              error={errors.date_of_birth?.message}
              icon={<CalendarDays size={18} />}
              {...field}
              value={field.value || ''}
              required
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              label={t('dashboard.council.form.genderLabel')}
              options={genderOptions}
              error={errors.gender?.message}
              value={field.value || ''}
              onChange={field.onChange}
              required
            />
          )}
        />

        <Controller
          name="religion"
          control={control}
          render={({ field }) => (
            <Select
              label={t('dashboard.council.form.religionLabel')}
              options={religionOptions}
              error={errors.religion?.message}
              value={field.value || ''}
              onChange={field.onChange}
              required
            />
          )}
        />

        <Controller
          name="marital_status"
          control={control}
          render={({ field }) => (
            <Select
              label={t('dashboard.council.form.maritalStatusLabel')}
              options={maritalStatusOptions}
              error={errors.marital_status?.message}
              value={field.value || ''}
              onChange={field.onChange}
              required
            />
          )}
        />

        <Controller
          name="education"
          control={control}
          render={({ field }) => (
            <Select
              label={t('dashboard.council.form.educationLabel')}
              options={educationOptions}
              error={errors.education?.message}
              value={field.value || ''}
              onChange={field.onChange}
              required
            />
          )}
        />

        <div className="md:col-span-2">
          <Controller
            name="profession"
            control={control}
            render={({ field }) => (
              <Input
                label={t('dashboard.council.form.professionLabel')}
                placeholder={t('dashboard.council.form.professionPlaceholder')}
                error={errors.profession?.message}
                icon={<Users size={18} />}
                {...field}
                value={field.value || ''}
                required
              />
            )}
          />
        </div>
      </div>
    </Card>
  )
}
