import React from 'react'
import { Link } from 'react-router-dom'
import { getHealth } from '../services/api'

function HealthBadge(){
  const [healthy, setHealthy] = React.useState<boolean|null>(null)
  const [info, setInfo] = React.useState<any>(null)

  React.useEffect(()=>{
    let mounted = true
    const check = async ()=>{
      try{
        const res = await getHealth()
        if(!mounted) return
        setHealthy(Boolean(res?.ok))
        setInfo(res?.info)
      }catch(e:any){ if(mounted) { setHealthy(false); setInfo(String(e)) } }
    }
    check()
    const id = setInterval(check, 30000)
    return ()=>{ mounted=false; clearInterval(id) }
  },[])

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${healthy ? 'bg-green-500' : (healthy===false ? 'bg-red-400' : 'bg-slate-300')}`} />
      <div className="text-xs text-slate-600">{healthy ? 'API OK' : (healthy===false ? 'API down' : 'Checking…')}</div>
    </div>
  )
}

export default function Header(){
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-semibold text-slate-900">API Journal</Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-3">
            <Link to="/entries" className="px-3 py-2 text-sm rounded hover:bg-slate-100">Entries</Link>
            <Link to="/new" className="px-3 py-2 bg-slate-900 text-white text-sm rounded hover:opacity-95">New Entry</Link>
            <Link to="/summary" className="px-3 py-2 text-sm rounded hover:bg-slate-100">Summary</Link>
          </nav>
          <div className="flex items-center gap-3">
            <HealthBadge />
          </div>
        </div>
      </div>
    </header>
  )
}
