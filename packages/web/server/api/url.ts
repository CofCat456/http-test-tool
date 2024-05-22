import { getUrls } from '~/server/utils/database'

export default defineEventHandler<{ query: { date: string, count?: number } }>((event) => {
  const { date, count } = getQuery(event)

  return getUrls(date, count)
})
