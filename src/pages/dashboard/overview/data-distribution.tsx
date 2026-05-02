import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { StatBar } from '@/components/ui/stat-bar'
import type { Event } from '@/types/event'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'

interface DataDistributionProps {
  t: TFunction
  massas: Massa[]
  events: Event[]
  isLoading: boolean
}

export function DataDistribution({ t, massas, events, isLoading }: DataDistributionProps) {
  const genderStats = useMemo(() => {
    const male = massas.filter((m) => m.gender === 'M').length
    const female = massas.filter((m) => m.gender === 'F').length
    return { male, female, total: massas.length }
  }, [massas])

  const eventStatusStats = useMemo(() => {
    const draft = events.filter((e) => e.status === 'draft').length
    const published = events.filter((e) => e.status === 'published').length
    const completed = events.filter((e) => e.status === 'completed').length
    const cancelled = events.filter((e) => e.status === 'cancelled').length
    return { draft, published, completed, cancelled, total: events.length }
  }, [events])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-[220px] rounded-2xl" />
        <Skeleton className="h-[220px] rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-base font-bold text-foreground">{t('dashboard.overview.distribution.genderTitle')}</h3>
            <p className="mt-0.5 text-xs text-muted">{t('dashboard.overview.distribution.genderSubtitle')}</p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 px-8 pb-8">
          <StatBar
            label={t('dashboard.overview.distribution.male')}
            value={genderStats.male}
            total={genderStats.total}
            colorClass="bg-blue-500"
            bgColorClass="bg-blue-500/10"
          />

          <StatBar
            label={t('dashboard.overview.distribution.female')}
            value={genderStats.female}
            total={genderStats.total}
            colorClass="bg-pink-500"
            bgColorClass="bg-pink-500/10"
          />

          {/* Total indicator */}
          <div className="mt-2 flex items-center justify-between border-t border-card-border pt-3">
            <span className="text-xs font-medium tracking-wider text-muted uppercase">{t('dashboard.overview.distribution.total')}</span>
            <span className="text-lg font-bold text-foreground">{genderStats.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Event Status Distribution */}
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-base font-bold text-foreground">{t('dashboard.overview.distribution.eventStatusTitle')}</h3>
            <p className="mt-0.5 text-xs text-muted">{t('dashboard.overview.distribution.eventStatusSubtitle')}</p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 px-8 pb-8">
          <StatBar
            label={t('dashboard.events.status.published')}
            value={eventStatusStats.published}
            total={eventStatusStats.total}
            colorClass="bg-blue-500"
            bgColorClass="bg-blue-500/10"
          />

          <StatBar
            label={t('dashboard.events.status.completed')}
            value={eventStatusStats.completed}
            total={eventStatusStats.total}
            colorClass="bg-emerald-500"
            bgColorClass="bg-emerald-500/10"
          />

          <StatBar
            label={t('dashboard.events.status.draft')}
            value={eventStatusStats.draft}
            total={eventStatusStats.total}
            colorClass="bg-amber-500"
            bgColorClass="bg-amber-500/10"
          />
          <StatBar
            label={t('dashboard.events.status.cancelled')}
            value={eventStatusStats.cancelled}
            total={eventStatusStats.total}
            colorClass="bg-red-500"
            bgColorClass="bg-red-500/10"
          />
        </CardContent>
      </Card>
    </div>
  )
}
