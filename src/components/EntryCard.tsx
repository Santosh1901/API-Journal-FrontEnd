import React from 'react'
import type { Entry } from '../types'
import { Link } from 'react-router-dom'

export default function EntryCard({entry, onClick}:{entry:Entry, onClick?: (e:Entry)=>void}){
  const title = entry.summary ?? entry.text?.split('\n')[0] ?? 'Untitled'
  const excerpt = entry.summary ? (entry.text?.slice(0,150)) : (entry.text?.slice(0,200))
  const handleClick = (e:any) => { e.preventDefault(); onClick?.(entry) }
  const handleKey = (e:any) => { if(e.key==='Enter' || e.key===' ') onClick?.(entry) }
  return (
    <div role="button" tabIndex={0} onKeyDown={handleKey} onClick={handleClick} className="cursor-pointer block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-100">      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">{new Date(entry.created_at).toLocaleString()}</div>
          <h3 className="mt-1 font-semibold text-slate-900">{title}</h3>
        </div>
        <div className="ml-4 py-1 px-3 rounded-full bg-slate-100 text-sm text-slate-700 flex items-center gap-2">
          {entry.mood ? entry.mood : (
            <span className="text-xs text-slate-500">Analyzing…</span>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-600 line-clamp-2">{excerpt}</p>

      {entry.topics && entry.topics.length>0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {entry.topics.map(t=> <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded">{t}</span>)}
        </div>
      )}

      {(!entry.summary || !entry.mood) && (
        <div className="mt-3 text-xs text-slate-500 italic">Analysis pending — updates appear shortly</div>
      )}
    </div>
  )
}
