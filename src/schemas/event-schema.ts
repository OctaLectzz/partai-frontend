import { t } from '@/utils/i18n'
import { z } from 'zod'

export const eventSchema = z.object({
  category_id: z.number({
    message: t('dashboard.events.validate.categoryRequired')
  }),
  name: z
    .string()
    .min(1, { message: t('dashboard.events.validate.nameRequired') })
    .max(255, { message: t('dashboard.events.validate.nameMax') }),
  description: z.string().min(1, { message: t('dashboard.events.validate.descriptionRequired') }),
  organizer: z
    .string()
    .min(1, { message: t('dashboard.events.validate.organizerRequired') })
    .max(255, { message: t('dashboard.events.validate.organizerMax') }),
  target_participants: z
    .number({
      message: t('dashboard.events.validate.targetParticipantsRequired')
    })
    .min(1, { message: t('dashboard.events.validate.targetParticipantsMin') }),
  start_date: z.string().min(1, { message: t('dashboard.events.validate.startDateRequired') }),
  start_time: z.string().min(1, { message: t('dashboard.events.validate.startTimeRequired') }),
  end_date: z.string().min(1, { message: t('dashboard.events.validate.endDateRequired') }),
  end_time: z.string().min(1, { message: t('dashboard.events.validate.endTimeRequired') }),
  location: z
    .string()
    .min(1, { message: t('dashboard.events.validate.locationRequired') })
    .max(255, { message: t('dashboard.events.validate.locationMax') }),
  status: z.enum(['draft', 'published', 'completed', 'cancelled'], {
    message: t('dashboard.events.validate.statusRequired')
  })
})

export type EventFormValues = z.input<typeof eventSchema>
