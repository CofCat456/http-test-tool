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
 *
 * @param url 新增的 URL
 * @param event Get / Post
 * @param data 附加的資料
 */
export async function addUrl(url: string, event: string, data: Record<string, any>) {
  const db = useDatabase()

  await db.sql`INSERT INTO urls (url, event, data) VALUES (${url}, ${event}, ${JSON.stringify(data)})`
}

/**
 * 返回指定數量資料 or 返回所有資料
 * @param count 指定數量
 */
export async function getUrlsByCount(count?: number): Promise<Data[]> {
  const db = useDatabase()

  if (count) {
    const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls ORDER BY created_at ASC LIMIT ${count}`
    return rows
  }
  else {
    const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls ORDER BY created_at ASC`
    return rows
  }
}

/**
 * 返回指定日期之前的 URL
 * @param date 指定日期
 */
export async function getUrlsByDate(date: string): Promise<Data[]> {
  const db = useDatabase()

  const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls WHERE created_at < ${date} ORDER BY created_at ASC`

  return rows
}

/**
 * 獲取最新的 URL
 */
export async function getLatestUrl() {
  const db = useDatabase()

  // 查询最新的 URL 记录
  const { rows }: { rows: Data[] } = await db.sql`SELECT * FROM urls ORDER BY created_at DESC LIMIT 1`

  // 如果查询成功返回数据，则返回第一条数据；如果没有数据，返回 null
  if (rows.length > 0)
    return rows[0]
  else
    return null
}
