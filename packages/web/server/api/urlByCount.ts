export default defineEventHandler<{ query: { count: number } }>((event) => {
  const { count } = getQuery(event)

  return getUrlsByCount(count)
})
