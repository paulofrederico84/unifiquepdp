import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../services/api'

export default function NewProject() {
  const [form, setForm] = useState({ name: '', client: '', owner: '', address: '', due_date: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await createProject(form)
      console.log('Project created:', result)
      navigate(`/projects/${result.id}/editor`)
    } catch (err) {
      setError(err.message || 'Erro ao criar projeto')
      console.error('Error creating project:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Novo Projeto</h2>
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nome do projeto"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="client"
            placeholder="Cliente"
            value={form.client}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="owner"
            placeholder="Responsável técnico"
            value={form.owner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="due_date"
            type="date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="block text-sm mb-1">Upload imagens</label>
            <input type="file" accept="image/*" />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Salvando...' : 'Salvar e abrir Editor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
