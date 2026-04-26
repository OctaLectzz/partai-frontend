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
      .email({ message: t('dashboard.user.validate.emailFormat') })
      .optional()
      .nullable(),
    password: z
      .string()
      .min(8, { message: t('dashboard.user.validate.passwordMinLength') })
      .optional()
      .nullable(),
    confirm_password: z.string().optional().nullable(),
    nik: z
      .string()
      .max(16, { message: t('dashboard.user.validate.nikMax') })
      .optional()
      .nullable(),
    kta_number: z.string().optional().nullable(),
    phone_number: z
      .string()
      .max(20, { message: t('dashboard.user.validate.phoneNumberMax') })
      .optional()
      .nullable(),
    place_of_birth: z
      .string()
      .max(255, { message: t('dashboard.user.validate.placeOfBirthMax') })
      .optional()
      .nullable(),
    date_of_birth: z.string().optional().nullable(),
    gender: z.enum(['M', 'F']).optional().nullable(),
    religion: z.string().optional().nullable(),
    marital_status: z.string().optional().nullable(),
    education: z.string().optional().nullable(),
    profession: z
      .string()
      .max(255, { message: t('dashboard.user.validate.professionMax') })
      .optional()
      .nullable(),
    address: z.string().optional().nullable(),
    rt: z
      .string()
      .max(3, { message: t('dashboard.user.validate.rtMax') })
      .optional()
      .nullable(),
    rw: z
      .string()
      .max(3, { message: t('dashboard.user.validate.rwMax') })
      .optional()
      .nullable(),
    province_id: z.string().optional().nullable(),
    regency_id: z.string().optional().nullable(),
    district_id: z.string().optional().nullable(),
    village_id: z.string().optional().nullable(),
    postal_code: z
      .string()
      .max(5, { message: t('dashboard.user.validate.postalCodeMax') })
      .optional()
      .nullable(),
    role: z.enum(['admin', 'board_member', 'member', 'sympathizer']).optional().nullable(),
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
