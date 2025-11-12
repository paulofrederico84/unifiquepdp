import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import NewProject from './pages/NewProject'
import Editor from './pages/Editor'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/projects/new" element={<NewProject/>} />
      <Route path="/projects/:id/editor" element={<Editor/>} />
    </Routes>
  )
}
