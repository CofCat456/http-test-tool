import type { Data } from '~/types'

export function migrateDatabase() {
  const db = useDatabase()
  db.sql`CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url TEXT,
    event TEXT,
    data TEXT
  )`
}

/**
 * Adds a new URL to the database.
 *
 * @param url - The URL to be added.
 * @param event - The event associated with the URL.
 * @param data - Additional data to be stored along with the URL.
 */
export async function addUrl(url: string, event: string, data: Record<string, any>) {
  const db = useDatabase()

  await db.sql`INSERT INTO urls (url, event, data) VALUES (${url}, ${event}, ${JSON.stringify(data)})`
}

/**
 * Retrieves a list of URLs from the database based on the specified date, count, and URL matching string.
 *
 * @param date - The date to filter the URLs by.
 * @param count - The maximum number of URLs to retrieve (default: 10).
 * @param urlMatch - A string to match URLs (default: '').
 */
export async function getUrls(date: string, count: number = 10, urlMatch: string = ''): Promise<Data[]> {
  const db = useDatabase()

  const { rows }: { rows: Data[] } = await db.sql`
    SELECT * FROM urls 
    WHERE created_at < ${date} 
    AND url LIKE ${`%${urlMatch}%`}
    ORDER BY created_at DESC 
    LIMIT ${count}
  `

  return rows
}

/**
 * Retrieves the latest URL record from the database.
 */
export async function getLatestUrl() {
  const db = useDatabase()

  const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls ORDER BY created_at DESC LIMIT 1`

  if (rows.length > 0)
    return rows[0]
  else
    return null
}
