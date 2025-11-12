import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewProject(){
  const [form, setForm] = useState({name:'', client:'', owner:'', address:'', due_date:''})
  const navigate = useNavigate()

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()
    // TODO: salvar no backend
    // mock id
    const id = 'mock-project-id'
    navigate(`/projects/${id}/editor`)
  }

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Novo Projeto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Nome do projeto" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="client" placeholder="Cliente" value={form.client} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="owner" placeholder="Responsável técnico" value={form.owner} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="address" placeholder="Endereço" value={form.address} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="w-full p-2 border rounded" />
          <div>
            <label className="block text-sm mb-1">Upload imagens</label>
            <input type="file" accept="image/*" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar e abrir Editor</button>
          </div>
        </form>
      </div>
    </div>
  )
}
