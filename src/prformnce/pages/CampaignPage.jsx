import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader2, ArrowLeft } from 'lucide-react'
import { getTemplate } from '../campaign-templates'

/* ── Public Campaign Landing Page ──────────────────────────────────────────
 * Route: /prformnce/c/:slug
 * Fetches published campaign config, resolves template, renders it.
 * Form submissions post to /api/s/:formId (existing public endpoint).
 * ──────────────────────────────────────────────────────────────────────── */

const API = import.meta.env.DEV ? '' : 'https://form.wbzard.com'

const CampaignPage = () => {
    const { slug } = useParams()
    const [state, setState] = useState({ loading: true, campaign: null, error: null })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        let cancelled = false
        setState({ loading: true, campaign: null, error: null })

        fetch(`${API}/api/public/campaigns/${slug}`)
            .then(r => r.json())
            .then(data => {
                if (cancelled) return
                if (data.success) {
                    setState({ loading: false, campaign: data.campaign, error: null })
                    if (data.campaign?.name) document.title = data.campaign.name

                    // Fire-and-forget view beacon — one per session per campaign
                    try {
                        const key = `pfm_view_${slug}`
                        if (!sessionStorage.getItem(key)) {
                            let sid = sessionStorage.getItem('pfm_sid')
                            if (!sid) {
                                sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
                                sessionStorage.setItem('pfm_sid', sid)
                            }
                            sessionStorage.setItem(key, '1')
                            fetch(`${API}/api/public/campaigns/${slug}/view`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ session_id: sid }),
                                keepalive: true,
                            }).catch(() => {})
                        }
                    } catch { /* sessionStorage unavailable */ }
                } else {
                    setState({ loading: false, campaign: null, error: data.message || 'Campaign not found.' })
                }
            })
            .catch(() => {
                if (cancelled) return
                setState({ loading: false, campaign: null, error: 'Failed to load campaign.' })
            })

        return () => { cancelled = true }
    }, [slug])

    const handleSubmit = useCallback(async (formData) => {
        if (!state.campaign?.formId) return { success: false }
        setSubmitting(true)
        try {
            const res = await fetch(`${API}/api/s/${state.campaign.formId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (data.success) setSubmitted(true)
            return data
        } catch {
            return { success: false, message: 'Network error.' }
        } finally {
            setSubmitting(false)
        }
    }, [state.campaign])

    if (state.loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#F9F9F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Loader2 size={32} className="animate-spin" style={{ color: '#6B7280' }} />
            </div>
        )
    }

    if (state.error || !state.campaign) {
        return <NotFoundView error={state.error} />
    }

    const Template = getTemplate(state.campaign.template).component

    return (
        <Template
            config={state.campaign.config}
            campaignName={state.campaign.name}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitted={submitted}
        />
    )
}

const NotFoundView = ({ error }) => (
    <div style={{
        minHeight: '100vh',
        background: '#F9F9F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Satoshi, sans-serif',
    }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <div style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                lineHeight: 1,
                color: '#0D0D0D',
                marginBottom: 16,
            }}>
                404
            </div>
            <h2 style={{
                fontFamily: 'Satoshi, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#0D0D0D',
                margin: 0,
                marginBottom: 12,
                letterSpacing: '-0.02em',
            }}>
                Campaign not found
            </h2>
            <p style={{
                fontSize: 15,
                color: '#6B7280',
                lineHeight: 1.55,
                margin: 0,
                marginBottom: 28,
            }}>
                {error || 'This campaign link is either unpublished or does not exist.'}
            </p>
            <Link
                to="/prformnce"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#2563EB',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: 14,
                }}
            >
                <ArrowLeft size={15} /> Back to Prformnce
            </Link>
        </div>
    </div>
)

export default CampaignPage
