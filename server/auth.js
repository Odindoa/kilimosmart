// ============================================================
// KilimoSmart Auth Module — MongoDB version
// ============================================================
import jwt     from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'
import { User } from './db.js'

export const JWT_SECRET = process.env.JWT_SECRET || 'kilimosmart-iss3102-secret-2026'
export const JWT_EXPIRY  = '7d'

export function signToken(user) {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, name: user.name, county: user.county },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  )
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10)
}

export async function checkPassword(plain, hashed) {
  return bcrypt.compare(plain, hashed)
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Authentication required' })
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' })
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Access denied for your role' })
    next()
  }
}

export function makeAuthRoutes() {
  async function register(req, res) {
    try {
      const { name, email, password, role, county } = req.body
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Name, email, password and role are required' })
      }
      if (!['farmer', 'officer'].includes(role)) {
        return res.status(400).json({ error: 'Role must be farmer or officer' })
      }
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' })
      }
      const existing = await User.findOne({ email: email.toLowerCase() })
      if (existing) return res.status(409).json({ error: 'An account with this email already exists' })

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: await hashPassword(password),
        role,
        county: county || '',
      })
      res.status(201).json({ token: signToken(user), user: sanitize(user) })
    } catch (err) {
      res.status(500).json({ error: 'Registration failed' })
    }
  }

  async function login(req, res) {
    try {
      const { email, password } = req.body
      if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })

      const user = await User.findOne({ email: email.toLowerCase() })
      if (!user) return res.status(401).json({ error: 'Invalid email or password' })

      const valid = await checkPassword(password, user.password)
      if (!valid) return res.status(401).json({ error: 'Invalid email or password' })

      res.json({ token: signToken(user), user: sanitize(user) })
    } catch (err) {
      res.status(500).json({ error: 'Login failed' })
    }
  }

  async function me(req, res) {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json(sanitize(user))
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user' })
    }
  }

  async function updateMe(req, res) {
    try {
      const { name, county, currentPassword, newPassword } = req.body
      const user = await User.findById(req.user.id)
      if (!user) return res.status(404).json({ error: 'User not found' })

      if (name)               user.name   = name.trim()
      if (county !== undefined) user.county = county

      if (newPassword) {
        if (!currentPassword) return res.status(400).json({ error: 'Current password is required' })
        const valid = await checkPassword(currentPassword, user.password)
        if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })
        if (newPassword.length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters' })
        user.password = await hashPassword(newPassword)
      }

      await user.save()
      res.json({ token: signToken(user), user: sanitize(user) })
    } catch (err) {
      res.status(500).json({ error: 'Update failed' })
    }
  }

  return { register, login, me, updateMe }
}

export function makeAdminRoutes() {
  async function listUsers(req, res) {
    try {
      const users = await User.find().lean()
      res.json(users.map(sanitize))
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' })
    }
  }

  async function deleteUser(req, res) {
    try {
      if (req.params.id === req.user.id) return res.status(400).json({ error: 'Cannot delete your own account' })
      await User.findByIdAndDelete(req.params.id)
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' })
    }
  }

  async function changeRole(req, res) {
    try {
      const { role } = req.body
      if (!['farmer', 'officer', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' })
      const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json(sanitize(user))
    } catch (err) {
      res.status(500).json({ error: 'Failed to change role' })
    }
  }

  return { listUsers, deleteUser, changeRole }
}

function sanitize(user) {
  const obj = user.toObject ? user.toObject() : { ...user }
  delete obj.password
  return obj
}
