import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Printer, ArrowLeft, Loader2, Check, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { TEMPLATE_LIST as WEB_TEMPLATES, getTemplate as getWebTemplate } from '../campaign-templates'
import { STARTER_TEMPLATES as PRINT_TEMPLATES } from '../utils/campaignTemplates'

/* ── Templates page — CREATE entry point ──────────────────────────────────
 * Step 1: pick campaign type (Web / Print)
 * Step 2: pick a template from that type's gallery
 * Step 3: campaign is created and user is navigated into the flow
 * ──────────────────────────────────────────────────────────────────────── */

const TemplatesPage = ({ onNavigate }) => {
    const [type, setType] = useState(null) // null | 'web' | 'print'

    return (
        <div style={{ height: '100%', overflow: 'auto', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 32px 64px' }}>
                <AnimatePresence mode="wait">
                    {!type && <TypePicker key="type" onPick={setType} />}
                    {type === 'web' && <WebGallery key="web" onBack={() => setType(null)} onNavigate={onNavigate} />}
                    {type === 'print' && <PrintGallery key="print" onBack={() => setType(null)} onNavigate={onNavigate} />}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ── Step 1: Web / Print picker ──────────────────────────────────────────── */

const TypePicker = ({ onPick }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
        <Header
            eyebrow="Templates"
            title="Start a new campaign"
            subtitle="Pick a type. You'll choose a template next."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            <TypeCard
                icon={<Globe size={26} />}
                title="Web Campaign"
                description="A landing page with a form. Publish it, share the link, capture leads. Track visits, submissions, and conversion in one dashboard."
                onClick={() => onPick('web')}
                accent="#2563EB"
            />
            <TypeCard
                icon={<Printer size={26} />}
                title="Print Campaign"
                description="Personalized PDFs with unique QR codes, generated from your data. Print, distribute, and see who's scanning."
                onClick={() => onPick('print')}
                accent="#8b5cf6"
            />
        </div>
    </motion.div>
)

const TypeCard = ({ icon, title, description, onClick, accent }) => (
    <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        style={{
            padding: 32,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'border-color 160ms ease, box-shadow 160ms ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = accent
            e.currentTarget.style.boxShadow = `0 8px 24px ${accent}18, 0 2px 6px rgba(0,0,0,0.04)`
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'
        }}
    >
        <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: `${accent}18`, color: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            {icon}
        </div>
        <div>
            <h3 style={{ margin: 0, fontSize: 20, color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>
                {title}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>
                {description}
            </p>
        </div>
    </motion.button>
)

/* ── Step 2 (Web): template gallery ──────────────────────────────────────── */

const WebGallery = ({ onBack, onNavigate }) => {
    const { authFetch } = useAuth()
    const [creating, setCreating] = useState(null) // template id being created
    const [error, setError] = useState('')

    const handlePick = async (templateId) => {
        setCreating(templateId)
        setError('')
        try {
            const template = getWebTemplate(templateId)
            const defaultName = `${template.name} campaign`
            const res = await authFetch('/api/campaigns', {
                method: 'POST',
                body: JSON.stringify({
                    name: defaultName,
                    campaign_type: 'web',
                    landing_page_template: templateId,
                    landing_page_config: template.defaultConfig,
                }),
            })
            const data = await res.json()
            if (!data.success) {
                setError(data.message || 'Failed to create campaign.')
                setCreating(null)
                return
            }
            onNavigate('campaigns', { openCampaignId: data.campaignId, mode: 'landing' })
        } catch {
            setError('Network error.')
            setCreating(null)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <BackButton onClick={onBack} />
            <Header
                eyebrow="Web Campaign"
                title="Pick a landing page template"
                subtitle="Every template is fully customizable — add or remove sections, edit copy, set your brand color."
            />

            {error && <ErrorBanner message={error} />}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {WEB_TEMPLATES.map(tpl => (
                    <TemplateCard
                        key={tpl.id}
                        template={tpl}
                        creating={creating === tpl.id}
                        onPick={() => handlePick(tpl.id)}
                        thumb={<WebThumb id={tpl.id} />}
                    />
                ))}
            </div>
        </motion.div>
    )
}

/* ── Step 2 (Print): template gallery ────────────────────────────────────── */

const PrintGallery = ({ onBack, onNavigate }) => {
    const { authFetch } = useAuth()
    const [creating, setCreating] = useState(null)
    const [error, setError] = useState('')

    const handlePick = async (template) => {
        setCreating(template.id)
        setError('')
        try {
            const res = await authFetch('/api/campaigns', {
                method: 'POST',
                body: JSON.stringify({
                    name: template.name,
                    campaign_type: 'print',
                }),
            })
            const data = await res.json()
            if (!data.success) {
                setError(data.message || 'Failed to create campaign.')
                setCreating(null)
                return
            }
            // For Print, we still need to save the pdfme template_json — do it as a follow-up PUT
            if (template.template_json) {
                await authFetch(`/api/campaigns/${data.campaignId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ template_json: JSON.stringify(template.template_json) }),
                })
            }
            onNavigate('campaigns', { openCampaignId: data.campaignId, mode: 'edit' })
        } catch {
            setError('Network error.')
            setCreating(null)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <BackButton onClick={onBack} />
            <Header
                eyebrow="Print Campaign"
                title="Pick a print template"
                subtitle="Personalize each row from your CSV. Every PDF gets its own trackable QR code."
            />

            {error && <ErrorBanner message={error} />}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {PRINT_TEMPLATES.map(tpl => (
                    <TemplateCard
                        key={tpl.id}
                        template={{ id: tpl.id, name: tpl.name, description: tpl.description || 'Print + QR' }}
                        creating={creating === tpl.id}
                        onPick={() => handlePick(tpl)}
                        thumb={<PrintThumb />}
                    />
                ))}
                {/* Blank starter */}
                <TemplateCard
                    template={{ id: 'blank', name: 'Blank canvas', description: 'Start from scratch with an empty PDF designer.' }}
                    creating={creating === 'blank'}
                    onPick={() => handlePick({ id: 'blank', name: 'Blank Campaign' })}
                    thumb={<PrintThumb blank />}
                />
            </div>
        </motion.div>
    )
}

/* ── Shared pieces ────────────────────────────────────────────────────── */

const Header = ({ eyebrow, title, subtitle }) => (
    <div style={{ marginBottom: 40 }}>
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 100,
            background: 'var(--accent-tint)', color: 'var(--accent)',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            marginBottom: 14,
        }}>
            <Sparkles size={11} /> {eyebrow}
        </div>
        <h1 style={{
            margin: 0, marginBottom: 8,
            fontFamily: 'Satoshi, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink)',
        }}>
            {title}
        </h1>
        <p style={{
            margin: 0,
            fontSize: 15, color: 'var(--muted)', lineHeight: 1.55,
            maxWidth: 640,
        }}>
            {subtitle}
        </p>
    </div>
)

const BackButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="btn-ghost"
        style={{
            marginBottom: 20, padding: '6px 12px', fontSize: 13,
            display: 'inline-flex', alignItems: 'center', gap: 6,
        }}
    >
        <ArrowLeft size={13} /> Back
    </button>
)

const ErrorBanner = ({ message }) => (
    <div style={{
        padding: '10px 14px', marginBottom: 20,
        background: '#fef2f2', border: '1px solid #fecaca',
        borderRadius: 8, color: '#dc2626', fontSize: 13,
    }}>
        {message}
    </div>
)

const TemplateCard = ({ template, creating, onPick, thumb }) => (
    <motion.button
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        onClick={onPick}
        disabled={creating}
        style={{
            padding: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            textAlign: 'left',
            cursor: creating ? 'wait' : 'pointer',
            overflow: 'hidden',
            transition: 'border-color 160ms ease, box-shadow 160ms ease',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        }}
        onMouseEnter={(e) => {
            if (!creating) {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.10), 0 2px 6px rgba(0,0,0,0.04)'
            }
        }}
        onMouseLeave={(e) => {
            if (!creating) {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
            }
        }}
    >
        {creating && (
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'rgba(255,255,255,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(2px)',
            }}>
                <Loader2 size={20} className="animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        )}
        {thumb}
        <div style={{ padding: 18 }}>
            <h3 style={{ margin: 0, marginBottom: 4, fontSize: 15, color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.015em' }}>
                {template.name}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                {template.description}
            </p>
        </div>
    </motion.button>
)

/* ── Thumbnails ───────────────────────────────────────────────────────── */

const WebThumb = ({ id }) => (
    <div style={{
        aspectRatio: '4 / 2.6',
        background: '#F9F9F7',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        padding: 24,
        position: 'relative',
    }}>
        <div>
            <div style={{ width: 46, height: 10, borderRadius: 5, background: 'rgba(37,99,235,0.25)', marginBottom: 12 }} />
            <div style={{ width: '95%', height: 16, borderRadius: 4, background: '#0D0D0D', marginBottom: 7 }} />
            <div style={{ width: '75%', height: 16, borderRadius: 4, background: '#0D0D0D', marginBottom: 14 }} />
            <div style={{ width: '100%', height: 6, borderRadius: 3, background: '#D1D5DB', marginBottom: 4 }} />
            <div style={{ width: '85%', height: 6, borderRadius: 3, background: '#D1D5DB' }} />
        </div>
        <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 12,
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column', gap: 7,
        }}>
            <div style={{ height: 9, borderRadius: 3, background: '#E5E4E0' }} />
            <div style={{ height: 9, borderRadius: 3, background: '#E5E4E0' }} />
            <div style={{ height: 14, borderRadius: 3, background: '#2563EB', marginTop: 4 }} />
        </div>
    </div>
)

const PrintThumb = ({ blank }) => (
    <div style={{
        aspectRatio: '4 / 2.6',
        background: blank ? 'var(--bg-subtle)' : '#F9F9F7',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
    }}>
        {blank ? (
            <div style={{ color: 'var(--muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={14} /> Empty PDF
            </div>
        ) : (
            <div style={{
                width: '70%', aspectRatio: '3 / 4',
                background: '#fff',
                borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: 12,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
                <div>
                    <div style={{ width: '80%', height: 6, borderRadius: 3, background: '#0D0D0D', marginBottom: 4 }} />
                    <div style={{ width: '60%', height: 6, borderRadius: 3, background: '#0D0D0D' }} />
                </div>
                <div style={{
                    alignSelf: 'flex-end',
                    width: 24, height: 24,
                    background: '#0D0D0D',
                    borderRadius: 2,
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute', inset: 3,
                        background: '#fff',
                        borderRadius: 1,
                    }} />
                </div>
            </div>
        )}
    </div>
)

export default TemplatesPage
