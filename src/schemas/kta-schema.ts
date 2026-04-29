import { t } from '@/utils/i18n'
import { z } from 'zod'

export const ktaSchema = z.object({
  nik: z.string().length(16, { message: t('dashboard.kta.validate.nikLength') }),
  name: z.string().min(1, { message: t('dashboard.kta.validate.nameRequired') }),
  phone_number: z.string().min(1, { message: t('dashboard.kta.validate.phoneNumberRequired') }),
  place_of_birth: z.string().min(1, { message: t('dashboard.kta.validate.placeOfBirthRequired') }),
  date_of_birth: z.string().min(1, { message: t('dashboard.kta.validate.dateOfBirthRequired') }),
  gender: z.enum(['M', 'F'], { message: t('dashboard.kta.validate.genderRequired') }),
  position: z.string().min(1, { message: t('dashboard.kta.validate.positionRequired') }),
  address: z.string().min(1, { message: t('dashboard.kta.validate.addressRequired') }),
  rt: z
    .string()
    .min(1, { message: t('dashboard.kta.validate.rtRequired') })
    .max(5),
  rw: z
    .string()
    .min(1, { message: t('dashboard.kta.validate.rwRequired') })
    .max(5),
  province_id: z.string().min(1, { message: t('dashboard.kta.validate.provinceRequired') }),
  regency_id: z.string().min(1, { message: t('dashboard.kta.validate.regencyRequired') }),
  district_id: z.string().min(1, { message: t('dashboard.kta.validate.districtRequired') }),
  village_id: z.string().min(1, { message: t('dashboard.kta.validate.villageRequired') }),
  postal_code: z
    .string()
    .min(1, { message: t('dashboard.kta.validate.postalCodeRequired') })
    .max(10),
  photo: z.union([z.instanceof(File), z.string().min(1, { message: t('dashboard.kta.validate.photoRequired') })], {
    message: t('dashboard.kta.validate.photoRequired')
  }),
  is_council: z.boolean()
})

export type KtaFormValues = z.infer<typeof ktaSchema>
export type KtaCreateFormValues = KtaFormValues
export type KtaUpdateFormValues = KtaFormValues
