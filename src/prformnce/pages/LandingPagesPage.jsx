import React, { useState, useEffect } from 'react'
import { Plus, Loader2, Globe, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import CampaignLandingTab from '../components/CampaignLandingTab'

/* ── Landing Pages (sidebar-level page) ────────────────────────────────────
 * Reuses the campaigns table under the hood — each Campaign has one LP.
 * Split panel: left = list of campaigns with LP status, right = LP editor.
 * ──────────────────────────────────────────────────────────────────────── */

const LandingPagesPage = () => {
    const { authFetch } = useAuth()
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null)
    const [showCreate, setShowCreate] = useState(false)

    const loadCampaigns = () => {
        setLoading(true)
        authFetch('/api/campaigns').then(r => r.json())
            .then(data => {
                if (data.success) {
                    setCampaigns(data.campaigns)
                    if (data.campaigns.length > 0 && !selectedId) {
                        setSelectedId(data.campaigns[0].id)
                    }
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(loadCampaigns, [])

    // The list endpoint doesn't return LP fields — fetch selected campaign in full
    const [selected, setSelected] = useState(null)
    const [selectedLoading, setSelectedLoading] = useState(false)

    useEffect(() => {
        if (!selectedId) { setSelected(null); return }
        setSelectedLoading(true)
        authFetch(`/api/campaigns/${selectedId}`).then(r => r.json())
            .then(data => { if (data.success) setSelected(data.campaign) })
            .finally(() => setSelectedLoading(false))
    }, [selectedId])

    const handleCreated = (id) => {
        loadCampaigns()
        setSelectedId(id)
        setShowCreate(false)
    }

    const handleSave = (updated) => {
        // Reflect the row in the sidebar list without a full refetch
        setSelected(prev => prev ? { ...prev, ...updated } : prev)
        setCampaigns(prev => prev.map(c => c.id === updated.id ? { ...c, published: updated.published } : c))
    }

    return (
        <div className="page-layout">
            {/* ── Left: campaign list ─────────────────────────────────── */}
            <div className="form-list">
                <div className="form-list-header">
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', fontFamily: "'Satoshi', sans-serif" }}>
                        Landing Pages{!loading && <span style={{ fontWeight: 400, color: 'var(--muted)' }}> · {campaigns.length}</span>}
                    </span>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="icon-btn"
                        title="New landing page"
                        style={{ color: 'var(--accent)' }}
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>
                        <Loader2 size={18} className="animate-spin" />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div style={{ padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                        <Globe size={22} style={{ color: 'var(--muted)', margin: '0 auto 8px', display: 'block' }} />
                        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: '1rem' }}>
                            No landing pages yet
                        </p>
                        <button
                            onClick={() => setShowCreate(true)}
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', padding: '9px', fontSize: 13 }}
                        >
                            <Plus size={14} /> New Landing Page
                        </button>
                    </div>
                ) : campaigns.map(c => (
                    <button
                        key={c.id}
                        className={`form-list-item${selectedId === c.id ? ' active' : ''}`}
                        onClick={() => setSelectedId(c.id)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, width: '100%' }}>
                            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                                <div style={{ fontWeight: 600, fontSize: 14, color: selectedId === c.id ? 'var(--accent)' : 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {c.name}
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
                                    /c/{c.slug || '…'}
                                </div>
                            </div>
                            <StatusPill published={!!c.published} />
                        </div>
                    </button>
                ))}
            </div>

            {/* ── Right: editor ──────────────────────────────────────── */}
            <div style={{ flex: 1, minWidth: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
                {!selectedId ? (
                    <EmptyState onCreate={() => setShowCreate(true)} />
                ) : selectedLoading || !selected ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Loader2 size={22} className="animate-spin" style={{ color: 'var(--muted)' }} />
                    </div>
                ) : (
                    <>
                        <div style={{
                            padding: '0.875rem 1.5rem',
                            borderBottom: '1px solid var(--border)',
                            background: 'var(--surface)',
                            flexShrink: 0,
                        }}>
                            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{selected.name}</h2>
                        </div>
                        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                            <CampaignLandingTab campaign={selected} onSave={handleSave} />
                        </div>
                    </>
                )}
            </div>

            {/* ── Create modal ───────────────────────────────────────── */}
            <AnimatePresence>
                {showCreate && <CreateLandingPageModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />}
            </AnimatePresence>
        </div>
    )
}

/* ── Pieces ──────────────────────────────────────────────────────────── */

const StatusPill = ({ published }) => (
    <span
        style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 100,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            flexShrink: 0,
            background: published ? '#f0fdf4' : 'var(--bg-subtle)',
            color: published ? '#16a34a' : 'var(--muted)',
            border: `1px solid ${published ? '#86efac' : 'var(--border)'}`,
        }}
    >
        {published ? 'Live' : 'Draft'}
    </span>
)

const EmptyState = ({ onCreate }) => (
    <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        padding: '2rem',
        textAlign: 'center',
    }}>
        <div style={{
            width: 56, height: 56,
            borderRadius: '50%',
            background: 'var(--accent-tint)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Globe size={26} style={{ color: 'var(--accent)' }} />
        </div>
        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--ink)' }}>Build a landing page</h3>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', maxWidth: 340, lineHeight: 1.55 }}>
            Pick a template, customize the copy and brand, hit publish — you'll get a public URL and every submission is tracked automatically.
        </p>
        <button onClick={onCreate} className="btn-primary" style={{ padding: '10px 18px', fontSize: 13, marginTop: 4 }}>
            <Plus size={14} /> New Landing Page
        </button>
    </div>
)

const CreateLandingPageModal = ({ onClose, onCreated }) => {
    const { authFetch } = useAuth()
    const [name, setName] = useState('')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim()) return
        setSaving(true)
        setError('')
        try {
            const res = await authFetch('/api/campaigns', {
                method: 'POST',
                body: JSON.stringify({ name: name.trim() }),
            })
            const data = await res.json()
            if (!data.success) {
                setError(data.message || 'Failed to create.')
                return
            }
            onCreated(data.campaignId)
        } catch {
            setError('Network error.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000, padding: 20,
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: 440,
                    background: 'var(--surface)',
                    borderRadius: 'var(--r-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--ink)' }}>New Landing Page</h3>
                    <button onClick={onClose} className="icon-btn" style={{ color: 'var(--muted)' }}>
                        <X size={16} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: 22 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>Campaign name</span>
                        <input
                            type="text"
                            value={name}
                            autoFocus
                            onChange={e => setName(e.target.value)}
                            placeholder="Summer waitlist"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1.5px solid var(--border)',
                                borderRadius: 'var(--r-sm)',
                                fontSize: 14,
                                fontFamily: 'Satoshi, sans-serif',
                                color: 'var(--ink)',
                                background: 'var(--surface)',
                                outline: 'none',
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                            A public URL like <code style={{ background: 'var(--bg-subtle)', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>/prformnce/c/summer-waitlist-…</code> will be generated.
                        </span>
                    </label>
                    {error && (
                        <div style={{ padding: '8px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', fontSize: 13, marginBottom: 14 }}>
                            {error}
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '9px 16px', fontSize: 13 }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={saving || !name.trim()} className="btn-primary" style={{ padding: '9px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                            {saving && <Loader2 size={14} className="animate-spin" />}
                            Create
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default LandingPagesPage
