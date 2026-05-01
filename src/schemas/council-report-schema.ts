import { t } from '@/utils/i18n'
import { z } from 'zod'

export const councilReportSchema = z.object({
  // Activity Information
  title: z
    .string()
    .min(1, { message: t('dashboard.councilReport.validate.titleRequired') })
    .max(255, { message: t('dashboard.councilReport.validate.titleMax') }),
  description: z.string().min(1, { message: t('dashboard.councilReport.validate.descriptionRequired') }),
  report_type: z.enum(['meeting', 'visit', 'socialization', 'supervision', 'aspiration', 'other'], {
    message: t('dashboard.councilReport.validate.reportTypeRequired')
  }),
  activity_date: z.string().min(1, { message: t('dashboard.councilReport.validate.activityDateRequired') }),
  start_time: z.string().optional().nullable(),
  end_time: z.string().optional().nullable(),
  location: z
    .string()
    .min(1, { message: t('dashboard.councilReport.validate.locationRequired') })
    .max(255, { message: t('dashboard.councilReport.validate.locationMax') }),

  // Report Details
  agenda: z.string().optional().nullable(),
  result: z.string().optional().nullable(),
  recommendation: z.string().optional().nullable(),
  participants_count: z
    .union([z.number(), z.string()])
    .optional()
    .nullable()
    .transform((v) => (v === '' || v === null || v === undefined ? null : Number(v))),

  // Status
  status: z
    .enum(['draft', 'submitted', 'approved', 'rejected'], {
      message: t('dashboard.councilReport.validate.statusRequired')
    })
    .default('draft'),
  rejection_note: z.string().optional().nullable(),

  // Media
  media: z.array(z.instanceof(File)).optional().nullable(),
  media_captions: z.array(z.string()).optional().nullable()
})

export type CouncilReportFormValues = z.input<typeof councilReportSchema>
