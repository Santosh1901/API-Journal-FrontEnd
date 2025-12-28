import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

console.log('App startup')

// show runtime errors in the page (helps avoid a blank white screen)
window.addEventListener('error', (e)=>{
  console.error('window error', e.error || e.message || e)
})
window.addEventListener('unhandledrejection', (e)=>{
  console.error('unhandledrejection', e.reason || e)
})

import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/Toaster'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
