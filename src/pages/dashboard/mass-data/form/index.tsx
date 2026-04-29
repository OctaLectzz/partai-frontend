import { Button } from '@/components/ui/button'
import { useCreateMassa, useMassa, useUpdateMassa } from '@/hooks/use-massa'
import { type MassaFormValues, massaSchema } from '@/schemas/massa-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { AddressForm } from './address-form'
import { ContactForm } from './contact-form'
import { IdentityForm } from './identity-form'

export default function MassaForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const { data: massaData, isLoading: isLoadingMassa } = useMassa(Number(id) || 0)
  const { mutateAsync: createMassa, isPending: isCreating } = useCreateMassa()
  const { mutateAsync: updateMassa, isPending: isUpdating } = useUpdateMassa()

  const methods = useForm<MassaFormValues>({
    resolver: zodResolver(massaSchema),
    defaultValues: {
      status: 'active',
      gender: 'M',
      place_of_birth: '',
      profession: '',
      notes: '',
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
    if (isEdit && massaData) {
      reset({
        nik: massaData.nik,
        full_name: massaData.full_name,
        gender: massaData.gender,
        place_of_birth: massaData.place_of_birth || '',
        date_of_birth: massaData.date_of_birth,
        phone_number: massaData.phone_number,
        email: massaData.email,
        address: massaData.address,
        rt: String(massaData.rt),
        rw: String(massaData.rw),
        province_id: String(massaData.province_id),
        regency_id: String(massaData.regency_id),
        district_id: String(massaData.district_id),
        village_id: String(massaData.village_id),
        postal_code: String(massaData.postal_code),
        latitude: String(massaData.latitude),
        longitude: String(massaData.longitude),
        profession: massaData.profession || '',
        notes: massaData.notes || '',
        status: massaData.status,
        photo: massaData.photo || null
      })
    }
  }, [isEdit, massaData, reset])

  const onSubmit = async (values: MassaFormValues) => {
    if (isEdit && id) {
      await updateMassa({ ...values, id: Number(id) })
    } else {
      await createMassa(values)
    }
    navigate('/dashboard/mass-data')
  }

  if (isEdit && isLoadingMassa) {
    return <div className="p-6 text-center">{t('public.loadingText')}</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/mass-data')}
          className="text-muted hover:text-foreground border-card-border bg-card h-9 gap-2 rounded-lg border px-3 transition-colors"
          icon={<ArrowLeft size={16} />}
        >
          {t('public.backToList')}
        </Button>

        <div>
          <h1 className="text-foreground text-2xl font-bold">
            {isEdit ? t('dashboard.massa.form.editTitle') : t('dashboard.massa.form.createTitle')}
          </h1>
          <p className="text-muted mt-1 text-sm">{isEdit ? t('dashboard.massa.form.editSubtitle') : t('dashboard.massa.form.createSubtitle')}</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content (Left Column) */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <IdentityForm control={control} errors={errors} />
            <AddressForm control={control} errors={errors} />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="flex flex-col gap-8">
            <ContactForm control={control} errors={errors} isCreating={isCreating} isUpdating={isUpdating} isEdit={isEdit} />
          </div>
        </form>
      </FormProvider>

      {/* Form Footer Info */}
      <div className="border-card-border mt-4 border-t pt-6 text-center">
        <p className="text-muted text-sm italic">{t('dashboard.massa.form.formFooter')}</p>
      </div>
    </div>
  )
}
