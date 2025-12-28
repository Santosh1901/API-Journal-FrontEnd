import React from 'react'

export default function EmptyState({title, description}:{title?:string, description?:string}){
  return (
    <div className="py-12 text-center text-slate-600">
      <h3 className="text-lg font-medium">{title ?? 'No entries yet'}</h3>
      <p className="mt-2">{description ?? 'Create your first journal entry to get started.'}</p>
    </div>
  )
}
