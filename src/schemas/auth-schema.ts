import { t } from '@/utils/i18n'
import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: t('auth.validate.nameRequired') })
      .max(255, { message: t('auth.validate.nameMax') }),
    email: z.string().email({ message: t('auth.validate.emailFormat') }),
    password: z.string().min(8, { message: t('auth.validate.passwordMinLength') }),
    confirm_password: z.string().min(8, { message: t('auth.validate.passwordMinLength') })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: t('auth.validate.confirmPasswordNotMatch'),
    path: ['confirm_password']
  })

export const loginSchema = z.object({
  email: z.string().email({ message: t('auth.validate.emailFormat') }),
  password: z.string().min(8, { message: t('auth.validate.passwordMinLength') })
})

export const profileSchema = z.object({
  avatar: z.instanceof(File).optional().nullable(),
  remove_avatar: z.boolean().optional().default(false),
  ktp_photo: z.instanceof(File).optional().nullable(),
  remove_ktp_photo: z.boolean().optional().default(false),
  name: z
    .string()
    .min(1, { message: t('auth.validate.nameRequired') })
    .max(255, { message: t('auth.validate.nameMax') }),
  email: z.string().email({ message: t('auth.validate.emailFormat') }),
  nik: z
    .string()
    .max(16, { message: t('auth.validate.nikMax') })
    .optional()
    .nullable(),
  kta_number: z.string().optional().nullable(),
  phone_number: z
    .string()
    .max(20, { message: t('auth.validate.phoneNumberMax') })
    .optional()
    .nullable(),
  place_of_birth: z
    .string()
    .max(255, { message: t('auth.validate.placeOfBirthMax') })
    .optional()
    .nullable(),
  date_of_birth: z.string().optional().nullable(),
  gender: z.enum(['M', 'F']).optional().nullable(),
  religion: z.string().optional().nullable(),
  marital_status: z.string().optional().nullable(),
  education: z.string().optional().nullable(),
  profession: z
    .string()
    .max(255, { message: t('auth.validate.professionMax') })
    .optional()
    .nullable(),
  address: z.string().optional().nullable(),
  rt: z
    .string()
    .max(3, { message: t('auth.validate.rtMax') })
    .optional()
    .nullable(),
  rw: z
    .string()
    .max(3, { message: t('auth.validate.rwMax') })
    .optional()
    .nullable(),
  province_id: z.string().optional().nullable(),
  regency_id: z.string().optional().nullable(),
  district_id: z.string().optional().nullable(),
  village_id: z.string().optional().nullable(),
  postal_code: z
    .string()
    .max(5, { message: t('auth.validate.postalCodeMax') })
    .optional()
    .nullable()
})

export const passwordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, { message: t('auth.validate.passwordMinLength') })
      .max(255, { message: t('auth.validate.passwordMax') }),
    new_password: z
      .string()
      .min(8, { message: t('auth.validate.passwordMinLength') })
      .max(255, { message: t('auth.validate.passwordMax') })
      .regex(/[A-Z]/, { message: t('auth.validate.passwordUppercase') })
      .regex(/[0-9]/, { message: t('auth.validate.passwordNumber') })
      .regex(/[^A-Za-z0-9]/, { message: t('auth.validate.passwordSymbol') }),
    confirm_password: z.string()
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: t('auth.validate.passwordMismatch'),
    path: ['confirm_password']
  })

export type Register = z.input<typeof registerSchema>
export type Login = z.input<typeof loginSchema>
export type ProfileFormValues = z.input<typeof profileSchema>
export type PasswordFormValues = z.input<typeof passwordSchema>
