import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

// Dados mockados de projetos recentes
const recentProjects = [
  { id: 1, name: 'Projeto Residencial Alpha', lastModified: '2025-11-15', status: 'Ativo' },
  { id: 2, name: 'Condomínio Parque das Flores', lastModified: '2025-11-10', status: 'Ativo' },
  { id: 3, name: 'Escritório Tech Solutions', lastModified: '2025-11-05', status: 'Concluído' },
  { id: 4, name: 'Loja Centro Comercial', lastModified: '2025-10-28', status: 'Em Pausa' },
  { id: 5, name: 'Escola Municipal São João', lastModified: '2025-10-20', status: 'Ativo' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Seção de Projetos Recentes */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0077B6] mb-8 text-center">Projetos Recentes</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {recentProjects.map(project => (
                <div key={project.id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600">Última modificação: {new Date(project.lastModified).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                      project.status === 'Concluído' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                    <Link 
                      to={`/projects/${project.id}/editor`}
                      className="px-6 py-2 bg-[#00B5E2] hover:bg-[#0095c2] text-white rounded-lg font-medium transition-colors"
                    >
                      Abrir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
