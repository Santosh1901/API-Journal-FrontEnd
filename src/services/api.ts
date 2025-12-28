import axios from 'axios'
import type { Entry } from '../types'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const client = axios.create({
  baseURL,
  timeout: 10000, // 10s timeout to avoid hanging requests
  headers: {
    'Content-Type': 'application/json'
  }
})

async function safeGet<T>(fn: () => Promise<any>): Promise<T> {
  try {
    return await fn()
  } catch (err: any) {
    // Normalize network/HTTP errors to a readable message
    const resData = err?.response?.data
    // FastAPI validation errors often include `detail` array
    if (resData && resData.detail) {
      if (Array.isArray(resData.detail)) {
        const details = resData.detail.map((d: any) => {
          try {
            const loc = Array.isArray(d.loc) ? d.loc.join('.') : d.loc
            return `${loc}: ${d.msg}`
          } catch (e) {
            return String(d)
          }
        }).join('; ')
        throw new Error(details)
      }
      // otherwise use detail as string
      throw new Error(String(resData.detail))
    }

    const msg = resData?.message || err?.message || 'Network error'
    throw new Error(msg)
  }
}

// Summary endpoints
export async function getSummaryToday(): Promise<import('../types').DailySummary> {
  return safeGet(async () => {
    const res = await client.get('/api/summary/today')
    return res.data
  })
}

export async function getSummaryWeekly(): Promise<import('../types').WeeklySummary> {
  return safeGet(async () => {
    const res = await client.get('/api/summary/weekly')
    return res.data
  })
}

// Update getEntries to accept pagination
export async function getEntries(limit?: number, offset = 0): Promise<Entry[]> {
  return safeGet<Entry[]>(async () => {
    const res = await (limit == null
      ? client.get('/api/entries')
      : client.get('/api/entries', { params: { limit, offset } }))
    const data = res.data
    if (Array.isArray(data)) return data
    if (data && Array.isArray(data.entries)) return data.entries
    console.warn('getEntries: unexpected response shape', data)
    return []
  })
}

export async function getEntry(id: string): Promise<Entry> {
  return safeGet<Entry>(async () => {
    const res = await client.get(`/api/entries/${id}`)
    const data = res.data
    if (data && data.id) return data
    if (data && data.entry) return data.entry
    throw new Error('Unexpected getEntry response')
  })
}

export async function createEntry(payload: { text: string, timestamp?: string, title?: string, summary?: string }): Promise<Entry> {
  return safeGet<Entry>(async () => {
    const body: any = { text: payload.text }
    if (payload.timestamp) body.timestamp = payload.timestamp
    if (payload.title) body.title = payload.title
    if (payload.summary) body.summary = payload.summary
    const res = await client.post('/api/entries', body)
    const data = res.data
    if (data && data.id) return data
    if (data && data.entry) return data.entry
    return data
  })
}

export async function deleteEntry(id: number | string): Promise<void> {
  return safeGet<void>(async () => {
    await client.delete(`/api/entries/${id}`)
    return
  })
}

// Health endpoint
export async function getHealth(): Promise<{ok: boolean; info?: any}> {
  return safeGet(async () => {
    const res = await client.get('/health')
    // Try to coerce common health shapes
    const data = res.data
    if (!data) return { ok: true, info: res.statusText }

    if (typeof data === 'string') return { ok: true, info: data }
    if (typeof data === 'object') {
      // Common convention: { status: 'ok' } or { status: 'healthy' }
      const s = (data.status || data.message || '').toString().toLowerCase()
      const ok = s === 'ok' || s === 'healthy' || res.status === 200
      return { ok, info: data }
    }

    return { ok: res.status === 200, info: data }
  })
} 

export default client
