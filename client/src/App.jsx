import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider }  from './context/LangContext'
import { AuthProvider }  from './context/AuthContext'
import { Layout }        from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'

import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DiagnosePage from './pages/DiagnosePage'
import HistoryPage  from './pages/HistoryPage'
import OfficerPage  from './pages/OfficerPage'
import KnowledgePage from './pages/KnowledgePage'
import ProfilePage  from './pages/ProfilePage'
import AdminPage    from './pages/AdminPage'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes — all roles */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout><DiagnosePage /></Layout>
              </ProtectedRoute>
            }/>
            <Route path="/history" element={
              <ProtectedRoute>
                <Layout><HistoryPage /></Layout>
              </ProtectedRoute>
            }/>
            <Route path="/knowledge" element={
              <ProtectedRoute>
                <Layout><KnowledgePage /></Layout>
              </ProtectedRoute>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout><ProfilePage /></Layout>
              </ProtectedRoute>
            }/>

            {/* Officer + Admin only */}
            <Route path="/officer" element={
              <ProtectedRoute roles={['officer','admin']}>
                <Layout><OfficerPage /></Layout>
              </ProtectedRoute>
            }/>

            {/* Admin only */}
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <Layout><AdminPage /></Layout>
              </ProtectedRoute>
            }/>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </LangProvider>
  )
}
