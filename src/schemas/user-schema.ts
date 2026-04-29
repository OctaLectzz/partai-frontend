import { t } from '@/utils/i18n'
import { z } from 'zod'

export const userSchema = z
  .object({
    avatar: z.instanceof(File).optional().nullable(),
    remove_avatar: z.boolean().optional().default(false),
    ktp_photo: z.instanceof(File).optional().nullable(),
    remove_ktp_photo: z.boolean().optional().default(false),
    name: z
      .string()
      .min(1, { message: t('dashboard.user.validate.nameRequired') })
      .max(255, { message: t('dashboard.user.validate.nameMax') }),
    email: z
      .string()
      .min(1, { message: t('dashboard.user.validate.emailRequired') })
      .email({ message: t('dashboard.user.validate.emailFormat') }),
    password: z
      .string()
      .min(8, { message: t('dashboard.user.validate.passwordMinLength') })
      .optional()
      .nullable(),
    confirm_password: z.string().optional().nullable(),
    nik: z.string().length(16, { message: t('dashboard.user.validate.nikLength') }),
    kta_number: z.string().optional().nullable(),
    phone_number: z
      .string()
      .min(1, { message: t('dashboard.user.validate.phoneNumberRequired') })
      .max(20, { message: t('dashboard.user.validate.phoneNumberMax') }),
    place_of_birth: z
      .string()
      .max(255, { message: t('dashboard.user.validate.placeOfBirthMax') })
      .optional()
      .nullable(),
    date_of_birth: z.string().min(1, { message: t('dashboard.user.validate.dateOfBirthRequired') }),
    gender: z.enum(['M', 'F']),
    religion: z.string().min(1, { message: t('dashboard.user.validate.religionRequired') }),
    marital_status: z.string().min(1, { message: t('dashboard.user.validate.maritalStatusRequired') }),
    education: z.string().min(1, { message: t('dashboard.user.validate.educationRequired') }),
    profession: z
      .string()
      .min(1, { message: t('dashboard.user.validate.professionRequired') })
      .max(255, { message: t('dashboard.user.validate.professionMax') }),
    address: z.string().min(1, { message: t('dashboard.user.validate.addressRequired') }),
    rt: z
      .string()
      .min(1, { message: t('dashboard.user.validate.rtRequired') })
      .max(3, { message: t('dashboard.user.validate.rtMax') }),
    rw: z
      .string()
      .min(1, { message: t('dashboard.user.validate.rwRequired') })
      .max(3, { message: t('dashboard.user.validate.rwMax') }),
    province_id: z.string().min(1, { message: t('dashboard.user.validate.provinceRequired') }),
    regency_id: z.string().min(1, { message: t('dashboard.user.validate.regencyRequired') }),
    district_id: z.string().min(1, { message: t('dashboard.user.validate.districtRequired') }),
    village_id: z.string().min(1, { message: t('dashboard.user.validate.villageRequired') }),
    postal_code: z
      .string()
      .min(1, { message: t('dashboard.user.validate.postalCodeRequired') })
      .max(5, { message: t('dashboard.user.validate.postalCodeMax') }),
    role: z.enum(['superadmin', 'admin', 'council', 'member']).optional().nullable(),
    type: z.enum(['admin', 'user']).optional().nullable(),
    status: z.boolean().optional().default(true),
    isEdit: z.boolean().optional().default(false)
  })
  .refine((data) => data.password === data.confirm_password, {
    message: t('dashboard.user.validate.confirmPasswordNotMatch'),
    path: ['confirm_password']
  })

export const userCreateSchema = userSchema
  .extend({
    password: z.string().min(8, { message: t('dashboard.user.validate.passwordMinLength') }),
    confirm_password: z.string().min(8, { message: t('dashboard.user.validate.passwordMinLength') })
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('dashboard.user.validate.confirmPasswordNotMatch'),
        path: ['confirm_password']
      })
    }
  })

export const userUpdateSchema = userSchema
  .extend({
    password: z.string().optional().nullable(),
    confirm_password: z.string().optional().nullable()
  })
  .superRefine((data, ctx) => {
    if ((data.password || data.confirm_password) && data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('dashboard.user.validate.confirmPasswordNotMatch'),
        path: ['confirm_password']
      })
    }
  })

export type UserFormValues = z.input<typeof userSchema>
export type UserCreateFormValues = z.input<typeof userCreateSchema>
export type UserUpdateFormValues = z.input<typeof userUpdateSchema>
