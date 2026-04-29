import { t } from '@/utils/i18n'
import { z } from 'zod'

export const councilSchema = z.object({
  nik: z.string().length(16, { message: t('dashboard.council.validate.nikLength') }),
  name: z
    .string()
    .min(1, { message: t('dashboard.council.validate.nameRequired') })
    .max(255),
  email: z
    .string()
    .min(1, { message: t('dashboard.council.validate.emailRequired') })
    .email({ message: t('dashboard.council.validate.emailFormat') }),
  password: z
    .string()
    .min(8, { message: t('dashboard.council.validate.passwordMin') })
    .optional()
    .nullable(),
  confirm_password: z.string().optional().nullable(),
  phone_number: z
    .string()
    .min(1, { message: t('dashboard.council.validate.phoneNumberRequired') })
    .max(20, { message: t('dashboard.council.validate.phoneNumberMax') }),

  // Biodata
  place_of_birth: z.string().max(255).optional().nullable(),
  date_of_birth: z.string().min(1, { message: t('dashboard.council.validate.dateOfBirthRequired') }),
  gender: z.enum(['M', 'F'], { message: t('dashboard.council.validate.genderRequired') }),
  religion: z.enum(['islam', 'christian', 'catholic', 'hindu', 'buddhist', 'confucian'], {
    message: t('dashboard.council.validate.religionRequired')
  }),
  marital_status: z.enum(['single', 'married', 'divorced', 'widowed'], {
    message: t('dashboard.council.validate.maritalStatusRequired')
  }),
  education: z.enum(['high_school', 'associate_degree', 'bachelors_degree', 'masters_degree', 'doctorate'], {
    message: t('dashboard.council.validate.educationRequired')
  }),
  profession: z
    .string()
    .min(1, { message: t('dashboard.council.validate.professionRequired') })
    .max(255),

  // Address
  address: z.string().min(1, { message: t('dashboard.council.validate.addressRequired') }),
  rt: z
    .string()
    .min(1, { message: t('dashboard.council.validate.rtRequired') })
    .max(3),
  rw: z
    .string()
    .min(1, { message: t('dashboard.council.validate.rwRequired') })
    .max(3),
  province_id: z.string().min(1, { message: t('dashboard.council.validate.provinceRequired') }),
  regency_id: z.string().min(1, { message: t('dashboard.council.validate.regencyRequired') }),
  district_id: z.string().min(1, { message: t('dashboard.council.validate.districtRequired') }),
  village_id: z.string().min(1, { message: t('dashboard.council.validate.villageRequired') }),
  postal_code: z
    .string()
    .min(1, { message: t('dashboard.council.validate.postalCodeRequired') })
    .max(5, { message: t('dashboard.council.validate.postalCodeMax') }),

  latitude: z.union([z.number(), z.string()]).refine((v) => !isNaN(Number(v))),
  longitude: z.union([z.number(), z.string()]).refine((v) => !isNaN(Number(v))),

  // Files & Status
  photo: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  ktp_photo: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  status: z.boolean().optional().default(true)
})

export const councilCreateSchema = councilSchema
  .extend({
    password: z.string().min(8, { message: t('dashboard.council.validate.passwordMin') }),
    confirm_password: z.string().min(8, { message: t('dashboard.council.validate.passwordMin') })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('dashboard.council.validate.confirmPasswordNotMatch'),
        path: ['confirm_password']
      })
    }
  })

export const councilUpdateSchema = councilSchema
  .extend({
    password: z.string().optional().nullable(),
    confirm_password: z.string().optional().nullable()
  })
  .superRefine((data, ctx) => {
    if ((data.password || data.confirm_password) && data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('dashboard.council.validate.confirmPasswordNotMatch'),
        path: ['confirm_password']
      })
    }
  })

export type CouncilFormValues = z.input<typeof councilSchema>
export type CouncilCreateFormValues = z.input<typeof councilCreateSchema>
export type CouncilUpdateFormValues = z.input<typeof councilUpdateSchema>
