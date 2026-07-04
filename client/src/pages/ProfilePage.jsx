import { useState } from 'react'
import { User, MapPin, Lock, LogOut, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Card, SectionHeader } from '../components/ui'

const COUNTIES = [
  'Kakamega','Bungoma','Trans Nzoia','Uasin Gishu','Nakuru',
  'Kisii','Nyamira','Kericho','Bomet','Nyandarua','Meru',
  'Nyeri','Kirinyaga',"Murang'a",'Kiambu','Nairobi','Kisumu','Busia',
  'Siaya','Homa Bay','Migori','Vihiga','Other',
]

const ROLE_LABELS = {
  farmer:  { label: 'Farmer',           color: 'bg-green-100 text-green-700'   },
  officer: { label: 'Extension Officer', color: 'bg-blue-100 text-blue-700'    },
  admin:   { label: 'Administrator',     color: 'bg-purple-100 text-purple-700' },
}

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()

  const [name,    setName]    = useState(user?.name   || '')
  const [county,  setCounty]  = useState(user?.county || '')
  const [currPw,  setCurrPw]  = useState('')
  const [newPw,   setNewPw]   = useState('')
  const [msg,     setMsg]     = useState(null)   // { type: 'success'|'error', text }
  const [loading, setLoading] = useState(false)

  async function handleProfileSave(e) {
    e.preventDefault()
    setMsg(null)
    setLoading(true)
    try {
      await updateProfile({ name, county })
      setMsg({ type: 'success', text: 'Profile updated successfully.' })
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  async function handlePasswordSave(e) {
    e.preventDefault()
    setMsg(null)
    if (newPw.length < 6) {
      setMsg({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }
    setLoading(true)
    try {
      await updateProfile({ currentPassword: currPw, newPassword: newPw })
      setCurrPw('')
      setNewPw('')
      setMsg({ type: 'success', text: 'Password changed successfully.' })
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const roleInfo = ROLE_LABELS[user?.role] || ROLE_LABELS.farmer

  return (
    <div className="max-w-md mx-auto space-y-4">
      <SectionHeader title="My Profile" />

      {/* Identity card */}
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-base">{user?.name}</div>
            <div className="text-sm text-gray-400">{user?.email}</div>
            <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${roleInfo.color}`}>
              {roleInfo.label}
            </span>
          </div>
        </div>
        {user?.county && (
          <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-500">
            <MapPin size={13} />
            {user.county} County
          </div>
        )}
        <div className="text-xs text-gray-300 mt-1">
          Member since {new Date(user?.createdAt).toLocaleDateString()}
        </div>
      </Card>

      {/* Status message */}
      {msg && (
        <div className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2.5 border
          ${msg.type === 'success'
            ? 'bg-green-50 border-green-100 text-green-700'
            : 'bg-red-50 border-red-100 text-red-700'
          }`}
        >
          {msg.type === 'success'
            ? <CheckCircle size={15} className="shrink-0" />
            : <AlertCircle size={15} className="shrink-0" />
          }
          {msg.text}
        </div>
      )}

      {/* Edit name & county */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-primary-500" />
          <h3 className="font-semibold text-gray-800 text-sm">Personal details</h3>
        </div>
        <form onSubmit={handleProfileSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
            <input
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">County</label>
            <select className="input" value={county} onChange={e => setCounty(e.target.value)}>
              <option value="">— Select county —</option>
              {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </Card>

      {/* Change password */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={16} className="text-primary-500" />
          <h3 className="font-semibold text-gray-800 text-sm">Change password</h3>
        </div>
        <form onSubmit={handlePasswordSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Current password</label>
            <input
              type="password"
              className="input"
              value={currPw}
              onChange={e => setCurrPw(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
            <input
              type="password"
              className="input"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-secondary w-full"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </Card>

      {/* Sign out */}
      <Card className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 py-1"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </Card>
    </div>
  )
}
