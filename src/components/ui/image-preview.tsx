import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'
import { useEffect, useRef, useState } from 'react'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import { Skeleton } from './skeleton'

type Props = {
  src?: string | null
  alt?: string
  initials?: string
  className?: string
  shape?: 'square' | 'round'
  aspect?: '1/1' | '16/9' | '4/3' | 'auto'
  enablePreview?: boolean
  showSkeleton?: boolean
}

/**
 * Image with Viewer.js preview capability.
 */
export default function ImagePreview({
  src,
  alt,
  initials = 'NA',
  className,
  shape = 'square',
  aspect = 'auto',
  enablePreview = true,
  showSkeleton = true
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const viewerRef = useRef<Viewer | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const radiusClass = shape === 'round' ? 'rounded-full' : 'rounded-lg'

  const aspectClasses = {
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    auto: ''
  }

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [src])

  useEffect(() => {
    if (!enablePreview || !src || !imgRef.current || hasError) return

    const viewer = new Viewer(imgRef.current, {
      navbar: false,
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 1,
        reset: 1,
        prev: 0,
        play: 0,
        next: 0,
        rotateLeft: 1,
        rotateRight: 1,
        flipHorizontal: 1,
        flipVertical: 1
      },
      title: false,
      movable: true,
      zoomable: true,
      scalable: true,
      fullscreen: true,
      toggleOnDblclick: true,
      focus: false
    })

    viewerRef.current = viewer

    return () => {
      viewer.destroy()
      viewerRef.current = null
    }
  }, [src, enablePreview, hasError])

  const handleClick = (e: React.MouseEvent) => {
    if (!enablePreview || !src || hasError) return
    e.stopPropagation()
    viewerRef.current?.show()
  }

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'bg-primary flex items-center justify-center font-bold text-gray-900 select-none',
          aspectClasses[aspect],
          radiusClass,
          className
        )}
      >
        <span className="leading-none">{getInitials(initials || alt)}</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', aspectClasses[aspect], radiusClass, className)}>
      {showSkeleton && !isLoaded && <Skeleton className={cn('absolute inset-0 h-full w-full', radiusClass)} />}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onClick={handleClick}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'h-full w-full object-cover transition-all duration-500',
          !isLoaded ? 'opacity-0' : 'opacity-100',
          enablePreview ? 'cursor-zoom-in' : 'cursor-default'
        )}
      />
    </div>
  )
}
