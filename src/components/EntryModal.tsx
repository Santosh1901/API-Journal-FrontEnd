import React from 'react'
import Modal from './Modal'
import type { Entry } from '../types'

export default function EntryModal({entry, open, onClose}:{entry:Entry|null, open:boolean, onClose:()=>void}){
  if(!entry) return null
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <div className="text-sm text-slate-500">{new Date(entry.created_at).toLocaleString()}</div>
        <h2 className="mt-2 text-xl font-semibold">{entry.summary ?? entry.text?.split('\n')[0] ?? 'Untitled'}</h2>
        <div className="mt-4 text-slate-700 whitespace-pre-line">{entry.text}</div>

        <div className="mt-4 flex gap-3 items-center">
          <div className="text-xs text-slate-500">Mood:</div>
          <div className="font-medium">{entry.mood ?? 'Analyzing…'}</div>
        </div>

        {entry.topics && entry.topics.length>0 && (
          <div className="mt-3">
            <div className="text-xs text-slate-500">Topics</div>
            <div className="mt-1 flex gap-2 flex-wrap">
              {entry.topics.map((t:string)=> <span key={t} className="text-sm bg-slate-100 px-2 py-1 rounded">{t}</span>)}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}