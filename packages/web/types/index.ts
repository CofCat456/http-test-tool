export type HttpEvent = 'GET' | 'POST'

export interface ParseData {
  id: number
  url: string
  created_at: string
  event: HttpEvent
  data: string
}

export interface Data {
  id: number
  url: string
  created_at: string
  event: HttpEvent
  data: Record<string, string | number | boolean>
}
