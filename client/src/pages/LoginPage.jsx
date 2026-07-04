import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      // Route based on role
      navigate(user.role === 'farmer' ? '/' : user.role === 'officer' ? '/officer' : '/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function fillDemo(role) {
    const accounts = {
      farmer:  { email: 'farmer@kilimosmart.co.ke',  password: 'farmer123'  },
      officer: { email: 'officer@kilimosmart.co.ke', password: 'officer123' },
      admin:   { email: 'admin@kilimosmart.co.ke',   password: 'admin123'   },
    }
    setEmail(accounts[role].email)
    setPassword(accounts[role].password)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-2xl mb-4 shadow-lg">
            <Leaf size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">KilimoSmart</h1>
          <p className="text-sm text-gray-500 mt-1">Crop Disease Expert System</p>
          <p className="text-xs text-gray-400 mt-0.5">Mfumo wa Utambuzi wa Magonjwa ya Mazao</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Sign in to your account</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-3 py-2.5 mb-4">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
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
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Demo accounts panel */}
        <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Demo accounts — click to fill
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'farmer',  label: 'Farmer',  color: 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100' },
              { role: 'officer', label: 'Officer', color: 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'   },
              { role: 'admin',   label: 'Admin',   color: 'bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100' },
            ].map(({ role, label, color }) => (
              <button
                key={role}
                type="button"
                onClick={() => fillDemo(role)}
                className={`text-xs font-semibold px-2 py-2 rounded-lg border transition-colors ${color}`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Each role sees a different dashboard
          </p>
        </div>

      </div>
    </div>
  )
}
