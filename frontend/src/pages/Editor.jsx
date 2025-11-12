import React from 'react'

export default function Editor(){
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Editor de Projeto</h2>
        <div className="text-sm text-gray-600">Salvar automático ativado</div>
      </header>
      <div className="flex gap-4">
        <aside className="w-64 bg-white p-4 rounded shadow">Biblioteca de equipamentos</aside>
        <main className="flex-1 bg-white rounded shadow p-4" style={{height: '600px'}}>
          <div className="h-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">Canvas do projeto (em breve)</div>
        </main>
        <aside className="w-80 bg-white p-4 rounded shadow">Propriedades</aside>
      </div>
    </div>
  )
}
