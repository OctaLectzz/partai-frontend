import { useCouncils } from '@/hooks/use-council'
import { useCouncilReports } from '@/hooks/use-council-report'
import { useEvents } from '@/hooks/use-event'
import { useKtas } from '@/hooks/use-kta'
import { useMassas } from '@/hooks/use-massa'
import { useTranslation } from 'react-i18next'
import { DataDistribution } from './data-distribution'
import { LatestMembers } from './latest-members'
import { OverviewSummary } from './overview-summary'
import { QuickActions } from './quick-actions'
import { RecentEvents } from './recent-events'
import { RecentReports } from './recent-reports'
import { WelcomeHeader } from './welcome-header'

export default function Overview() {
  const { t } = useTranslation()

  const { data: events = [], isLoading: eventsLoading } = useEvents()
  const { data: massas = [], isLoading: massasLoading } = useMassas()
  const { data: councils = [], isLoading: councilsLoading } = useCouncils()
  const { data: ktas = [], isLoading: ktasLoading } = useKtas()
  const { data: reports = [], isLoading: reportsLoading } = useCouncilReports()

  const isLoading = eventsLoading || massasLoading || councilsLoading || ktasLoading || reportsLoading

  return (
    <div className="flex flex-col gap-6 p-6">
      <WelcomeHeader t={t} />

      <OverviewSummary t={t} events={events} massas={massas} councils={councils} ktas={ktas} reports={reports} isLoading={isLoading} />

      <QuickActions t={t} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentEvents t={t} events={events} isLoading={eventsLoading} />
        <RecentReports t={t} reports={reports} isLoading={reportsLoading} />
      </div>

      <DataDistribution t={t} massas={massas} events={events} isLoading={massasLoading || eventsLoading} />

      <LatestMembers t={t} ktas={ktas} councils={councils} isLoading={ktasLoading || councilsLoading} />
    </div>
  )
}
