import React from 'react'

export default function Loading(){
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="animate-pulse space-y-2">
        <div className="h-4 w-40 bg-slate-200 rounded" />
        <div className="h-3 w-24 bg-slate-200 rounded" />
      </div>
    </div>
  )
}
