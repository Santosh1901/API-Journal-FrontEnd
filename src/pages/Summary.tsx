import React from 'react'
import { getSummaryToday, getSummaryWeekly } from '../services/api'
import type { DailySummary, WeeklySummary } from '../types'
import Loading from '../components/Loading'
import { useToast } from '../components/Toaster'
import EntryCard from '../components/EntryCard'
import EntryModal from '../components/EntryModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { deleteEntry } from '../services/api'

// Local JSX declaration for environments that don't resolve @types/react.
// This is defensive and temporary — the long-term fix is to install `@types/react`.
declare global {
  namespace JSX {
    interface IntrinsicElements { [elemName: string]: any }
  }
}

export default function Summary(){
  const [tab, setTab] = React.useState('today' as 'today'|'weekly')
  const [today, setToday] = React.useState(null as DailySummary | null)
  const [weekly, setWeekly] = React.useState(null as WeeklySummary | null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(undefined as string | undefined)

  const [activeEntry, setActiveEntry] = React.useState<any|null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [deleteCandidate, setDeleteCandidate] = React.useState<any|null>(null)

  const { show } = useToast()

  React.useEffect(()=>{
    let mounted = true
    // clear previous error and show loading
    setError(undefined)
    setLoading(true)
    // clear the previous tab's data to avoid showing stale content
    if (tab === 'today') setToday(null)
    else setWeekly(null)

    ;(async ()=>{
      try{
        if(tab==='today'){
          const s = await getSummaryToday()
          if(!mounted) return
          // backend returns entries array and common_topics
          setToday(s ?? null)
        }else{
          const s = await getSummaryWeekly()
          if(!mounted) return
          setWeekly(s ?? null)
        }
      }catch(err:any){ if(mounted) { setError(err?.message || 'Error fetching summary'); show({ type: 'error', message: err?.message || 'Error fetching summary' }) } }
      finally{ if(mounted) setLoading(false) }
    })()
    return ()=>{ mounted=false }
  },[tab])

  // helper to render topics defensively
  const joinTopics = (topics?: string[]|null) => (topics && topics.length > 0 ? topics.join(', ') : '—')

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Summary</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setTab('today')} aria-pressed={tab==='today'} className={`px-3 py-1 rounded ${tab==='today' ? 'bg-slate-900 text-white' : 'bg-white border'}`}>Today</button>
        <button onClick={()=>setTab('weekly')} aria-pressed={tab==='weekly'} className={`px-3 py-1 rounded ${tab==='weekly' ? 'bg-slate-900 text-white' : 'bg-white border'}`}>Weekly</button>
      </div>

      {loading && <Loading />}
      {error && <div className="text-red-500">{error}</div>}

      {tab==='today' && today && (
        <div className="bg-white p-6 rounded shadow space-y-2">
          <div className="text-sm text-slate-500">Date: {today.date}</div>
          <div className="font-medium">Entries: {today.entries ? today.entries.length : 0}</div>
          <div>Top topics: {joinTopics(today.common_topics)}</div>
          <div className="text-slate-700 mt-2 whitespace-pre-line">{today.combined_summary || 'No summary yet'}</div>

          {today.entries && today.entries.length>0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Entries</h4>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {today.entries.slice(0,6).map((e:any)=> (
                  <div key={e.id} onClick={()=>{ setActiveEntry(e); setModalOpen(true) }}>
                    <EntryCard entry={e} onDelete={(ent)=> setDeleteCandidate(ent)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab==='today' && !loading && !today && !error && (
        <div className="bg-white p-6 rounded shadow">No summary available for today.</div>
      )}

      <EntryModal entry={activeEntry} open={modalOpen} onClose={()=>{ setModalOpen(false); setActiveEntry(null) }} onDelete={(ent: any)=> setDeleteCandidate(ent)} />

      <ConfirmDialog open={Boolean(deleteCandidate)} title="Delete entry" description="Are you sure you want to delete this entry? This cannot be undone." onCancel={()=> setDeleteCandidate(null) } onConfirm={async ()=>{
        if(!deleteCandidate) return
        try{
          await deleteEntry(deleteCandidate.id)
          if(today) setToday({...today, entries: today.entries.filter((x:any)=> x.id !== deleteCandidate.id)})
          if(activeEntry && activeEntry.id === deleteCandidate.id) { setActiveEntry(null); setModalOpen(false) }
          show({ type: 'success', message: 'Entry deleted' })
        }catch(err:any){
          show({ type: 'error', message: err?.message || 'Failed to delete entry' })
        } finally { setDeleteCandidate(null) }
      }} />

      {tab==='weekly' && weekly && (
        <div className="bg-white p-6 rounded shadow space-y-2">
          <div className="text-sm text-slate-500">Week: {weekly.start_date} → {weekly.end_date}</div>
          <div className="font-medium">Entries: {weekly.entries_count}</div>
          <div>Top topics: {joinTopics(weekly.common_topics)}</div>
        </div>
      )}

      {tab==='weekly' && !loading && !weekly && !error && (
        <div className="bg-white p-6 rounded shadow">No weekly summary available yet.</div>
      )}
    </div>
  )
}
