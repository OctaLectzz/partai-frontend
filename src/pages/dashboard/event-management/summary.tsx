import { SummaryCard } from '@/components/summary-card'
import type { Event } from '@/types/event'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'

interface EventSummarySectionProps {
  t: TFunction
  isLoading: boolean
  events: Event[]
}

export function EventSummarySection({ t, isLoading, events }: EventSummarySectionProps) {
  const stats = useMemo(() => {
    if (!events.length) {
      return { total: 0, upcoming: 0, participants: 0, avgAttendance: 0 }
    }

    const total = events.length
    const upcoming = events.filter((e) => e.status === 'published').length
    const participants = events.reduce((sum, e) => sum + (e.participants_count || 0), 0)

    const eventsWithTarget = events.filter((e) => e.target_participants && e.target_participants > 0)
    const avgAttendance =
      eventsWithTarget.length > 0
        ? Math.round(
            eventsWithTarget.reduce((sum, e) => {
              return sum + ((e.participants_count || 0) / (e.target_participants || 1)) * 100
            }, 0) / eventsWithTarget.length
          )
        : 0

    return { total, upcoming, participants, avgAttendance }
  }, [events])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title={t('dashboard.events.summary.totalEvents')}
        value={isLoading ? '-' : stats.total.toString()}
        borderColorClass="border-l-blue-500"
        valueColorClass="text-blue-500"
      />

      <SummaryCard
        title={t('dashboard.events.summary.upcoming')}
        value={isLoading ? '-' : stats.upcoming.toString()}
        borderColorClass="border-l-emerald-500"
        valueColorClass="text-emerald-500"
      />

      <SummaryCard
        title={t('dashboard.events.summary.totalParticipants')}
        value={isLoading ? '-' : stats.participants.toString()}
        borderColorClass="border-l-primary"
        valueColorClass="text-primary-dark"
      />

      <SummaryCard
        title={t('dashboard.events.summary.avgAttendance')}
        value={isLoading ? '-' : `${stats.avgAttendance}%`}
        borderColorClass="border-l-purple-500"
        valueColorClass="text-purple-500"
      />
    </div>
  )
}
