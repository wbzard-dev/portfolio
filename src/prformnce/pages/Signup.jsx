import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, BarChart2, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BrandPanel = () => (
    <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '3rem' }}>
                <div style={{
                    width: 32, height: 32, background: 'var(--accent)',
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <BarChart2 size={17} color="white" strokeWidth={2.5} />
                </div>
                <span style={{
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 800,
                    fontSize: '1.1rem', letterSpacing: '-0.025em', color: 'white'
                }}>
                    Prformnce
                </span>
            </div>

            <h2 style={{
                fontFamily: "'Anton', sans-serif", fontWeight: 400,
                color: 'white', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.01em', lineHeight: 1.0, marginBottom: '1.25rem'
            }}>
                Start tracking leads in minutes.
            </h2>
            <p style={{
                fontFamily: "'Satoshi', sans-serif",
                color: 'rgba(255,255,255,0.6)', fontSize: '1rem',
                lineHeight: 1.75, marginBottom: '2.5rem'
            }}>
                Join 500+ teams who use Prformnce to capture and convert more leads — without the engineering overhead.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                    'Free plan — no credit card needed',
                    'Live in under 2 minutes',
                    'Unlimited submissions on paid plans',
                    'Cancel anytime'
                ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={16} color="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }} />
                        <span style={{
                            fontFamily: "'Satoshi', sans-serif",
                            color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500
                        }}>
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div style={{
            position: 'relative', zIndex: 1,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" fill="#F59E0B" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                ))}
            </div>
            <p style={{
                fontFamily: "'Satoshi', sans-serif",
                color: 'rgba(255,255,255,0.85)', fontSize: '14px',
                lineHeight: 1.7, margin: '0 0 10px'
            }}>
                "We tracked 3,000 attendees at our conference with zero setup friction. Unbelievable."
            </p>
            <span style={{
                fontFamily: "'Satoshi', sans-serif",
                color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600
            }}>
                Rajan K. · Head of Events
            </span>
        </div>
    </div>
)

const Signup = () => {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await signup(form.name, form.email, form.password)
            navigate('/app/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <BrandPanel />

            <div className="auth-right">
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link to="/app" className="auth-logo">
                        <div className="auth-logo-dot" />
                        Prformnce
                    </Link>

                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '6px' }}>Create your account</h2>
                        <p style={{ margin: 0, fontSize: '15px' }}>Free forever. No credit card required.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label className="field-label">Full name</label>
                            <input
                                required type="text" className="input-field"
                                placeholder="Vivek Kumar"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label className="field-label">Work email</label>
                            <input
                                required type="email" className="input-field"
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label className="field-label">
                                Password
                                <span style={{ color: 'var(--muted)', fontWeight: 400, marginLeft: '6px', fontSize: '13px' }}>
                                    min 8 characters
                                </span>
                            </label>
                            <input
                                required type="password" minLength={8} className="input-field"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        {error && <p className="error-text">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ justifyContent: 'center', padding: '13px', marginTop: '4px', width: '100%' }}
                        >
                            {loading
                                ? <Loader2 size={18} className="animate-spin" />
                                : <><span>Create free account</span> <ArrowRight size={16} /></>
                            }
                        </button>

                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>

                    <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '14px', color: 'var(--muted)' }}>
                        Already have an account?{' '}
                        <Link to="/app/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup
