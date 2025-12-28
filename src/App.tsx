import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Entries from './pages/Entries.tsx'
import EntryDetail from './pages/EntryDetail.tsx'
import NewEntry from './pages/NewEntry.tsx'
import Summary from './pages/Summary'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/entries" element={<Entries/>} />
          <Route path="/entries/:id" element={<EntryDetail/>} />
          <Route path="/new" element={<NewEntry/>} />
          <Route path="/summary" element={<Summary/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
