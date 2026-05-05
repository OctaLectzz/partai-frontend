import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useEvents } from '@/hooks/use-event'
import type { Event } from '@/types/event'
import { Calendar, MapPin, QrCode, Search, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function QrCheckin() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: events = [], isLoading } = useEvents()
  const [search, setSearch] = useState('')

  // Filter only published events
  const publishedEvents = useMemo(() => {
    return events
      .filter((event) => event.status === 'published')
      .filter((event) => {
        if (!search) return true
        const q = search.toLowerCase()
        return event.name.toLowerCase().includes(q) || event.location.toLowerCase().includes(q) || event.organizer.toLowerCase().includes(q)
      })
  }, [events, search])

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">{t('dashboard.qrCheckin.title')}</h1>
          <p className="text-muted mt-1 text-sm">{t('dashboard.qrCheckin.subtitle')}</p>
        </div>
      </div>

      {/* Event Selection Section */}
      <Card className="shadow-2xl">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-foreground text-lg font-bold">{t('dashboard.qrCheckin.selectEvent.title')}</h2>
              <p className="text-muted text-sm">{t('dashboard.qrCheckin.selectEvent.subtitle')}</p>
            </div>

            <div className="w-full sm:w-72">
              <Input
                icon={<Search size={16} />}
                placeholder={t('dashboard.qrCheckin.selectEvent.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-card-border bg-card flex h-[280px] w-full flex-col gap-4 rounded-2xl border p-5">
                  <div className="flex justify-between gap-4">
                    <Skeleton className="h-6 flex-1" />
                    <Skeleton className="h-6 w-20 shrink-0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="mt-2 h-10 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && publishedEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-primary/10 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                <QrCode size={40} className="text-primary" />
              </div>
              <p className="text-muted text-sm">{t('dashboard.qrCheckin.selectEvent.noEvents')}</p>
            </div>
          )}

          {/* Event Cards Grid */}
          {!isLoading && publishedEvents.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {publishedEvents.map((event) => (
                <EventCheckinCard key={event.id} event={event} onSelect={() => navigate(`/dashboard/qr-checkin/${event.slug}`)} t={t} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Event Check-in Card
interface EventCheckinCardProps {
  event: Event
  onSelect: () => void
  t: (key: string) => string
}

function EventCheckinCard({ event, onSelect, t }: EventCheckinCardProps) {
  const participantCount = event.participants_count || 0
  const target = event.target_participants || 0
  const percentage = target > 0 ? Math.min(100, Math.round((participantCount / target) * 100)) : 0

  return (
    <Card
      withTopBar={false}
      className="group border-card-border flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        {/* Event Name + Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-foreground line-clamp-2 text-base leading-snug font-bold">{event.name}</h3>
          <Badge variant="info" className="shrink-0">
            {t('dashboard.events.status.published')}
          </Badge>
        </div>

        {/* Event Info */}
        <div className="flex flex-col gap-2">
          <div className="text-muted flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-primary shrink-0" />
            <span className="truncate">
              {event.start_date} • {event.start_time}
            </span>
          </div>

          <div className="text-muted flex items-center gap-2 text-sm">
            <MapPin size={14} className="shrink-0 text-emerald-500" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="text-muted flex items-center gap-2 text-sm">
            <Users size={14} className="shrink-0 text-blue-500" />
            <span>{event.organizer}</span>
          </div>
        </div>

        {/* Participant Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted font-medium">
              {t('dashboard.qrCheckin.selectEvent.registered')}: {participantCount}
            </span>
            {target > 0 && (
              <span className="text-primary font-semibold">
                {t('dashboard.qrCheckin.selectEvent.target')}: {target}
              </span>
            )}
          </div>

          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
          className="bg-primary hover:bg-primary-dark mt-auto w-full gap-2 font-semibold text-slate-900 shadow-md transition-all hover:-translate-y-0.5"
          icon={<QrCode size={16} />}
        >
          {t('dashboard.qrCheckin.selectEvent.startCheckin')}
        </Button>
      </CardContent>
    </Card>
  )
}
