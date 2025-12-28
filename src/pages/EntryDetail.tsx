import React from 'react'
import { useParams } from 'react-router-dom'
import { getEntry } from '../services/api'
import Loading from '../components/Loading'
import type { Entry } from '../types'

export default function EntryDetail(){
  const { id } = useParams()
  const [entry, setEntry] = React.useState<Entry | null>(null)
  const [error, setError] = React.useState<string|undefined>(undefined)

  React.useEffect(()=>{
    if(!id) return
    let mounted = true
    getEntry(id)
      .then(data=>{ if(mounted) setEntry(data) })
      .catch(err=> setError(err.message))
    return ()=>{ mounted=false }
  },[id])

  if(error) return <div className="text-red-500">Error: {error}</div>
  if(!entry) return <Loading />

  return (
    <article className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">{entry.summary ?? entry.text?.split('\n')[0] ?? 'Untitled'}</h1>
          <p className="text-sm text-slate-500">{new Date(entry.created_at).toLocaleString()}</p>
        </div>
        <div className="text-sm py-1 px-3 rounded-full bg-slate-100">{entry.mood ?? '—'}</div>
      </div>

      <div className="mt-4 text-slate-700 whitespace-pre-line">{entry.text}</div>
    </article>
  )
}
