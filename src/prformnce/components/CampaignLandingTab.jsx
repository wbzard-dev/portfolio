import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
    Check, Copy, ExternalLink, Save, Eye, Globe, Loader2,
    Palette, User, Mail, Phone, Building2, MessageSquare,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { TEMPLATE_LIST, getTemplate } from '../campaign-templates'
import { DEFAULT_BRAND_COLOR } from '../campaign-templates/shared'

/* ── Fixed catalog of togglable form fields ──────────────────────────────── */
const FIELD_CATALOG = [
    { name: 'name',    label: 'Full name', type: 'text',     icon: User,          placeholder: 'Your name' },
    { name: 'email',   label: 'Email',     type: 'email',    icon: Mail,          placeholder: 'you@example.com' },
    { name: 'phone',   label: 'Phone',     type: 'tel',      icon: Phone,         placeholder: '+91 98xxx xxxxx' },
    { name: 'company', label: 'Company',   type: 'text',     icon: Building2,     placeholder: 'Company name' },
    { name: 'message', label: 'Message',   type: 'textarea', icon: MessageSquare, placeholder: 'Anything else?' },
]

const CampaignLandingTab = ({ campaign, onSave }) => {
    const { authFetch } = useAuth()

    /* ── State: which template + editable config draft ─────────────────── */
    const [templateId, setTemplateId] = useState(campaign.landing_page_template || 'focus')
    const [config, setConfig] = useState(() => {
        if (campaign.landing_page_config) {
            try { return JSON.parse(campaign.landing_page_config) } catch { /* fall through */ }
        }
        return { ...getTemplate('focus').defaultConfig }
    })
    const [published, setPublished] = useState(!!campaign.published)
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState('')
    const [savedAt, setSavedAt] = useState(null)
    const [copied, setCopied] = useState(false)

    /* When user picks a new template, backfill any missing config keys from
       that template's defaults — preserves what the user already typed. */
    const switchTemplate = (newId) => {
        setTemplateId(newId)
        const defaults = getTemplate(newId).defaultConfig
        setConfig(prev => ({ ...defaults, ...prev, brand_color: prev.brand_color || defaults.brand_color }))
    }

    const setField = useCallback((path, value) => {
        setConfig(prev => {
            if (path.includes('.')) {
                const [parent, key] = path.split('.')
                return { ...prev, [parent]: { ...(prev[parent] || {}), [key]: value } }
            }
            return { ...prev, [path]: value }
        })
    }, [])

    /* ── Form fields — synced against the fixed catalog ────────────────── */
    const activeFieldNames = new Set((config.form_fields || []).map(f => f.name))

    const toggleField = (catalogField) => {
        const current = config.form_fields || []
        const exists = current.find(f => f.name === catalogField.name)
        const next = exists
            ? current.filter(f => f.name !== catalogField.name)
            : [...current, {
                name: catalogField.name,
                label: catalogField.label,
                type: catalogField.type,
                required: true,
                placeholder: catalogField.placeholder,
            }]
        setField('form_fields', next)
    }

    const setFieldRequired = (name, required) => {
        setField('form_fields', (config.form_fields || []).map(f => f.name === name ? { ...f, required } : f))
    }

    /* ── Public URL + copy ─────────────────────────────────────────────── */
    const publicUrl = useMemo(() => {
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        return `${origin}/prformnce/c/${campaign.slug || ''}`
    }, [campaign.slug])

    const copyUrl = () => {
        navigator.clipboard.writeText(publicUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
    }

    /* ── Save ──────────────────────────────────────────────────────────── */
    const handleSave = async (opts = {}) => {
        setSaving(true)
        setSaveError('')
        try {
            const body = {
                landing_page_template: templateId,
                landing_page_config: config,
            }
            if (opts.publish !== undefined) body.published = opts.publish ? 1 : 0

            const res = await authFetch(`/api/campaigns/${campaign.id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
            })
            const data = await res.json()
            if (!data.success) {
                setSaveError(data.message || 'Failed to save.')
                return
            }
            if (opts.publish !== undefined) setPublished(!!opts.publish)
            setSavedAt(Date.now())
            onSave?.({
                ...campaign,
                landing_page_template: templateId,
                landing_page_config: JSON.stringify(config),
                published: opts.publish !== undefined ? (opts.publish ? 1 : 0) : campaign.published,
            })
        } catch {
            setSaveError('Network error while saving.')
        } finally {
            setSaving(false)
        }
    }

    const togglePublish = () => handleSave({ publish: !published })

    /* ── Render ────────────────────────────────────────────────────────── */
    return (
        <div style={{ height: '100%', overflow: 'auto', padding: '24px 32px', background: 'var(--bg)' }}>
            {/* Top banner: publish state + public URL */}
            <div style={{
                display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap',
                padding: '14px 18px', marginBottom: 24, borderRadius: 'var(--r-md)',
                background: published ? '#f0fdf4' : 'var(--surface)',
                border: `1px solid ${published ? '#86efac' : 'var(--border)'}`,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Globe size={16} style={{ color: published ? '#16a34a' : 'var(--muted)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: published ? '#166534' : 'var(--ink)' }}>
                        {published ? 'Live' : 'Draft'}
                    </span>
                </div>
                <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <code style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 6,
                        background: 'var(--bg-subtle)',
                        fontSize: 12,
                        color: 'var(--text)',
                        fontFamily: 'ui-monospace, monospace',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>{publicUrl}</code>
                    <button onClick={copyUrl} className="btn-ghost" style={{ padding: '6px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                    {published && (
                        <a href={publicUrl} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '6px 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                            <ExternalLink size={13} /> Open
                        </a>
                    )}
                </div>
                <button
                    onClick={togglePublish}
                    disabled={saving}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                        border: 'none',
                        cursor: saving ? 'wait' : 'pointer',
                        background: published ? '#fff' : 'var(--accent)',
                        color: published ? '#dc2626' : '#fff',
                        borderStyle: published ? 'solid' : 'none',
                        borderWidth: published ? 1 : 0,
                        borderColor: '#fecaca',
                    }}
                >
                    {published ? 'Unpublish' : 'Publish'}
                </button>
            </div>

            {/* Template picker */}
            <Section title="Template" description="Pick a design. You can change it anytime.">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                    {TEMPLATE_LIST.map(tpl => {
                        const selected = templateId === tpl.id
                        return (
                            <button
                                key={tpl.id}
                                onClick={() => switchTemplate(tpl.id)}
                                style={{
                                    textAlign: 'left',
                                    padding: 16,
                                    background: 'var(--surface)',
                                    border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                                    borderRadius: 'var(--r-md)',
                                    cursor: 'pointer',
                                    transition: 'border-color 120ms ease, box-shadow 120ms ease',
                                    boxShadow: selected ? '0 0 0 3px rgba(37,99,235,0.10)' : 'none',
                                    position: 'relative',
                                }}
                            >
                                <TemplateThumb id={tpl.id} brandColor={config.brand_color} />
                                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{tpl.name}</div>
                                    {selected && (
                                        <span style={{
                                            width: 20, height: 20, borderRadius: '50%',
                                            background: 'var(--accent)', color: '#fff',
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Check size={12} />
                                        </span>
                                    )}
                                </div>
                                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>
                                    {tpl.description}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </Section>

            {/* Two-column config */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 24 }}>
                <Section title="Content" description="What visitors see on the page.">
                    <Input label="Eyebrow (small label above headline)" value={config.eyebrow || ''} onChange={v => setField('eyebrow', v)} placeholder="Limited access" />
                    <Input label="Headline" value={config.headline || ''} onChange={v => setField('headline', v)} placeholder="Something worth waiting for." />
                    <Input label="Subhead" value={config.subhead || ''} onChange={v => setField('subhead', v)} placeholder="One short sentence explaining what this is." multiline />
                    <Input label="CTA button text" value={config.cta_text || ''} onChange={v => setField('cta_text', v)} placeholder="Notify me" />
                    <Input label="Success message" value={config.success_message || ''} onChange={v => setField('success_message', v)} placeholder="You're on the list — check your inbox." multiline />
                </Section>

                <Section title="Brand & contact" description="Colors, image, contact points.">
                    <ColorInput label="Brand color" value={config.brand_color || DEFAULT_BRAND_COLOR} onChange={v => setField('brand_color', v)} />
                    <Input label="Image URL (optional)" value={config.image_url || ''} onChange={v => setField('image_url', v)} placeholder="https://…" />
                    <Input label="Contact email (footer)" value={config.contact?.email || ''} onChange={v => setField('contact.email', v)} placeholder="hello@example.com" />
                    <Input label="Contact phone (footer)" value={config.contact?.phone || ''} onChange={v => setField('contact.phone', v)} placeholder="+91 98xxx xxxxx" />
                </Section>
            </div>

            {/* Form fields */}
            <Section title="Form fields" description="Choose what visitors need to fill out. Required by default.">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                    {FIELD_CATALOG.map(cf => {
                        const isActive = activeFieldNames.has(cf.name)
                        const current = (config.form_fields || []).find(f => f.name === cf.name)
                        const Icon = cf.icon
                        return (
                            <div
                                key={cf.name}
                                style={{
                                    padding: 14,
                                    background: isActive ? 'var(--surface)' : 'var(--bg-subtle)',
                                    border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                                    borderRadius: 'var(--r-md)',
                                    transition: 'border-color 120ms ease',
                                }}
                            >
                                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={() => toggleField(cf)}
                                        style={{ width: 16, height: 16, accentColor: '#2563EB' }}
                                    />
                                    <Icon size={16} style={{ color: 'var(--muted)' }} />
                                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{cf.label}</span>
                                </label>
                                {isActive && (
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, marginLeft: 26, fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={current?.required !== false}
                                            onChange={e => setFieldRequired(cf.name, e.target.checked)}
                                            style={{ width: 13, height: 13, accentColor: '#2563EB' }}
                                        />
                                        Required
                                    </label>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Section>

            {/* Save bar */}
            <div style={{
                position: 'sticky', bottom: 0, marginTop: 32,
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 18px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                boxShadow: 'var(--shadow-md)',
            }}>
                {saveError && <span style={{ color: '#dc2626', fontSize: 13 }}>{saveError}</span>}
                {savedAt && !saveError && (
                    <span style={{ color: '#16a34a', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <Check size={14} /> Saved
                    </span>
                )}
                <div style={{ flex: 1 }} />
                <a
                    href={publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{
                        padding: '9px 14px', fontSize: 13,
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        opacity: published ? 1 : 0.5,
                        pointerEvents: published ? 'auto' : 'none',
                    }}
                    title={published ? 'Preview live page' : 'Publish first to preview'}
                >
                    <Eye size={14} /> Preview
                </a>
                <button
                    onClick={() => handleSave()}
                    disabled={saving}
                    className="btn-primary"
                    style={{ padding: '9px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save changes
                </button>
            </div>
        </div>
    )
}

/* ── Small building blocks ───────────────────────────────────────────────── */

const Section = ({ title, description, children }) => (
    <div style={{ marginBottom: 32 }}>
        <div style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{title}</h3>
            {description && <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>{description}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
)

const Input = ({ label, value, onChange, placeholder, multiline }) => {
    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-sm)',
        fontSize: 14,
        fontFamily: 'Satoshi, sans-serif',
        color: 'var(--ink)',
        background: 'var(--surface)',
        outline: 'none',
    }
    return (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>{label}</span>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
            )}
        </label>
    )
}

const ColorInput = ({ label, value, onChange }) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>{label}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 8px',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                background: 'var(--surface)',
            }}>
                <input
                    type="color"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
                />
                <Palette size={14} style={{ color: 'var(--muted)' }} />
            </div>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="#2563EB"
                style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: 14,
                    fontFamily: 'ui-monospace, monospace',
                    color: 'var(--ink)',
                    background: 'var(--surface)',
                    outline: 'none',
                    textTransform: 'uppercase',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
        </div>
    </label>
)

/* ── Tiny in-card visual thumbnail — schematic, not a real render ───────── */
const TemplateThumb = ({ id, brandColor }) => {
    const color = brandColor || DEFAULT_BRAND_COLOR
    // Focus thumbnail: two-column (text left, form right)
    if (id === 'focus') {
        return (
            <div style={{
                width: '100%', aspectRatio: '16 / 10',
                background: '#F9F9F7',
                borderRadius: 8,
                border: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                padding: 14,
                overflow: 'hidden',
                position: 'relative',
            }}>
                <div>
                    <div style={{ width: 40, height: 8, borderRadius: 4, background: color, opacity: 0.25, marginBottom: 8 }} />
                    <div style={{ width: '90%', height: 14, borderRadius: 3, background: '#0D0D0D', marginBottom: 6 }} />
                    <div style={{ width: '70%', height: 14, borderRadius: 3, background: '#0D0D0D', marginBottom: 12 }} />
                    <div style={{ width: '100%', height: 5, borderRadius: 3, background: '#D1D5DB', marginBottom: 3 }} />
                    <div style={{ width: '85%', height: 5, borderRadius: 3, background: '#D1D5DB' }} />
                </div>
                <div style={{
                    background: '#fff',
                    borderRadius: 6,
                    padding: 8,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                    display: 'flex', flexDirection: 'column', gap: 5,
                }}>
                    <div style={{ height: 8, borderRadius: 3, background: '#E5E4E0' }} />
                    <div style={{ height: 8, borderRadius: 3, background: '#E5E4E0' }} />
                    <div style={{ height: 12, borderRadius: 3, background: color, marginTop: 4 }} />
                </div>
            </div>
        )
    }
    // Fallback placeholder for future templates
    return (
        <div style={{
            width: '100%', aspectRatio: '16 / 10',
            background: 'var(--bg-subtle)',
            borderRadius: 8,
            border: '1px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)', fontSize: 12,
        }}>
            Coming soon
        </div>
    )
}

export default CampaignLandingTab
