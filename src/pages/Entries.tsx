import React from 'react'
import { getEntries } from '../services/api'
import EntryCard from '../components/EntryCard'
import EntryModal from '../components/EntryModal'
import Loading from '../components/Loading'
import EmptyState from '../components/EmptyState'
import SkeletonCard from '../components/SkeletonCard'
import { useToast } from '../components/Toaster'
import type { Entry } from '../types'

export default function Entries(){
  const [entries, setEntries] = React.useState<Entry[]|null>(null)
  const [error, setError] = React.useState<string|undefined>(undefined)
  const [activeEntry, setActiveEntry] = React.useState<Entry|null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const { show } = useToast()

  React.useEffect(()=>{
    let mounted = true
    let polls = 0
    let interval: any = null

    const doFetch = async () => {
      try{
        const data = await getEntries() // fetch all entries when called with no args
        if(!mounted) return
        setEntries(Array.isArray(data) ? data : [])
      }catch(err:any){
        if(mounted) { setError(err?.message || 'Failed to load entries'); show({ type: 'error', message: err?.message || 'Failed to load entries' }) }
      }
    }

    ;(async ()=>{
      await doFetch()
      // short polling
      interval = setInterval(async ()=>{
        polls += 1
        if(polls > 6){ clearInterval(interval); return }
        await doFetch()
      }, 5000)
    })()

    // attach helper to window for debugging
    ;(window as any).__refreshEntries = async () => doFetch()

    return ()=>{ mounted = false; if(interval) clearInterval(interval) }
  },[])



  if(error) return <div className="text-red-500">Error: {error}</div>
  if(entries===null) return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">All entries</h1>
        <div className="flex items-center gap-2">
          <button onClick={()=> (window as any).__refreshEntries?.()} className="px-3 py-1 bg-white border rounded text-sm">Refresh</button>
        </div>
      </div>

      {entries.length===0 ? (
        <EmptyState title="No entries yet" description="Start by creating a new journal entry." />
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {entries.map((e: Entry)=> (
              <EntryCard key={e.id} entry={e} onClick={(ent)=>{ setActiveEntry(ent); setModalOpen(true) }} />
            ))}
          </div>
        </>
      )}

      <EntryModal entry={activeEntry} open={modalOpen} onClose={()=>{ setModalOpen(false); setActiveEntry(null) }} />
    </div>
  )
}
