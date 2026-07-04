import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { api } from '../api'
import { useLang, UI } from '../context/LangContext'
import { RiskBadge, Spinner, Card, SectionHeader } from '../components/ui'

export default function KnowledgePage() {
  const { lang, t } = useLang()
  const [crops, setCrops] = useState([])
  const [diseases, setDiseases] = useState([])
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('diseases')
  const [openDisease, setOpenDisease] = useState(null)
  const [filterCrop, setFilterCrop] = useState('')

  useEffect(() => {
    Promise.all([
      api.getCrops(),
      api.getDiseases(),
      api.getRules(),
    ]).then(([c, d, r]) => {
      setCrops(c)
      setDiseases(d)
      setRules(r)
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

  const filteredDiseases = filterCrop ? diseases.filter(d => d.cropId === filterCrop) : diseases
  const filteredRules    = filterCrop ? rules.filter(r => r.cropId === filterCrop)    : rules
  const cropMap = Object.fromEntries(crops.map(c => [c.id, c]))

  return (
    <div>
      <SectionHeader
        title={t(UI.kbTitle)}
        subtitle={t(UI.kbSub)}
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { val: crops.length,    label: t(UI.crops) },
          { val: diseases.length, label: t(UI.diseases) },
          { val: rules.length,    label: t(UI.rules) },
        ].map(({ val, label }) => (
          <div key={label} className="bg-primary-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-600">{val}</div>
            <div className="text-xs text-primary-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
        {['diseases', 'rules', 'crops'].map(tab_ => (
          <button
            key={tab_}
            onClick={() => setTab(tab_)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors capitalize
              ${tab === tab_ ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab_ === 'diseases' ? t(UI.diseases) : tab_ === 'rules' ? t(UI.rules) : t(UI.crops)}
          </button>
        ))}
      </div>

      {/* Crop filter (not on crops tab) */}
      {tab !== 'crops' && (
        <div className="mb-4">
          <select
            className="input text-sm w-full sm:w-64"
            value={filterCrop}
            onChange={e => setFilterCrop(e.target.value)}
          >
            <option value="">All crops</option>
            {crops.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.en}</option>
            ))}
          </select>
        </div>
      )}

      {/* DISEASES TAB */}
      {tab === 'diseases' && (
        <div className="space-y-2">
          {filteredDiseases.map(disease => {
            const crop = cropMap[disease.cropId]
            const isOpen = openDisease === disease.id
            return (
              <Card key={disease.id} className="overflow-hidden">
                <button
                  className="w-full text-left p-4 flex items-start justify-between gap-3"
                  onClick={() => setOpenDisease(isOpen ? null : disease.id)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-xl shrink-0">{crop?.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-semibold text-gray-900 text-sm">
                          {lang === 'sw' ? disease.sw : disease.en}
                        </span>
                        <RiskBadge risk={disease.riskLevel} />
                      </div>
                      <div className="text-xs text-gray-400">
                        {crop?.en} · <span className="italic">{disease.causalAgent}</span>
                      </div>
                    </div>
                  </div>
                  {isOpen
                    ? <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    : <ChevronRight size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  }
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Description</p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {lang === 'sw' ? disease.description?.sw : disease.description?.en}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        {t(UI.treatment)}
                      </p>
                      <ol className="space-y-1">
                        {(lang === 'sw' ? disease.treatment?.sw : disease.treatment?.en)?.map((a, i) => (
                          <li key={i} className="flex gap-2 text-xs text-gray-600">
                            <span className="shrink-0 text-primary-500 font-bold">{i + 1}.</span>
                            {a}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        {t(UI.prevention)}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {lang === 'sw' ? disease.prevention?.sw : disease.prevention?.en}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* RULES TAB */}
      {tab === 'rules' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-4 font-semibold">{t(UI.ruleId)}</th>
                <th className="pb-2 pr-4 font-semibold">{t(UI.crop)}</th>
                <th className="pb-2 pr-4 font-semibold">{t(UI.disease)}</th>
                <th className="pb-2 pr-4 font-semibold">{t(UI.conditions)}</th>
                <th className="pb-2 font-semibold">Conf.</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map(rule => {
                const crop = cropMap[rule.cropId]
                const disease = diseases.find(d => d.id === rule.diseaseId)
                return (
                  <tr key={rule.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 pr-4 font-mono text-gray-500">{rule.id}</td>
                    <td className="py-2 pr-4">{crop?.emoji} {crop?.en}</td>
                    <td className="py-2 pr-4 font-medium text-gray-800">
                      {lang === 'sw' ? disease?.sw : disease?.en}
                    </td>
                    <td className="py-2 pr-4 text-gray-500">
                      {rule.conditions.length} conditions
                      <div className="text-gray-300 mt-0.5 font-mono text-[10px]">
                        {rule.conditions.map(c => c.fact).join(', ')}
                      </div>
                    </td>
                    <td className="py-2">
                      <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-semibold">
                        {rule.confidence}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* CROPS TAB */}
      {tab === 'crops' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {crops.map(crop => {
            const cropDiseases = diseases.filter(d => d.cropId === crop.id)
            const cropRules    = rules.filter(r => r.cropId === crop.id)
            return (
              <Card key={crop.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{crop.emoji}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{crop.en}</div>
                    <div className="text-xs text-gray-400">{crop.sw}</div>
                  </div>
                </div>
                <div className="flex gap-4 text-xs mb-2">
                  <span><strong className="text-primary-600">{cropDiseases.length}</strong> diseases</span>
                  <span><strong className="text-primary-600">{cropRules.length}</strong> rules</span>
                </div>
                <div className="text-xs text-gray-400">
                  Regions: {crop.regions?.slice(0, 3).join(', ')}
                  {crop.regions?.length > 3 ? ` +${crop.regions.length - 3} more` : ''}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
