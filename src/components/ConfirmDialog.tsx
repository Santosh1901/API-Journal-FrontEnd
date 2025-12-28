import React from 'react'
import Modal from './Modal'

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel }:{open:boolean, title:string, description?:string, onConfirm:()=>void, onCancel:()=>void}){
  return (
    <Modal open={open} onClose={onCancel}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-slate-600 mt-2">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </Modal>
  )
}