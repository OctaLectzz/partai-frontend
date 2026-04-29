import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { CouncilFormValues } from '@/schemas/council-schema'
import { IdCard, Key, User } from 'lucide-react'
import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface IdentityFormProps {
  control: Control<CouncilFormValues>
  errors: FieldErrors<CouncilFormValues>
  isEdit?: boolean
}

export function IdentityForm({ control, errors, isEdit }: IdentityFormProps) {
  const { t } = useTranslation()

  return (
    <Card className="flex flex-col gap-6 p-6 shadow-sm">
      <div className="border-card-border mb-2 flex items-center gap-2 border-b pb-4">
        <User className="text-primary-dark h-5 w-5" />
        <h2 className="text-foreground text-lg font-bold">{t('dashboard.council.form.identitySection')}</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                label={t('dashboard.council.form.nameLabel')}
                placeholder={t('dashboard.council.form.namePlaceholder')}
                error={errors.name?.message}
                {...field}
                required
              />
            )}
          />
        </div>

        <Controller
          name="nik"
          control={control}
          render={({ field }) => (
            <Input
              label={t('dashboard.council.form.nikLabel')}
              placeholder={t('dashboard.council.form.nikPlaceholder')}
              error={errors.nik?.message}
              icon={<IdCard size={18} />}
              {...field}
              value={field.value || ''}
              required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label={t('dashboard.council.form.emailLabel')}
              placeholder={t('dashboard.council.form.emailPlaceholder')}
              error={errors.email?.message}
              {...field}
              value={field.value || ''}
              required
            />
          )}
        />

        {(!isEdit || true) && (
          <>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  label={t('dashboard.council.form.passwordLabel')}
                  placeholder={t('dashboard.council.form.passwordPlaceholder')}
                  error={errors.password?.message}
                  icon={<Key size={18} />}
                  {...field}
                  value={field.value || ''}
                  required={!isEdit}
                />
              )}
            />

            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  label={t('dashboard.council.form.confirmPasswordLabel')}
                  placeholder={t('dashboard.council.form.confirmPasswordPlaceholder')}
                  error={errors.confirm_password?.message}
                  icon={<Key size={18} />}
                  {...field}
                  value={field.value || ''}
                  required={!isEdit}
                />
              )}
            />
          </>
        )}
      </div>
    </Card>
  )
}
