import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts'
import { api } from '../api'
import { useLang, UI } from '../context/LangContext'
import { Spinner, Card, SectionHeader, StatCard, EmptyState } from '../components/ui'

const COLORS = ['#1a6b3c','#2d9d5e','#45b282','#7fcfaa','#b8e6cc','#d9993e','#e8be7a']

export default function OfficerPage() {
  const { t } = useLang()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAnalytics().then(d => {
      setAnalytics(d)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!analytics || analytics.total === 0) {
    return (
      <div>
        <SectionHeader title={t(UI.offTitle)} subtitle={t(UI.offSub)} />
        <EmptyState
          icon="📊"
          title="No data yet"
          body="Run some diagnoses first to see analytics here."
        />
      </div>
    )
  }

  const uniqueCrops = analytics.byCrop?.length || 0

  return (
    <div className="space-y-5">
      <SectionHeader title={t(UI.offTitle)} subtitle={t(UI.offSub)} />

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard value={analytics.total} label={t(UI.totalDiag)} accent />
        <StatCard value={analytics.byConfidence?.HIGH || 0} label={t(UI.highConf)} />
        <StatCard value={uniqueCrops} label={t(UI.cropsAff)} />
      </div>

      {/* Daily trend */}
      {analytics.dailyTrend?.length > 0 && (
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">{t(UI.trend)}</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={analytics.dailyTrend}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={v => [v, 'Diagnoses']}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#1a6b3c"
                strokeWidth={2}
                dot={{ fill: '#1a6b3c', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Top diseases + By crop side by side on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Top diseases */}
        {analytics.topDiseases?.length > 0 && (
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">{t(UI.topDiseases)}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.topDiseases} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  width={110}
                  tickFormatter={n => n.length > 16 ? n.slice(0, 14) + '…' : n}
                />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill="#1a6b3c" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* By crop pie */}
        {analytics.byCrop?.length > 0 && (
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">{t(UI.byCrop)}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={analytics.byCrop}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${Math.round(percent * 100)}%`
                  }
                  labelLine={false}
                  style={{ fontSize: 10 }}
                >
                  {analytics.byCrop.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Confidence breakdown */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Confidence breakdown</h3>
        <div className="space-y-3">
          {Object.entries(analytics.byConfidence).map(([conf, count]) => {
            const pct = analytics.total > 0 ? Math.round((count / analytics.total) * 100) : 0
            const colors = {
              HIGH: 'bg-green-500',
              MODERATE: 'bg-yellow-400',
              LOW: 'bg-red-400',
              NONE: 'bg-gray-300',
            }
            return (
              <div key={conf}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-600">{conf}</span>
                  <span className="text-gray-400">{count} ({pct}%)</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${colors[conf]} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* By county */}
      {analytics.byCounty?.length > 0 && (
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Diagnoses by county</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {analytics.byCounty.sort((a, b) => b.count - a.count).map(({ county, count }) => (
              <div key={county} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-600 font-medium">{county}</span>
                <span className="text-xs font-bold text-primary-600">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
