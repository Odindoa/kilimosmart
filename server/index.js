// ============================================================
// KilimoSmart Express API Server — MongoDB version
// ============================================================
import express  from 'express'
import cors     from 'cors'
import mongoose from 'mongoose'
import { connectDB, User, Session } from './db.js'
import { runInference } from './inferenceEngine.js'
import { CROPS, DISEASES, RULES, SYMPTOM_QUESTIONS } from './knowledgeBase.js'
import { requireAuth, requireRole, makeAuthRoutes, makeAdminRoutes } from './auth.js'

const app  = express()
const PORT = process.env.PORT || 3001

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }))
app.use(express.json())

// ── Connect to MongoDB ────────────────────────────────────────
await connectDB()

// ── Auth routes ───────────────────────────────────────────────
const auth  = makeAuthRoutes()
const admin = makeAdminRoutes()

app.post('/api/auth/register', auth.register)
app.post('/api/auth/login',    auth.login)
app.get ('/api/auth/me',       requireAuth, auth.me)
app.patch('/api/auth/me',      requireAuth, auth.updateMe)

// ── Admin ─────────────────────────────────────────────────────
app.get   ('/api/admin/users',          requireAuth, requireRole('admin'), admin.listUsers)
app.delete('/api/admin/users/:id',      requireAuth, requireRole('admin'), admin.deleteUser)
app.patch ('/api/admin/users/:id/role', requireAuth, requireRole('admin'), admin.changeRole)

// ── Knowledge Base (public) ───────────────────────────────────
app.get('/api/crops',             (req, res) => res.json(CROPS))
app.get('/api/diseases',          (req, res) => {
  const { cropId } = req.query
  res.json(cropId ? DISEASES.filter(d => d.cropId === cropId) : DISEASES)
})
app.get('/api/rules',             (req, res) => {
  const { cropId } = req.query
  res.json(cropId ? RULES.filter(r => r.cropId === cropId) : RULES)
})
app.get('/api/questions/:cropId', (req, res) => {
  const qs = SYMPTOM_QUESTIONS[req.params.cropId]
  if (!qs) return res.status(404).json({ error: 'Crop not found' })
  res.json(qs)
})

// ── Diagnose ──────────────────────────────────────────────────
app.post('/api/diagnose', requireAuth, async (req, res) => {
  try {
    const { cropId, facts, county, lang } = req.body
    if (!cropId || !facts) return res.status(400).json({ error: 'cropId and facts are required' })

    const results   = runInference(cropId, facts)
    const crop      = CROPS.find(c => c.id === cropId)
    const topResult = results[0] || null

    const session = await Session.create({
      userId:      req.user.id,
      farmerName:  req.user.name,
      farmerEmail: req.user.email,
      cropId,
      cropName:    crop?.en || cropId,
      county:      county || req.user.county || 'Unknown',
      lang:        lang || 'en',
      facts,
      results: results.map(r => ({
        ruleId:      r.ruleId,
        diseaseId:   r.diseaseId,
        diseaseName: r.disease?.en || r.diseaseId,
        confidence:  r.confidence,
        matchRatio:  r.matchRatio,
      })),
      topDiagnosis: topResult ? {
        diseaseId:     topResult.diseaseId,
        diseaseName:   topResult.disease?.en,
        diseaseNameSw: topResult.disease?.sw,
        confidence:    topResult.confidence,
        riskLevel:     topResult.disease?.riskLevel,
      } : null,
    })

    res.json({
      sessionId: session._id,
      cropId,
      cropName: crop?.en,
      results,
      timestamp: session.timestamp,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Diagnosis failed' })
  }
})

// ── Sessions ──────────────────────────────────────────────────
app.get('/api/sessions', requireAuth, async (req, res) => {
  try {
    let query = {}

    if (req.user.role === 'farmer') {
      query.userId = req.user.id
    } else if (req.user.role === 'officer' && req.user.county) {
      query.county = req.user.county
    }

    const { cropId, confidence, limit } = req.query
    if (cropId)     query.cropId = cropId
    if (confidence) query['topDiagnosis.confidence'] = confidence

    let sessions = await Session.find(query)
      .sort({ timestamp: -1 })
      .limit(limit ? parseInt(limit) : 200)
      .lean()

    res.json(sessions)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' })
  }
})

app.get('/api/sessions/:id', requireAuth, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).lean()
    if (!session) return res.status(404).json({ error: 'Session not found' })
    if (req.user.role === 'farmer' && session.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' })
    }
    res.json(session)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session' })
  }
})

app.patch('/api/sessions/:id/note', requireAuth, requireRole('officer', 'admin'), async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { officerNote: req.body.note, noteBy: req.user.name, noteAt: new Date() },
      { new: true }
    )
    res.json(session)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add note' })
  }
})

// ── Analytics ─────────────────────────────────────────────────
app.get('/api/analytics/summary', requireAuth, requireRole('officer', 'admin'), async (req, res) => {
  try {
    let query = {}
    if (req.user.role === 'officer' && req.user.county) {
      query.county = req.user.county
    }

    const sessions = await Session.find(query).lean()
    const total    = sessions.length

    const byConfidence = { HIGH: 0, MODERATE: 0, LOW: 0, NONE: 0 }
    sessions.forEach(s => {
      const c = s.topDiagnosis?.confidence || 'NONE'
      byConfidence[c] = (byConfidence[c] || 0) + 1
    })

    const byCropMap = {}
    sessions.forEach(s => { byCropMap[s.cropName] = (byCropMap[s.cropName] || 0) + 1 })

    const byDiseaseMap = {}
    sessions.forEach(s => {
      if (s.topDiagnosis?.diseaseName) {
        byDiseaseMap[s.topDiagnosis.diseaseName] = (byDiseaseMap[s.topDiagnosis.diseaseName] || 0) + 1
      }
    })

    const byCountyMap = {}
    sessions.forEach(s => {
      if (s.county && s.county !== 'Unknown') {
        byCountyMap[s.county] = (byCountyMap[s.county] || 0) + 1
      }
    })

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const byDayMap = {}
    sessions.filter(s => new Date(s.timestamp) >= sevenDaysAgo).forEach(s => {
      const day = new Date(s.timestamp).toISOString().slice(0, 10)
      byDayMap[day] = (byDayMap[day] || 0) + 1
    })

    const totalFarmers = new Set(sessions.map(s => s.userId?.toString())).size

    res.json({
      total,
      totalFarmers,
      byConfidence,
      byCrop:      Object.entries(byCropMap).map(([name, count]) => ({ name, count })),
      topDiseases: Object.entries(byDiseaseMap).sort((a,b) => b[1]-a[1]).slice(0,10).map(([name, count]) => ({ name, count })),
      byCounty:    Object.entries(byCountyMap).map(([county, count]) => ({ county, count })),
      dailyTrend:  Object.entries(byDayMap).sort((a,b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count })),
    })
  } catch (err) {
    res.status(500).json({ error: 'Analytics failed' })
  }
})

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }))

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌱 KilimoSmart API running at http://localhost:${PORT}`)
  console.log(`📚 Knowledge base: ${CROPS.length} crops | ${DISEASES.length} diseases | ${RULES.length} rules\n`)
})
