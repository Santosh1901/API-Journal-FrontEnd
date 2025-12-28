import React from 'react'
import type { Entry } from '../types'
import { Link } from 'react-router-dom'

export default function EntryCard({entry, onClick, onDelete}:{entry:Entry, onClick?: (e:Entry)=>void, onDelete?: (e:Entry)=>void}){
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
        <div className="ml-4 flex items-center gap-2">
          <div className="py-1 px-3 rounded-full bg-slate-100 text-sm text-slate-700 flex items-center gap-2">
            {entry.mood ? entry.mood : (
              <span className="text-xs text-slate-500">Analyzing…</span>
            )}
          </div>

          <button aria-label="Delete entry" onClick={(e)=>{ e.stopPropagation(); e.preventDefault(); onDelete?.(entry); }} className="text-slate-400 hover:text-red-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-100 transition" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
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
