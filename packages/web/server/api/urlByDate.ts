export default defineEventHandler<{ query: { date: string } }>((event) => {
  const { date } = getQuery(event)

  return getUrlsByDate(date)
})
