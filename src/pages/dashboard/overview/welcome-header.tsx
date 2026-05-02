import { useAuth } from '@/contexts/auth-context'
import type { TFunction } from 'i18next'

interface WelcomeHeaderProps {
  t: TFunction
}

export function WelcomeHeader({ t }: WelcomeHeaderProps) {
  const { user } = useAuth()

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t('dashboard.overview.welcome', { name: user?.name?.split(' ')[0] || 'Admin' })}
        </h1>
        <p className="mt-1 text-sm text-muted">{t('dashboard.overview.subtitle')}</p>
      </div>
      <span className="text-xs font-medium text-muted">{today}</span>
    </div>
  )
}
