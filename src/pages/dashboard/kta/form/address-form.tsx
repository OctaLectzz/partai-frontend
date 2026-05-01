import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { KtaFormValues } from '@/schemas/kta-schema'
import type { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface AddressFormProps {
  control: Control<KtaFormValues>
  errors: FieldErrors<KtaFormValues>
  setValue: UseFormSetValue<KtaFormValues>
  selectedProvince?: string
  selectedRegency?: string
  selectedDistrict?: string
  provinces: any[]
  regencies: any[]
  districts: any[]
  villages: any[]
  isLoadingRegencies?: boolean
  isLoadingDistricts?: boolean
  isLoadingVillages?: boolean
}

export const AddressForm = ({
  control,
  errors,
  setValue,
  selectedProvince,
  selectedRegency,
  selectedDistrict,
  provinces,
  regencies,
  districts,
  villages,
  isLoadingRegencies,
  isLoadingDistricts,
  isLoadingVillages
}: AddressFormProps) => {
  const { t } = useTranslation()

  return (
    <Card className="shadow-sm">
      <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <h3 className="mb-4 border-b pb-2 text-lg font-bold">{t('dashboard.kta.form.addressSection')}</h3>
        </div>

        <div className="md:col-span-2">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Textarea
                label={t('public.address.label')}
                placeholder={t('dashboard.kta.form.addressPlaceholder')}
                error={errors.address?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="rt"
          control={control}
          render={({ field }) => <Input label={t('public.address.rt')} placeholder="001" error={errors.rt?.message} {...field} />}
        />

        <Controller
          name="rw"
          control={control}
          render={({ field }) => <Input label={t('public.address.rw')} placeholder="001" error={errors.rw?.message} {...field} />}
        />

        <Controller
          name="province_id"
          control={control}
          render={({ field }) => (
            <Select
              label={t('public.address.province')}
              options={provinces?.map((p) => ({ label: p.name, value: String(p.id) })) || []}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                setValue('regency_id', '')
                setValue('district_id', '')
                setValue('village_id', '')
              }}
              error={errors.province_id?.message}
            />
          )}
        />

        <Controller
          name="regency_id"
          control={control}
          render={({ field }) => (
            <Select
              label={t('public.address.regency')}
              options={regencies?.map((r) => ({ label: r.name, value: String(r.id) })) || []}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                setValue('district_id', '')
                setValue('village_id', '')
              }}
              disabled={!selectedProvince}
              isLoading={isLoadingRegencies}
              error={errors.regency_id?.message}
            />
          )}
        />

        <Controller
          name="district_id"
          control={control}
          render={({ field }) => (
            <Select
              label={t('public.address.district')}
              options={districts?.map((d) => ({ label: d.name, value: String(d.id) })) || []}
              value={field.value}
              onChange={(val) => {
                field.onChange(val)
                setValue('village_id', '')
              }}
              disabled={!selectedRegency}
              isLoading={isLoadingDistricts}
              error={errors.district_id?.message}
            />
          )}
        />

        <Controller
          name="village_id"
          control={control}
          render={({ field }) => (
            <Select
              label={t('public.address.village')}
              options={villages?.map((v) => ({ label: v.name, value: String(v.id) })) || []}
              value={field.value}
              onChange={field.onChange}
              disabled={!selectedDistrict}
              isLoading={isLoadingVillages}
              error={errors.village_id?.message}
            />
          )}
        />

        <Controller
          name="postal_code"
          control={control}
          render={({ field }) => <Input label={t('public.address.postalCode')} placeholder="12345" error={errors.postal_code?.message} {...field} />}
        />
      </CardContent>
    </Card>
  )
}
