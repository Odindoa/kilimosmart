import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Filter } from 'lucide-react'
import { api } from '../api'
import { useLang, UI } from '../context/LangContext'
import { ConfidenceBadge, RiskBadge, Spinner, Card, SectionHeader, EmptyState } from '../components/ui'

export default function HistoryPage() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState([])
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCrop, setFilterCrop] = useState('')
  const [filterConf, setFilterConf] = useState('')

  useEffect(() => {
    Promise.all([
      api.getSessions(),
      api.getCrops(),
    ]).then(([s, c]) => {
      setSessions(s)
      setCrops(c)
      setLoading(false)
    })
  }, [])

  const filtered = sessions.filter(s => {
    if (filterCrop && s.cropId !== filterCrop) return false
    if (filterConf && s.topDiagnosis?.confidence !== filterConf) return false
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <SectionHeader title={t(UI.histTitle)} />

      {/* Filters */}
      <Card className="p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Filters</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            className="input flex-1 min-w-0 text-sm"
            value={filterCrop}
            onChange={e => setFilterCrop(e.target.value)}
          >
            <option value="">{t(UI.allCrops)}</option>
            {crops.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.en}</option>
            ))}
          </select>
          <select
            className="input flex-1 min-w-0 text-sm"
            value={filterConf}
            onChange={e => setFilterConf(e.target.value)}
          >
            <option value="">All confidence levels</option>
            <option value="HIGH">HIGH</option>
            <option value="MODERATE">MODERATE</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} record{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Session list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title={t(UI.histEmpty)}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onClick={() => navigate(`/history/${session.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SessionCard({ session, onClick }) {
  const { t } = useLang()
  const crop = { maize: '🌽', beans: '🫘', tomato: '🍅', potato: '🥔', kale: '🥬', coffee: '☕', tea: '🍵' }

  return (
    <button
      onClick={onClick}
      className="w-full text-left"
    >
      <Card className="p-4 hover:border-primary-200 hover:shadow-md transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span className="text-2xl shrink-0">{crop[session.cropId] || '🌿'}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {session.topDiagnosis?.diseaseName || 'No diagnosis'}
                </span>
                {session.topDiagnosis && (
                  <ConfidenceBadge confidence={session.topDiagnosis.confidence} />
                )}
              </div>
              <div className="text-xs text-gray-500">
                {session.cropName}
                {session.farmerName && session.farmerName !== 'Anonymous' && ` · ${session.farmerName}`}
                {session.county && session.county !== 'Unknown' && ` · ${session.county}`}
              </div>
              <div className="text-xs text-gray-300 mt-1">
                {new Date(session.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1" />
        </div>
        {session.topDiagnosis && (
          <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
            <RiskBadge risk={session.topDiagnosis.riskLevel} />
            <span className="text-xs text-gray-400">
              {session.results?.length || 0} rule{(session.results?.length || 0) !== 1 ? 's' : ''} evaluated
            </span>
          </div>
        )}
      </Card>
    </button>
  )
}
