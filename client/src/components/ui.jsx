import { AlertTriangle } from 'lucide-react'

export function ConfidenceBadge({ confidence }) {
  const styles = {
    HIGH:     'bg-green-100 text-green-800 border-green-200',
    MODERATE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    LOW:      'bg-red-100 text-red-800 border-red-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[confidence] || styles.LOW}`}>
      {confidence}
    </span>
  )
}

export function RiskBadge({ risk }) {
  const styles = {
    HIGH:     'bg-red-100 text-red-700',
    MODERATE: 'bg-yellow-100 text-yellow-700',
    LOW:      'bg-green-100 text-green-700',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${styles[risk] || ''}`}>
      {risk === 'HIGH' && <AlertTriangle size={10} />}
      {risk}
    </span>
  )
}

export function Spinner({ size = 'md' }) {
  const s = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-7 w-7'
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-primary-600 ${s}`} />
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

export function EmptyState({ icon, title, body }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-base font-medium text-gray-700 mb-1">{title}</h3>
      {body && <p className="text-sm text-gray-400 max-w-xs mx-auto">{body}</p>}
    </div>
  )
}

export function StatCard({ value, label, accent = false }) {
  return (
    <div className={`rounded-xl p-4 ${accent ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`text-3xl font-bold ${accent ? 'text-white' : 'text-primary-600'}`}>{value}</div>
      <div className={`text-xs mt-1 ${accent ? 'text-primary-100' : 'text-gray-500'}`}>{label}</div>
    </div>
  )
}
