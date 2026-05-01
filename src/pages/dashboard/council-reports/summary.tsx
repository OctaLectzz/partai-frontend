import { SummaryCard } from '@/components/summary-card'
import type { CouncilReport } from '@/types/council-report'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'

interface CouncilReportSummarySectionProps {
  t: TFunction
  isLoading: boolean
  reports: CouncilReport[]
}

export function CouncilReportSummarySection({ t, isLoading, reports }: CouncilReportSummarySectionProps) {
  const stats = useMemo(() => {
    if (!reports.length) {
      return { total: 0, approved: 0, submitted: 0, draft: 0 }
    }

    const total = reports.length
    const approved = reports.filter((r) => r.status === 'approved').length
    const submitted = reports.filter((r) => r.status === 'submitted').length
    const draft = reports.filter((r) => r.status === 'draft').length

    return { total, approved, submitted, draft }
  }, [reports])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title={t('dashboard.councilReport.summary.totalReports')}
        value={isLoading ? '-' : stats.total.toString()}
        borderColorClass="border-l-blue-500"
        valueColorClass="text-blue-500"
      />

      <SummaryCard
        title={t('dashboard.councilReport.summary.approved')}
        value={isLoading ? '-' : stats.approved.toString()}
        borderColorClass="border-l-emerald-500"
        valueColorClass="text-emerald-500"
      />

      <SummaryCard
        title={t('dashboard.councilReport.summary.submitted')}
        value={isLoading ? '-' : stats.submitted.toString()}
        borderColorClass="border-l-primary"
        valueColorClass="text-primary-dark"
      />

      <SummaryCard
        title={t('dashboard.councilReport.summary.draft')}
        value={isLoading ? '-' : stats.draft.toString()}
        borderColorClass="border-l-slate-400"
        valueColorClass="text-slate-500"
      />
    </div>
  )
}
