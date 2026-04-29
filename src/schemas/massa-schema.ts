import { t } from '@/utils/i18n'
import { z } from 'zod'

export const massaSchema = z.object({
  nik: z
    .string()
    .length(16, { message: t('dashboard.massa.validate.nikLength') })
    .min(1, { message: t('dashboard.massa.validate.nikRequired') }),
  full_name: z
    .string()
    .min(1, { message: t('dashboard.massa.validate.fullNameRequired') })
    .max(255, { message: t('dashboard.massa.validate.fullNameMax') }),
  gender: z.enum(['M', 'F'], {
    message: t('dashboard.massa.validate.genderRequired')
  }),
  place_of_birth: z.string().max(255).nullable(),
  date_of_birth: z.string().min(1, { message: t('dashboard.massa.validate.dateOfBirthRequired') }),
  phone_number: z
    .string()
    .min(1, { message: t('dashboard.massa.validate.phoneNumberRequired') })
    .max(20),
  email: z
    .string()
    .email({ message: t('dashboard.massa.validate.emailFormat') })
    .max(255),
  address: z.string().min(1, { message: t('dashboard.massa.validate.addressRequired') }),
  rt: z
    .string()
    .max(5)
    .min(1, { message: t('dashboard.massa.validate.rtRequired') }),
  rw: z
    .string()
    .max(5)
    .min(1, { message: t('dashboard.massa.validate.rwRequired') }),
  province_id: z.string().min(1, { message: t('dashboard.massa.validate.provinceRequired') }),
  regency_id: z.string().min(1, { message: t('dashboard.massa.validate.regencyRequired') }),
  district_id: z.string().min(1, { message: t('dashboard.massa.validate.districtRequired') }),
  village_id: z.string().min(1, { message: t('dashboard.massa.validate.villageRequired') }),
  postal_code: z
    .string()
    .max(10)
    .min(1, { message: t('dashboard.massa.validate.postalCodeRequired') }),
  latitude: z.union([z.number(), z.string()]).refine((v) => !isNaN(Number(v))),
  longitude: z.union([z.number(), z.string()]).refine((v) => !isNaN(Number(v))),
  profession: z.string().max(255).optional().nullable(),
  photo: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  notes: z.string().optional().nullable(),
  status: z.enum(['active', 'inactive']).optional()
})

export type MassaFormValues = z.infer<typeof massaSchema>
