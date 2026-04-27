import { CopyableLinkField } from '@/components/copyable-link-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEvent } from '@/hooks/use-event'
import { cn } from '@/lib/utils'
import { ArrowLeft, Calendar, Clock, ExternalLink, Info, MapPin, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ParticipantsTable } from './participants'

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  published: 'bg-blue-500 text-white shadow-sm shadow-blue-500/20',
  completed: 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20',
  cancelled: 'bg-red-500 text-white shadow-sm shadow-red-500/20'
}

export default function EventDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: event, isLoading } = useEvent(slug || '')

  if (isLoading) {
    return <div className="p-8 text-center">{t('public.loadingText')}</div>
  }

  if (!event) {
    return <div className="p-8 text-center text-red-500">Event tidak ditemukan.</div>
  }

  const registrationLink = `${window.location.origin}/register-event.html?slug=${slug}`

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/events')}
            className="text-muted hover:text-foreground border-card-border bg-card h-9 gap-2 rounded-lg border px-3 transition-colors"
            icon={<ArrowLeft size={16} />}
          >
            {t('dashboard.events.form.backToList')}
          </Button>

          <span
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-bold shadow-lg',
              STATUS_COLORS[event.status] || 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            )}
          >
            {t(`dashboard.events.status.${event.status}`)}
          </span>
        </div>

        <div>
          <h1 className="text-foreground text-2xl font-bold">{t('dashboard.events.detail.title')}</h1>
          <p className="text-muted mt-1 text-sm">{t('dashboard.events.detail.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2">
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-foreground text-2xl font-extrabold">{event.name}</h2>
              <p className="text-muted mt-2 text-lg leading-relaxed">{event.description?.split('\n')[0]}</p>

              {/* Info Grid */}
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-card-hover/20 border-card-border flex items-center gap-4 rounded-xl border p-4">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-muted text-xs font-medium tracking-wider uppercase">{t('dashboard.events.detail.dateLabel')}</p>
                    <p className="text-foreground font-bold">{event.start_date}</p>
                  </div>
                </div>

                <div className="bg-card-hover/20 border-card-border flex items-center gap-4 rounded-xl border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-muted text-xs font-medium tracking-wider uppercase">{t('dashboard.events.detail.timeLabel')}</p>
                    <p className="text-foreground font-bold">
                      {event.start_time} - {event.end_time || 'Selesai'} WIB
                    </p>
                  </div>
                </div>

                <div className="bg-card-hover/20 border-card-border flex items-center gap-4 rounded-xl border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-muted text-xs font-medium tracking-wider uppercase">{t('dashboard.events.detail.locationLabel')}</p>
                    <p className="text-foreground font-bold">{event.location}</p>
                  </div>
                </div>

                <div className="bg-card-hover/20 border-card-border flex items-center gap-4 rounded-xl border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-muted text-xs font-medium tracking-wider uppercase">{t('dashboard.events.detail.organizerLabel')}</p>
                    <p className="text-foreground font-bold">{event.organizer}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-foreground border-primary inline-block border-b-2 pb-1 text-lg font-bold">
                  {t('dashboard.events.detail.descriptionLabel')}
                </h3>
                <div className="text-muted mt-4 leading-relaxed whitespace-pre-wrap">{event.description}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="flex flex-col gap-6">
          <Card topBarColor="bg-amber-500" className="border-amber-200/50 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <ExternalLink size={20} />
                <h3 className="font-bold">{t('dashboard.events.detail.registrationLink.title')}</h3>
              </div>
              <p className="text-muted text-sm">{t('dashboard.events.detail.registrationLink.subtitle')}</p>

              <CopyableLinkField link={registrationLink} variant="amber" />

              <div className="mt-2 flex items-start gap-2 text-[11px] text-amber-800 dark:text-amber-500">
                <Info size={14} className="mt-0.5 shrink-0" />
                <p>{t('dashboard.events.detail.registrationLink.info')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="flex flex-col gap-6 p-6">
              <h3 className="text-foreground text-lg font-bold">{t('dashboard.events.detail.participantStatus.title')}</h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">{t('dashboard.events.detail.participantStatus.registered')}</span>
                    <span className="text-foreground font-bold">{event.participants_count || 0}</span>
                  </div>

                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.min(100, ((event.participants_count || 0) / (event.target_participants || 1)) * 100)}%`
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">{t('dashboard.events.detail.participantStatus.capacity')}</span>
                    <span className="text-foreground font-bold">{event.target_participants || '-'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Participants Table */}
      <ParticipantsTable participants={event.participants || []} />
    </div>
  )
}
