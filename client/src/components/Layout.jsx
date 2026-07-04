import { NavLink, useNavigate } from 'react-router-dom'
import { Leaf, History, BarChart2, Database, User, Shield } from 'lucide-react'
import { useLang, UI } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'

export function Layout({ children }) {
  const { lang, toggle, t } = useLang()
  const { user, isOfficer, isAdmin } = useAuth()

  const ROLE_COLOR = {
    farmer:  'text-green-600',
    officer: 'text-blue-600',
    admin:   'text-purple-600',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-sm">KilimoSmart</span>
              {user && (
                <span className={`text-xs ml-2 font-medium capitalize ${ROLE_COLOR[user.role]}`}>
                  {user.role}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <span className="text-xs text-gray-400 hidden sm:block truncate max-w-[120px]">
                {user.name}
              </span>
            )}
            <button
              onClick={toggle}
              className="flex items-center gap-0 text-xs font-medium border border-gray-200 rounded-lg overflow-hidden"
            >
              <span className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>EN</span>
              <span className={`px-2.5 py-1.5 transition-colors ${lang === 'sw' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>SW</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>

      {/* Bottom Nav — tabs shown depend on role */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div className="max-w-5xl mx-auto px-2 flex">
          {/* Farmer + Officer + Admin */}
          <NavItem to="/"         icon={<Leaf size={20}/>}     label={t(UI.diagnose)}  end />
          <NavItem to="/history"  icon={<History size={20}/>}  label={t(UI.history)} />
          {/* Officer + Admin only */}
          {isOfficer && (
            <NavItem to="/officer" icon={<BarChart2 size={20}/>} label={t(UI.officer)} />
          )}
          {/* All roles */}
          <NavItem to="/knowledge" icon={<Database size={20}/>} label="KB" />
          {/* Admin only */}
          {isAdmin && (
            <NavItem to="/admin" icon={<Shield size={20}/>} label="Admin" />
          )}
          {/* Profile — always */}
          <NavItem to="/profile" icon={<User size={20}/>} label="Profile" />
        </div>
      </nav>

      <div className="h-20" />
    </div>
  )
}

function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors min-w-0
         ${isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`
      }
    >
      {icon}
      <span className="hidden sm:block truncate">{label}</span>
    </NavLink>
  )
}
