import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InfoListItem } from '@/components/ui/info-list-item'
import { Skeleton } from '@/components/ui/skeleton'
import type { Council } from '@/types/council'
import type { Kta } from '@/types/kta'
import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface LatestMembersProps {
  t: TFunction
  ktas: Kta[]
  councils: Council[]
  isLoading: boolean
}

export function LatestMembers({ t, ktas, councils, isLoading }: LatestMembersProps) {
  const navigate = useNavigate()

  const latestKtas = useMemo(() => {
    return [...ktas].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
  }, [ktas])

  const latestCouncils = useMemo(() => {
    return [...councils].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
  }, [councils])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton className="h-[320px] rounded-2xl" />
        <Skeleton className="h-[320px] rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Latest KTA Members */}
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-base font-bold text-foreground">{t('dashboard.overview.latestMembers.ktaTitle')}</h3>
            <p className="mt-0.5 text-xs text-muted">{t('dashboard.overview.latestMembers.ktaSubtitle')}</p>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-6">
          {latestKtas.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">{t('dashboard.overview.emptyState')}</p>
          ) : (
            <div className="flex flex-col gap-1">
              {latestKtas.map((kta) => (
                <InfoListItem
                  key={kta.id}
                  icon={<Avatar name={kta.name} photo={kta.photo} size="sm" enablePreview={false} />}
                  title={kta.name}
                  subtitle={`${kta.position} · ${kta.kta_number || '-'}`}
                  trailing={<span className="text-[10px] font-medium text-muted">{new Date(kta.created_at).toLocaleDateString()}</span>}
                  onClick={() => navigate(`/dashboard/kta/show/${kta.id}`)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Latest Council Members */}
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-base font-bold text-foreground">{t('dashboard.overview.latestMembers.councilTitle')}</h3>
            <p className="mt-0.5 text-xs text-muted">{t('dashboard.overview.latestMembers.councilSubtitle')}</p>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-6">
          {latestCouncils.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">{t('dashboard.overview.emptyState')}</p>
          ) : (
            <div className="flex flex-col gap-1">
              {latestCouncils.map((council) => (
                <InfoListItem
                  key={council.id}
                  icon={<Avatar name={council.name} photo={council.photo} size="sm" enablePreview={false} />}
                  title={council.name}
                  subtitle={council.email}
                  trailing={<span className="text-[10px] font-medium text-muted">{new Date(council.created_at).toLocaleDateString()}</span>}
                  onClick={() => navigate(`/dashboard/council-members/show/${council.id}`)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
