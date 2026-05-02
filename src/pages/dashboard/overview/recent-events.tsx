import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InfoListItem } from '@/components/ui/info-list-item'
import { Skeleton } from '@/components/ui/skeleton'
import type { Event } from '@/types/event'
import type { TFunction } from 'i18next'
import { Calendar } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface RecentEventsProps {
  t: TFunction
  events: Event[]
  isLoading: boolean
}

const statusVariantMap: Record<string, 'info' | 'success' | 'warning' | 'danger'> = {
  draft: 'warning',
  published: 'info',
  completed: 'success',
  cancelled: 'danger'
}

export function RecentEvents({ t, events, isLoading }: RecentEventsProps) {
  const navigate = useNavigate()

  const recentEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
  }, [events])

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-base font-bold text-foreground">{t('dashboard.overview.recentEvents.title')}</h3>
          <p className="mt-0.5 text-xs text-muted">{t('dashboard.overview.recentEvents.subtitle')}</p>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-6">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-xl" />
            ))}
          </div>
        ) : recentEvents.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">{t('dashboard.overview.emptyState')}</p>
        ) : (
          <div className="flex flex-col gap-1">
            {recentEvents.map((event) => (
              <InfoListItem
                key={event.id}
                icon={
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                }
                title={event.name}
                subtitle={`${event.location} · ${new Date(event.start_date).toLocaleDateString()}`}
                trailing={<Badge variant={statusVariantMap[event.status] || 'slate'}>{t(`dashboard.events.status.${event.status}`)}</Badge>}
                onClick={() => navigate(`/dashboard/events/show/${event.slug}`)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
