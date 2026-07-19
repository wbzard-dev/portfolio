import React, { useState, useEffect, lazy, Suspense } from 'react'
import {
    FileText, QrCode, LogOut, LayoutDashboard,
    Plus, Loader2, Copy, Check,
    Trash2, X, BarChart2, ArrowRight, Inbox, Mail, Send,
    CheckCircle2, AlertCircle, HelpCircle, TrendingUp, TrendingDown, Zap,
    Settings, Search, CreditCard, Calendar, Star, Users, ScanLine, Activity, Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { EMAIL_TEMPLATES, renderTemplate } from '../utils/emailTemplates'
import { GuidedTour, shouldShowTour } from '../components/GuidedTour'
import UpgradeModal from '../components/UpgradeModal'

const CampaignsPage      = lazy(() => import('../components/CampaignsPage'))
const LandingPagesPage   = lazy(() => import('./LandingPagesPage'))

// ── Utilities ──────────────────────────────────────────────────────────────────

const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 1) return 'just now'
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    const d = Math.floor(h / 24)
    if (d < 30) return `${d}d ago`
    return new Date(dateStr).toLocaleDateString()
}

// ── Delta badge ────────────────────────────────────────────────────────────────

const DeltaBadge = ({ now, prev }) => {
    if (prev === 0 && now === 0) return null
    if (prev === 0 && now > 0) return (
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--success)', background: '#f0fdf4', padding: '2px 8px', borderRadius: 100, fontFamily: "'Satoshi', sans-serif", display: 'inline-flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
            <Zap size={9} /> New
        </span>
    )
    const pct = Math.round(((now - prev) / prev) * 100)
    if (pct === 0) return null
    const up = pct > 0
    return (
        <span style={{
            fontSize: 11, fontWeight: 600,
            color: up ? 'var(--success)' : 'var(--danger)',
            background: up ? '#f0fdf4' : '#fef2f2',
            padding: '2px 8px', borderRadius: 100,
            fontFamily: "'Satoshi', sans-serif",
            display: 'inline-flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap',
        }}>
            {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {up ? '+' : ''}{pct}%
        </span>
    )
}

// ── Submissions area chart ─────────────────────────────────────────────────────

