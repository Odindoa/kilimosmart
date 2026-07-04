import { useState, useEffect } from 'react'
import { Trash2, RefreshCw, Shield, AlertCircle } from 'lucide-react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { Card, SectionHeader, Spinner } from '../components/ui'

const ROLE_STYLES = {
  farmer:  'bg-green-100 text-green-700',
  officer: 'bg-blue-100 text-blue-700',
  admin:   'bg-purple-100 text-purple-700',
}

export default function AdminPage() {
  const { user: me } = useAuth()
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [msg,     setMsg]     = useState(null)

  async function load() {
    setLoading(true)
    try {
      const data = await api.getUsers()
      setUsers(data)
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleRoleChange(id, newRole) {
    try {
      await api.changeRole(id, newRole)
      setMsg({ type: 'success', text: 'Role updated.' })
      load()
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete account for "${name}"? This cannot be undone.`)) return
    try {
      await api.deleteUser(id)
      setMsg({ type: 'success', text: `${name}'s account deleted.` })
      load()
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Admin Panel"
          subtitle={`${users.length} registered users`}
        />
        <button onClick={load} className="btn-ghost flex items-center gap-1.5 text-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2.5 border
          ${msg.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}
        >
          <AlertCircle size={14} className="shrink-0" />
          {msg.text}
          <button onClick={() => setMsg(null)} className="ml-auto text-xs underline">dismiss</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {['farmer','officer','admin'].map(role => (
          <div key={role} className={`rounded-xl p-3 text-center ${ROLE_STYLES[role]} bg-opacity-50`}>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === role).length}
            </div>
            <div className="text-xs font-medium capitalize mt-0.5">{role}s</div>
          </div>
        ))}
      </div>

      {/* User table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">County</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className={`hover:bg-gray-50 transition-colors ${u.id === me?.id ? 'bg-primary-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {u.name}
                          {u.id === me?.id && <span className="ml-1.5 text-xs text-primary-500">(you)</span>}
                        </div>
                        <div className="text-xs text-gray-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{u.county || '—'}</td>
                  <td className="px-4 py-3">
                    {u.id === me?.id ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ROLE_STYLES[u.role]}`}>
                        {u.role}
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
                      >
                        <option value="farmer">farmer</option>
                        <option value="officer">officer</option>
                        <option value="admin">admin</option>
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.id !== me?.id && (
                      <button
                        onClick={() => handleDelete(u.id, u.name)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        title="Delete user"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info box */}
      <Card className="p-4 bg-purple-50 border-purple-100">
        <div className="flex items-start gap-2 text-sm text-purple-700">
          <Shield size={15} className="shrink-0 mt-0.5" />
          <div>
            <strong>Admin access:</strong> You can change user roles and delete accounts.
            Role changes take effect on the user's next login.
            You cannot delete or demote your own account.
          </div>
        </div>
      </Card>
    </div>
  )
}
