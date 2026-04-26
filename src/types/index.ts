export interface ApiResponse<T> {
  data: T
}

export type APIErrorResponse = {
  message: string
  error?: string
  errors?: Record<string, string[]>
}
