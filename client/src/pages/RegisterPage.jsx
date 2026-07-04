import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Eye, EyeOff, AlertCircle, ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const COUNTIES = [
  'Kakamega','Bungoma','Trans Nzoia','Uasin Gishu','Nakuru',
  'Kisii','Nyamira','Kericho','Bomet','Nyandarua','Meru',
  'Nyeri','Kirinyaga',"Murang'a",'Kiambu','Nairobi','Kisumu','Busia',
  'Siaya','Homa Bay','Migori','Vihiga','Other',
]

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'farmer', county: '',
  })
  const [showPw,  setShowPw]  = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const user = await register(form)
      navigate(user.role === 'farmer' ? '/' : user.role === 'officer' ? '/officer' : '/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    {
      value: 'farmer',
      label: 'Farmer',
      labelSw: 'Mkulima',
      desc: 'Diagnose your crops and view your history',
    },
    {
      value: 'officer',
      label: 'Extension Officer',
      labelSw: 'Afisa wa Kilimo',
      desc: 'Monitor disease trends across your county',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl mb-3 shadow-lg">
            <Leaf size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-0.5">KilimoSmart Expert System</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-3 py-2.5 mb-4">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a…</label>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, role: opt.value }))}
                    className={`p-3 rounded-lg border text-left transition-all
                      ${form.role === opt.value
                        ? 'border-primary-400 bg-primary-50 ring-1 ring-primary-300'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                  >
                    <div className="text-sm font-semibold text-gray-800">{opt.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{opt.labelSw}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                {roleOptions.find(o => o.value === form.role)?.desc}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                className="input"
                value={form.name}
                onChange={set('name')}
                placeholder="e.g. Mama Wanjiku"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                className="input"
                value={form.email}
                onChange={set('email')}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">County</label>
              <select className="input" value={form.county} onChange={set('county')}>
                <option value="">— Select your county —</option>
                {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input pr-10"
                  value={form.password}
                  onChange={set('password')}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base font-semibold"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
