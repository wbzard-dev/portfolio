import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Check, Loader2, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const PRO_FEATURES = [
    'Unlimited form endpoints',
    '50,000 submissions/month',
    'Unlimited QR campaigns',
    'Email leads from submissions',
    'QR scan tracking & analytics',
    'Submissions chart & KPI dashboard',
    'Priority support',
]

const loadRazorpay = () =>
    new Promise((resolve) => {
        if (window.Razorpay) { resolve(true); return }
        const s = document.createElement('script')
        s.src = 'https://checkout.razorpay.com/v1/checkout.js'
        s.onload = () => resolve(true)
        s.onerror = () => resolve(false)
        document.body.appendChild(s)
    })

const UpgradeModal = ({ onClose, onSuccess }) => {
    const { user, authFetch, refreshUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleUpgrade = async () => {
        setLoading(true); setError('')

        const loaded = await loadRazorpay()
        if (!loaded) {
            setError('Failed to load payment gateway. Please try again.')
            setLoading(false); return
        }

        try {
            const res = await authFetch('/api/subscriptions/create', {
                method: 'POST',
                body: JSON.stringify({ plan: 'pro' }),
            })
            const data = await res.json()
            if (!data.success) throw new Error(data.message)

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                subscription_id: data.subscription_id,
                name: 'GetSanket',
                description: 'Pro Plan — ₹799/month',
                prefill: { name: user?.name || '', email: user?.email || '' },
                theme: { color: '#2563EB' },
                modal: { ondismiss: () => setLoading(false) },
                handler: async (response) => {
                    try {
                        const vRes = await authFetch('/api/subscriptions/verify', {
                            method: 'POST',
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_subscription_id: response.razorpay_subscription_id,
                                razorpay_signature: response.razorpay_signature,
                                plan: 'pro',
                            }),
                        })
                        const vData = await vRes.json()
                        if (!vData.success) throw new Error(vData.message)

                        if (vData.token) localStorage.setItem('token', vData.token)
                        await refreshUser()
                        setLoading(false)
                        onSuccess?.()
                        onClose()
                    } catch (err) {
                        setError(err.message || 'Payment verification failed.')
                        setLoading(false)
                    }
                },
            }

            const rzp = new window.Razorpay(options)
            rzp.on('payment.failed', (response) => {
                setError(response.error?.description || 'Payment failed.')
                setLoading(false)
            })
            rzp.open()
        } catch (err) {
            setError(err.message || 'Something went wrong.')
            setLoading(false)
        }
    }

    return (
        <motion.div
            className="modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            <motion.div
                style={{ background: 'var(--surface)', borderRadius: 'var(--r-xl)', width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Header */}
                <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--accent-tint)', color: 'var(--accent)', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--r-pill)', fontFamily: "'Satoshi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        <Zap size={12} /> Upgrade to Pro
                    </div>
                    <button onClick={onClose} className="icon-btn"><X size={18} /></button>
                </div>

                {/* Price */}
                <div style={{ padding: '1rem 1.5rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 42, fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>₹799</span>
                        <span style={{ fontSize: 14, color: 'var(--muted)' }}>/month</span>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>Everything you need to grow your leads.</p>
                </div>

                {/* Features */}
                <ul style={{ margin: '1.25rem 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {PRO_FEATURES.map((f, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: 'var(--text)', fontFamily: "'Satoshi', sans-serif" }}>
                            <Check size={14} color="var(--accent)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--danger)' }}>
                            {error}
                        </div>
                    )}
                    <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="btn-primary"
                        style={{ justifyContent: 'center', padding: '12px', fontSize: 15 }}
                    >
                        {loading
                            ? <><Loader2 size={17} className="animate-spin" /> Processing...</>
                            : <>Pay ₹799/month with Razorpay</>
                        }
                    </button>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', textAlign: 'center', fontFamily: "'Satoshi', sans-serif" }}>
                        Secure payment via Razorpay · Cancel anytime
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default UpgradeModal
