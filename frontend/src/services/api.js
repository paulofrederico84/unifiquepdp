const API_BASE = (import.meta?.env?.VITE_API_URL || '/api')

export async function fetchProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`)
    if (!res.ok) throw new Error(`Failed to fetch project: ${res.statusText}`)
    return res.json()
}

export async function createProject(data) {
    const res = await fetch(`${API_BASE}/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error(`Failed to create project: ${res.statusText}`)
    return res.json()
}

export async function fetchAssets() {
    const res = await fetch(`${API_BASE}/assets/`)
    if (!res.ok) throw new Error(`Failed to fetch assets: ${res.statusText}`)
    return res.json()
}

export async function login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    if (!res.ok) throw new Error(`Login failed: ${res.statusText}`)
    return res.json()
}

export async function saveProjectLayout(projectId, equipments) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/layout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipments })
    })
    if (!res.ok) throw new Error(`Failed to save layout: ${res.statusText}`)
    return res.json()
}

export async function fetchProjectLayout(projectId) {
    const res = await fetch(`${API_BASE}/projects/${projectId}/layout`)
    if (!res.ok) throw new Error(`Failed to fetch layout: ${res.statusText}`)
    return res.json()
}

export default { fetchProject, createProject, fetchAssets, login, saveProjectLayout, fetchProjectLayout }
