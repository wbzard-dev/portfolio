import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AuthProvider, useAuth } from './context/AuthContext'
import './prformnce.css'

const Landing   = lazy(() => import('./components/LandingPage'))
const Login     = lazy(() => import('./pages/Login'))
const Signup    = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader2 size={28} className="animate-spin" style={{ color: '#aaa' }} />
        </div>
    )
    return user ? children : <Navigate to="/app/login" replace />
}

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) return null
    return user ? <Navigate to="/app/dashboard" replace /> : children
}

const PrformnceRoutes = () => (
    <Suspense fallback={null}>
        <Routes>
            <Route index element={<Landing />} />
            <Route path="login"       element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="signup"      element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="*"           element={<Navigate to="/app" replace />} />
        </Routes>
    </Suspense>
)

const PrformnceApp = () => (
    <div className="gs-root">
        <AuthProvider>
            <PrformnceRoutes />
        </AuthProvider>
    </div>
)

export default PrformnceApp
