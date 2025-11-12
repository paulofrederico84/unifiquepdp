import React from 'react'
import { Link } from 'react-router-dom'

const Section = ({title, children}) => (
  <div className="mb-4">
    <div className="text-xs text-gray-400 uppercase mb-2">{title}</div>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
)

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white p-4 border-r hidden md:block">
      <div className="mb-6">
        <img src="/logo192.png" alt="logo" className="w-10 h-10" />
      </div>

      <Section title="Projeto">
        <Link to="#" className="text-gray-700 hover:text-blue-600">Novo Projeto</Link>
        <Link to="#" className="text-gray-700 hover:text-blue-600">Abrir Projeto</Link>
        <Link to="#" className="text-gray-700 hover:text-blue-600">Salvar</Link>
      </Section>

      <Section title="Adicionar">
        <Link to="#" className="text-gray-700 hover:text-blue-600">Câmera</Link>
        <Link to="#" className="text-gray-700 hover:text-blue-600">Dispositivo</Link>
      </Section>

      <Section title="Relatórios">
        <Link to="#" className="text-gray-700 hover:text-blue-600">Relatório</Link>
        <Link to="#" className="text-gray-700 hover:text-blue-600">Documentação</Link>
      </Section>

      <Section title="Orçamento">
        <Link to="#" className="text-gray-700 hover:text-blue-600">Valores</Link>
        <Link to="#" className="text-gray-700 hover:text-blue-600">Documentação</Link>
      </Section>
    </aside>
  )
}
