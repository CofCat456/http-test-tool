import { dirname, resolve } from 'node:path'
import { mkdirSync } from 'node:fs'
import Database from 'better-sqlite3'

import type { Data } from '~/types'

// eslint-disable-next-line import/no-mutable-exports
export let db: Database.Database

function sqliteConnector() {
  const filePath = resolve('.', `.data/${'db'}.sqlite3`)
  mkdirSync(dirname(filePath), { recursive: true })
  const _db: Database.Database = new Database(filePath)

  return _db
}

export function migrateDatabase() {
  db = sqliteConnector()
  db.prepare(`CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url TEXT,
    event TEXT,
    data TEXT
  )`).run()
}

/**
 * Adds a new URL to the database.
 *
 * @param url - The URL to be added.
 * @param event - The event associated with the URL.
 * @param data - Additional data to be stored along with the URL.
 */
export function addUrl(url: string, event: string, data: Record<string, any>): void {
  db.prepare(`INSERT INTO urls (url, event, data) VALUES (@url, @event, @data)`).run({
    url,
    event,
    data: JSON.stringify(data),
  })
}

/**
 * Retrieves a list of URLs from the database based on the specified date, count, and URL matching string.
 *
 * @param date - The date to filter the URLs by.
 * @param count - The maximum number of URLs to retrieve (default: 10).
 */
export function getUrls(date: string, count: number = 100): Data[] {
  return <Data[]>db.prepare(`
    SELECT * FROM urls
    WHERE created_at < @date
    ORDER BY created_at DESC
    LIMIT @count
  `).all({
    date,
    count,
  })
}

/**
 * Retrieves the latest URL record from the database.
 */
export function getLatestUrl(): Data | null {
  const rows = db.prepare(`SELECT * FROM urls ORDER BY created_at DESC LIMIT 1`).all()

  if (rows.length > 0)
    return <Data>rows[0]
  else
    return null
}
