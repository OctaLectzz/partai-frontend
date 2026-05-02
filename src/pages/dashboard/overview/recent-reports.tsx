import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InfoListItem } from '@/components/ui/info-list-item'
import { Skeleton } from '@/components/ui/skeleton'
import type { CouncilReport } from '@/types/council-report'
import type { TFunction } from 'i18next'
import { FileText } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface RecentReportsProps {
  t: TFunction
  reports: CouncilReport[]
  isLoading: boolean
}

const statusVariantMap: Record<string, 'info' | 'success' | 'warning' | 'danger'> = {
  draft: 'warning',
  submitted: 'info',
  approved: 'success',
  rejected: 'danger'
}

const typeIconColorMap: Record<string, string> = {
  meeting: 'bg-violet-500/10 text-violet-500',
  visit: 'bg-emerald-500/10 text-emerald-500',
  socialization: 'bg-blue-500/10 text-blue-500',
  supervision: 'bg-amber-500/10 text-amber-500',
  aspiration: 'bg-rose-500/10 text-rose-500',
  other: 'bg-slate-500/10 text-slate-500'
}

export function RecentReports({ t, reports, isLoading }: RecentReportsProps) {
  const navigate = useNavigate()

  const recentReports = useMemo(() => {
    return [...reports].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
  }, [reports])

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-base font-bold text-foreground">{t('dashboard.overview.recentReports.title')}</h3>
          <p className="mt-0.5 text-xs text-muted">{t('dashboard.overview.recentReports.subtitle')}</p>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-6">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-xl" />
            ))}
          </div>
        ) : recentReports.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">{t('dashboard.overview.emptyState')}</p>
        ) : (
          <div className="flex flex-col gap-1">
            {recentReports.map((report) => {
              const colorClass = typeIconColorMap[report.report_type] || typeIconColorMap.other

              return (
                <InfoListItem
                  key={report.id}
                  icon={
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colorClass.split(' ')[0]}`}>
                      <FileText className={`h-4 w-4 ${colorClass.split(' ')[1]}`} />
                    </div>
                  }
                  title={report.title}
                  subtitle={`${t(`dashboard.councilReport.reportType.${report.report_type}`)} · ${new Date(report.activity_date).toLocaleDateString()}`}
                  trailing={
                    <Badge variant={statusVariantMap[report.status] || 'slate'}>{t(`dashboard.councilReport.status.${report.status}`)}</Badge>
                  }
                  onClick={() => navigate(`/dashboard/council-activity-reports/show/${report.id}`)}
                />
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
