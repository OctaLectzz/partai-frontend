import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { cn } from '@/lib/utils'
import getCroppedImg from '@/utils/image'
import { Trash2, Upload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import { useTranslation } from 'react-i18next'

const aspectRatios = [
  { label: '1:1', value: 1 },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 }
]

interface ImageUploadProps {
  value?: string | File | null
  onChange: (file: File | null) => void
  error?: string
  label?: string
  description?: string
  className?: string
  aspect?: number // e.g., 1 for square, 16/9, etc.
  showAspectSelection?: boolean
}

export function ImageUpload({
  value,
  onChange,
  error,
  label,
  description,
  className = '',
  aspect = 1,
  showAspectSelection = false
}: ImageUploadProps) {
  const { t } = useTranslation()
  const [tempImage, setTempImage] = useState<string | null>(null)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [currentAspect, setCurrentAspect] = useState(aspect)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isCropping, setIsCropping] = useState(false)

  const MAX_SIZE = Number(import.meta.env.VITE_IMAGE_MAX_SIZE) || 2 * 1024 * 1024
  const MAX_SIZE_MB = Number(import.meta.env.VITE_IMAGE_MAX_SIZE_MB) || 2

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setTempImage(reader.result as string)
        setIsCropping(true)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    maxSize: MAX_SIZE
  })

  const sizeError = fileRejections.length > 0 ? t('public.imageUpload.fileTooLarge') : ''
  const displayError = error || sizeError

  const onCropComplete = useCallback((_: Area, b: Area) => {
    setCroppedAreaPixels(b)
  }, [])

  const handleSaveCrop = async () => {
    try {
      if (tempImage && croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(tempImage, croppedAreaPixels)
        if (croppedBlob) {
          const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' })
          onChange(file)
          setIsCropping(false)
          setTempImage(null)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  const previewUrl = value instanceof File ? URL.createObjectURL(value) : value

  // Determine container dimensions based on aspect
  const containerClasses = cn(
    'relative overflow-hidden rounded-2xl border-2 border-card-border transition-all duration-200',
    currentAspect === 1 ? 'aspect-square max-w-[240px]' : 'aspect-video w-full',
    error ? 'border-red-500' : 'hover:border-primary/50'
  )

  return (
    <div className={cn('w-full space-y-2', className)}>
      {label && <label className="text-foreground block text-sm font-medium">{label}</label>}

      {!previewUrl ? (
        <div
          {...getRootProps()}
          className={cn(
            containerClasses,
            'bg-card-hover/20 flex cursor-pointer flex-col items-center justify-center border-dashed',
            isDragActive ? 'border-primary bg-primary/5' : ''
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
              <Upload size={24} />
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold">{t('public.imageUpload.dropzoneText')}</p>
              <p className="text-muted mt-1 text-[10px] font-bold tracking-wider uppercase">
                {t('public.imageUpload.maxSizeText', { size: MAX_SIZE_MB })}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={containerClasses}>
          <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />

          {/* Always visible Delete Button in top right */}
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleRemove}
            className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full! p-0 shadow-lg"
            title={t('public.imageUpload.removeImage')}
            icon={<Trash2 size={16} />}
          />
        </div>
      )}

      {description && <p className="text-muted text-xs italic">{description}</p>}
      {displayError && <p className="text-xs text-red-500">{displayError}</p>}

      {/* Cropping Modal */}
      <Modal isOpen={isCropping} onClose={() => setIsCropping(false)} title={t('public.imageUpload.cropTitle')} className="max-w-2xl">
        <div className="space-y-6">
          <div className="relative h-80 w-full overflow-hidden rounded-xl bg-slate-900">
            {tempImage && (
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={currentAspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className="space-y-4">
            {showAspectSelection && (
              <div className="flex flex-col gap-2">
                <label className="text-foreground text-xs font-bold tracking-wider uppercase">{t('public.imageUpload.aspectRatio')}</label>
                <div className="flex flex-wrap gap-2">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.label}
                      type="button"
                      onClick={() => setCurrentAspect(ratio.value)}
                      className={cn(
                        'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                        currentAspect === ratio.value ? 'bg-primary text-slate-900' : 'bg-card-hover text-muted hover:text-foreground'
                      )}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-1">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="accent-primary h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
                />
              </div>
              <span className="text-muted min-w-12 text-right font-mono text-xs">{zoom.toFixed(1)}x</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsCropping(false)}>
              {t('public.cancelText')}
            </Button>
            <Button variant="primary" onClick={handleSaveCrop}>
              {t('public.imageUpload.saveCrop')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
