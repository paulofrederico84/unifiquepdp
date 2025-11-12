const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000'

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

export default { fetchProject, createProject, fetchAssets, login }
