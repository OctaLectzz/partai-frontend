import { cn } from '@/lib/utils'
import { Camera, CameraOff, ImagePlus, SwitchCamera } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface QrScannerProps {
  onScan: (decodedText: string) => void
  isProcessing?: boolean
  className?: string
}

export function QrScanner({ onScan, isProcessing = false, className }: QrScannerProps) {
  const { t } = useTranslation()
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [cameras, setCameras] = useState<any[]>([])
  const [selectedCameraId, setSelectedCameraId] = useState<string>('')
  const scannerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const lastScanRef = useRef<string>('')
  const lastScanTimeRef = useRef<number>(0)

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState()
        // Html5QrcodeScannerState: SCANNING = 2, PAUSED = 3
        if (state === 2 || state === 3) {
          await scannerRef.current.stop()
        }
      } catch {
        // Scanner may already be stopped
      }
      try {
        scannerRef.current.clear()
      } catch {
        // Ignore clear errors
      }
      scannerRef.current = null
    }
  }, [])

  const startScanner = useCallback(
    async (overrideCameraId?: string) => {
      setError(null)

      try {
        const { Html5Qrcode } = await import('html5-qrcode')

        let availableCameras: any[] = []
        // Request permissions and get cameras to ensure browser prompts user
        try {
          availableCameras = await Html5Qrcode.getCameras()
          setCameras(availableCameras)
          if (!availableCameras || availableCameras.length === 0) {
            setError(t('dashboard.qrCheckin.scanner.cameraError'))
            setIsActive(false)
            return
          }
        } catch (err) {
          console.error('Camera permission denied or not available:', err)
          setError(t('dashboard.qrCheckin.scanner.cameraPermission'))
          setIsActive(false)
          return
        }

        await stopScanner()

        const scannerId = 'qr-scanner-container'

        if (!document.getElementById(scannerId)) {
          setError(t('dashboard.qrCheckin.scanner.cameraError'))
          return
        }

        const html5QrCode = new Html5Qrcode(scannerId)
        scannerRef.current = html5QrCode

        let cameraConfig: any = { facingMode }
        const targetId = typeof overrideCameraId === 'string' ? overrideCameraId : selectedCameraId

        if (targetId) {
          cameraConfig = targetId
        } else if (availableCameras.length > 0) {
          // Auto-detect scanner/USB cameras
          const scannerCamera = availableCameras.find(
            (c) => c.label.toLowerCase().includes('scanner') || c.label.toLowerCase().includes('barcode') || c.label.toLowerCase().includes('usb')
          )
          if (scannerCamera) {
            cameraConfig = scannerCamera.id
            setSelectedCameraId(scannerCamera.id)
          }
        }

        await html5QrCode.start(
          cameraConfig,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
            disableFlip: false
          },
          (decodedText: string) => {
            const now = Date.now()
            // Debounce: ignore same code within 3 seconds
            if (decodedText === lastScanRef.current && now - lastScanTimeRef.current < 3000) {
              return
            }
            lastScanRef.current = decodedText
            lastScanTimeRef.current = now

            if (!isProcessing) {
              onScan(decodedText)
            }
          },
          () => {
            // QR code not found in frame — this is normal, no action needed
          }
        )

        setIsActive(true)
      } catch (err) {
        console.error('QR Scanner error:', err)
        setError(t('dashboard.qrCheckin.scanner.cameraError'))
        setIsActive(false)
      }
    },
    [facingMode, selectedCameraId, isProcessing, onScan, stopScanner, t]
  )

  const handleToggleCamera = async () => {
    if (isActive) {
      await stopScanner()
      setIsActive(false)
    } else {
      await startScanner()
    }
  }

  const handleSwitchCamera = async () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(newMode)

    if (isActive) {
      await stopScanner()
      setIsActive(false)
      // Will restart with new facing mode via useEffect
      setTimeout(() => startScanner(), 300)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      if (isActive) {
        await stopScanner()
        setIsActive(false)
      }

      const { Html5Qrcode } = await import('html5-qrcode')
      const html5QrCode = new Html5Qrcode('qr-scanner-container')
      const result = await html5QrCode.scanFile(file, false)

      if (!isProcessing) {
        onScan(result)
      }
    } catch (err) {
      console.error('File scan error:', err)
      setError(typeof err === 'string' ? err : 'No QR code found in image')
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [stopScanner])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Scanner viewport */}
      <div ref={containerRef} className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-gray-900">
        <div id="qr-scanner-container" className="min-h-[300px] w-full" />

        {/* Overlay when inactive */}
        {!isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900/90">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Camera size={40} className="text-primary" />
            </div>
            <p className="text-sm text-gray-400">{t('dashboard.qrCheckin.scanner.cameraSubtitle')}</p>
          </div>
        )}

        {/* Processing overlay */}
        {isProcessing && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60">
            <div className="flex items-center gap-3 rounded-xl bg-white/10 px-6 py-3 backdrop-blur-sm">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm font-medium text-white">{t('dashboard.qrCheckin.scanner.scanning')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Camera controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggleCamera}
          className={cn(
            'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all',
            isActive ? 'bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400' : 'bg-primary/10 text-primary hover:bg-primary/20'
          )}
        >
          {isActive ? (
            <>
              <CameraOff size={18} />
              {t('dashboard.qrCheckin.scanner.stopCamera')}
            </>
          ) : (
            <>
              <Camera size={18} />
              {t('dashboard.qrCheckin.scanner.startCamera')}
            </>
          )}
        </button>

        {isActive && !selectedCameraId && (
          <button
            type="button"
            onClick={handleSwitchCamera}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <SwitchCamera size={18} />
          </button>
        )}

        {isActive && cameras.length > 1 && (
          <select
            className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 transition-all outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            value={selectedCameraId}
            onChange={(e) => {
              const newId = e.target.value
              setSelectedCameraId(newId)
              startScanner(newId)
            }}
          >
            <option value="">{facingMode === 'environment' ? 'Kamera Belakang' : 'Kamera Depan'}</option>
            {cameras.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label || `Camera ${c.id.substring(0, 5)}`}
              </option>
            ))}
          </select>
        )}

        <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          title="Gunakan Kamera Bawaan / Upload Foto"
        >
          <ImagePlus size={18} />
        </button>
      </div>
    </div>
  )
}
