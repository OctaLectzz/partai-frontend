import { Button } from '@/components/ui/button'
import { useCouncil, useCreateCouncil, useUpdateCouncil } from '@/hooks/use-council'
import { type CouncilFormValues, councilCreateSchema, councilUpdateSchema } from '@/schemas/council-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { AddressForm } from './address-form'
import { BiodataForm } from './biodata-form'
import { ContactForm } from './contact-form'
import { IdentityForm } from './identity-form'

export default function CouncilForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const { data: councilData, isLoading: isLoadingCouncil } = useCouncil(Number(id) || 0)
  const { mutateAsync: createCouncil, isPending: isCreating } = useCreateCouncil()
  const { mutateAsync: updateCouncil, isPending: isUpdating } = useUpdateCouncil()

  const schema = isEdit ? councilUpdateSchema : councilCreateSchema

  const methods = useForm<CouncilFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: true,
      gender: 'M',
      place_of_birth: '',
      profession: '',
      rt: '',
      rw: '',
      address: '',
      phone_number: '',
      email: '',
      postal_code: '',
      religion: null,
      marital_status: null,
      education: null,
      latitude: '0',
      longitude: '0'
    }
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  useEffect(() => {
    if (isEdit && councilData) {
      reset({
        nik: councilData.nik || '',
        name: councilData.name,
        gender: councilData.gender || null,
        place_of_birth: councilData.place_of_birth || '',
        date_of_birth: councilData.date_of_birth || '',
        religion: councilData.religion || null,
        marital_status: councilData.marital_status || null,
        education: councilData.education || null,
        phone_number: councilData.phone_number || '',
        email: councilData.email || '',
        address: councilData.address || '',
        rt: councilData.rt || '',
        rw: councilData.rw || '',
        province_id: String(councilData.province_id || ''),
        regency_id: String(councilData.regency_id || ''),
        district_id: String(councilData.district_id || ''),
        village_id: String(councilData.village_id || ''),
        postal_code: councilData.postal_code || '',
        profession: councilData.profession || '',
        latitude: String(councilData.latitude || '0'),
        longitude: String(councilData.longitude || '0'),
        status: councilData.status ?? true,
        photo: councilData.photo || null,
        ktp_photo: councilData.ktp_photo || null
      })
    }
  }, [isEdit, councilData, reset])

  const onSubmit = async (values: CouncilFormValues) => {
    if (isEdit && id) {
      await updateCouncil({ ...values, id: Number(id) })
    } else {
      await createCouncil(values as any)
    }
    navigate('/dashboard/council-members')
  }

  if (isEdit && isLoadingCouncil) {
    return <div className="p-6 text-center">{t('public.loadingText')}</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
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
          <h1 className="text-foreground text-2xl font-bold">
            {isEdit ? t('dashboard.council.form.editTitle') : t('dashboard.council.form.createTitle')}
          </h1>
          <p className="text-muted mt-1 text-sm">{isEdit ? t('dashboard.council.form.editSubtitle') : t('dashboard.council.form.createSubtitle')}</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Left Column) */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <IdentityForm control={control} errors={errors} isEdit={isEdit} />
            <BiodataForm control={control} errors={errors} />
            <AddressForm control={control} errors={errors} />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="flex flex-col gap-8">
            <ContactForm control={control} errors={errors} isCreating={isCreating} isUpdating={isUpdating} isEdit={isEdit} />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
