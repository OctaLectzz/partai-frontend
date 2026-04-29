import { cn } from '@/lib/utils'
import type { TFunction } from 'i18next'
import { BookOpen, Layers, MapPin, MousePointer, ZoomIn } from 'lucide-react'

interface MapGuideProps {
  t: TFunction
  className?: string
}

export function MapGuide({ t, className = '' }: MapGuideProps) {
  const steps = [
    {
      icon: ZoomIn,
      title: t('dashboard.distributionMap.guide.zoomTitle'),
      description: t('dashboard.distributionMap.guide.zoomDescription')
    },
    {
      icon: MousePointer,
      title: t('dashboard.distributionMap.guide.clickTitle'),
      description: t('dashboard.distributionMap.guide.clickDescription')
    },
    {
      icon: Layers,
      title: t('dashboard.distributionMap.guide.clusterTitle'),
      description: t('dashboard.distributionMap.guide.clusterDescription')
    },
    {
      icon: MapPin,
      title: t('dashboard.distributionMap.guide.filterTitle'),
      description: t('dashboard.distributionMap.guide.filterDescription')
    }
  ]

  return (
    <div className={cn('bg-card border-card-border flex flex-col overflow-hidden rounded-2xl border shadow-md', className)}>
      <div className="flex items-center gap-2.5 border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-foreground text-sm font-bold">{t('dashboard.distributionMap.guide.title')}</h3>
          <p className="text-muted text-xs">{t('dashboard.distributionMap.guide.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-gray-800">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3 p-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/10">
              <step.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="text-foreground text-xs font-bold">{step.title}</h4>
              <p className="text-muted mt-0.5 text-[11px] leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
