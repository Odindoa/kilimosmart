import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Share2, RotateCcw, CheckCircle2, Info } from 'lucide-react'
import { api } from '../api'
import { useLang, UI } from '../context/LangContext'
import { ConfidenceBadge, RiskBadge, Spinner, Card } from '../components/ui'

// ── Step enum ─────────────────────────────────────────────────
const STEP = { SELECT: 'select', INFO: 'info', QUESTIONS: 'questions', RESULT: 'result' }

export default function DiagnosePage() {
  const { lang, t } = useLang()
  const [crops, setCrops] = useState([])
  const [step, setStep] = useState(STEP.SELECT)
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [farmerName, setFarmerName] = useState('')
  const [county, setCounty] = useState('')
  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [facts, setFacts] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showReasoning, setShowReasoning] = useState(false)

  useEffect(() => {
    api.getCrops().then(setCrops)
  }, [])

  async function handleCropSelect(crop) {
    setSelectedCrop(crop)
    setStep(STEP.INFO)
  }

  async function handleStartQuestions() {
    setLoading(true)
    const qs = await api.getQuestions(selectedCrop.id)
    setQuestions(qs)
    setQIndex(0)
    setFacts({})
    setLoading(false)
    setStep(STEP.QUESTIONS)
  }

  function handleAnswer(fact, value) {
    setFacts(f => ({ ...f, [fact]: value }))
  }

  function handleNext() {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1)
    } else {
      handleDiagnose()
    }
  }

  function handleBack() {
    if (step === STEP.QUESTIONS && qIndex > 0) {
      setQIndex(i => i - 1)
    } else if (step === STEP.QUESTIONS) {
      setStep(STEP.INFO)
    } else if (step === STEP.INFO) {
      setStep(STEP.SELECT)
    } else if (step === STEP.RESULT) {
      setStep(STEP.SELECT)
      reset()
    }
  }

  async function handleDiagnose() {
    setLoading(true)
    const res = await api.diagnose({ cropId: selectedCrop.id, facts, farmerName, county, lang })
    setResult(res)
    setStep(STEP.RESULT)
    setLoading(false)
  }

  function reset() {
    setSelectedCrop(null)
    setFarmerName('')
    setCounty('')
    setQuestions([])
    setQIndex(0)
    setFacts({})
    setResult(null)
    setShowReasoning(false)
    setStep(STEP.SELECT)
  }

  function shareWhatsApp() {
    const top = result?.results?.[0]
    const disease = top?.disease
    const msg = [
      `🌱 *KilimoSmart Diagnosis*`,
      `Crop: ${selectedCrop?.en}`,
      `Disease: ${disease?.en || 'Unknown'}`,
      `Confidence: ${top?.confidence}`,
      ``,
      `Actions:`,
      ...(disease?.treatment?.en?.slice(0, 3).map((a, i) => `${i + 1}. ${a}`) || []),
      ``,
      `_KilimoSmart Expert System — ISS 3102_`,
    ].join('\n')
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner size="lg" />
        <p className="text-gray-500 text-sm">{t(UI.loading)}</p>
      </div>
    )
  }

  if (step === STEP.SELECT) return <CropSelect crops={crops} onSelect={handleCropSelect} />
  if (step === STEP.INFO)   return <FarmerInfo crop={selectedCrop} farmerName={farmerName} county={county}
                                                setFarmerName={setFarmerName} setCounty={setCounty}
                                                onStart={handleStartQuestions} onBack={handleBack} />
  if (step === STEP.QUESTIONS) return (
    <QuestionStep
      question={questions[qIndex]}
      qIndex={qIndex}
      total={questions.length}
      facts={facts}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onBack={handleBack}
      isLast={qIndex === questions.length - 1}
    />
  )
  if (step === STEP.RESULT) return (
    <ResultStep
      result={result}
      crop={selectedCrop}
      showReasoning={showReasoning}
      setShowReasoning={setShowReasoning}
      onReset={reset}
      onShare={shareWhatsApp}
    />
  )
}

// ── Sub-components ────────────────────────────────────────────

