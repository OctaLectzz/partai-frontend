import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CouncilReportMedia } from '@/types/council-report'
import { FileText, Film, ImageIcon, Trash2, Upload, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

interface MediaUploadProps {
  value?: File[]
  onChange: (files: File[]) => void
  captions?: string[]
  onCaptionsChange?: (captions: string[]) => void
  existingMedia?: CouncilReportMedia[]
  onDeleteExisting?: (mediaId: number) => void
  isDeletingMedia?: boolean
  error?: string
  label?: string
  description?: string
  className?: string
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
}

const DEFAULT_ACCEPT = {
  'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic'],
  'video/*': ['.mp4', '.mov', '.avi'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
}

function getFileTypeIcon(file: File) {
  if (file.type.startsWith('image/')) return <ImageIcon size={20} className="text-blue-500" />
  if (file.type.startsWith('video/')) return <Film size={20} className="text-purple-500" />
  return <FileText size={20} className="text-amber-500" />
}

function getMediaTypeIcon(type: string) {
  if (type === 'photo') return <ImageIcon size={20} className="text-blue-500" />
  if (type === 'video') return <Film size={20} className="text-purple-500" />
  return <FileText size={20} className="text-amber-500" />
}

function getFilePreview(file: File) {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file)
  }
  return null
}

export function MediaUpload({
  value = [],
  onChange,
  captions = [],
  onCaptionsChange,
  existingMedia = [],
  onDeleteExisting,
  isDeletingMedia = false,
  error,
  label,
  description,
  className,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024,
  accept = DEFAULT_ACCEPT
}: MediaUploadProps) {
  const { t } = useTranslation()
  const [dragError, setDragError] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setDragError('')
      const totalFiles = value.length + existingMedia.length + acceptedFiles.length
      if (totalFiles > maxFiles) {
        setDragError(t('public.media.maxFilesError', { count: maxFiles }))
        return
      }
      onChange([...value, ...acceptedFiles])

      // Add empty captions for new files
      if (onCaptionsChange) {
        const newCaptions = [...captions, ...acceptedFiles.map(() => '')]
        onCaptionsChange(newCaptions)
      }
    },
    [value, existingMedia.length, maxFiles, onChange, captions, onCaptionsChange, t]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    maxSize
  })

  const sizeError = fileRejections.length > 0 ? t('public.media.fileTooLarge') : ''
  const displayError = error || sizeError || dragError

  const handleRemoveFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange(newFiles)

    if (onCaptionsChange) {
      const newCaptions = captions.filter((_, i) => i !== index)
      onCaptionsChange(newCaptions)
    }
  }

  const handleCaptionChange = (index: number, caption: string) => {
    if (onCaptionsChange) {
      const newCaptions = [...captions]
      newCaptions[index] = caption
      onCaptionsChange(newCaptions)
    }
  }

  return (
    <div className={cn('w-full space-y-3', className)}>
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-card-border bg-card-hover/20 p-6 transition-all duration-200',
          isDragActive && 'border-solid border-primary bg-primary/5',
          displayError ? 'border-red-500' : 'hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Upload size={24} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold">{t('public.media.dropzoneText')}</p>
            <p className="text-xs text-muted">{description || t('public.media.description')}</p>
          </div>
        </div>
      </div>

      {displayError && <p className="text-xs text-red-500">{displayError}</p>}

      {/* Existing Media (edit mode) */}
      {existingMedia.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider text-muted uppercase">{t('public.media.existingFiles')}</p>
          <div className="grid grid-cols-1 gap-2">
            {existingMedia.map((media) => (
              <div key={media.id} className="flex items-center gap-3 rounded-lg border border-card-border bg-card p-3 transition-all">
                {/* Thumbnail */}
                {media.media_type === 'photo' && media.file_path ? (
                  <img src={media.file_path} alt={media.file_name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-card-hover">
                    {getMediaTypeIcon(media.media_type)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{media.file_name}</p>
                  <p className="text-xs text-muted capitalize">{media.media_type}</p>
                </div>

                {onDeleteExisting && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteExisting(media.id)}
                    disabled={isDeletingMedia}
                    className="h-8 w-8 shrink-0 p-0 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
                    icon={<Trash2 size={14} />}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Files Preview */}
      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider text-muted uppercase">{t('public.media.newFiles')}</p>
          <div className="grid grid-cols-1 gap-2">
            {value.map((file, index) => {
              const preview = getFilePreview(file)
              return (
                <div key={`${file.name}-${index}`} className="rounded-lg border border-card-border bg-card p-3 transition-all">
                  <div className="flex items-center gap-3">
                    {/* Thumbnail */}
                    {preview ? (
                      <img src={preview} alt={file.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-card-hover">{getFileTypeIcon(file)}</div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-card-hover hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Caption Input */}
                  {onCaptionsChange && (
                    <input
                      type="text"
                      value={captions[index] || ''}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      placeholder={t('public.media.captionPlaceholder')}
                      className="mt-2 w-full rounded-lg border border-card-border bg-card-hover/50 px-3 py-1.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted focus:border-blue-500"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
