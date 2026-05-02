import { SummaryCard } from '@/components/summary-card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Council } from '@/types/council'
import type { CouncilReport } from '@/types/council-report'
import type { Event } from '@/types/event'
import type { Kta } from '@/types/kta'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import { Calendar, CheckCircle, CreditCard, FileText, Users, UsersRound } from 'lucide-react'
import { useMemo } from 'react'

interface OverviewSummaryProps {
  t: TFunction
  events: Event[]
  massas: Massa[]
  councils: Council[]
  ktas: Kta[]
  reports: CouncilReport[]
  isLoading: boolean
}

export function OverviewSummary({ t, events, massas, councils, ktas, reports, isLoading }: OverviewSummaryProps) {
  const stats = useMemo(() => {
    return {
      totalEvents: events.length,
      totalMassa: massas.length,
      totalCouncils: councils.length,
      totalKta: ktas.length,
      totalReports: reports.length,
      approvedReports: reports.filter((r) => r.status === 'approved').length
    }
  }, [events, massas, councils, ktas, reports])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[100px] rounded-2xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <SummaryCard
        title={t('dashboard.overview.summary.totalEvents')}
        value={stats.totalEvents}
        icon={<Calendar className="h-6 w-6" />}
        borderColorClass="border-l-blue-500"
        valueColorClass="text-blue-500"
      />
      <SummaryCard
        title={t('dashboard.overview.summary.totalMassa')}
        value={stats.totalMassa}
        icon={<Users className="h-6 w-6" />}
        borderColorClass="border-l-emerald-500"
        valueColorClass="text-emerald-500"
      />
      <SummaryCard
        title={t('dashboard.overview.summary.totalCouncils')}
        value={stats.totalCouncils}
        icon={<UsersRound className="h-6 w-6" />}
        borderColorClass="border-l-violet-500"
        valueColorClass="text-violet-500"
      />
      <SummaryCard
        title={t('dashboard.overview.summary.totalKta')}
        value={stats.totalKta}
        icon={<CreditCard className="h-6 w-6" />}
        borderColorClass="border-l-primary"
        valueColorClass="text-primary-dark"
      />
      <SummaryCard
        title={t('dashboard.overview.summary.totalReports')}
        value={stats.totalReports}
        icon={<FileText className="h-6 w-6" />}
        borderColorClass="border-l-orange-500"
        valueColorClass="text-orange-500"
      />
      <SummaryCard
        title={t('dashboard.overview.summary.approvedReports')}
        value={stats.approvedReports}
        icon={<CheckCircle className="h-6 w-6" />}
        borderColorClass="border-l-teal-500"
        valueColorClass="text-teal-500"
      />
    </div>
  )
}