function CropSelect({ crops, onSelect }) {
  const { t } = useLang()
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{t(UI.selectCrop)}</h1>
        <p className="text-sm text-gray-500 mt-1">{t(UI.selectSub)}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {crops.map(crop => (
          <button
            key={crop.id}
            onClick={() => onSelect(crop)}
            className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 
                       shadow-sm hover:border-primary-300 hover:shadow-md hover:bg-primary-50 
                       transition-all duration-150 text-center"
          >
            <span className="text-4xl">{crop.emoji}</span>
            <div>
              <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-700">
                {crop.en}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{crop.sw}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function FarmerInfo({ crop, farmerName, county, setFarmerName, setCounty, onStart, onBack }) {
  const { t } = useLang()
  const COUNTIES = [
    'Kakamega','Bungoma','Trans Nzoia','Uasin Gishu','Nakuru',
    'Kisii','Nyamira','Kericho','Bomet','Nyandarua','Meru',
    'Nyeri','Kirinyaga','Murang\'a','Kiambu','Nairobi','Kisumu','Busia',
  ]
  return (
    <div className="max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-5">
        <ChevronLeft size={16} /> {t(UI.back)}
      </button>
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <span className="text-3xl">{crop.emoji}</span>
          <div>
            <div className="font-semibold text-gray-900">{crop.en}</div>
            <div className="text-xs text-gray-400">{crop.sw}</div>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t(UI.farmer)}</label>
            <input
              className="input"
              value={farmerName}
              onChange={e => setFarmerName(e.target.value)}
              placeholder="e.g. Mama Wekesa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t(UI.county)}</label>
            <select className="input" value={county} onChange={e => setCounty(e.target.value)}>
              <option value="">— Select county —</option>
              {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={onStart} className="btn-primary w-full flex items-center justify-center gap-2">
          {t(UI.startDiag)} <ChevronRight size={16} />
        </button>
      </Card>
    </div>
  )
}

function QuestionStep({ question, qIndex, total, facts, onAnswer, onNext, onBack, isLast }) {
  const { lang, t } = useLang()
  if (!question) return null
  const pct = Math.round((qIndex / total) * 100)
  const answered = facts[question.fact] !== undefined

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {t(UI.question)} {qIndex + 1} {t(UI.of)} {total}
        </span>
      </div>

      <Card className="p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-1 leading-relaxed">
          {lang === 'sw' ? question.sw : question.en}
        </h2>
        {lang === 'en' && <p className="text-xs text-gray-400 mb-5">{question.sw}</p>}
        {lang === 'sw' && <p className="text-xs text-gray-400 mb-5">{question.en}</p>}

        <div className="space-y-2.5 mb-6">
          {question.options.map(opt => {
            const isSelected = facts[question.fact] === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onAnswer(question.fact, opt.value)}
                className={`w-full flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all
                  ${isSelected
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-300'
                    : 'border-gray-100 bg-gray-50 hover:border-primary-200 hover:bg-white'
                  }`}
              >
                <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                <div className="min-w-0">
                  <div className={`text-sm font-medium leading-snug ${isSelected ? 'text-primary-800' : 'text-gray-800'}`}>
                    {lang === 'sw' ? opt.sw : opt.en}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {lang === 'sw' ? opt.en : opt.sw}
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 size={16} className="text-primary-500 shrink-0 ml-auto mt-0.5" />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={onBack} className="btn-secondary flex items-center gap-1">
            <ChevronLeft size={15} /> {t(UI.back)}
          </button>
          <button
            onClick={onNext}
            disabled={!answered}
            className="btn-primary flex-1 flex items-center justify-center gap-1"
          >
            {isLast ? t(UI.finish) : t(UI.next)}
            <ChevronRight size={15} />
          </button>
        </div>
      </Card>
    </div>
  )
}

function ResultStep({ result, crop, showReasoning, setShowReasoning, onReset, onShare }) {
  const { lang, t } = useLang()
  const top = result?.results?.[0]
  const disease = top?.disease
  const alternatives = result?.results?.slice(1, 3) || []

  if (!top) {
    return (
      <div className="max-w-xl mx-auto">
        <Card className="p-6 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{t(UI.noMatch)}</h2>
          <p className="text-sm text-gray-500 mb-6">{t(UI.noMatchBody)}</p>
          <button onClick={onReset} className="btn-primary w-full">{t(UI.newDiag)}</button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Diagnosis header card */}
      <div className="bg-primary-600 rounded-xl p-5 text-white">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-primary-200 text-xs font-medium mb-1 uppercase tracking-wide">
              {t(UI.diagResult)}
            </p>
            <h2 className="text-xl font-bold leading-tight">
              {lang === 'sw' ? (disease?.sw || disease?.en) : disease?.en}
            </h2>
            <p className="text-primary-200 text-sm mt-0.5">
              {lang === 'sw' ? disease?.en : disease?.sw}
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold
              ${top.confidence === 'HIGH' ? 'bg-green-400 text-green-900' :
                top.confidence === 'MODERATE' ? 'bg-yellow-300 text-yellow-900' : 'bg-red-300 text-red-900'}`}>
              {top.confidence}
            </span>
            <RiskBadge risk={disease?.riskLevel} />
          </div>
        </div>
        <p className="text-primary-100 text-xs italic leading-relaxed">
          {lang === 'sw' ? disease?.description?.sw : disease?.description?.en}
        </p>
      </div>

      {/* Causal agent */}
      <Card className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{t(UI.causalAgent)}</p>
        <p className="text-sm text-gray-700 italic">{disease?.causalAgent}</p>
      </Card>

      {/* Treatment steps */}
      <Card className="p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{t(UI.treatment)}</p>
        <ol className="space-y-3">
          {(lang === 'sw' ? disease?.treatment?.sw : disease?.treatment?.en)?.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Card>

      {/* Prevention */}
      <Card className="p-4 bg-green-50 border-green-100">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">{t(UI.prevention)}</p>
        <p className="text-sm text-green-800 leading-relaxed">
          {lang === 'sw' ? disease?.prevention?.sw : disease?.prevention?.en}
        </p>
      </Card>

      {/* Alternative diagnoses */}
      {alternatives.length > 0 && (
        <Card className="p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{t(UI.alsoCons)}</p>
          <div className="space-y-2">
            {alternatives.map(alt => (
              <div key={alt.ruleId} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{alt.disease?.en}</span>
                <ConfidenceBadge confidence={alt.confidence} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Reasoning chain (explanation facility) */}
      <Card className="p-4">
        <button
          onClick={() => setShowReasoning(r => !r)}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-700 w-full"
        >
          <Info size={14} />
          {t(UI.reasoning)}
          <ChevronRight size={14} className={`ml-auto transition-transform ${showReasoning ? 'rotate-90' : ''}`} />
        </button>
        {showReasoning && (
          <pre className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
            {top.reasoningChain}
          </pre>
        )}
      </Card>

      {/* Action buttons */}
      <div className="flex gap-3 pb-2">
        <button onClick={onShare} className="btn-secondary flex items-center gap-2 flex-1">
          <Share2 size={15} /> {t(UI.shareWA)}
        </button>
        <button onClick={onReset} className="btn-primary flex items-center gap-2 flex-1">
          <RotateCcw size={15} /> {t(UI.newDiag)}
        </button>
      </div>
    </div>
  )
}
