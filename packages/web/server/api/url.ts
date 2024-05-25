import { getUrls } from '~/server/utils/database'

export default defineEventHandler<{ query: { date: string, count: number, urlMatch: string } }>((event) => {
  const { date, count, urlMatch } = getQuery(event)

  return getUrls(date, count, urlMatch)
})
