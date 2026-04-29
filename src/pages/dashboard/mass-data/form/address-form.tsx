import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LocationPicker } from '@/components/ui/location-picker'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useDistricts, useProvinces, useRegencies, useVillages } from '@/hooks/use-region'
import type { MassaFormValues } from '@/schemas/massa-schema'
import { useEffect, useMemo, useState } from 'react'
import { type Control, Controller, type FieldErrors, useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface AddressFormProps {
  control: Control<MassaFormValues>
  errors: FieldErrors<MassaFormValues>
}

export const AddressForm = ({ control, errors }: AddressFormProps) => {
  const { t } = useTranslation()
  const { setValue } = useFormContext<MassaFormValues>()
  const [userChangedRegion, setUserChangedRegion] = useState(false)

  // Region Watches
  const provinceId = useWatch({ control, name: 'province_id' })
  const regencyId = useWatch({ control, name: 'regency_id' })
  const districtId = useWatch({ control, name: 'district_id' })
  const villageId = useWatch({ control, name: 'village_id' })

  // Region Hooks
  const { data: provinces = [] } = useProvinces()
  const { data: regencies = [], isLoading: isLoadingRegencies } = useRegencies(provinceId)
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(regencyId)
  const { data: villages = [], isLoading: isLoadingVillages } = useVillages(districtId)

  // Options Mapping
  const provinceOptions = provinces.map((province) => ({ label: province.name, value: String(province.id) }))
  const regencyOptions = regencies.map((regencie) => ({ label: regencie.name, value: String(regencie.id) }))
  const districtOptions = districts.map((district) => ({ label: district.name, value: String(district.id) }))
  const villageOptions = villages.map((village) => ({ label: village.name, value: String(village.id) }))

  // Search Query for Map
  const searchQuery = useMemo(() => {
    const p = provinces.find((x) => String(x.id) === String(provinceId))?.name || ''
    const r = regencies.find((x) => String(x.id) === String(regencyId))?.name || ''
    const d = districts.find((x) => String(x.id) === String(districtId))?.name || ''
    const v = villages.find((x) => String(x.id) === String(villageId))?.name || ''
    return [v, d, r, p].filter(Boolean).join(', ')
  }, [provinces, regencies, districts, villages, provinceId, regencyId, districtId, villageId])

  // Resets (Cascading)
  useEffect(() => {
    if (provinceId && !isLoadingRegencies) {
      const exists = regencies.some((r) => String(r.id) === String(regencyId))
      if (!exists && regencyId) {
        setValue('regency_id', '')
        setValue('district_id', '')
        setValue('village_id', '')
      }
    }
  }, [provinceId, regencies, regencyId, isLoadingRegencies, setValue])

  useEffect(() => {
    if (regencyId && !isLoadingDistricts) {
      const exists = districts.some((d) => String(d.id) === String(districtId))
      if (!exists && districtId) {
        setValue('district_id', '')
        setValue('village_id', '')
      }
    }
  }, [regencyId, districts, districtId, isLoadingDistricts, setValue])

  useEffect(() => {
    if (districtId && !isLoadingVillages) {
      const exists = villages.some((v) => String(v.id) === String(villageId))
      if (!exists && villageId) {
        setValue('village_id', '')
      }
    }
  }, [districtId, villages, villageId, isLoadingVillages, setValue])

  return (
    <Card className="flex flex-col gap-6 p-8 shadow-xl">
      <div className="border-primary border-b pb-4">
        <h3 className="text-foreground text-lg font-bold">{t('dashboard.massa.form.addressSection')}</h3>
      </div>

      <div className="flex flex-col gap-6">
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Textarea
              label={t('public.address.label')}
              placeholder={t('dashboard.massa.form.addressPlaceholder')}
              description={t('dashboard.massa.form.addressDescription')}
              error={errors.address?.message}
              required
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            name="rt"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                label={t('public.address.rt')}
                placeholder={t('dashboard.massa.form.rtPlaceholder')}
                error={errors.rt?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="rw"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                label={t('public.address.rw')}
                placeholder={t('dashboard.massa.form.rwPlaceholder')}
                error={errors.rw?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="postal_code"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                label={t('public.address.postalCode')}
                placeholder={t('dashboard.massa.form.postalCodePlaceholder')}
                error={errors.postal_code?.message}
                required
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="province_id"
            control={control}
            render={({ field }) => (
              <Select
                options={provinceOptions}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val)
                  setUserChangedRegion(true)
                }}
                label={t('public.address.province')}
                error={errors.province_id?.message}
                placeholder={t('public.address.province')}
                required
              />
            )}
          />

          <Controller
            name="regency_id"
            control={control}
            render={({ field }) => (
              <Select
                options={regencyOptions}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val)
                  setUserChangedRegion(true)
                }}
                disabled={!provinceId}
                label={t('public.address.regency')}
                error={errors.regency_id?.message}
                placeholder={t('public.address.regency')}
                required
              />
            )}
          />

          <Controller
            name="district_id"
            control={control}
            render={({ field }) => (
              <Select
                options={districtOptions}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val)
                  setUserChangedRegion(true)
                }}
                disabled={!regencyId}
                label={t('public.address.district')}
                error={errors.district_id?.message}
                placeholder={t('public.address.district')}
                required
              />
            )}
          />

          <Controller
            name="village_id"
            control={control}
            render={({ field }) => (
              <Select
                options={villageOptions}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val)
                  setUserChangedRegion(true)
                }}
                disabled={!districtId}
                label={t('public.address.village')}
                error={errors.village_id?.message}
                placeholder={t('public.address.village')}
                required
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <LocationPicker
                lat={field.value}
                lng={control._formValues.longitude}
                required
                searchQuery={userChangedRegion || !field.value || field.value === '0' ? searchQuery : undefined}
                error={errors.latitude?.message || errors.longitude?.message}
                onChange={(lat, lng) => {
                  setValue('latitude', String(lat))
                  setValue('longitude', String(lng))
                }}
              />
            )}
          />
        </div>
      </div>
    </Card>
  )
}
