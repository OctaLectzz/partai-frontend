import { Button } from '@/components/ui/button'
import { useCreateKta, useKta, useUpdateKta } from '@/hooks/use-kta'
import { useDistricts, useProvinces, useRegencies, useVillages } from '@/hooks/use-region'
import { ktaSchema, type KtaFormValues } from '@/schemas/kta-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { CouncilSelector } from './council-selector'
import { AddressForm } from './form/address-form'
import { IdentityForm } from './form/identity-form'
import { KtaCard } from './kta-card'

export default function DigitalMembershipCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  const { data: provinces = [] } = useProvinces()
  const { mutate: createKta, isPending: isCreating } = useCreateKta()
  const { mutate: updateKta, isPending: isUpdating } = useUpdateKta()
  const { data: ktaData, isLoading: isFetching } = useKta(Number(id))

  const form = useForm<KtaFormValues>({
    resolver: zodResolver(ktaSchema),
    defaultValues: {
      nik: '',
      name: '',
      phone_number: '',
      place_of_birth: '',
      date_of_birth: '',
      gender: 'M',
      position: '',
      address: '',
      rt: '',
      rw: '',
      province_id: '',
      regency_id: '',
      district_id: '',
      village_id: '',
      postal_code: '',
      photo: '',
      is_council: false
    } as KtaFormValues
  })

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = form

  const selectedProvince = watch('province_id')
  const selectedRegency = watch('regency_id')
  const selectedDistrict = watch('district_id')

  const { data: regencies = [], isLoading: isLoadingRegencies } = useRegencies(selectedProvince)
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(selectedRegency)
  const { data: villages = [], isLoading: isLoadingVillages } = useVillages(selectedDistrict)

  useEffect(() => {
    if (ktaData && isEdit) {
      reset({
        ...ktaData,
        province_id: String(ktaData.province_id),
        regency_id: String(ktaData.regency_id),
        district_id: String(ktaData.district_id),
        village_id: String(ktaData.village_id),
        photo: ktaData.photo || '',
        is_council: ktaData.is_council ?? false
      } as KtaFormValues)
    }
  }, [ktaData, isEdit, reset])

  const onSubmit = (values: KtaFormValues) => {
    if (isEdit) {
      updateKta(
        { ...values, id: Number(id) },
        {
          onSuccess: (data) => navigate(`/dashboard/kta/show/${data.id}`)
        }
      )
    } else {
      createKta(values, {
        onSuccess: (data) => navigate(`/dashboard/kta/show/${data.id}`)
      })
    }
  }

  // Preview Data
  const previewData = {
    ...watch(),
    province_name: provinces?.find((p) => String(p.id) === String(watch('province_id')))?.name,
    regency_name: regencies?.find((r) => String(r.id) === String(watch('regency_id')))?.name,
    district_name: districts?.find((d) => String(d.id) === String(watch('district_id')))?.name,
    village_name: villages?.find((v) => String(v.id) === String(watch('village_id')))?.name
  }

  if (isFetching) return <div className="p-6 text-center">{t('public.loadingText')}</div>

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{isEdit ? t('dashboard.kta.form.editTitle') : t('dashboard.kta.form.createTitle')}</h1>
          <p className="text-muted text-sm">{isEdit ? t('dashboard.kta.form.editSubtitle') : t('dashboard.kta.form.createSubtitle')}</p>
        </div>

        {!isEdit && (
          <Button onClick={() => setIsSelectorOpen(true)}>
            <UserPlus size={16} />
            {t('dashboard.kta.selector.title')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form Section */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <IdentityForm control={control} errors={errors} />

            <AddressForm
              control={control}
              errors={errors}
              setValue={setValue}
              selectedProvince={selectedProvince}
              selectedRegency={selectedRegency}
              selectedDistrict={selectedDistrict}
              provinces={provinces}
              regencies={regencies}
              districts={districts}
              villages={villages}
              isLoadingRegencies={isLoadingRegencies}
              isLoadingDistricts={isLoadingDistricts}
              isLoadingVillages={isLoadingVillages}
            />

            <div className="flex justify-end gap-4">
              {isEdit && (
                <Button type="button" variant="ghost" onClick={() => navigate('/dashboard/kta')}>
                  {t('public.cancelText')}
                </Button>
              )}
              <Button type="submit" disabled={isCreating || isUpdating} className="px-8">
                {isEdit ? t('dashboard.kta.form.submitUpdate') : t('dashboard.kta.form.submitCreate')}
              </Button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{t('public.preview')}</h3>
              <span className="text-muted rounded bg-slate-100 px-2 py-1 text-xs font-medium dark:bg-slate-800">{t('public.live')}</span>
            </div>

            <KtaCard data={previewData as any} className="mx-auto mt-4 origin-top scale-110 shadow-2xl" />

            <div className="mt-8 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
              <p className="text-xs leading-relaxed text-blue-800 italic dark:text-blue-300">{t('dashboard.kta.form.previewHint')}</p>
              <div className="h-px w-full bg-blue-100 dark:bg-blue-900/50" />
              <p className="text-[10px] leading-relaxed font-bold text-blue-900 dark:text-blue-200">{t('dashboard.kta.form.ktaNumberNote')}</p>
            </div>
          </div>
        </div>
      </div>

      <CouncilSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={(council) => {
          setValue('nik', council.nik || '', { shouldValidate: true })
          setValue('name', council.name || '', { shouldValidate: true })
          setValue('phone_number', council.phone_number || '', { shouldValidate: true })
          setValue('place_of_birth', council.place_of_birth || '', { shouldValidate: true })
          setValue('date_of_birth', council.date_of_birth || '', { shouldValidate: true })
          setValue('gender', (council.gender as any) || 'M', { shouldValidate: true })
          setValue('position', council.profession || '', { shouldValidate: true })
          setValue('address', council.address || '', { shouldValidate: true })
          setValue('rt', council.rt || '', { shouldValidate: true })
          setValue('rw', council.rw || '', { shouldValidate: true })
          setValue('province_id', council.province_id ? String(council.province_id) : '', { shouldValidate: true })

          // Stagger the child regions to allow hooks to initialize
          setTimeout(() => {
            setValue('regency_id', council.regency_id ? String(council.regency_id) : '', { shouldValidate: true })
            setTimeout(() => {
              setValue('district_id', council.district_id ? String(council.district_id) : '', { shouldValidate: true })
              setTimeout(() => {
                setValue('village_id', council.village_id ? String(council.village_id) : '', { shouldValidate: true })
              }, 100)
            }, 100)
          }, 100)

          setValue('postal_code', council.postal_code || '', { shouldValidate: true })
          setValue('is_council', true, { shouldValidate: true })
        }}
      />
    </div>
  )
}
