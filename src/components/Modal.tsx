import React from 'react'

export default function Modal({children, open, onClose}:{children: any, open: boolean, onClose: ()=>void}){
  const [entered, setEntered] = React.useState(false)
  React.useEffect(()=>{
    // trigger enter animation on mount
    setEntered(true)
    return ()=> setEntered(false)
  },[])

  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className={`relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 z-10 transform transition-all duration-150 ${entered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="absolute top-3 right-3">
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}