const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const SubmissionsChart = ({ data, days, onDaysChange, loading }) => {
    const allZero = !loading && data.length > 0 && data.every(d => d.count === 0)

    return (
        <div className="stat-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h3 style={{ margin: 0 }}>Submissions</h3>
                    <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--muted)' }}>Lead volume over time</p>
                </div>
                <div style={{ display: 'inline-flex', gap: 2, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-pill)', padding: 3 }}>
                    {[7, 30, 90].map(d => (
                        <button key={d} onClick={() => onDaysChange(d)} style={{
                            padding: '5px 14px', borderRadius: 'calc(var(--r-pill) - 3px)',
                            border: 'none', cursor: 'pointer', fontSize: 12,
                            fontWeight: days === d ? 600 : 500,
                            color: days === d ? 'var(--ink)' : 'var(--muted)',
                            background: days === d ? 'var(--surface)' : 'transparent',
                            boxShadow: days === d ? 'var(--shadow-xs)' : 'none',
                            fontFamily: "'Satoshi', sans-serif", transition: 'all 0.12s',
                        }}>{d}d</button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                    <Loader2 size={20} className="animate-spin" />
                </div>
            ) : allZero ? (
                <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Inbox size={28} style={{ color: 'var(--border)' }} />
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>No submissions in this period</p>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>Try switching to a longer range or create a form to start collecting leads</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                        <defs>
                            <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.14} />
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="date" tickFormatter={fmtDate}
                            tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Satoshi', sans-serif" }}
                            tickLine={false} axisLine={false}
                            interval={days === 7 ? 0 : days === 30 ? 4 : 9}
                        />
                        <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Satoshi', sans-serif" }}
                            tickLine={false} axisLine={false} allowDecimals={false} domain={[0, 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: "'Satoshi', sans-serif", fontSize: 13, boxShadow: 'var(--shadow-md)' }}
                            labelStyle={{ color: 'var(--muted)', fontSize: 11, marginBottom: 4 }}
                            labelFormatter={d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            formatter={v => [v, 'Submissions']}
                            cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                        />
                        <Area type="monotone" dataKey="count"
                            stroke="#2563EB" strokeWidth={2}
                            fill="url(#subGrad)" dot={false}
                            activeDot={{ r: 4, fill: '#2563EB', strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

// ── Sidebar ────────────────────────────────────────────────────────────────────

const Sidebar = ({ active, onNavigate, onUpgrade }) => {
    const { user, logout } = useAuth()
    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?'
    const isFree = !user?.plan || user.plan === 'free'

    const sections = [
        {
            items: [
                { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
            ]
        },
        {
            label: 'Forms',
            items: [
                { key: 'forms',  label: 'Submissions', icon: <Inbox size={15} /> },
                { key: 'leads',  label: 'Email Leads',  icon: <Mail size={15} /> },
            ]
        },
        {
            label: 'Campaigns',
            items: [
                { key: 'campaigns',     label: 'Campaigns',     icon: <QrCode size={15} /> },
                { key: 'landing-pages', label: 'Landing Pages', icon: <Globe size={15} /> },
            ]
        },
    ]

    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">
                        <BarChart2 size={16} color="white" strokeWidth={2.5} />
                    </div>
                    <span className="sidebar-logo-name">Prformnce</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {sections.map((section, si) => (
                    <div key={si}>
                        {section.label && (
                            <div className="sidebar-label" style={{ marginTop: si > 0 ? '1.25rem' : 0 }}>
                                {section.label}
                            </div>
                        )}
                        {section.items.map(item => (
                            <motion.button
                                key={item.key}
                                className={`sidebar-item${active === item.key ? ' active' : ''}`}
                                onClick={() => onNavigate(item.key)}
                                whileTap={{ scale: 0.97 }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </motion.button>
                        ))}
                    </div>
                ))}

                <div className="sidebar-label" style={{ marginTop: '1.25rem' }}>Account</div>
                <motion.button
                    className={`sidebar-item${active === 'settings' ? ' active' : ''}`}
                    onClick={() => onNavigate('settings')}
                    whileTap={{ scale: 0.97 }}
                >
                    <Settings size={16} />
                    <span>Settings</span>
                </motion.button>
            </nav>

            {isFree && (
                <div style={{ margin: '0 0.75rem 0.75rem', padding: '0.875rem', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        <Star size={13} color="#60A5FA" />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#93C5FD', fontFamily: "'Satoshi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em' }}>Upgrade to Pro</span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: 11, color: '#9CA3AF', fontFamily: "'Satoshi', sans-serif", lineHeight: 1.5 }}>
                        Unlimited forms, campaigns & 50k submissions/mo.
                    </p>
                    <button
                        onClick={onUpgrade}
                        style={{ width: '100%', padding: '6px 0', background: '#2563EB', border: 'none', borderRadius: 6, color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Satoshi', sans-serif" }}
                    >
                        Upgrade — ₹799/mo
                    </button>
                </div>
            )}

            <div className="sidebar-bottom">
                <div className="user-avatar">{initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
                    <div className="user-plan">{user?.plan ?? 'free'} plan</div>
                </div>
                <button onClick={logout} title="Sign out"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#4B5563', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', transition: 'color 0.12s, background 0.12s', flexShrink: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#4B5563'; e.currentTarget.style.background = 'none' }}
                >
                    <LogOut size={15} />
                </button>
            </div>
        </aside>
    )
}

// ── Create Form Modal ──────────────────────────────────────────────────────────

const CreateFormModal = ({ onClose, onCreated }) => {
    const { authFetch } = useAuth()
    const [name, setName] = useState('')
    const [useCase, setUseCase] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showUpgrade, setShowUpgrade] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            const res = await authFetch('/api/forms', { method: 'POST', body: JSON.stringify({ name, useCase }) })
            const data = await res.json()
            if (!data.success) {
                if (data.upgrade_required) { setShowUpgrade(true); setLoading(false); return }
                throw new Error(data.message)
            }
            onCreated(data.formId, name)
        } catch (err) { setError(err.message); setLoading(false) }
    }

    if (showUpgrade) {
        return (
            <AnimatePresence>
                <UpgradeModal
                    onClose={() => { setShowUpgrade(false); onClose() }}
                    onSuccess={onClose}
                />
            </AnimatePresence>
        )
    }

    return (
        <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0 }}>New Form</h3>
                    <button onClick={onClose} className="icon-btn"><X size={18} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="field-label">Form Name</label>
                        <input required autoFocus type="text" className="input-field" placeholder="e.g. Contact Us, Event Registration" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="field-label">Description <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                        <input type="text" className="input-field" placeholder="What is this form for?" value={useCase} onChange={e => setUseCase(e.target.value)} />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Create Form'}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    )
}

// ── Email Compose Modal ────────────────────────────────────────────────────────

const EmailComposeModal = ({ selectedSubmissions, formName, onClose }) => {
    const { authFetch, user } = useAuth()
    const [step, setStep] = useState(0)
    const [template, setTemplate] = useState(null)
    const [customMessage, setCustomMessage] = useState('')
    const [offerCode, setOfferCode] = useState('')
    const [deadline, setDeadline] = useState('')
    const [sending, setSending] = useState(false)
    const [sentCount, setSentCount] = useState(0)
    const [done, setDone] = useState(false)
    const [errList, setErrList] = useState([])

    const withEmail = selectedSubmissions.filter(s => {
        const d = s.data || {}
        return d.email || d.Email || d.EMAIL
    })
    const missingEmail = selectedSubmissions.length - withEmail.length

    const makeVars = (sub) => ({
        ...(sub?.data || {}), form_name: formName,
        custom_message: customMessage, offer_code: offerCode, deadline,
        company_name: user?.company_name || '',
        sender_name: user?.name || '',
    })
    const previewVars = makeVars(selectedSubmissions[0] || { data: { name: 'Jane Smith', email: 'jane@example.com' } })
    const previewHtml    = template ? template.render(previewVars) : ''
    const previewSubject = template ? template.subject(previewVars) : ''

    const handleSend = async () => {
        if (!template || withEmail.length === 0) return
        setSending(true); setSentCount(0)
        const errs = []
        for (let i = 0; i < withEmail.length; i++) {
            const sub = withEmail[i]
            const vars = makeVars(sub)
            const emailAddr = sub.data.email || sub.data.Email || sub.data.EMAIL || ''
            try {
                const { subject, html } = renderTemplate(template, vars)
                const res = await authFetch('/api/email/send', {
                    method: 'POST',
                    body: JSON.stringify({ to: emailAddr, toName: sub.data.name || sub.data.Name || '', subject, html }),
                })
                const data = await res.json()
                if (!data.success && !data.id) throw new Error(data.error || 'Send failed')
            } catch (err) { errs.push(`${emailAddr}: ${err.message}`) }
            setSentCount(i + 1)
        }
        setSending(false); setErrList(errs); setDone(true)
    }

    return (
        <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
                style={{ background: 'var(--surface)', borderRadius: 'var(--r-xl)', width: '100%', maxWidth: step === 1 ? 860 : 620, boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                    <div>
                        <h3 style={{ margin: 0 }}>{step === 0 ? 'Pick Email Template' : 'Compose & Send'}</h3>
                        <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                            {selectedSubmissions.length} leads selected
                            {missingEmail > 0 && <span style={{ color: 'var(--warning)', marginLeft: 8 }}>· {missingEmail} missing email field</span>}
                        </p>
                    </div>
                    <button onClick={onClose} className="icon-btn"><X size={18} /></button>
                </div>

                {step === 0 && (
                    <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto' }}>
                        <div className="email-tpl-grid">
                            {EMAIL_TEMPLATES.map(tpl => (
                                <button key={tpl.id} className={`email-tpl-card${template?.id === tpl.id ? ' selected' : ''}`} onClick={() => setTemplate(tpl)}>
                                    <div className="email-tpl-icon">{tpl.icon}</div>
                                    <div className="email-tpl-name">{tpl.label}</div>
                                    <div className="email-tpl-desc">{tpl.description}</div>
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => setStep(1)} disabled={!template} className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
                                Next: Preview & Send →
                            </button>
                        </div>
                    </div>
                )}

                {step === 1 && !done && (
                    <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
                        <div style={{ width: 300, flexShrink: 0, padding: '1.25rem', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
                            <div>
                                <label className="field-label" style={{ display: 'block', marginBottom: 6 }}>Template</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 20 }}>{template.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{template.label}</div>
                                        <button onClick={() => setStep(0)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, cursor: 'pointer', padding: 0, fontFamily: "'Satoshi', sans-serif" }}>Change</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="field-label" style={{ display: 'block', marginBottom: 6 }}>Subject preview</label>
                                <div style={{ fontSize: 13, color: 'var(--ink)', padding: '8px 12px', background: 'var(--bg)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>{previewSubject || '—'}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="field-label">Custom message <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional)</span></label>
                                <textarea className="input-field" placeholder="Add a personal note..." rows={4} style={{ resize: 'vertical', fontSize: 14 }} value={customMessage} onChange={e => setCustomMessage(e.target.value)} />
                            </div>
                            {template.id === 'special-offer' && (
                                <div className="flex flex-col gap-2">
                                    <label className="field-label">Offer code</label>
                                    <input type="text" className="input-field" placeholder="e.g. SAVE20" value={offerCode} onChange={e => setOfferCode(e.target.value)} />
                                </div>
                            )}
                            {(template.id === 'reminder' || template.id === 'special-offer') && (
                                <div className="flex flex-col gap-2">
                                    <label className="field-label">Deadline</label>
                                    <input type="text" className="input-field" placeholder="e.g. Dec 31, 2025" value={deadline} onChange={e => setDeadline(e.target.value)} />
                                </div>
                            )}
                            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                                {withEmail.length === 0
                                    ? <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: 'var(--danger)' }}>No email addresses found in selected submissions.</div>
                                    : <button onClick={handleSend} disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>
                                        {sending ? <><Loader2 size={16} className="animate-spin" /> Sending {sentCount}/{withEmail.length}...</> : <><Send size={15} /> Send to {withEmail.length} lead{withEmail.length !== 1 ? 's' : ''}</>}
                                    </button>}
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', fontSize: 12, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif", flexShrink: 0 }}>Preview · first lead's data</div>
                            <iframe srcDoc={previewHtml} style={{ flex: 1, border: 'none', width: '100%' }} title="Email preview" />
                        </div>
                    </div>
                )}

                {step === 1 && done && (
                    <div style={{ padding: '2.5rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                        {errList.length === 0 ? <CheckCircle2 size={40} color="var(--success)" /> : <AlertCircle size={40} color="var(--warning)" />}
                        <h3 style={{ margin: 0 }}>{errList.length === 0 ? `${withEmail.length} email${withEmail.length !== 1 ? 's' : ''} sent!` : `${sentCount - errList.length} of ${withEmail.length} sent`}</h3>
                        {errList.length > 0 && (
                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', maxWidth: 360, textAlign: 'left' }}>
                                {errList.map((e, i) => <div key={i} style={{ fontSize: 12, color: 'var(--danger)', lineHeight: 1.7 }}>{e}</div>)}
                            </div>
                        )}
                        <button onClick={onClose} className="btn-primary" style={{ padding: '10px 24px', marginTop: 4 }}>Done</button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

// ── Submissions Table ──────────────────────────────────────────────────────────

const SubmissionsTable = ({ submissions, selectedIds, onToggle, onSelectAll }) => {
    if (!submissions || submissions.length === 0) {
        return (
            <div className="empty-state" style={{ padding: '3rem' }}>
                <Inbox size={28} style={{ color: 'var(--border)', marginBottom: '0.75rem' }} />
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>No submissions yet</p>
                <p style={{ fontSize: '13px', marginTop: '4px' }}>
                    Point your form's{' '}
                    <code style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '12px' }}>action</code>
                    {' '}attribute to the endpoint above
                </p>
            </div>
        )
    }

    const fields = [...new Set(submissions.flatMap(s => Object.keys(s.data || {})))]
    const allSelected = submissions.every(s => selectedIds?.has(s.id))
    const someSelected = submissions.some(s => selectedIds?.has(s.id))

    return (
        <div className="sub-table-wrap">
            <table className="sub-table">
                <thead>
                    <tr>
                        <th className="sub-check">
                            <input type="checkbox" checked={allSelected}
                                ref={el => { if (el) el.indeterminate = someSelected && !allSelected }}
                                onChange={() => onSelectAll(submissions)}
                                style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                            />
                        </th>
                        <th>Time</th>
                        {fields.map(f => <th key={f}>{f.replace(/_/g, ' ')}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(s => {
                        const isSelected = selectedIds?.has(s.id)
                        return (
                            <tr key={s.id} className={isSelected ? 'selected' : ''}>
                                <td className="sub-check">
                                    <input type="checkbox" checked={!!isSelected} onChange={() => onToggle(s.id)} style={{ cursor: 'pointer', accentColor: 'var(--accent)' }} />
                                </td>
                                <td className="sub-table-time">{timeAgo(s.submitted_at)}</td>
                                {fields.map(f => (
                                    <td key={f} title={String(s.data?.[f] ?? '')}>
                                        {s.data?.[f] != null ? String(s.data[f]) : <span style={{ color: 'var(--muted)' }}>—</span>}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

// ── Form Detail Panel (right side of Forms page) ───────────────────────────────

const FormDetail = ({ form, onDelete }) => {
    const { authFetch } = useAuth()
    const [submissions, setSubmissions] = useState(null)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [selectedSubs, setSelectedSubs] = useState(new Set())
    const [showEmail, setShowEmail] = useState(false)
    const [search, setSearch] = useState('')

    const endpoint = `${import.meta.env.DEV ? window.location.origin : 'https://form.wbzard.com'}/api/s/${form.id}`

    useEffect(() => {
        if (!form?.id) return
        setLoading(true); setSubmissions(null); setSelectedSubs(new Set()); setSearch('')
        authFetch(`/api/forms/${form.id}/submissions`)
            .then(r => r.json())
            .then(data => { if (data.success) setSubmissions(data.submissions) })
            .finally(() => setLoading(false))
    }, [form?.id])

    const handleDelete = async () => {
        if (!confirm(`Delete "${form.name}" and all its submissions? This cannot be undone.`)) return
        setDeleting(true)
        await authFetch(`/api/forms/${form.id}`, { method: 'DELETE' })
        onDelete(form.id)
    }

    const copyEndpoint = () => {
        navigator.clipboard.writeText(endpoint)
        setCopied(true); setTimeout(() => setCopied(false), 2000)
    }

    const toggleSub = (id) => setSelectedSubs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
    const selectAll = (subs) => {
        const allSel = subs.every(s => selectedSubs.has(s.id))
        setSelectedSubs(allSel ? new Set() : new Set(subs.map(s => s.id)))
    }

    const filtered = submissions
        ? (search.trim()
            ? submissions.filter(s => Object.values(s.data || {}).some(v => String(v).toLowerCase().includes(search.toLowerCase())))
            : submissions)
        : null

    const selectedSubObjects = filtered?.filter(s => selectedSubs.has(s.id)) || []

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ margin: 0, fontSize: '1.15rem' }}>{form.name}</h2>
                    {form.use_case && <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--muted)' }}>{form.use_case}</p>}
                </div>
                <button onClick={handleDelete} disabled={deleting} className="btn-danger" style={{ padding: '7px 14px', fontSize: 13, flexShrink: 0, marginLeft: 12 }}>
                    <Trash2 size={13} /> Delete
                </button>
            </div>

            {/* Endpoint */}
            <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexShrink: 0 }}>
                <div className="endpoint-label">Form Endpoint</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <code style={{ fontSize: 12, color: 'var(--ink)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{endpoint}</code>
                    <button onClick={copyEndpoint} className="icon-btn" title="Copy endpoint" style={{ flexShrink: 0 }}>
                        {copied ? <Check size={15} color="var(--success)" /> : <Copy size={15} />}
                    </button>
                </div>
            </div>

            {/* Search + action bar */}
            <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                    <input type="text" className="input-field"
                        placeholder="Search submissions..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        style={{ padding: '7px 12px 7px 32px', fontSize: 13 }}
                    />
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif", flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {submissions !== null ? `${filtered.length} of ${submissions.length}` : ''}
                </span>
                <AnimatePresence>
                    {selectedSubs.size > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="btn-primary" onClick={() => setShowEmail(true)}
                            style={{ padding: '7px 14px', fontSize: 13, flexShrink: 0 }}
                        >
                            <Mail size={14} /> Email {selectedSubs.size}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Submissions */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {loading
                    ? <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted)' }}><Loader2 size={22} className="animate-spin" /></div>
                    : <SubmissionsTable submissions={filtered} selectedIds={selectedSubs} onToggle={toggleSub} onSelectAll={selectAll} />
                }
            </div>

            <AnimatePresence>
                {showEmail && <EmailComposeModal selectedSubmissions={selectedSubObjects} formName={form.name} onClose={() => setShowEmail(false)} />}
            </AnimatePresence>
        </div>
    )
}

// ── Forms Page (split panel) ───────────────────────────────────────────────────

const FormsPage = () => {
    const { authFetch } = useAuth()
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)
    const [showCreate, setShowCreate] = useState(false)

    useEffect(() => {
        authFetch('/api/forms').then(r => r.json())
            .then(data => {
                if (data.success) {
                    setForms(data.forms)
                    if (data.forms.length > 0) setSelectedId(data.forms[0].id)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    const selectedForm = forms.find(f => f.id === selectedId) || null

    const handleCreated = (formId, name) => {
        const newForm = { id: formId, name, submission_count: 0, created_at: new Date().toISOString(), active: 1 }
        setForms(prev => [newForm, ...prev])
        setSelectedId(formId)
        setShowCreate(false)
    }

    const handleDelete = (formId) => {
        const remaining = forms.filter(f => f.id !== formId)
        setForms(remaining)
        setSelectedId(remaining.length > 0 ? remaining[0].id : null)
    }

    return (
        <div className="page-layout">
            {/* Left: form list */}
            <div className="form-list">
                <div className="form-list-header">
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Satoshi', sans-serif" }}>
                        Forms{!loading && <span style={{ fontWeight: 400, color: 'var(--muted)' }}> · {forms.length}</span>}
                    </span>
                    <button onClick={() => setShowCreate(true)} className="icon-btn" title="New form" style={{ color: 'var(--accent)' }}>
                        <Plus size={16} />
                    </button>
                </div>

                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}><Loader2 size={18} className="animate-spin" /></div>
                ) : forms.length === 0 ? (
                    <div style={{ padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: '1rem' }}>No forms yet</p>
                        <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: 13 }}>
                            <Plus size={14} /> New Form
                        </button>
                    </div>
                ) : forms.map(form => (
                    <button
                        key={form.id}
                        className={`form-list-item${selectedId === form.id ? ' active' : ''}`}
                        onClick={() => setSelectedId(form.id)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, width: '100%' }}>
                            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                                <div style={{ fontWeight: 600, fontSize: 14, color: selectedId === form.id ? 'var(--accent)' : 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {form.name}
                                </div>
                                {form.use_case && (
                                    <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
                                        {form.use_case}
                                    </div>
                                )}
                            </div>
                            <span style={{
                                fontSize: 11, fontWeight: 600, flexShrink: 0,
                                color: form.submission_count > 0 ? 'var(--accent)' : 'var(--muted)',
                                background: form.submission_count > 0 ? 'var(--accent-tint)' : 'var(--bg)',
                                padding: '1px 8px', borderRadius: 'var(--r-pill)',
                                border: `1px solid ${form.submission_count > 0 ? 'rgba(37,99,235,0.15)' : 'var(--border)'}`,
                                fontFamily: "'Satoshi', sans-serif",
                            }}>
                                {form.submission_count}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Right: form detail */}
            <div className="form-detail" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
                {selectedForm ? (
                    <FormDetail form={selectedForm} onDelete={handleDelete} />
                ) : (
                    <div className="empty-state" style={{ height: '100%' }}>
                        <FileText size={28} style={{ color: 'var(--border)', marginBottom: '0.875rem' }} />
                        <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Select a form</p>
                        <p style={{ fontSize: 13 }}>Pick a form from the left to view its submissions</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showCreate && <CreateFormModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />}
            </AnimatePresence>
        </div>
    )
}

// ── Settings Page ──────────────────────────────────────────────────────────────

const SettingsPage = ({ onUpgrade }) => {
    const { user, authFetch, refreshUser, updateProfile } = useAuth()
    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?'
    const isFree = !user?.plan || user.plan === 'free'

    const [billing, setBilling] = useState(null)
    const [billingLoading, setBillingLoading] = useState(true)
    const [cancelling, setCancelling] = useState(false)
    const [cancelError, setCancelError] = useState('')

    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        company_name: user?.company_name || '',
        company_website: user?.company_website || '',
    })
    const [profileSaving, setProfileSaving] = useState(false)
    const [profileError, setProfileError] = useState('')
    const [profileSaved, setProfileSaved] = useState(false)

    useEffect(() => {
        setProfileForm({
            name: user?.name || '',
            company_name: user?.company_name || '',
            company_website: user?.company_website || '',
        })
    }, [user?.name, user?.company_name, user?.company_website])

    useEffect(() => {
        authFetch('/api/subscriptions/status').then(r => r.json())
            .then(d => { if (d.success) setBilling(d) })
            .finally(() => setBillingLoading(false))
    }, [user?.plan])

    const handleCancel = async () => {
        if (!confirm('Cancel your subscription? You will lose access to Pro features immediately.')) return
        setCancelling(true); setCancelError('')
        try {
            const res = await authFetch('/api/subscriptions/cancel', { method: 'POST' })
            const data = await res.json()
            if (!data.success) throw new Error(data.message)
            if (data.token) localStorage.setItem('token', data.token)
            await refreshUser()
        } catch (err) {
            setCancelError(err.message)
        } finally {
            setCancelling(false)
        }
    }

    const handleProfileSave = async (e) => {
        e.preventDefault()
        setProfileSaving(true); setProfileError(''); setProfileSaved(false)
        try {
            await updateProfile(profileForm.name, profileForm.company_name, profileForm.company_website)
            setProfileSaved(true)
            setTimeout(() => setProfileSaved(false), 2500)
        } catch (err) {
            setProfileError(err.message)
        } finally {
            setProfileSaving(false)
        }
    }

    const SoonBadge = () => (
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)', padding: '2px 8px', borderRadius: 'var(--r-pill)', fontFamily: "'Satoshi', sans-serif" }}>
            Soon
        </span>
    )

    const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : null

    return (
        <div style={{ padding: '2rem 2.5rem', maxWidth: 620 }}>
            <h2 style={{ margin: '0 0 0.25rem' }}>Settings</h2>
            <p style={{ marginBottom: '2.5rem', fontSize: 14, color: 'var(--muted)' }}>Manage your account and preferences.</p>

            {/* Profile */}
            <div className="card" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#fff', flexShrink: 0, fontFamily: "'Satoshi', sans-serif" }}>
                        {initials}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{user?.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{user?.email}</div>
                    </div>
                </div>
                <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label className="field-label">Full name</label>
                        <input
                            required className="input-field" placeholder="Your name"
                            value={profileForm.name}
                            onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label className="field-label">Company name
                            <span style={{ color: 'var(--muted)', fontWeight: 400, marginLeft: 6, fontSize: 13 }}>used in email templates</span>
                        </label>
                        <input
                            className="input-field" placeholder="Acme Inc."
                            value={profileForm.company_name}
                            onChange={e => setProfileForm(f => ({ ...f, company_name: e.target.value }))}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label className="field-label">Company website</label>
                        <input
                            className="input-field" placeholder="https://acme.com" type="url"
                            value={profileForm.company_website}
                            onChange={e => setProfileForm(f => ({ ...f, company_website: e.target.value }))}
                        />
                    </div>
                    {profileError && <p className="error-text">{profileError}</p>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button type="submit" disabled={profileSaving} className="btn-primary" style={{ padding: '9px 20px' }}>
                            {profileSaving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Save profile'}
                        </button>
                        {profileSaved && <span style={{ fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle2 size={14} /> Saved</span>}
                    </div>
                </form>
            </div>

            {/* Billing */}
            <div className="card" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                    <CreditCard size={17} color="var(--accent)" />
                    <h3 style={{ margin: 0 }}>Billing & Plan</h3>
                </div>

                {billingLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 14 }}>
                        <Loader2 size={16} className="animate-spin" /> Loading...
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 400, fontSize: 24, color: 'var(--ink)', fontFamily: "'Anton', sans-serif", letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                                {user?.plan ?? 'Free'}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 700, background: isFree ? 'var(--bg)' : 'var(--accent-tint)', color: isFree ? 'var(--muted)' : 'var(--accent)', padding: '3px 10px', borderRadius: 'var(--r-pill)', fontFamily: "'Satoshi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', border: `1px solid ${isFree ? 'var(--border)' : 'transparent'}` }}>
                                {isFree ? 'Free' : 'Active'}
                            </span>
                        </div>

                        {isFree ? (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    {[
                                        { label: 'Forms', value: '3 max' },
                                        { label: 'Campaigns', value: '2 max' },
                                        { label: 'Submissions', value: '500/mo' },
                                        { label: 'Support', value: 'Community' },
                                    ].map(item => (
                                        <div key={item.label} style={{ padding: '0.75rem', background: 'var(--bg)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>
                                            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Satoshi', sans-serif" }}>{item.label}</div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginTop: 2, fontFamily: "'Satoshi', sans-serif" }}>{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={onUpgrade} className="btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '11px' }}>
                                    <Zap size={15} /> Upgrade to Pro — ₹799/month
                                </button>
                            </>
                        ) : (
                            <>
                                {billing?.subscription?.current_period_end && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem', padding: '0.75rem 1rem', background: 'var(--bg)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border)' }}>
                                        <Calendar size={14} color="var(--muted)" />
                                        <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif" }}>
                                            Next billing: <strong style={{ color: 'var(--ink)' }}>{formatDate(billing.subscription.current_period_end)}</strong>
                                        </span>
                                    </div>
                                )}
                                {cancelError && (
                                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--danger)', marginBottom: '1rem' }}>
                                        {cancelError}
                                    </div>
                                )}
                                <button onClick={handleCancel} disabled={cancelling} className="btn-danger" style={{ fontSize: 13, padding: '8px 16px' }}>
                                    {cancelling ? <><Loader2 size={14} className="animate-spin" /> Cancelling...</> : 'Cancel subscription'}
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Notifications */}
            <div className="card" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: '0 0 0.3rem' }}>Email Notifications</h3>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Get notified when new submissions arrive on your forms.</p>
                    </div>
                    <SoonBadge />
                </div>
            </div>

            {/* Integrations */}
            <div className="card" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: '0 0 0.3rem' }}>Webhooks & Integrations</h3>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Fire a POST to your URL on every new submission.</p>
                    </div>
                    <SoonBadge />
                </div>
            </div>

            {/* Security */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: '0 0 0.3rem' }}>Security</h3>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Change your password or manage sessions.</p>
                    </div>
                    <SoonBadge />
                </div>
            </div>
        </div>
    )
}

// ── Overview Page ──────────────────────────────────────────────────────────────

const OverviewPage = ({ onNavigate, onStartTour }) => {
    const { authFetch, user } = useAuth()
    const [forms, setForms] = useState([])
    const [formsLoading, setFormsLoading] = useState(true)
    const [stats, setStats] = useState(null)
    const [statsLoading, setStatsLoading] = useState(true)
    const [days, setDays] = useState(30)
    const [showCreate, setShowCreate] = useState(false)

    useEffect(() => {
        authFetch('/api/forms').then(r => r.json())
            .then(d => { if (d.success) setForms(d.forms) })
            .finally(() => setFormsLoading(false))
    }, [])

    useEffect(() => {
        setStatsLoading(true)
        authFetch(`/api/stats/overview?days=${days}`).then(r => r.json())
            .then(d => { if (d.success) setStats(d) })
            .finally(() => setStatsLoading(false))
    }, [days])

    const greeting = () => {
        const h = new Date().getHours()
        if (h < 12) return 'Good morning'; if (h < 17) return 'Good afternoon'; return 'Good evening'
    }

    const periodLabel = days === 7 ? 'This Week' : days === 30 ? 'This Month' : 'Last 90 Days'
    const kpis = stats?.kpis
    const topForms = [...forms].sort((a, b) => (b.submission_count || 0) - (a.submission_count || 0)).slice(0, 5)

    const statCards = [
        {
            icon: <Inbox size={18} color="var(--accent)" />,
            value: statsLoading ? '—' : (kpis?.submissions_now ?? 0),
            label: `Leads ${periodLabel}`,
            delta: kpis ? <DeltaBadge now={kpis.submissions_now} prev={kpis.submissions_prev} /> : null,
        },
        {
            icon: <FileText size={18} color="var(--accent)" />,
            value: formsLoading ? '—' : forms.length,
            label: 'Total Forms',
            delta: null,
        },
        {
            icon: <QrCode size={18} color="var(--accent)" />,
            value: statsLoading ? '—' : (kpis?.campaigns_total ?? 0),
            label: 'QR Campaigns',
            delta: null,
        },
        {
            icon: <BarChart2 size={18} color="var(--accent)" />,
            value: statsLoading ? '—' : (kpis?.scans_now ?? 0),
            label: `Scans ${periodLabel}`,
            delta: kpis ? <DeltaBadge now={kpis.scans_now} prev={kpis.scans_prev} /> : null,
        },
    ]

    return (
        <div style={{ padding: '2rem 2.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{greeting()}, {user?.name?.split(' ')[0] ?? 'there'} 👋</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                        <p style={{ margin: 0, fontSize: '14px' }}>Here's your lead pipeline at a glance.</p>
                        <button onClick={onStartTour}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-pill)', padding: '3px 10px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif", transition: 'color 0.12s, border-color 0.12s' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                        >
                            <HelpCircle size={12} /> Tour
                        </button>
                    </div>
                </div>
                <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ padding: '9px 16px', fontSize: '14px' }}>
                    <Plus size={15} /> New Form
                </button>
            </div>

            {/* KPI cards */}
            <div data-tour="stat-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {statCards.map((stat, i) => (
                    <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                        <div className="stat-card-icon">{stat.icon}</div>
                        <div className="stat-card-value">{stat.value}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                            <div className="stat-card-label">{stat.label}</div>
                            {stat.delta}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Area chart */}
            <SubmissionsChart
                data={stats?.chart || []}
                days={days}
                onDaysChange={setDays}
                loading={statsLoading}
            />

            {/* Bottom: Top Forms + Recent Activity */}
            {!formsLoading && forms.length === 0 ? (
                <div className="empty-state" style={{ padding: '4rem 2rem', border: '1px dashed var(--border)', borderRadius: 'var(--r-lg)' }}>
                    <FileText size={28} style={{ color: 'var(--border)', marginBottom: '0.875rem' }} />
                    <p style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>No forms yet</p>
                    <p style={{ fontSize: '14px', marginBottom: '1.5rem' }}>Create your first form to start collecting leads.</p>
                    <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}><Plus size={15} /> Create your first form</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Top Forms */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>Top Forms</h3>
                            <button onClick={() => onNavigate('forms')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: 'var(--accent)', fontFamily: "'Satoshi', sans-serif", padding: '4px 0' }}>
                                View all <ArrowRight size={13} />
                            </button>
                        </div>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                            {formsLoading
                                ? <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--muted)' }}><Loader2 size={20} className="animate-spin" /></div>
                                : topForms.map((form, i) => (
                                    <div key={form.id} className="overview-form-row" onClick={() => onNavigate('forms')} style={{ borderBottom: i < topForms.length - 1 ? '1px solid var(--border-2)' : 'none' }}>
                                        <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <FileText size={15} color="var(--accent)" />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.name}</div>
                                            {form.use_case && <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.use_case}</div>}
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: 15, color: form.submission_count > 0 ? 'var(--ink)' : 'var(--muted)' }}>{form.submission_count}</div>
                                            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>leads</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h3 style={{ margin: '0 0 1rem' }}>Recent Activity</h3>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                            {statsLoading ? (
                                <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--muted)' }}><Loader2 size={20} className="animate-spin" /></div>
                            ) : !stats?.recent?.length ? (
                                <div style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>No submissions yet</div>
                            ) : stats.recent.map((item, i) => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem 1.25rem', borderBottom: i < stats.recent.length - 1 ? '1px solid var(--border-2)' : 'none' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.preview}</div>
                                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{item.form_name}</div>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>{timeAgo(item.submitted_at)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {showCreate && <CreateFormModal onClose={() => setShowCreate(false)} onCreated={(id, name) => { setForms(prev => [{ id, name, submission_count: 0, created_at: new Date().toISOString(), active: 1 }, ...prev]); setShowCreate(false) }} />}
            </AnimatePresence>
        </div>
    )
}

// ── All Leads Page ─────────────────────────────────────────────────────────────

const AllLeadsPage = () => {
    const { authFetch } = useAuth()
    const [submissions, setSubmissions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedSubs, setSelectedSubs] = useState(new Set())
    const [showEmail, setShowEmail] = useState(false)

    useEffect(() => {
        authFetch('/api/forms/submissions').then(r => r.json())
            .then(d => { if (d.success) setSubmissions(d.submissions) })
            .finally(() => setLoading(false))
    }, [])

    const filtered = submissions
        ? search.trim()
            ? submissions.filter(s =>
                s.form_name.toLowerCase().includes(search.toLowerCase()) ||
                Object.values(s.data || {}).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
              )
            : submissions
        : []

    const toggleSub = (id) => setSelectedSubs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
    const selectAll = () => {
        const allSel = filtered.every(s => selectedSubs.has(s.id))
        setSelectedSubs(allSel ? new Set() : new Set(filtered.map(s => s.id)))
    }
    const selectedSubObjects = filtered.filter(s => selectedSubs.has(s.id))

    const fields = submissions ? [...new Set(submissions.flatMap(s => Object.keys(s.data || {})))] : []

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0 }}>
                <h2 style={{ margin: '0 0 2px', fontSize: '1.15rem' }}>Email Leads</h2>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>All submissions across every form — select rows to send emails.</p>
            </div>

            {/* Toolbar */}
            <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
                    <input type="text" className="input-field" placeholder="Search by name, email, form…"
                        value={search} onChange={e => setSearch(e.target.value)}
                        style={{ padding: '7px 12px 7px 32px', fontSize: 13 }}
                    />
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif" }}>
                    {submissions !== null ? `${filtered.length} lead${filtered.length !== 1 ? 's' : ''}` : ''}
                </span>
                <AnimatePresence>
                    {selectedSubs.size > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="btn-primary" onClick={() => setShowEmail(true)}
                            style={{ padding: '7px 14px', fontSize: 13, flexShrink: 0 }}
                        >
                            <Mail size={14} /> Email {selectedSubs.size} lead{selectedSubs.size !== 1 ? 's' : ''}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Table */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted)' }}><Loader2 size={22} className="animate-spin" /></div>
                ) : filtered.length === 0 ? (
                    <div className="empty-state" style={{ padding: '4rem' }}>
                        <Users size={28} style={{ color: 'var(--border)', marginBottom: '0.75rem' }} />
                        <p style={{ fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px' }}>{search ? 'No results' : 'No leads yet'}</p>
                        <p style={{ fontSize: 13, margin: 0 }}>{search ? 'Try a different search term' : 'Submissions from all your forms appear here'}</p>
                    </div>
                ) : (
                    <div className="sub-table-wrap">
                        <table className="sub-table">
                            <thead>
                                <tr>
                                    <th className="sub-check">
                                        <input type="checkbox"
                                            checked={filtered.length > 0 && filtered.every(s => selectedSubs.has(s.id))}
                                            ref={el => { if (el) el.indeterminate = filtered.some(s => selectedSubs.has(s.id)) && !filtered.every(s => selectedSubs.has(s.id)) }}
                                            onChange={selectAll}
                                            style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
                                        />
                                    </th>
                                    <th>Time</th>
                                    <th>Form</th>
                                    {fields.map(f => <th key={f}>{f.replace(/_/g, ' ')}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(s => (
                                    <tr key={s.id} className={selectedSubs.has(s.id) ? 'selected' : ''}>
                                        <td className="sub-check">
                                            <input type="checkbox" checked={selectedSubs.has(s.id)} onChange={() => toggleSub(s.id)} style={{ cursor: 'pointer', accentColor: 'var(--accent)' }} />
                                        </td>
                                        <td className="sub-table-time">{timeAgo(s.submitted_at)}</td>
                                        <td>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-tint)', padding: '2px 8px', borderRadius: 'var(--r-pill)', fontFamily: "'Satoshi', sans-serif", whiteSpace: 'nowrap' }}>
                                                {s.form_name}
                                            </span>
                                        </td>
                                        {fields.map(f => (
                                            <td key={f} title={String(s.data?.[f] ?? '')}>
                                                {s.data?.[f] != null ? String(s.data[f]) : <span style={{ color: 'var(--muted)' }}>—</span>}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showEmail && (
                    <EmailComposeModal
                        selectedSubmissions={selectedSubObjects}
                        formName="your form"
                        onClose={() => setShowEmail(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

// ── Scan Analytics Page ────────────────────────────────────────────────────────

const ScanAnalyticsPage = () => {
    const { authFetch } = useAuth()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [days, setDays] = useState(30)

    useEffect(() => {
        setLoading(true)
        authFetch(`/api/stats/scans?days=${days}`)
            .then(r => r.json())
            .then(d => { if (d.success) setStats(d) })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [days])

    const allZero = !loading && (!stats || stats.chart.every(d => d.count === 0))
    const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const campaignsWithScans = stats?.per_campaign?.filter(c => parseInt(c.scan_count) > 0).length ?? 0

    return (
        <div style={{ padding: '2rem 2.5rem', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ margin: '0 0 4px' }}>Scan Analytics</h2>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)' }}>QR scan activity across all campaigns.</p>
                </div>
                <div style={{ display: 'inline-flex', gap: 2, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-pill)', padding: 3 }}>
                    {[7, 30, 90].map(d => (
                        <button key={d} onClick={() => setDays(d)} style={{
                            padding: '5px 14px', borderRadius: 'calc(var(--r-pill) - 3px)',
                            border: 'none', cursor: 'pointer', fontSize: 12,
                            fontWeight: days === d ? 600 : 500,
                            color: days === d ? 'var(--ink)' : 'var(--muted)',
                            background: days === d ? 'var(--surface)' : 'transparent',
                            boxShadow: days === d ? 'var(--shadow-xs)' : 'none',
                            fontFamily: "'Satoshi', sans-serif", transition: 'all 0.12s',
                        }}>{d}d</button>
                    ))}
                </div>
            </div>

            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {[
                    { icon: <Activity size={18} color="var(--accent)" />, label: 'Total Scans (all time)', value: loading ? '—' : stats?.total_scans ?? 0 },
                    { icon: <QrCode size={18} color="var(--accent)" />, label: 'Campaigns with Scans', value: loading ? '—' : campaignsWithScans },
                    { icon: <ScanLine size={18} color="var(--accent)" />, label: `Scans (${days}d)`, value: loading ? '—' : (stats?.chart?.reduce((a, b) => a + b.count, 0) ?? 0) },
                ].map((kpi, i) => (
                    <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                        <div className="stat-card-icon">{kpi.icon}</div>
                        <div className="stat-card-value">{kpi.value}</div>
                        <div className="stat-card-label">{kpi.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Chart */}
            <div className="stat-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 1.5rem' }}>Scans over time</h3>
                {loading ? (
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 size={20} className="animate-spin" style={{ color: 'var(--muted)' }} /></div>
                ) : allZero ? (
                    <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <ScanLine size={28} style={{ color: 'var(--border)' }} />
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>No scans in this period</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={stats.chart} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                            <defs>
                                <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.14} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={fmtDate}
                                tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Satoshi', sans-serif" }}
                                tickLine={false} axisLine={false}
                                interval={days === 7 ? 0 : days === 30 ? 4 : 9}
                            />
                            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Satoshi', sans-serif" }}
                                tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: "'Satoshi', sans-serif", fontSize: 13, boxShadow: 'var(--shadow-md)' }}
                                labelFormatter={d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                formatter={v => [v, 'Scans']}
                                cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                            />
                            <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} fill="url(#scanGrad)" dot={false} activeDot={{ r: 4, fill: '#2563EB', strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Per-campaign table */}
            <h3 style={{ margin: '0 0 1rem' }}>By Campaign</h3>
            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}><Loader2 size={20} className="animate-spin" /></div>
            ) : !stats?.per_campaign?.length ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>No campaigns yet</div>
            ) : (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                    <table className="sub-table">
                        <thead>
                            <tr>
                                <th>Campaign</th>
                                <th>Recipients</th>
                                <th>Total Scans</th>
                                <th>Scan Rate</th>
                                <th>Last Scanned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.per_campaign.map(c => {
                                const recipients = parseInt(c.recipient_count) || 0
                                const scans = parseInt(c.scan_count) || 0
                                const rate = recipients > 0 ? Math.round((scans / recipients) * 100) : 0
                                return (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{c.name}</td>
                                        <td>{recipients}</td>
                                        <td>
                                            <span style={{ fontWeight: 700, color: scans > 0 ? 'var(--ink)' : 'var(--muted)' }}>{scans}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 60, height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                                                    <div style={{ width: `${Math.min(rate, 100)}%`, height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
                                                </div>
                                                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{rate}%</span>
                                            </div>
                                        </td>
                                        <td className="sub-table-time">{c.last_scanned ? timeAgo(c.last_scanned) : <span style={{ color: 'var(--muted)' }}>Never</span>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

// ── Dashboard Root ─────────────────────────────────────────────────────────────

const Dashboard = () => {
    const [view, setView] = useState('overview')
    const [showTour, setShowTour] = useState(() => shouldShowTour())
    const [showUpgrade, setShowUpgrade] = useState(false)

    const handleNavigate = (key) => {
        setView(key)
    }

    const fullHeight = view === 'forms' || view === 'campaigns' || view === 'leads' || view === 'landing-pages'

    return (
        <div className="app-layout">
            <Sidebar active={view} onNavigate={handleNavigate} onUpgrade={() => setShowUpgrade(true)} />
            <main className="main-content" style={{ overflowY: fullHeight ? 'hidden' : 'auto' }}>
                {view === 'overview' && (
                    <OverviewPage onNavigate={handleNavigate} onStartTour={() => setShowTour(true)} />
                )}
                {view === 'forms' && <FormsPage />}
                {view === 'leads' && <AllLeadsPage />}
                {view === 'campaigns' && (
                    <Suspense fallback={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)' }}>
                            <Loader2 size={24} className="animate-spin" />
                        </div>
                    }>
                        <CampaignsPage />
                    </Suspense>
                )}
                {view === 'landing-pages' && (
                    <Suspense fallback={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)' }}>
                            <Loader2 size={24} className="animate-spin" />
                        </div>
                    }>
                        <LandingPagesPage />
                    </Suspense>
                )}
                {view === 'settings' && <SettingsPage onUpgrade={() => setShowUpgrade(true)} />}
            </main>

            <AnimatePresence>
                {showTour && <GuidedTour key="tour" onEnd={() => setShowTour(false)} />}
                {showUpgrade && (
                    <UpgradeModal
                        key="upgrade"
                        onClose={() => setShowUpgrade(false)}
                        onSuccess={() => setShowUpgrade(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default Dashboard
