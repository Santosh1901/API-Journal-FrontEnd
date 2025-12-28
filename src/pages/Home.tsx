import React from 'react'
import { getEntries } from '../services/api'
import Loading from '../components/Loading'
import EntryCard from '../components/EntryCard'
import EmptyState from '../components/EmptyState'
import type { Entry } from '../types'

export default function Home(){
  const [entries, setEntries] = React.useState<Entry[]|null>(null)
  const [error, setError] = React.useState<string|undefined>(undefined)

  React.useEffect(()=>{
    let mounted = true
    let polls = 0
    let interval: any = null

    const doFetch = async () => {
      try{
        const data = await getEntries()
        if(!mounted) return
        setEntries(Array.isArray(data) ? data : [])
      }catch(err:any){
        if(mounted) setError(err?.message || 'Failed to load entries')
      }
    }

    ;(async ()=>{
      await doFetch()
      // Start a short polling loop to pick up background-updated fields (mood/summary)
      interval = setInterval(async ()=>{
        polls += 1
        if(polls > 6){ // poll up to ~30s then stop
          clearInterval(interval)
          return
        }
        await doFetch()
      }, 5000)
    })()

    return ()=>{ mounted = false; if(interval) clearInterval(interval) }
  },[])

  if(error) return <div className="text-red-500">Error: {error}</div>
  if(entries===null) return <Loading />

  const recent = (entries || []).slice(0,6)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Recent entries</h1>
      {recent.length===0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {recent.map((e: Entry) => <EntryCard key={e.id} entry={e} />)}
        </div>
      )}
    </div>
  )
}
