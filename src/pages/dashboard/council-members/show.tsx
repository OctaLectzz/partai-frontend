import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ImagePreview from '@/components/ui/image-preview'
import { MapView } from '@/components/ui/map-view'
import { useCouncil } from '@/hooks/use-council'
import { formatDate } from '@/utils/format'
import { ArrowLeft, Briefcase, Edit, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function CouncilDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: council, isLoading } = useCouncil(Number(id) || 0)

  if (isLoading) {
    return <div className="p-6 text-center">{t('public.loadingText')}</div>
  }

  if (!council) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted">{t('public.noData')}</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/dashboard/council-members')}>
          {t('public.backToList')}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/council-members')}
            className="text-muted hover:text-foreground border-card-border bg-card h-9 gap-2 rounded-lg border px-3 transition-colors"
            icon={<ArrowLeft size={16} />}
          >
            {t('public.backToList')}
          </Button>

          <div>
            <h1 className="text-foreground text-2xl font-bold">{t('dashboard.council.detail.title')}</h1>
            <p className="text-muted mt-1 text-sm">{t('dashboard.council.detail.subtitle')}</p>
          </div>
        </div>

        <Link to={`/dashboard/council-members/edit/${council.id}`}>
          <Button className="bg-primary hover:bg-primary-dark shadow-primary/20 gap-2 font-semibold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5">
            <Edit size={16} />
            {t('dashboard.council.detail.editData')}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card (Left) */}
        <Card className="flex flex-col items-center gap-4 p-8 text-center shadow-md lg:col-span-1">
          <Avatar name={council.name} photo={council.photo} className="h-32 w-32 border-4 border-slate-100 text-4xl dark:border-slate-800" />
          <div>
            <h2 className="text-foreground text-xl font-bold">{council.name}</h2>
            <p className="text-muted text-sm">{council.nik || '-'}</p>
          </div>
          <Badge variant={council.status ? 'success' : 'slate'}>{council.status ? t('public.status.active') : t('public.status.inactive')}</Badge>

          <div className="border-card-border mt-4 flex w-full flex-col gap-3 border-t pt-4 text-left text-sm">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-muted shrink-0" />
              <span className="text-foreground font-medium">{council.phone_number || '-'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-muted shrink-0" />
              <span className="text-foreground font-medium">{council.email || '-'}</span>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase size={16} className="text-muted shrink-0" />
              <span className="text-foreground font-medium">{council.profession || '-'}</span>
            </div>

            <div className="border-card-border mt-2 border-t pt-4">
              <p className="text-muted mb-1 text-xs font-semibold tracking-wider uppercase">{t('dashboard.council.form.ktaNumberLabel')}</p>
              <span className="text-foreground font-medium">{council.kta_number || '-'}</span>
            </div>

            {council.ktp_photo && (
              <div className="border-card-border border-t pt-6">
                <h3 className="text-foreground mb-4 text-lg font-bold">{t('dashboard.council.form.ktpPhotoLabel')}</h3>
                <ImagePreview src={council.ktp_photo} alt="KTP" aspect="16/9" className="w-full border-2 border-slate-100 dark:border-slate-800" />
              </div>
            )}
          </div>
        </Card>

        {/* Details Card (Right) */}
        <Card className="flex flex-col gap-6 p-8 shadow-md lg:col-span-2">
          <div>
            <h3 className="text-foreground mb-4 text-lg font-bold">{t('dashboard.council.detail.personalInfo')}</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">
                  {t('dashboard.council.form.placeOfBirthLabel')} / {t('dashboard.council.form.dateOfBirthLabel')}
                </p>
                <p className="text-foreground mt-1 font-medium">
                  {council.place_of_birth ? `${council.place_of_birth}, ` : '-, '}
                  {council.date_of_birth ? formatDate(council.date_of_birth) : '-'}
                </p>
              </div>

              <div>
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">{t('public.gender.label')}</p>
                <p className="text-foreground mt-1 font-medium">
                  {council.gender === 'M' ? t('public.gender.male') : council.gender === 'F' ? t('public.gender.female') : '-'}
                </p>
              </div>

              <div>
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">{t('dashboard.council.form.religionLabel')}</p>
                <p className="text-foreground mt-1 font-medium">
                  {council.religion ? t(`dashboard.council.form.religion.${council.religion}`) : '-'}
                </p>
              </div>

              <div>
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">{t('dashboard.council.form.maritalStatusLabel')}</p>
                <p className="text-foreground mt-1 font-medium">
                  {council.marital_status ? t(`dashboard.council.form.maritalStatus.${council.marital_status}`) : '-'}
                </p>
              </div>

              <div>
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">{t('dashboard.council.form.educationLabel')}</p>
                <p className="text-foreground mt-1 font-medium">
                  {council.education ? t(`dashboard.council.form.education.${council.education}`) : '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-card-border border-t pt-6">
            <h3 className="text-foreground mb-4 text-lg font-bold">{t('dashboard.council.detail.addressInfo')}</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-muted text-xs font-semibold tracking-wider uppercase">{t('public.address.label')}</p>
                <div className="mt-1 flex items-start gap-2">
                  <MapPin size={16} className="text-muted mt-0.5 shrink-0" />
                  <p className="text-foreground leading-relaxed font-medium">
                    {council.address || '-'}, RT {council.rt || '-'} / RW {council.rw || '-'}, {t('public.address.postalCode')}:{' '}
                    {council.postal_code || '-'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
                <div>
                  <p className="text-muted text-xs">{t('public.address.province')}</p>
                  <p className="text-foreground font-medium">{council.province?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-muted text-xs">{t('public.address.regency')}</p>
                  <p className="text-foreground font-medium">{council.regency?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-muted text-xs">{t('public.address.district')}</p>
                  <p className="text-foreground font-medium">{council.district?.name ?? '-'}</p>
                </div>
                <div>
                  <p className="text-muted text-xs">{t('public.address.village')}</p>
                  <p className="text-foreground font-medium">{council.village?.name ?? '-'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-card-border border-t pt-6">
            <h3 className="text-foreground mb-4 text-lg font-bold">{t('dashboard.massa.detail.geographicInfo')}</h3>
            <div className="relative overflow-hidden rounded-2xl border-2 border-slate-100 dark:border-slate-800">
              <MapView lat={council.latitude || 0} lng={council.longitude || 0} className="h-80 w-full" />

              <div className="absolute right-4 bottom-4 z-10 flex gap-4 rounded-lg bg-white/80 p-3 font-mono text-xs backdrop-blur-sm dark:bg-slate-900/80">
                <div className="flex flex-col">
                  <span className="text-muted text-[10px] font-bold uppercase">{t('public.address.latitude')}</span>
                  <span className="text-foreground font-bold">{council.latitude || '-'}</span>
                </div>
                <div className="flex flex-col border-l border-slate-200 pl-4 dark:border-slate-700">
                  <span className="text-muted text-[10px] font-bold uppercase">{t('public.address.longitude')}</span>
                  <span className="text-foreground font-bold">{council.longitude || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
