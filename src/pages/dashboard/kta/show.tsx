import { Button } from '@/components/ui/button'
import { useKta } from '@/hooks/use-kta'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ArrowLeft, Download, Image as ImageIcon } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { KtaCard } from './kta-card'

export default function KtaShow() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: kta, isLoading } = useKta(Number(id))

  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  const downloadImage = async () => {
    if (!frontRef.current || !backRef.current) return

    try {
      const frontCanvas = await html2canvas(frontRef.current, { scale: 3, useCORS: true })
      const backCanvas = await html2canvas(backRef.current, { scale: 3, useCORS: true })

      const link = document.createElement('a')

      // Download Front
      link.download = `KTA_FRONT_${kta?.nik}.png`
      link.href = frontCanvas.toDataURL('image/png')
      link.click()

      // Download Back
      setTimeout(() => {
        link.download = `KTA_BACK_${kta?.nik}.png`
        link.href = backCanvas.toDataURL('image/png')
        link.click()
      }, 500)

      toast.success(t('dashboard.kta.response.successExportImage'))
    } catch (error) {
      console.error(error)
      toast.error(t('dashboard.kta.response.failedExportImage'))
    }
  }

  const downloadPdf = async () => {
    if (!frontRef.current || !backRef.current) return

    try {
      const frontCanvas = await html2canvas(frontRef.current, { scale: 3, useCORS: true })
      const backCanvas = await html2canvas(backRef.current, { scale: 3, useCORS: true })

      const pdf = new jsPDF('l', 'mm', 'a4')

      const imgFront = frontCanvas.toDataURL('image/png')
      const imgBack = backCanvas.toDataURL('image/png')

      const cardWidth = 85.6
      const cardHeight = 53.98

      // Center front card on first page
      pdf.addImage(imgFront, 'PNG', (297 - cardWidth) / 2, (210 - cardHeight) / 2, cardWidth, cardHeight)

      // Add new page for back card
      pdf.addPage()
      pdf.addImage(imgBack, 'PNG', (297 - cardWidth) / 2, (210 - cardHeight) / 2, cardWidth, cardHeight)

      pdf.save(`KTA_${kta?.nik}.pdf`)
      toast.success(t('dashboard.kta.response.successExportPdf'))
    } catch (error) {
      console.error(error)
      toast.error(t('dashboard.kta.response.failedExportPdf'))
    }
  }

  if (isLoading) return <div className="p-6 text-center">{t('public.loadingText')}</div>
  if (!kta) return <div className="text-muted p-6 text-center">{t('public.noData')}</div>

  const cardData = {
    ...kta,
    province_name: kta.province?.name,
    regency_name: kta.regency?.name,
    district_name: kta.district?.name,
    village_name: kta.village?.name
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/kta')}
            className="text-muted hover:text-foreground border-card-border bg-card h-9 gap-2 rounded-lg border px-3 transition-colors"
            icon={<ArrowLeft size={16} />}
          >
            {t('public.backToList')}
          </Button>

          <div>
            <h1 className="text-2xl font-bold">{t('dashboard.kta.detail.title')}</h1>
            <p className="text-muted text-sm">{t('dashboard.kta.detail.subtitle')}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="gap-2" onClick={downloadImage}>
            <ImageIcon size={16} />
            {t('dashboard.kta.detail.saveAsImage')}
          </Button>

          <Button variant="secondary" onClick={downloadPdf}>
            <Download size={16} />
            {t('dashboard.kta.detail.saveAsPdf')}
          </Button>
        </div>
      </div>

      <div className="mx-auto flex max-w-xl flex-col gap-12 py-8 lg:flex-row lg:flex-wrap lg:justify-center">
        <div className="flex w-full max-w-[500px] flex-col items-center gap-4 px-4">
          <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">{t('public.frontView')}</p>
          <div className="w-full p-4">
            <KtaCard ref={frontRef} data={cardData as any} side="front" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} />
          </div>
        </div>

        <div className="flex w-full max-w-[500px] flex-col items-center gap-4 px-4">
          <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">{t('public.backView')}</p>
          <div className="w-full p-4">
            <KtaCard ref={backRef} data={cardData as any} side="back" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border-t border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
          <h4 className="font-bold text-slate-800 dark:text-slate-200">{t('dashboard.kta.detail.readyTitle')}</h4>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t('dashboard.kta.detail.readyDescription')}</p>
        </div>
      </div>
    </div>
  )
}
