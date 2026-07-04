// Central API client
// In development: proxied to localhost:3001 via Vite
// In production: uses VITE_API_URL environment variable

const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const TOKEN_KEY = 'kilimosmart_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  // Auth
  login:      (body)     => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  register:   (body)     => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  getMe:      ()         => request('/auth/me'),
  updateMe:   (body)     => request('/auth/me', { method: 'PATCH', body: JSON.stringify(body) }),

  // Knowledge base
  getCrops:     ()       => request('/crops'),
  getDiseases:  (cropId) => request(`/diseases${cropId ? `?cropId=${cropId}` : ''}`),
  getRules:     (cropId) => request(`/rules${cropId ? `?cropId=${cropId}` : ''}`),
  getQuestions: (cropId) => request(`/questions/${cropId}`),

  // Diagnose
  diagnose: (body) => request('/diagnose', { method: 'POST', body: JSON.stringify(body) }),

  // Sessions
  getSessions: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/sessions${qs ? `?${qs}` : ''}`)
  },
  getSession:  (id)      => request(`/sessions/${id}`),
  addNote:     (id, note) => request(`/sessions/${id}/note`, {
    method: 'PATCH', body: JSON.stringify({ note }),
  }),

  // Analytics
  getAnalytics: () => request('/analytics/summary'),

  // Admin
  getUsers:   ()          => request('/admin/users'),
  deleteUser: (id)        => request(`/admin/users/${id}`, { method: 'DELETE' }),
  changeRole: (id, role)  => request(`/admin/users/${id}/role`, {
    method: 'PATCH', body: JSON.stringify({ role }),
  }),
}
