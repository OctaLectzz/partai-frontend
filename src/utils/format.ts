/** Format currency IDR */
export const formatIDR = (n: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(n)

/** Format datetime (localized Indonesian) */
export const formatDateTime = (s: string): string =>
  new Date(s).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

/** Format date only */
export const formatDate = (s: string): string =>
  new Date(s).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })

/** Format date in response message */
export function formatI18nParams(params?: Record<string, unknown>) {
  if (!params) return undefined

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      const date = new Date(value)

      if (!isNaN(date.getTime())) {
        result[key] = formatDateTime(value)
      } else {
        result[key] = value
      }
    } else {
      result[key] = value
    }
  }

  return result
}

/** Format multiline for textarea output */
export const formatMultiline = (text: string) => text?.replace(/\\n/g, '\n')
