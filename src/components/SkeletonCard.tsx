import React from 'react'

export default function SkeletonCard(){
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
      <div className="mt-3 h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
      <div className="mt-3 h-3 bg-slate-200 rounded w-full animate-pulse" />
      <div className="mt-2 h-3 bg-slate-200 rounded w-5/6 animate-pulse" />
    </div>
  )
}