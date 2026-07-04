// ============================================================
// KilimoSmart Seed Script — MongoDB version
// Run once: node seed.js
// ============================================================
import mongoose from 'mongoose'
import { connectDB, User } from './db.js'
import { hashPassword } from './auth.js'

await connectDB()

const demoUsers = [
  { name: 'Mama Wanjiku',    email: 'farmer@kilimosmart.co.ke',  plain: 'farmer123',  role: 'farmer',  county: 'Kakamega' },
  { name: 'James Omondi',    email: 'officer@kilimosmart.co.ke', plain: 'officer123', role: 'officer', county: 'Bungoma'  },
  { name: 'Dr. Achieng Admin', email: 'admin@kilimosmart.co.ke', plain: 'admin123',   role: 'admin',   county: 'Nairobi'  },
]

let created = 0
let skipped = 0

for (const u of demoUsers) {
  const exists = await User.findOne({ email: u.email })
  if (exists) {
    console.log(`⏭  Skipped  ${u.email} (already exists)`)
    skipped++
    continue
  }
  await User.create({
    name:     u.name,
    email:    u.email,
    password: await hashPassword(u.plain),
    role:     u.role,
    county:   u.county,
  })
  console.log(`✅  Created  ${u.role.padEnd(8)} → ${u.email}`)
  created++
}

console.log(`\n📋 Done — ${created} created, ${skipped} skipped`)
console.log('\nDemo accounts:')
console.log('  farmer@kilimosmart.co.ke  /  farmer123')
console.log('  officer@kilimosmart.co.ke /  officer123')
console.log('  admin@kilimosmart.co.ke   /  admin123')

await mongoose.disconnect()
