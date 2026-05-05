import { SummaryCard } from '@/components/summary-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LiveFeedItem } from '@/components/ui/live-feed-item'
import { QrScanner } from '@/components/ui/qr-scanner'
import { Skeleton } from '@/components/ui/skeleton'
import { useEvent } from '@/hooks/use-event'
import { useEventParticipantsLive, useScanParticipantQr } from '@/hooks/use-event-participant'
import type { EventParticipant } from '@/types/event-participant'
import { ArrowLeft, Calendar, CheckCircle2, Clock, Keyboard, MapPin, Percent, Search, Send, UserCheck, UserX, Users } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckinParticipantTable } from './participant-table'
import { ScanResultModal } from './scan-result-modal'

export default function QrCheckinScanner() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const { data: event, isLoading: isEventLoading } = useEvent(slug || '')
  const { data: participants = [], isLoading: isParticipantsLoading } = useEventParticipantsLive(slug || '')
  const { mutateAsync: scanQr, isPending: isScanning } = useScanParticipantQr(slug || '')

  const [manualCode, setManualCode] = useState('')
  const manualInputRef = useRef<HTMLInputElement>(null)

  const [scanResultModal, setScanResultModal] = useState<{
    isOpen: boolean
    status: 'success' | 'error'
    message?: string
    participant?: EventParticipant
  } | null>(null)

  // Hardware scanner support: intercept fast keystrokes
  const scannerBufferRef = useRef('')
  const scannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Attendance Statistics
  const stats = useMemo(() => {
    const total = participants.length
    const checkedIn = participants.filter((p) => p.status === 'attended').length
    const notYet = total - checkedIn
    const rate = total > 0 ? Math.round((checkedIn / total) * 100) : 0

    return { total, checkedIn, notYet, rate }
  }, [participants])

  // Recent Check-ins (derived from participants)
  const recentCheckins = useMemo(() => {
    return participants
      .filter((p) => p.status === 'attended' && p.attended_at)
      .sort((a, b) => new Date(b.attended_at!).getTime() - new Date(a.attended_at!).getTime())
      .slice(0, 5)
  }, [participants])

  // Scan Handle
  const handleScan = useCallback(
    async (code: string) => {
      const trimmedCode = code.trim()
      if (!trimmedCode || isScanning) return

      try {
        const result = await scanQr(trimmedCode)
        setManualCode('')
        setScanResultModal({
          isOpen: true,
          status: 'success',
          message: result.message,
          participant: result as EventParticipant
        })
      } catch (err: any) {
        setScanResultModal({
          isOpen: true,
          status: 'error',
          message: err.response?.data?.message || t('dashboard.events.response.failedScanMsg'),
          participant: err.response?.data?.participant
        })
      }
    },
    [isScanning, scanQr, t]
  )

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualCode.trim()) {
      handleScan(manualCode)
    }
  }

  // Hardware Scanner Keypress Interception
  // Hardware barcode scanners emulate keyboard input with rapid key events
  // followed by an Enter key. We detect this pattern and trigger scan.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is focused on a known input
      const activeTag = document.activeElement?.tagName
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
        return
      }

      if (e.key === 'Enter' && scannerBufferRef.current.length > 3) {
        e.preventDefault()
        handleScan(scannerBufferRef.current)
        scannerBufferRef.current = ''
        return
      }

      // Accumulate printable characters
      if (e.key.length === 1) {
        scannerBufferRef.current += e.key

        // Clear buffer after 100ms of no input (human typing is slower)
        if (scannerTimeoutRef.current) {
          clearTimeout(scannerTimeoutRef.current)
        }
        scannerTimeoutRef.current = setTimeout(() => {
          scannerBufferRef.current = ''
        }, 100)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (scannerTimeoutRef.current) {
        clearTimeout(scannerTimeoutRef.current)
      }
    }
  }, [handleScan])

  // Time Ago Helper
  const getTimeAgo = (dateStr: string | null) => {
    if (!dateStr) return ''
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return t('dashboard.qrCheckin.recentCheckins.justNow')
    if (minutes < 60) return t('dashboard.qrCheckin.recentCheckins.minutesAgo', { count: minutes })
    return t('dashboard.qrCheckin.recentCheckins.hoursAgo', { count: hours })
  }

  // Loading State
  if (isEventLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-[480px] w-full rounded-2xl lg:col-span-2" />
          <Skeleton className="h-[480px] w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted">{t('public.noData')}</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/dashboard/qr-checkin')}>
          {t('dashboard.qrCheckin.scanner.backToEvents')}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/qr-checkin')}
            className="h-9 gap-2 rounded-lg border border-card-border bg-card px-3 text-muted transition-colors hover:text-foreground"
            icon={<ArrowLeft size={16} />}
          >
            {t('dashboard.qrCheckin.scanner.backToEvents')}
          </Button>

          <Badge variant="info" className="px-4 py-1.5 text-sm shadow-lg">
            {t('dashboard.events.status.published')}
          </Badge>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">{event.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              {event.start_date} • {event.start_time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-emerald-500" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title={t('dashboard.qrCheckin.stats.totalRegistered')}
          value={isParticipantsLoading ? '...' : stats.total}
          borderColorClass="border-l-blue-500"
          valueColorClass="text-blue-600 dark:text-blue-400"
          icon={<Users size={24} />}
        />
        <SummaryCard
          title={t('dashboard.qrCheckin.stats.checkedIn')}
          value={isParticipantsLoading ? '...' : stats.checkedIn}
          borderColorClass="border-l-emerald-500"
          valueColorClass="text-emerald-600 dark:text-emerald-400"
          icon={<UserCheck size={24} />}
        />
        <SummaryCard
          title={t('dashboard.qrCheckin.stats.notYet')}
          value={isParticipantsLoading ? '...' : stats.notYet}
          borderColorClass="border-l-amber-500"
          valueColorClass="text-amber-600 dark:text-amber-400"
          icon={<UserX size={24} />}
        />
        <SummaryCard
          title={t('dashboard.qrCheckin.stats.attendanceRate')}
          value={isParticipantsLoading ? '...' : `${stats.rate}%`}
          borderColorClass="border-l-violet-500"
          valueColorClass="text-violet-600 dark:text-violet-400"
          icon={<Percent size={24} />}
        />
      </div>

      {/* Scanner + Recent Check-ins */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* QR Scanner & Manual Input */}
        <div className="lg:col-span-2">
          <Card className="flex h-full flex-col shadow-2xl">
            <CardHeader>
              <div>
                <h2 className="text-lg font-bold text-foreground">{t('dashboard.qrCheckin.scanner.cameraTitle')}</h2>
                <p className="text-sm text-muted">{t('dashboard.qrCheckin.scanner.cameraSubtitle')}</p>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 p-6 pt-0">
              {/* QR Camera Scanner */}
              <QrScanner onScan={handleScan} isProcessing={isScanning} />

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-card-border" />
                <span className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted uppercase">
                  <Keyboard size={14} />
                  {t('dashboard.qrCheckin.scanner.orDivider')}
                </span>
                <div className="h-px flex-1 bg-card-border" />
              </div>

              {/* Manual Input */}
              <form onSubmit={handleManualSubmit} className="flex gap-3">
                <div className="flex-1">
                  <Input
                    ref={manualInputRef}
                    icon={<Search size={16} />}
                    placeholder={t('dashboard.qrCheckin.scanner.manualInputPlaceholder')}
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    disabled={isScanning}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!manualCode.trim() || isScanning}
                  isLoading={isScanning}
                  className="shrink-0 gap-2 bg-primary font-semibold text-slate-900 shadow-md hover:bg-primary-dark"
                  icon={<Send size={16} />}
                >
                  {t('dashboard.qrCheckin.scanner.scanButton')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Check-ins */}
        <div>
          <Card className="flex h-full flex-col shadow-2xl">
            <CardHeader>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-foreground">{t('dashboard.qrCheckin.recentCheckins.title')}</h2>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <p className="text-sm text-muted">{t('dashboard.qrCheckin.recentCheckins.subtitle')}</p>
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-3 overflow-y-auto p-6 pt-0">
              {recentCheckins.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <Clock size={24} className="text-muted" />
                  </div>
                  <p className="text-sm text-muted">{t('dashboard.qrCheckin.recentCheckins.empty')}</p>
                </div>
              )}

              {recentCheckins.map((participant) => (
                <LiveFeedItem
                  key={participant.id}
                  name={participant.massa?.full_name || '-'}
                  code={participant.participant_code}
                  timeLabel={getTimeAgo(participant.attended_at)}
                  status={t('dashboard.qrCheckin.participantTable.attended')}
                  statusVariant="success"
                  icon={<CheckCircle2 size={18} />}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Participant Table */}
      <CheckinParticipantTable participants={participants} isLoading={isParticipantsLoading} />

      {/* Scan Result Modal */}
      <ScanResultModal
        isOpen={!!scanResultModal?.isOpen}
        onClose={() => setScanResultModal(null)}
        status={scanResultModal?.status || 'success'}
        message={scanResultModal?.message}
        participant={scanResultModal?.participant}
      />
    </div>
  )
}
