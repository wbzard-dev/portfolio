import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Check, Copy, ExternalLink, Save, Eye, Globe, Loader2, Palette,
    ChevronDown, ChevronUp, Trash2, ArrowUp, ArrowDown, Plus, X,
    User, Mail, Phone, Building2, MessageSquare,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getTemplate } from '../campaign-templates'
import { SECTION_LIST, getSectionDef, createSection } from '../campaign-templates/sections'
import { DEFAULT_BRAND_COLOR } from '../campaign-templates/shared'

/* ── Fixed catalog of form fields (used inside Form section editor) ─────── */
const FIELD_CATALOG = [
    { name: 'name',    label: 'Full name', type: 'text',     icon: User,          placeholder: 'Your name' },
    { name: 'email',   label: 'Email',     type: 'email',    icon: Mail,          placeholder: 'you@example.com' },
    { name: 'phone',   label: 'Phone',     type: 'tel',      icon: Phone,         placeholder: '+91 98xxx xxxxx' },
    { name: 'company', label: 'Company',   type: 'text',     icon: Building2,     placeholder: 'Company name' },
    { name: 'message', label: 'Message',   type: 'textarea', icon: MessageSquare, placeholder: 'Anything else?' },
]

/* ── Root ────────────────────────────────────────────────────────────────── */

