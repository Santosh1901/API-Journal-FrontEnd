import React from 'react'

type Toast = { id: string, type?: 'success'|'error'|'info', message: string }

const Context = React.createContext<{ show: (t: Omit<Toast,'id'>)=>void } | null>(null)

export function useToast(){
  const ctx = React.useContext(Context)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({children}:{children:React.ReactNode}){
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const show = (t: Omit<Toast,'id'>) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2,8)
    const toast: Toast = { id, ...t }
    setToasts(s => [toast, ...s])
    setTimeout(()=> setToasts(s => s.filter(x=>x.id!==id)), 4500)
  }

  return (
    <Context.Provider value={{ show }}>
      {children}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map(t => (
          <div key={t.id} className={`max-w-sm px-4 py-3 rounded shadow-md text-sm ${t.type==='success' ? 'bg-green-50 text-green-800' : (t.type==='error' ? 'bg-red-50 text-red-800' : 'bg-white text-slate-900')}`}>
            {t.message}
          </div>
        ))}
      </div>
    </Context.Provider>
  )
}
