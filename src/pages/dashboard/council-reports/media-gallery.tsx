import { Card, CardContent } from '@/components/ui/card'
import ImagePreview from '@/components/ui/image-preview'
import type { CouncilReportMedia } from '@/types/council-report'
import { Download, FileText, ImageIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface MediaGalleryProps {
  media: CouncilReportMedia[]
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const { t } = useTranslation()

  const photos = media.filter((m) => m.media_type === 'photo')
  const videos = media.filter((m) => m.media_type === 'video')
  const documents = media.filter((m) => m.media_type === 'document')

  return (
    <Card className="shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary-dark" />
          <h3 className="text-lg font-bold text-foreground">{t('dashboard.councilReport.detail.mediaTitle')}</h3>
          <span className="text-sm text-muted">({media.length})</span>
        </div>

        {/* Photos Grid */}
        {photos.length > 0 && (
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.photosLabel')}</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative overflow-hidden rounded-xl">
                  <ImagePreview
                    src={photo.file_path || ''}
                    alt={photo.caption || photo.file_name}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {photo.caption && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3">
                      <p className="truncate text-xs text-white">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.videosLabel')}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {videos.map((video) => (
                <div key={video.id} className="overflow-hidden rounded-xl">
                  <video src={video.file_path || ''} controls className="aspect-video w-full rounded-xl bg-black" />
                  {video.caption && <p className="mt-2 text-sm text-muted">{video.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {documents.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">{t('dashboard.councilReport.detail.documentsLabel')}</p>
            <div className="grid grid-cols-1 gap-2">
              {documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.file_path || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-card-border bg-card-hover/20 p-4 transition-all hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{doc.file_name}</p>
                    {doc.caption && <p className="truncate text-xs text-muted">{doc.caption}</p>}
                  </div>
                  <Download size={16} className="shrink-0 text-muted" />
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
