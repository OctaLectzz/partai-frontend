import { QuickActionCard } from '@/components/ui/quick-action-card'
import type { TFunction } from 'i18next'
import { Calendar, CreditCard, FileText, Map, Users, UsersRound } from 'lucide-react'

interface QuickActionsProps {
  t: TFunction
}

export function QuickActions({ t }: QuickActionsProps) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-foreground">{t('dashboard.overview.quickActions.title')}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          to="/dashboard/events"
          icon={<Calendar className="h-5 w-5" />}
          title={t('dashboard.overview.quickActions.events')}
          description={t('dashboard.overview.quickActions.eventsDesc')}
          iconBgClass="bg-blue-500/10"
          iconColorClass="text-blue-500"
        />
        <QuickActionCard
          to="/dashboard/mass-data"
          icon={<Users className="h-5 w-5" />}
          title={t('dashboard.overview.quickActions.massData')}
          description={t('dashboard.overview.quickActions.massDataDesc')}
          iconBgClass="bg-emerald-500/10"
          iconColorClass="text-emerald-500"
        />
        <QuickActionCard
          to="/dashboard/council-members"
          icon={<UsersRound className="h-5 w-5" />}
          title={t('dashboard.overview.quickActions.council')}
          description={t('dashboard.overview.quickActions.councilDesc')}
          iconBgClass="bg-violet-500/10"
          iconColorClass="text-violet-500"
        />
        <QuickActionCard
          to="/dashboard/kta"
          icon={<CreditCard className="h-5 w-5" />}
          title={t('dashboard.overview.quickActions.kta')}
          description={t('dashboard.overview.quickActions.ktaDesc')}
          iconBgClass="bg-primary/10"
          iconColorClass="text-primary-dark"
        />
        <QuickActionCard
          to="/dashboard/council-activity-reports"
          icon={<FileText className="h-5 w-5" />}
          title={t('dashboard.overview.quickActions.reports')}
          description={t('dashboard.overview.quickActions.reportsDesc')}
          iconBgClass="bg-orange-500/10"
          iconColorClass="text-orange-500"
        />
        <QuickActionCard
          to="/dashboard/distribution-map"
          icon={<Map className="h-5 w-5" />}
          title={t('dashboard.overview.quickActions.map')}
          description={t('dashboard.overview.quickActions.mapDesc')}
          iconBgClass="bg-teal-500/10"
          iconColorClass="text-teal-500"
        />
      </div>
    </div>
  )
}