const CampaignLandingTab = ({ campaign, onSave }) => {
    const { authFetch } = useAuth()
    const templateId = campaign.landing_page_template || 'focus'

    const [config, setConfig] = useState(() => {
        if (campaign.landing_page_config) {
            try {
                const parsed = JSON.parse(campaign.landing_page_config)
                // Migration: if old-shape config (no `sections`), fall back to template defaults
                if (!Array.isArray(parsed?.sections)) {
                    return { ...getTemplate(templateId).defaultConfig }
                }
                return parsed
            } catch { /* fall through */ }
        }
        return { ...getTemplate(templateId).defaultConfig }
    })
    const [published, setPublished] = useState(!!campaign.published)
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState('')
    const [savedAt, setSavedAt] = useState(null)
    const [copied, setCopied] = useState(false)
    const [showAdd, setShowAdd] = useState(false)

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

    /* ── Section operations ────────────────────────────────────────────── */
    const sections = config.sections || []

    const updateSectionConfig = useCallback((sectionId, key, value) => {
        setConfig(prev => ({
            ...prev,
            sections: prev.sections.map(s =>
                s.id === sectionId ? { ...s, config: { ...s.config, [key]: value } } : s
            ),
        }))
    }, [])

    const moveSection = (sectionId, dir) => {
        setConfig(prev => {
            const idx = prev.sections.findIndex(s => s.id === sectionId)
            if (idx < 0) return prev
            const target = idx + dir
            if (target < 0 || target >= prev.sections.length) return prev
            const next = [...prev.sections]
            ;[next[idx], next[target]] = [next[target], next[idx]]
            return { ...prev, sections: next }
        })
    }

    const removeSection = (sectionId) => {
        if (!confirm('Remove this section?')) return
        setConfig(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== sectionId) }))
    }

    const addSection = (type) => {
        const s = createSection(type)
        if (!s) return
        setConfig(prev => ({ ...prev, sections: [...prev.sections, s] }))
        setShowAdd(false)
    }

    /* Section types not yet used (singletons filtered) */
    const availableToAdd = SECTION_LIST.filter(def => {
        if (!def.singleton) return true
        return !sections.some(s => s.type === def.type)
    })

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
        <div style={{ height: '100%', overflow: 'auto', padding: '24px 32px 32px', background: 'var(--bg)' }}>
            {/* Publish banner */}
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
                        flex: 1, padding: '8px 12px', borderRadius: 6,
                        background: 'var(--bg-subtle)', fontSize: 12, color: 'var(--text)',
                        fontFamily: 'ui-monospace, monospace',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
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
                        padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                        border: published ? '1px solid #fecaca' : 'none',
                        cursor: saving ? 'wait' : 'pointer',
                        background: published ? '#fff' : 'var(--accent)',
                        color: published ? '#dc2626' : '#fff',
                    }}
                >
                    {published ? 'Unpublish' : 'Publish'}
                </button>
            </div>

            {/* Brand color */}
            <Section title="Brand" description="One color drives buttons, accents, and highlights across the whole page.">
                <ColorInput
                    label="Brand color"
                    value={config.brand_color || DEFAULT_BRAND_COLOR}
                    onChange={v => setConfig(prev => ({ ...prev, brand_color: v }))}
                />
            </Section>

            {/* Sections */}
            <Section
                title="Sections"
                description="Drag order with the arrows. Add or remove sections. Each section's content is editable — layout and colors follow the template."
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {sections.map((section, i) => (
                        <SectionCard
                            key={section.id}
                            section={section}
                            isFirst={i === 0}
                            isLast={i === sections.length - 1}
                            brandColor={config.brand_color || DEFAULT_BRAND_COLOR}
                            onConfigChange={(key, value) => updateSectionConfig(section.id, key, value)}
                            onMoveUp={() => moveSection(section.id, -1)}
                            onMoveDown={() => moveSection(section.id, 1)}
                            onRemove={() => removeSection(section.id)}
                        />
                    ))}

                    {availableToAdd.length > 0 && (
                        <button
                            onClick={() => setShowAdd(true)}
                            style={{
                                padding: '14px 18px',
                                background: 'var(--surface)',
                                border: '2px dashed var(--border)',
                                borderRadius: 'var(--r-md)',
                                fontSize: 14,
                                color: 'var(--muted)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                transition: 'border-color 120ms ease, color 120ms ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
                        >
                            <Plus size={14} /> Add section
                        </button>
                    )}
                </div>
            </Section>

            {/* Sticky save bar */}
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

            {/* Add section modal */}
            <AnimatePresence>
                {showAdd && (
                    <AddSectionModal
                        available={availableToAdd}
                        onPick={addSection}
                        onClose={() => setShowAdd(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

/* ── Per-section editor card ──────────────────────────────────────────── */

const SectionCard = ({ section, isFirst, isLast, brandColor, onConfigChange, onMoveUp, onMoveDown, onRemove }) => {
    const def = getSectionDef(section.type)
    const [expanded, setExpanded] = useState(true)
    if (!def) return null
    const Icon = def.icon

    return (
        <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            background: 'var(--surface)',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px',
                borderBottom: expanded ? '1px solid var(--border-2)' : 'none',
                background: 'var(--surface)',
            }}>
                <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: 'var(--accent-tint)', color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Icon size={14} />
                </div>
                <button
                    onClick={() => setExpanded(v => !v)}
                    style={{
                        background: 'none', border: 'none', padding: 0,
                        cursor: 'pointer', flex: 1,
                        textAlign: 'left', minWidth: 0,
                    }}
                >
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{def.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {def.description}
                    </div>
                </button>
                <button onClick={onMoveUp} disabled={isFirst} className="icon-btn" title="Move up" style={{ opacity: isFirst ? 0.35 : 1, cursor: isFirst ? 'default' : 'pointer' }}>
                    <ArrowUp size={14} />
                </button>
                <button onClick={onMoveDown} disabled={isLast} className="icon-btn" title="Move down" style={{ opacity: isLast ? 0.35 : 1, cursor: isLast ? 'default' : 'pointer' }}>
                    <ArrowDown size={14} />
                </button>
                <button onClick={onRemove} className="icon-btn" title="Remove section" style={{ color: '#dc2626' }}>
                    <Trash2 size={14} />
                </button>
                <button onClick={() => setExpanded(v => !v)} className="icon-btn" title={expanded ? 'Collapse' : 'Expand'}>
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            {expanded && (
                <div style={{ padding: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {def.fields.map(f => (
                            <Input
                                key={f.key}
                                label={f.label}
                                value={section.config?.[f.key] || ''}
                                onChange={v => onConfigChange(f.key, v)}
                                placeholder={f.placeholder}
                                multiline={f.type === 'textarea'}
                            />
                        ))}
                        {section.type === 'form' && (
                            <FormFieldsEditor
                                fields={section.config?.form_fields || []}
                                onChange={next => onConfigChange('form_fields', next)}
                            />
                        )}
                        {section.type === 'features' && (
                            <FeaturesEditor
                                features={section.config?.features || []}
                                onChange={next => onConfigChange('features', next)}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

/* ── Form fields editor (existing catalog toggler, adapted) ─────────────── */

const FormFieldsEditor = ({ fields, onChange }) => {
    const activeNames = new Set(fields.map(f => f.name))

    const toggleField = (cf) => {
        const exists = activeNames.has(cf.name)
        onChange(exists
            ? fields.filter(f => f.name !== cf.name)
            : [...fields, { name: cf.name, label: cf.label, type: cf.type, required: true, placeholder: cf.placeholder }]
        )
    }

    const setRequired = (name, required) => {
        onChange(fields.map(f => f.name === name ? { ...f, required } : f))
    }

    return (
        <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>
                Form fields
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
                {FIELD_CATALOG.map(cf => {
                    const isActive = activeNames.has(cf.name)
                    const current = fields.find(f => f.name === cf.name)
                    const Icon = cf.icon
                    return (
                        <div
                            key={cf.name}
                            style={{
                                padding: 10,
                                background: isActive ? 'var(--surface)' : 'var(--bg-subtle)',
                                border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                                borderRadius: 8,
                            }}
                        >
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={() => toggleField(cf)}
                                    style={{ width: 15, height: 15, accentColor: '#2563EB' }}
                                />
                                <Icon size={14} style={{ color: 'var(--muted)' }} />
                                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{cf.label}</span>
                            </label>
                            {isActive && (
                                <label style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, marginLeft: 24, fontSize: 11, color: 'var(--muted)', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={current?.required !== false}
                                        onChange={e => setRequired(cf.name, e.target.checked)}
                                        style={{ width: 12, height: 12, accentColor: '#2563EB' }}
                                    />
                                    Required
                                </label>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/* ── Features array editor (repeater) ───────────────────────────────────── */

const FEATURE_ICONS = ['Check', 'Zap', 'Star', 'Shield', 'Sparkles', 'TrendingUp', 'Users', 'Rocket']

const FeaturesEditor = ({ features, onChange }) => {
    const setFeature = (i, key, value) => {
        onChange(features.map((f, idx) => idx === i ? { ...f, [key]: value } : f))
    }
    const remove = (i) => onChange(features.filter((_, idx) => idx !== i))
    const add = () => onChange([...features, { icon: 'Check', title: 'New feature', description: '' }])

    return (
        <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 8 }}>
                Feature cards
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {features.map((feat, i) => (
                    <div key={i} style={{ padding: 12, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 8, position: 'relative' }}>
                        <button
                            onClick={() => remove(i)}
                            className="icon-btn"
                            style={{ position: 'absolute', top: 6, right: 6, color: '#dc2626' }}
                            title="Remove"
                        >
                            <X size={13} />
                        </button>
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, marginBottom: 8 }}>
                            <select
                                value={feat.icon}
                                onChange={e => setFeature(i, 'icon', e.target.value)}
                                style={{
                                    padding: '7px 8px', fontSize: 12,
                                    border: '1px solid var(--border)', borderRadius: 6,
                                    background: 'var(--surface)',
                                }}
                            >
                                {FEATURE_ICONS.map(name => <option key={name} value={name}>{name}</option>)}
                            </select>
                            <input
                                type="text"
                                value={feat.title || ''}
                                onChange={e => setFeature(i, 'title', e.target.value)}
                                placeholder="Feature title"
                                style={{
                                    padding: '7px 10px', fontSize: 13,
                                    border: '1px solid var(--border)', borderRadius: 6,
                                    background: 'var(--surface)',
                                }}
                            />
                        </div>
                        <textarea
                            value={feat.description || ''}
                            onChange={e => setFeature(i, 'description', e.target.value)}
                            placeholder="Short description"
                            rows={2}
                            style={{
                                width: '100%',
                                padding: '7px 10px', fontSize: 13,
                                border: '1px solid var(--border)', borderRadius: 6,
                                background: 'var(--surface)',
                                fontFamily: 'Satoshi, sans-serif',
                                resize: 'vertical',
                            }}
                        />
                    </div>
                ))}
                <button
                    onClick={add}
                    className="btn-ghost"
                    style={{ padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                >
                    <Plus size={12} /> Add feature
                </button>
            </div>
        </div>
    )
}

/* ── Add section modal ──────────────────────────────────────────────────── */

const AddSectionModal = ({ available, onPick, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: 20,
        }}
        onClick={onClose}
    >
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            onClick={e => e.stopPropagation()}
            style={{
                width: '100%', maxWidth: 560,
                background: 'var(--surface)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--ink)' }}>Add a section</h3>
                <button onClick={onClose} className="icon-btn"><X size={16} /></button>
            </div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {available.map(def => {
                    const Icon = def.icon
                    return (
                        <button
                            key={def.type}
                            onClick={() => onPick(def.type)}
                            style={{
                                padding: 16, background: 'var(--surface)',
                                border: '1.5px solid var(--border)', borderRadius: 10,
                                textAlign: 'left', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', gap: 8,
                                transition: 'border-color 120ms ease, background 120ms ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-tint)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}
                        >
                            <div style={{
                                width: 28, height: 28, borderRadius: 6,
                                background: 'var(--accent-tint)', color: 'var(--accent)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Icon size={14} />
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{def.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{def.description}</div>
                        </button>
                    )
                })}
                {available.length === 0 && (
                    <div style={{ gridColumn: 'span 2', padding: 20, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                        Every section type is already used. Remove one first if you'd like to swap.
                    </div>
                )}
            </div>
        </motion.div>
    </motion.div>
)

/* ── Small building blocks ────────────────────────────────────────────── */

const Section = ({ title, description, children }) => (
    <div style={{ marginBottom: 28 }}>
        <div style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{title}</h3>
            {description && <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{description}</p>}
        </div>
        {children}
    </div>
)

const Input = ({ label, value, onChange, placeholder, multiline }) => {
    const style = {
        width: '100%',
        padding: '9px 12px',
        border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-sm)',
        fontSize: 14,
        fontFamily: 'Satoshi, sans-serif',
        color: 'var(--ink)',
        background: 'var(--surface)',
        outline: 'none',
    }
    return (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>{label}</span>
            {multiline ? (
                <textarea
                    value={value} onChange={e => onChange(e.target.value)}
                    placeholder={placeholder} rows={2}
                    style={{ ...style, resize: 'vertical', minHeight: 54 }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
            ) : (
                <input
                    type="text" value={value} onChange={e => onChange(e.target.value)}
                    placeholder={placeholder} style={style}
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
        <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', maxWidth: 320 }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 8px',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                background: 'var(--surface)',
            }}>
                <input
                    type="color" value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }}
                />
                <Palette size={14} style={{ color: 'var(--muted)' }} />
            </div>
            <input
                type="text" value={value} onChange={e => onChange(e.target.value)}
                placeholder="#2563EB"
                style={{
                    flex: 1, padding: '10px 12px',
                    border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)',
                    fontSize: 14, fontFamily: 'ui-monospace, monospace',
                    color: 'var(--ink)', background: 'var(--surface)',
                    outline: 'none', textTransform: 'uppercase',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
        </div>
    </label>
)

export default CampaignLandingTab
