import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow p-4 flex items-center">
        <h1 className="text-xl font-bold text-blue-700">Unifique</h1>
      </header>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-800">Dashboard</h2>
          <Link to="/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ Inserir</Link>
        </div>
        <section className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-medium">Câmeras</h3>
          <p className="text-sm text-gray-600">Lista de câmeras será exibida aqui.</p>
        </section>
      </div>
    </div>
  )
}
