import { JsonObject } from '#util/badgerfish/types'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const eventFile = join(dirname(fileURLToPath(import.meta.url)), '../tmp/xsi_events.json')

export async function recordEvent(event: JsonObject) {
  let events = []

  if (existsSync(eventFile)) {
    const fileData = await readFile(eventFile, 'utf-8')
    events = JSON.parse(fileData)
  }

  events.unshift(event)

  if (events.length > 100) events.pop()

  await writeFile(eventFile, JSON.stringify(events, null, 2), 'utf-8')
}
