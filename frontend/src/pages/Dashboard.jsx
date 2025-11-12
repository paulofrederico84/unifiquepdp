import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ProjectTable from '../components/ProjectTable'
import DeviceTable from '../components/DeviceTable'
import Card from '../components/Card'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-800">Dashboard</h2>
            <Link to="/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ Inserir</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProjectTable />
                <div className="bg-white rounded shadow p-4">
                  <h3 className="text-lg font-medium">Relatórios</h3>
                  <p className="text-sm text-gray-600">Acesso rápido a relatórios e exportações.</p>
                </div>
              </div>
              <div>
                {/* full width table */}
                <ProjectTable />
              </div>
            </div>
            <aside className="space-y-4">
              <div className="bg-white rounded shadow p-4">
                <h3 className="text-lg font-medium">Resumo</h3>
                <p className="text-sm text-gray-600">Resumo rápido do projeto atual.</p>
              </div>
              <div>
                <DeviceTable />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
