import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { CouncilReport } from '@/types/council-report'
import type { Event } from '@/types/event'
import type { Kta } from '@/types/kta'
import type { Massa } from '@/types/massa'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface OverviewChartsProps {
  t: TFunction
  events: Event[]
  massas: Massa[]
  ktas: Kta[]
  reports: CouncilReport[]
  isLoading: boolean
}

/* Utility: group items by month from created_at */
function groupByMonth(items: { created_at: string }[], monthCount = 6): { label: string; count: number }[] {
  const now = new Date()
  const months: { label: string; count: number }[] = []

  for (let i = monthCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = d.toLocaleDateString(undefined, { month: 'short' })
    const count = items.filter((item) => {
      const created = new Date(item.created_at)
      return created.getFullYear() === d.getFullYear() && created.getMonth() === d.getMonth()
    }).length
    months.push({ label, count })
  }
  return months
}

/* Utility: calculate age from date string */
function calculateAge(dateStr: string): number {
  const birth = new Date(dateStr)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
  return age
}

/* Shared: Custom tooltip style */
function ChartTooltip({
  active,
  payload,
  label
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="border-card-border bg-card rounded-lg border px-3 py-2 shadow-lg">
      <p className="text-foreground mb-1 text-xs font-semibold">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted">{entry.name}:</span>
          <span className="text-foreground font-bold">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

/* Member Growth Trend */
function MemberGrowthChart({ t, massas, ktas }: { t: TFunction; massas: Massa[]; ktas: Kta[] }) {
  const data = useMemo(() => {
    const massaMonths = groupByMonth(massas)
    const ktaMonths = groupByMonth(ktas)
    return massaMonths.map((m, i) => ({
      name: m.label,
      massa: m.count,
      kta: ktaMonths[i]?.count ?? 0
    }))
  }, [massas, ktas])

  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-foreground text-base font-bold">{t('dashboard.overview.charts.memberGrowthTitle')}</h3>
          <p className="text-muted mt-0.5 text-xs">{t('dashboard.overview.charts.memberGrowthSubtitle')}</p>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradMassa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradKta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffd700" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffd700" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }} />
            <Area
              type="monotone"
              dataKey="massa"
              name={t('dashboard.overview.charts.massaLabel')}
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#gradMassa)"
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: 'var(--color-card)' }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="kta"
              name={t('dashboard.overview.charts.ktaLabel')}
              stroke="#ffd700"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#gradKta)"
              dot={{ r: 4, fill: '#ffd700', strokeWidth: 2, stroke: 'var(--color-card)' }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

/* Report Type Distribution */
const REPORT_TYPE_COLORS: Record<string, string> = {
  meeting: '#3b82f6',
  visit: '#10b981',
  socialization: '#f59e0b',
  supervision: '#8b5cf6',
  aspiration: '#ec4899',
  other: '#6b7280'
}

function ReportTypeChart({ t, reports }: { t: TFunction; reports: CouncilReport[] }) {
  const data = useMemo(() => {
    const types = ['meeting', 'visit', 'socialization', 'supervision', 'aspiration', 'other'] as const
    return types
      .map((type) => ({
        name: t(`dashboard.councilReport.reportType.${type}`),
        value: reports.filter((r) => r.report_type === type).length,
        color: REPORT_TYPE_COLORS[type]
      }))
      .filter((s) => s.value > 0)
  }, [reports, t])

  const total = data.reduce((a, s) => a + s.value, 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <h3 className="text-foreground text-base font-bold">{t('dashboard.overview.charts.reportTypeTitle')}</h3>
          <p className="text-muted mt-0.5 text-xs">{t('dashboard.overview.charts.reportTypeSubtitle')}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="flex flex-col items-center">
          <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const d = payload[0]
                  return (
                    <div className="border-card-border bg-card rounded-lg border px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.payload?.color }} />
                        <span className="text-muted">{d.name}:</span>
                        <span className="text-foreground font-bold">{(d.value as number)?.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                }}
              />
            </PieChart>
            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-foreground text-2xl font-bold">{total}</span>
              <span className="text-muted text-[10px]">{t('dashboard.overview.charts.totalLabel')}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-2 grid w-full grid-cols-2 gap-x-4 gap-y-2">
            {data.map((seg) => (
              <div key={seg.name} className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
                <div className="flex flex-1 items-baseline justify-between gap-1">
                  <span className="text-muted truncate text-xs">{seg.name}</span>
                  <span className="text-foreground text-xs font-bold">{seg.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* Event Participation */
function EventParticipationChart({ t, events }: { t: TFunction; events: Event[] }) {
  const data = useMemo(() => {
    return [...events]
      .filter((e) => (e.participants_count ?? 0) > 0 || (e.target_participants ?? 0) > 0)
      .sort((a, b) => (b.participants_count ?? 0) - (a.participants_count ?? 0))
      .slice(0, 6)
      .map((e) => ({
        name: e.name.length > 20 ? e.name.slice(0, 20) + '…' : e.name,
        fullName: e.name,
        registered: e.participants_count ?? 0,
        target: e.target_participants ?? 0
      }))
  }, [events])

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <h3 className="text-foreground text-base font-bold">{t('dashboard.overview.charts.eventParticipationTitle')}</h3>
          <p className="text-muted mt-0.5 text-xs">{t('dashboard.overview.charts.eventParticipationSubtitle')}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        {data.length === 0 ? (
          <div className="flex h-[260px] items-center justify-center">
            <p className="text-muted text-sm">{t('dashboard.overview.charts.noEventData')}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
                width={110}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const item = payload[0]?.payload as { fullName: string; registered: number; target: number }
                  return (
                    <div className="border-card-border bg-card rounded-lg border px-3 py-2 shadow-lg">
                      <p className="text-foreground mb-1 text-xs font-semibold">{item.fullName}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-muted">{t('dashboard.overview.charts.registeredLabel')}:</span>
                        <span className="text-foreground font-bold">{item.registered}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-300" />
                        <span className="text-muted">{t('dashboard.overview.charts.targetLabel')}:</span>
                        <span className="text-foreground font-bold">{item.target}</span>
                      </div>
                    </div>
                  )
                }}
              />
              <Legend verticalAlign="top" align="right" iconType="rect" iconSize={10} wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }} />
              <Bar
                dataKey="target"
                name={t('dashboard.overview.charts.targetLabel')}
                fill="#93c5fd"
                fillOpacity={0.4}
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
              <Bar dataKey="registered" name={t('dashboard.overview.charts.registeredLabel')} fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

/* Massa Age Distribution */
const AGE_GROUPS = [
  { key: '17-25', min: 17, max: 25, color: '#06b6d4' },
  { key: '26-35', min: 26, max: 35, color: '#3b82f6' },
  { key: '36-45', min: 36, max: 45, color: '#8b5cf6' },
  { key: '46-55', min: 46, max: 55, color: '#f59e0b' },
  { key: '56-65', min: 56, max: 65, color: '#ef4444' },
  { key: '65+', min: 66, max: 200, color: '#6b7280' }
]

function AgeDistributionChart({ t, massas }: { t: TFunction; massas: Massa[] }) {
  const data = useMemo(() => {
    return AGE_GROUPS.map((group) => {
      const count = massas.filter((m) => {
        if (!m.date_of_birth) return false
        const age = calculateAge(m.date_of_birth)
        return age >= group.min && age <= group.max
      }).length
      return {
        name: t(`dashboard.overview.charts.ageGroups.${group.key.replace('+', 'plus')}`),
        count,
        color: group.color
      }
    })
  }, [massas, t])

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <h3 className="text-foreground text-base font-bold">{t('dashboard.overview.charts.ageDistributionTitle')}</h3>
          <p className="text-muted mt-0.5 text-xs">{t('dashboard.overview.charts.ageDistributionSubtitle')}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} dy={4} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" name={t('dashboard.overview.charts.totalLabel')} radius={[6, 6, 0, 0]} barSize={36} animationDuration={800}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

/* Massa Status (Active vs Inactive) */
function MassaStatusChart({ t, massas }: { t: TFunction; massas: Massa[] }) {
  const stats = useMemo(() => {
    const active = massas.filter((m) => m.status === 'active').length
    const inactive = massas.filter((m) => m.status === 'inactive').length
    const total = massas.length
    return { active, inactive, total }
  }, [massas])

  const data = [
    {
      name: t('dashboard.overview.charts.activeLabel'),
      value: stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0,
      count: stats.active,
      fill: '#10b981'
    },
    {
      name: t('dashboard.overview.charts.inactiveLabel'),
      value: stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0,
      count: stats.inactive,
      fill: '#f59e0b'
    }
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <h3 className="text-foreground text-base font-bold">{t('dashboard.overview.charts.massaStatusTitle')}</h3>
          <p className="text-muted mt-0.5 text-xs">{t('dashboard.overview.charts.massaStatusSubtitle')}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="mx-auto" style={{ width: 200, height: 200 }}>
          <RadialBarChart
            width={200}
            height={200}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="90%"
            barSize={16}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background={{ fill: 'var(--color-border)', opacity: 0.3 }} dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </div>

        {/* Stats below */}
        <div className="mt-1 flex w-full flex-col gap-2.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-muted text-xs">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-bold">{item.count.toLocaleString()}</span>
                <span className="bg-card-hover text-muted rounded-md px-1.5 py-0.5 text-[10px] font-semibold">{item.value}%</span>
              </div>
            </div>
          ))}
          <div className="border-card-border mt-1 flex items-center justify-between border-t pt-2.5">
            <span className="text-muted text-xs font-medium tracking-wider uppercase">{t('dashboard.overview.charts.totalLabel')}</span>
            <span className="text-foreground text-lg font-bold">{stats.total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function OverviewCharts({ t, events, massas, ktas, reports, isLoading }: OverviewChartsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-[360px] rounded-2xl" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-[420px] rounded-2xl" />
          <Skeleton className="col-span-1 h-[420px] rounded-2xl lg:col-span-2" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="col-span-1 h-[380px] rounded-2xl lg:col-span-2" />
          <Skeleton className="h-[380px] rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <MemberGrowthChart t={t} massas={massas} ktas={ktas} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ReportTypeChart t={t} reports={reports} />

        <div className="*:h-full lg:col-span-2">
          <EventParticipationChart t={t} events={events} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="*:h-full lg:col-span-2">
          <AgeDistributionChart t={t} massas={massas} />
        </div>

        <MassaStatusChart t={t} massas={massas} />
      </div>
    </div>
  )
}
