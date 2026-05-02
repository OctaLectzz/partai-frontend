import { TicketCard } from '@/components/ticket-card'
import { Button } from '@/components/ui/button'
import type { EventParticipant } from '@/types/event-participant'
import html2canvas from 'html2canvas'
import { Download, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

interface DownloadTicketActionProps {
  participant: EventParticipant
  eventName?: string
}

export function DownloadTicketAction({ participant, eventName = 'Event Partai Golkar' }: DownloadTicketActionProps) {
  const { t } = useTranslation()
  const ticketRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!ticketRef.current) return

    try {
      setIsDownloading(true)

      // Temporarily make it visible for html2canvas to capture it properly
      const ticketElement = ticketRef.current
      ticketElement.style.display = 'block'
      ticketElement.style.position = 'absolute'
      ticketElement.style.left = '-9999px'
      ticketElement.style.top = '-9999px'

      // Add a small delay to ensure rendering is complete (fonts/images)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const canvas = await html2canvas(ticketElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
      })

      // Reset styles
      ticketElement.style.display = 'none'

      const link = document.createElement('a')
      link.download = `Ticket_${participant.massa?.full_name?.replace(/\s+/g, '_') || participant.participant_code}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      toast.success(t('dashboard.events.detail.ticketDownloaded'))
    } catch (error) {
      console.error('Error downloading ticket:', error)
      toast.error(t('dashboard.events.detail.ticketDownloadFailed'))
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="ghost"
        className="text-primary transition-colors hover:bg-primary/10 hover:text-primary-dark"
        onClick={handleDownload}
        disabled={isDownloading}
        title="Download Ticket"
      >
        {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
      </Button>

      {/* Hidden Ticket Container */}
      <div style={{ display: 'none' }}>
        <TicketCard ref={ticketRef} participant={participant} eventName={eventName} />
      </div>
    </div>
  )
}
