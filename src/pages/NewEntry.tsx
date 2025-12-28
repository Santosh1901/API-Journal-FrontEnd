import React from 'react'
import { createEntry } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toaster'

export default function NewEntry(){
  const navigate = useNavigate()
  const { show } = useToast()
  const [text, setText] = (React as any).useState('')
  const [timestamp, setTimestamp] = (React as any).useState('') // ISO-like local datetime string e.g. yyyy-mm-ddTHH:MM
  const [title, setTitle] = (React as any).useState('')
  const [summary, setSummary] = (React as any).useState('')
  const [loading, setLoading] = (React as any).useState(false)
  const [error, setError] = (React as any).useState(undefined)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // client-side validation - text is required
    if(!text || !text.trim()){
      setError('Please write something before saving.')
      return
    }

    setLoading(true); setError(undefined)
    try{
      const payload: any = { text: text.trim() }
      if(timestamp){
        // timestamp from datetime-local input is already an ISO-ish local string; convert to full ISO with timezone Z
        const iso = new Date(timestamp).toISOString()
        payload.timestamp = iso
      }
      if(title && title.trim()) payload.title = title.trim()
      if(summary && summary.trim()) payload.summary = summary.trim()

      console.log('Creating entry', payload)
      const created = await createEntry(payload)
      console.log('Create success', created)
      show({ type: 'success', message: 'Entry created' })
      navigate('/')
    }catch(err:any){
      console.error('createEntry failed', err)
      const msg = err?.message || String(err)
      setError(msg || 'Failed to create')
      show({ type: 'error', message: String(msg) })
    }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">New entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        {error && <div className="text-red-500">{error}</div>}

        <label className="block">
          <div className="text-sm text-slate-600">Title (optional)</div>
          <input value={title} onChange={(e:any)=>setTitle(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="A short title for your entry (optional)" />
        </label>

        <label className="block">
          <div className="text-sm text-slate-600">Summary (optional)</div>
          <input value={summary} onChange={(e:any)=>setSummary(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="Short summary to highlight the entry (optional)" />
        </label>

        <label className="block">
          <div className="text-sm text-slate-600">Write your entry</div>
          <textarea value={text} onChange={(e:any)=>setText(e.target.value)} className="mt-1 w-full p-2 border rounded min-h-[140px]" placeholder="How was your day?" required />
        </label>

        <label className="block">
          <div className="text-sm text-slate-600">Timestamp (optional)</div>
          <input type="datetime-local" value={timestamp} onChange={(e:any)=>setTimestamp(e.target.value)} className="mt-1 w-full p-2 border rounded" />
          <div className="text-xs text-slate-500 mt-1">Leave blank to use server timestamp.</div>
        </label>

        <div className="flex items-center justify-between">
          <button type="button" onClick={()=>{ setTimestamp(new Date().toISOString().slice(0,16)) }} className="px-3 py-1 border rounded text-sm">Use now</button>
          <div className="flex items-center justify-end gap-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-900 text-white rounded">{loading ? 'Saving...' : 'Save entry'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}
