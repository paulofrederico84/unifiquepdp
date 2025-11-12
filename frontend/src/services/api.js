const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export async function fetchProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`)
    return res.json()
}

export async function createProject(data) {
    const res = await fetch(`${API_BASE}/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    return res.json()
}

export default { fetchProject, createProject }
