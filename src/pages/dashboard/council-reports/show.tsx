import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCouncilReport } from '@/hooks/use-council-report'
import { ArrowLeft, Calendar, Clock, FileText, MapPin, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { MediaGallery } from './media-gallery'

const STATUS_VARIANTS: Record<string, BadgeVariant> = {
  draft: 'slate',
  submitted: 'info',
  approved: 'success',
  rejected: 'danger'
}

export default function CouncilReportDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const numericId = Number(id)

  const { data: report, isLoading } = useCouncilReport(numericId)

  if (isLoading) {
    return <div className="p-8 text-center">{t('public.loadingText')}</div>
  }

  if (!report) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted">{t('public.noData')}</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/dashboard/council-activity-reports')}>
          {t('public.backToList')}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/council-activity-reports')}
            className="h-9 gap-2 rounded-lg border border-card-border bg-card px-3 text-muted transition-colors hover:text-foreground"
            icon={<ArrowLeft size={16} />}
          >
            {t('public.backToList')}
          </Button>

          <Badge variant={STATUS_VARIANTS[report.status] || 'slate'} className="px-4 py-1.5 text-sm shadow-lg">
            {t(`dashboard.councilReport.status.${report.status}`)}
          </Badge>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.councilReport.detail.title')}</h1>
          <p className="mt-1 text-sm text-muted">{t('dashboard.councilReport.detail.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-extrabold text-foreground">{report.title}</h2>
              <p className="mt-2 text-lg leading-relaxed text-muted">{report.description?.split('\n')[0]}</p>

              {/* Sections */}
              {report.agenda && (
                <div className="mt-10">
                  <h3 className="inline-block border-b-2 border-primary pb-1 text-lg font-bold text-foreground">
                    {t('dashboard.councilReport.detail.agendaLabel')}
                  </h3>
                  <div className="mt-4 leading-relaxed whitespace-pre-wrap text-muted">{report.agenda}</div>
                </div>
              )}

              {report.result && (
                <div className="mt-8">
                  <h3 className="inline-block border-b-2 border-emerald-500 pb-1 text-lg font-bold text-foreground">
                    {t('dashboard.councilReport.detail.resultLabel')}
                  </h3>
                  <div className="mt-4 leading-relaxed whitespace-pre-wrap text-muted">{report.result}</div>
                </div>
              )}

              {report.recommendation && (
                <div className="mt-8">
                  <h3 className="inline-block border-b-2 border-amber-500 pb-1 text-lg font-bold text-foreground">
                    {t('dashboard.councilReport.detail.recommendationLabel')}
                  </h3>
                  <div className="mt-4 leading-relaxed whitespace-pre-wrap text-muted">{report.recommendation}</div>
                </div>
              )}

              {report.description && (
                <div className="mt-8">
                  <h3 className="inline-block border-b-2 border-primary pb-1 text-lg font-bold text-foreground">
                    {t('dashboard.councilReport.detail.descriptionLabel')}
                  </h3>
                  <div className="mt-4 leading-relaxed whitespace-pre-wrap text-muted">{report.description}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Activity Details Card */}
          <Card className="shadow-lg">
            <CardContent className="flex flex-col gap-4 p-6">
              <h3 className="text-lg font-bold text-foreground">Detail Kegiatan</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 rounded-xl border border-card-border bg-card-hover/20 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.dateLabel')}</p>
                    <p className="font-bold text-foreground">{report.activity_date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-card-border bg-card-hover/20 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.timeLabel')}</p>
                    <p className="font-bold text-foreground">
                      {report.start_time || '-'} - {report.end_time || '-'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-card-border bg-card-hover/20 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.locationLabel')}</p>
                    <p className="font-bold text-foreground">{report.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-card-border bg-card-hover/20 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.participantsLabel')}</p>
                    <p className="font-bold text-foreground">{report.participants_count ?? '-'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Info Card */}
          <Card className="shadow-lg">
            <CardContent className="flex flex-col gap-4 p-6">
              <h3 className="text-lg font-bold text-foreground">{t('dashboard.councilReport.detail.reportInfoTitle')}</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{t('dashboard.councilReport.detail.reportTypeLabel')}</span>
                  <Badge variant="primary">{t(`dashboard.councilReport.reportType.${report.report_type}`)}</Badge>
                </div>
                {report.user && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">{t('dashboard.councilReport.detail.submitterLabel')}</span>
                    <span className="text-sm font-semibold text-foreground">{report.user.name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{t('dashboard.councilReport.detail.createdAtLabel')}</span>
                  <span className="text-sm font-semibold text-foreground">{new Date(report.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rejection Note */}
          {report.status === 'rejected' && report.rejection_note && (
            <Card topBarColor="bg-red-500" className="border-red-200/50 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10">
              <CardContent className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <FileText size={20} />
                  <h3 className="font-bold">{t('dashboard.councilReport.detail.rejectionNoteLabel')}</h3>
                </div>
                <p className="text-sm text-red-600 dark:text-red-300">{report.rejection_note}</p>
              </CardContent>
            </Card>
          )}

          {/* Edit Button */}
          <Button
            onClick={() => navigate(`/dashboard/council-activity-reports/edit/${report.id}`)}
            className="w-full gap-2 bg-primary font-semibold text-slate-900 shadow-lg shadow-primary/20 hover:bg-primary-dark"
          >
            {t('dashboard.councilReport.detail.editReport')}
          </Button>
        </div>
      </div>

      {/* Media Gallery */}
      {report.media && report.media.length > 0 && <MediaGallery media={report.media} />}
    </div>
  )
}
