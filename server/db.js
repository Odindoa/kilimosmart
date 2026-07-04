// ============================================================
// KilimoSmart — MongoDB Models
// ============================================================
import mongoose from 'mongoose'

// ── Connect ───────────────────────────────────────────────────
export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI environment variable is not set')
  await mongoose.connect(uri)
  console.log('✅ MongoDB connected')
}

// ── User Model ────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['farmer', 'officer', 'admin'], default: 'farmer' },
  county:    { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)

// ── Session Model ─────────────────────────────────────────────
const sessionSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName:   String,
  farmerEmail:  String,
  cropId:       String,
  cropName:     String,
  county:       { type: String, default: 'Unknown' },
  lang:         { type: String, default: 'en' },
  facts:        mongoose.Schema.Types.Mixed,
  results:      mongoose.Schema.Types.Mixed,
  topDiagnosis: mongoose.Schema.Types.Mixed,
  officerNote:  String,
  noteBy:       String,
  noteAt:       Date,
  timestamp:    { type: Date, default: Date.now },
})

export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema)
