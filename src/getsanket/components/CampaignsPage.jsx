import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
    QrCode, Plus, Loader2, X, Trash2, Download,
    Upload, FileText, CheckCircle2, Users, Save,
    BarChart2, Clock, LayoutTemplate, ChevronRight,
    ArrowLeft, Zap, Activity, ScanLine, FileJson,
    FilePlus, Image as ImageIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { parseCsv } from '../utils/csv'
import { STARTER_TEMPLATES } from '../utils/campaignTemplates'
import UpgradeModal from './UpgradeModal'

// ── pdfme helpers ──────────────────────────────────────────────────────────────

let _plugins = null
const getPlugins = async () => {
    if (_plugins) return _plugins
    const {
        text, multiVariableText, image, svg, barcodes,
        line, rectangle, ellipse, table,
        dateTime, date, time, select, checkbox, radioGroup,
    } = await import('@pdfme/schemas')
    _plugins = {
        Text: text,
        'Multi-Variable Text': multiVariableText,
        Table: table,
        Line: line,
        Rectangle: rectangle,
        Ellipse: ellipse,
        Image: image,
        SVG: svg,
        QR: barcodes.qrcode,
        'EAN-13': barcodes.ean13,
        'Code 128': barcodes.code128,
        DateTime: dateTime,
        Date: date,
        Time: time,
        Select: select,
        Checkbox: checkbox,
        'Radio Group': radioGroup,
    }
    return _plugins
}

const blankTemplate = () => ({
    schemas: [[]],
    basePdf: { width: 210, height: 297, padding: [20, 10, 20, 10] },
})

const findQrField = (template) => {
    for (const page of template.schemas)
        for (const schema of page) {
            const t = (schema.type || '').toLowerCase()
            if (t === 'qrcode' || t === 'qr') return schema.name
        }
    return null
}

// ── Template thumbnail ─────────────────────────────────────────────────────────

const THEME_MAP = {
    Events:        { bg: '#0f172a', accent: '#6366f1', band: '#818cf8' },
    Marketing:     { bg: '#5b21b6', accent: '#e9d5ff', band: '#7c3aed' },
    Education:     { bg: '#064e3b', accent: '#10b981', band: '#6ee7b7' },
    'Real Estate': { bg: '#1e293b', accent: '#c9a84c', band: '#f1c232' },
}

const TemplateThumbnail = ({ template }) => {
    const theme = THEME_MAP[template.category] || { bg: '#1e293b', accent: '#6366f1', band: '#60a5fa' }
    return (
        <div style={{ height: 112, overflow: 'hidden', position: 'relative', background: theme.bg, borderRadius: '7px 7px 0 0' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: theme.accent }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)', fontSize: 34, lineHeight: 1, filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.4))' }}>
                {template.icon}
            </div>
            <div style={{ position: 'absolute', bottom: 14, right: 12, width: 20, height: 20, borderRadius: 3, background: 'rgba(255,255,255,0.88)' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, right: 10, height: 5, borderRadius: 2, background: theme.band, opacity: 0.5 }} />
        </div>
    )
}

// ── Step indicator ─────────────────────────────────────────────────────────────

const WIZARD_STEPS = ['Setup', 'Template', 'Design', 'Generate']

const StepIndicator = ({ current }) => (
    <div className="wizard-steps" style={{ flex: 1 }}>
        {WIZARD_STEPS.map((label, i) => (
            <React.Fragment key={label}>
                <div className={`wizard-step${i === current ? ' active' : i < current ? ' done' : ''}`}>
                    <div className="wizard-step-num">{i < current ? '✓' : i + 1}</div>
                    <span>{label}</span>
                </div>
                {i < WIZARD_STEPS.length - 1 && <div className="wizard-step-connector" />}
            </React.Fragment>
        ))}
    </div>
)

// ── Step 0: Campaign Setup ─────────────────────────────────────────────────────

const SetupStep = ({ onNext }) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    const canProceed = name.trim().length > 0

    return (
        <div style={{ padding: '3rem 2.5rem', maxWidth: 560 }}>
            <h2 style={{ margin: '0 0 6px' }}>New Campaign</h2>
            <p style={{ margin: '0 0 2.5rem', fontSize: 14 }}>
                Name your campaign first — you can design the template and upload recipients in the next steps.
            </p>

            <div className="flex flex-col gap-2" style={{ marginBottom: 20 }}>
                <label className="field-label">
                    Campaign Name <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input
                    autoFocus
                    type="text"
                    className="input-field"
                    placeholder="e.g. TechConf 2025 Badges"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && canProceed && onNext({ name: name.trim(), redirectUrl: url.trim() })}
                />
            </div>

            <div className="flex flex-col gap-2" style={{ marginBottom: 36 }}>
                <label className="field-label">
                    QR Redirect URL <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(optional)</span>
                </label>
                <input
                    type="url"
                    className="input-field"
                    placeholder="https://your-site.com/event"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && canProceed && onNext({ name: name.trim(), redirectUrl: url.trim() })}
                />
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Scanning a QR code on the generated PDF logs the scan and redirects here.
                </span>
            </div>

            <button
                onClick={() => onNext({ name: name.trim(), redirectUrl: url.trim() })}
                disabled={!canProceed}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: 15 }}
            >
                Next: Choose Template <ChevronRight size={15} />
            </button>
        </div>
    )
}

// ── Step 1: Template Gallery ───────────────────────────────────────────────────

const CATEGORIES = ['All', 'Events', 'Marketing', 'Education', 'Real Estate']

const GalleryStep = ({ onBack, onSelect }) => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = activeCategory === 'All'
        ? STARTER_TEMPLATES
        : STARTER_TEMPLATES.filter(t => t.category === activeCategory)

    return (
        <div style={{ padding: '2rem 2.5rem', overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                <button onClick={onBack} className="btn-ghost" style={{ padding: '7px 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ArrowLeft size={14} /> Back
                </button>
                <div>
                    <h2 style={{ margin: '0 0 3px' }}>Choose a Template</h2>
                    <p style={{ margin: 0, fontSize: 14 }}>Pick a starter or begin with a blank canvas. You can customise everything.</p>
                </div>
            </div>

            <div className="cat-pills" style={{ marginBottom: '1.5rem' }}>
                {CATEGORIES.map(cat => (
                    <button key={cat} className={`cat-pill${activeCategory === cat ? ' active' : ''}`} onClick={() => setActiveCategory(cat)}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="tpl-gallery">
                {activeCategory === 'All' && (
                    <div className="tpl-card" onClick={() => onSelect(blankTemplate(), 'Blank Canvas')}>
                        <div style={{ height: 112, background: 'var(--bg-subtle)', borderRadius: '7px 7px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <Plus size={28} style={{ color: 'var(--muted)', marginBottom: 4 }} />
                                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif" }}>Blank</div>
                            </div>
                        </div>
                        <div className="tpl-card-body">
                            <div className="tpl-card-name">Blank Canvas</div>
                            <div className="tpl-card-desc">Start from scratch with a blank A4 page</div>
                            <span className="tpl-card-badge" style={{ background: 'var(--bg-subtle)', color: 'var(--muted)' }}>Custom</span>
                        </div>
                    </div>
                )}
                {filtered.map(tpl => (
                    <div key={tpl.label} className="tpl-card" onClick={() => onSelect(tpl.template, tpl.label)}>
                        <TemplateThumbnail template={tpl} />
                        <div className="tpl-card-body">
                            <div className="tpl-card-name">{tpl.label}</div>
                            <div className="tpl-card-desc">{tpl.description}</div>
                            <span className="tpl-card-badge">{tpl.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Designer toolbar helpers ───────────────────────────────────────────────────

const exportTemplateJson = (designerRef, campaignName) => {
    if (!designerRef.current) return
    const tpl = designerRef.current.getTemplate()
    const blob = new Blob([JSON.stringify(tpl, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(campaignName || 'template').replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
}

const importTemplateJson = (designerRef, e) => {
    const file = e.target.files?.[0]
    if (!file || !designerRef.current) return
    const reader = new FileReader()
    reader.onload = (ev) => {
        try {
            const tpl = JSON.parse(ev.target.result)
            designerRef.current.updateTemplate(tpl)
        } catch {
            alert('Invalid template JSON file.')
        }
    }
    reader.readAsText(file)
    e.target.value = ''
}

const uploadBasePdf = (designerRef, e) => {
    const file = e.target.files?.[0]
    if (!file || !designerRef.current) return
    const reader = new FileReader()
    reader.onload = (ev) => {
        const current = designerRef.current.getTemplate()
        designerRef.current.updateTemplate({ ...current, basePdf: ev.target.result })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
}

const addPage = (designerRef) => {
    if (!designerRef.current) return
    const current = designerRef.current.getTemplate()
    designerRef.current.updateTemplate({ ...current, schemas: [...current.schemas, []] })
}

// ── Designer toolbar (shared between wizard step and existing campaign tab) ────

const DesignerToolbar = ({ designerRef, ready, campaignName, onBack, nextLabel, onNext, showTemplates, setShowTemplates }) => {
    const importJsonRef = useRef(null)
    const importPdfRef = useRef(null)

    return (
        <div style={{
            padding: '8px 14px', borderBottom: '1px solid var(--border)',
            background: 'var(--surface)', flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
            {onBack && (
                <button onClick={onBack} className="btn-ghost" style={{ padding: '6px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <ArrowLeft size={13} /> Back
                </button>
            )}

            <div style={{ flex: 1, minWidth: 0 }} />

            {/* Page controls */}
            <button
                onClick={() => addPage(designerRef)}
                className="btn-ghost"
                title="Add a new page"
                disabled={!ready}
                style={{ padding: '6px 11px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}
            >
                <FilePlus size={13} /> Add Page
            </button>

            {/* Base PDF */}
            <label title="Use a PDF as background (basePdf)" style={{ cursor: 'pointer' }}>
                <input
                    ref={importPdfRef}
                    type="file"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={e => uploadBasePdf(designerRef, e)}
                />
                <span className="btn-ghost" style={{ padding: '6px 11px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5, border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>
                    <ImageIcon size={13} /> Base PDF
                </span>
            </label>

            {/* Starter templates */}
            <button onClick={() => setShowTemplates(true)} className="btn-ghost" style={{ padding: '6px 11px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}>
                <LayoutTemplate size={13} /> Templates
            </button>

            {/* Import JSON */}
            <label title="Load a saved template JSON" style={{ cursor: 'pointer' }}>
                <input
                    ref={importJsonRef}
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={e => importTemplateJson(designerRef, e)}
                />
                <span className="btn-ghost" style={{ padding: '6px 11px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 5, border: '1.5px solid var(--border)', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>
                    <Upload size={13} /> Import
                </span>
            </label>

            {/* Export JSON */}
            <button
                onClick={() => exportTemplateJson(designerRef, campaignName)}
                className="btn-ghost"
                title="Export template as JSON"
                disabled={!ready}
                style={{ padding: '6px 11px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}
            >
                <FileJson size={13} /> Export
            </button>

            {onNext && (
                <button onClick={onNext} disabled={!ready} className="btn-primary" style={{ padding: '7px 16px', fontSize: 13 }}>
                    {nextLabel || 'Next'} <ChevronRight size={14} />
                </button>
            )}
        </div>
    )
}

// ── Step 2: Designer ───────────────────────────────────────────────────────────

const DesignerStep = ({ initialTemplate, campaignName, onBack, onNext }) => {
    const containerRef = useRef(null)
    const designerRef = useRef(null)
    const [ready, setReady] = useState(false)
    const [showTemplates, setShowTemplates] = useState(false)

    useEffect(() => {
        if (!containerRef.current) return
        let destroyed = false
        const mount = async () => {
            const [{ Designer }, { getDefaultFont }] = await Promise.all([
                import('@pdfme/ui'),
                import('@pdfme/common'),
            ])
            const plugins = await getPlugins()
            if (destroyed || !containerRef.current) return
            designerRef.current = new Designer({
                domContainer: containerRef.current,
                template: initialTemplate || blankTemplate(),
                plugins,
                options: { font: getDefaultFont(), lang: 'en' },
            })
            setReady(true)
        }
        mount()
        return () => {
            destroyed = true
            if (designerRef.current) { try { designerRef.current.destroy() } catch {} designerRef.current = null }
        }
    }, []) // eslint-disable-line

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <DesignerToolbar
                designerRef={designerRef}
                ready={ready}
                campaignName={campaignName}
                onBack={onBack}
                nextLabel="Next: Generate"
                onNext={() => ready && onNext(designerRef.current.getTemplate())}
                showTemplates={showTemplates}
                setShowTemplates={setShowTemplates}
            />
            <div style={{ padding: '6px 14px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Tip: Add a <strong>QR</strong> field — it auto-fills with each recipient's unique tracking URL at generate time.
                </span>
            </div>
            <div ref={containerRef} style={{ flex: 1, minHeight: 0, overflow: 'hidden' }} />
            {showTemplates && <StarterTemplateModal onClose={() => setShowTemplates(false)} designerRef={designerRef} />}
        </div>
    )
}

// ── Step 3: Generate (CSV + Generate) ─────────────────────────────────────────

const GenerateStep = ({ template, campaignMeta, onBack, onDone }) => {
    const { authFetch } = useAuth()
    const [csvData, setCsvData] = useState([])
    const [csvFileName, setCsvFileName] = useState('')
    const [phase, setPhase] = useState('idle') // 'idle'|'setup'|'generating'|'done'|'error'
    const [count, setCount] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [pdfUrl, setPdfUrl] = useState(null)
    const [pdfFileName, setPdfFileName] = useState('')
    const [error, setError] = useState('')
    const [showUpgrade, setShowUpgrade] = useState(false)
    const intervalRef = useRef(null)
    const startTimeRef = useRef(null)

    const qrField = findQrField(template)
    const total = csvData.length

    const handleUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => { setCsvData(parseCsv(ev.target.result)); setCsvFileName(file.name) }
        reader.readAsText(file)
        e.target.value = ''
    }

    const clearSim = () => { if (intervalRef.current) clearInterval(intervalRef.current); intervalRef.current = null }

    const handleGenerate = async () => {
        setError('')
        try {
            setPhase('setup')
            const camRes = await authFetch('/api/campaigns', {
                method: 'POST',
                body: JSON.stringify({ name: campaignMeta.name, redirect_url: campaignMeta.redirectUrl || null }),
            })
            const camData = await camRes.json()
            if (!camData.success) {
                if (camData.upgrade_required) { setPhase('idle'); setShowUpgrade(true); return }
                throw new Error(camData.message)
            }
            const campaignId = camData.campaignId

            const recipients = csvData.map((row, i) => ({
                display_name: row.name || row.Name || row.email || row.Email || `Recipient ${i + 1}`,
                csv_data: row,
                tracking_id: crypto.randomUUID(),
            }))

            const recRes = await authFetch(`/api/campaigns/${campaignId}/recipients`, {
                method: 'POST',
                body: JSON.stringify({ recipients }),
            })
            if (!(await recRes.json()).success) throw new Error('Failed to save recipients')

            setPhase('generating')
            setCount(0)
            startTimeRef.current = Date.now()
            let sim = 0
            intervalRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTimeRef.current) / 1000
                const target = Math.min(Math.floor(total * 0.88), Math.floor(elapsed * 35))
                if (target > sim) { sim = target; setCount(sim); setSpeed(Math.round(sim / Math.max(elapsed, 0.01))) }
            }, 80)

            const [{ generate }, { getDefaultFont, getInputFromTemplate }] = await Promise.all([
                import('@pdfme/generator'),
                import('@pdfme/common'),
            ])
            const plugins = await getPlugins()
            const baseInput = getInputFromTemplate(template)[0] || {}
            const apiBase = import.meta.env.DEV ? window.location.origin : 'https://formfreedom-backend.onrender.com'

            const inputs = recipients.map(r => {
                const input = { ...baseInput, ...r.csv_data }
                if (qrField) input[qrField] = `${apiBase}/api/t/${r.tracking_id}`
                return input
            })

            const pdf = await generate({ template, inputs, options: { font: getDefaultFont() }, plugins })
            clearSim()
            setCount(total)
            setSpeed(Math.round(total / ((Date.now() - startTimeRef.current) / 1000)))

            const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            const fileName = `${campaignMeta.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`
            setPdfUrl(url)
            setPdfFileName(fileName)
            setPhase('done')
            onDone({ id: campaignId, name: campaignMeta.name, redirectUrl: campaignMeta.redirectUrl, recipientCount: total })
        } catch (err) {
            clearSim()
            console.error('Generate error:', err)
            setError(err.message)
            setPhase('error')
        }
    }

    const handleDownload = () => {
        if (!pdfUrl) return
        const a = document.createElement('a')
        a.href = pdfUrl; a.download = pdfFileName; a.click()
    }

    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    const isIdle = phase === 'idle' || phase === 'error'

    return (
        <>
            <AnimatePresence>
                {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSuccess={() => setShowUpgrade(false)} />}
            </AnimatePresence>
            <div style={{ padding: '2rem 2.5rem', overflowY: 'auto', height: '100%', maxWidth: 700 }}>
                {/* Campaign name summary */}
                <div style={{ background: 'var(--accent-tint)', border: '1px solid rgba(37,99,235,0.15)', borderRadius: 10, padding: '0.75rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <QrCode size={15} color="var(--accent)" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{campaignMeta.name}</span>
                    {campaignMeta.redirectUrl && <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 4 }}>↗ {campaignMeta.redirectUrl}</span>}
                </div>

                {isIdle && (
                    <button onClick={onBack} className="btn-ghost" style={{ padding: '7px 14px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: '1.75rem' }}>
                        <ArrowLeft size={14} /> Back to Design
                    </button>
                )}

                <h2 style={{ margin: '0 0 6px' }}>
                    {phase === 'done' ? 'PDFs Ready!' : phase === 'generating' ? 'Generating PDFs…' : phase === 'setup' ? 'Setting up…' : 'Upload Recipients & Generate'}
                </h2>

                {isIdle && (
                    <>
                        <p style={{ margin: '0 0 1.5rem', fontSize: 14 }}>
                            Upload a CSV where each row becomes one personalised PDF. Column headers must match your template field names.
                        </p>

                        {/* QR status */}
                        {qrField ? (
                            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: 14, color: '#166534' }}>
                                QR field: <code style={{ background: '#dcfce7', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{qrField}</code>
                                {' '}— auto-filled with each recipient's unique tracking URL.
                            </div>
                        ) : (
                            <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: 14, color: '#9a3412' }}>
                                No QR field found — go back to Design and add a <strong>QR</strong> element if you want scan tracking.
                            </div>
                        )}

                        {/* CSV drop zone */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                                padding: '2rem', border: `2px dashed ${csvData.length > 0 ? '#86efac' : 'var(--border)'}`,
                                borderRadius: 12, cursor: 'pointer', fontSize: 14,
                                background: csvData.length > 0 ? '#f0fdf4' : 'var(--bg)', transition: 'all 0.15s',
                            }}>
                                <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleUpload} />
                                {csvData.length > 0 ? (
                                    <>
                                        <CheckCircle2 size={32} color="#16a34a" />
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{csvFileName}</div>
                                            <div style={{ color: 'var(--muted)', fontSize: 13 }}>{csvData.length} rows — click to replace</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={28} style={{ color: 'var(--muted)' }} />
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--ink)' }}>Click to upload CSV</div>
                                            <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>or drag & drop · .csv files only</div>
                                        </div>
                                    </>
                                )}
                            </label>
                        </div>

                        {/* CSV preview table */}
                        {csvData.length > 0 && (
                            <div style={{ marginBottom: '2rem', overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10 }}>
                                <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Preview — first 5 rows
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                    <thead>
                                        <tr>
                                            {Object.keys(csvData[0]).map(h => (
                                                <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--muted)', background: 'var(--bg)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {csvData.slice(0, 5).map((row, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid var(--border-2)' }}>
                                                {Object.values(row).map((val, j) => (
                                                    <td key={j} style={{ padding: '10px 14px', color: 'var(--ink)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{String(val)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {error && <p className="error-text" style={{ marginBottom: 16 }}>{error}</p>}

                        <button
                            onClick={handleGenerate}
                            disabled={csvData.length === 0}
                            className="btn-primary"
                            style={{ padding: '12px 28px', fontSize: 15 }}
                        >
                            <Zap size={16} /> Generate {total > 0 ? total : ''} PDFs
                        </button>
                    </>
                )}

                {phase === 'setup' && (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)', marginBottom: 16 }} />
                        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Creating campaign & tracking links…</p>
                    </div>
                )}

                {(phase === 'generating' || phase === 'done') && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                            <span className="gen-counter" style={{ fontSize: 72 }}>{count}</span>
                            <div style={{ paddingBottom: 10 }}>
                                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>/ {total} PDFs</div>
                                <div style={{ fontSize: 13, color: 'var(--muted)' }}>generated</div>
                            </div>
                        </div>
                        <div>
                            <div className="gen-bar-wrap"><div className="gen-bar-fill" style={{ width: `${pct}%` }} /></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                <div className="gen-meta">
                                    {phase === 'done' ? <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Complete</span> : `${pct}%`}
                                </div>
                                {speed > 0 && <div className="gen-meta"><Zap size={12} style={{ display: 'inline', marginRight: 3 }} />{speed} PDFs/sec</div>}
                            </div>
                        </div>
                        {phase === 'done' && (
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                                <button onClick={handleDownload} className="btn-primary" style={{ padding: '12px 24px', fontSize: 15 }}>
                                    <Download size={16} /> Download PDF Bundle
                                </button>
                                <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                                    Scans are now tracked live — click <strong>View Campaign</strong> at top to see analytics.
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

// ── Starter template picker modal ──────────────────────────────────────────────

const StarterTemplateModal = ({ onClose, designerRef }) => {
    const handleLoad = (tpl) => { if (designerRef.current) designerRef.current.updateTemplate(tpl); onClose() }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: 620 }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ margin: 0 }}>Load Starter Template</h3>
                    <button onClick={onClose} className="icon-btn"><X size={18} /></button>
                </div>
                <div className="tpl-gallery" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {STARTER_TEMPLATES.map(tpl => (
                        <div key={tpl.label} className="tpl-card" onClick={() => handleLoad(tpl.template)}>
                            <TemplateThumbnail template={tpl} />
                            <div className="tpl-card-body">
                                <div className="tpl-card-name">{tpl.label}</div>
                                <div className="tpl-card-desc">{tpl.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ── Existing campaign: Design tab ──────────────────────────────────────────────

const DesignTab = ({ campaign, onSave }) => {
    const { authFetch } = useAuth()
    const containerRef = useRef(null)
    const designerRef = useRef(null)
    const [ready, setReady] = useState(false)
    const [saving, setSaving] = useState(false)
    const [savedMsg, setSavedMsg] = useState(false)
    const [showTemplates, setShowTemplates] = useState(false)

    useEffect(() => {
        if (!containerRef.current) return
        let destroyed = false
        const mount = async () => {
            const [{ Designer }, { getDefaultFont, checkTemplate }] = await Promise.all([
                import('@pdfme/ui'),
                import('@pdfme/common'),
            ])
            const plugins = await getPlugins()
            if (destroyed || !containerRef.current) return
            let template = blankTemplate()
            if (campaign.template_json) {
                try { const p = JSON.parse(campaign.template_json); checkTemplate(p); template = p } catch {}
            }
            designerRef.current = new Designer({
                domContainer: containerRef.current,
                template,
                plugins,
                options: { font: getDefaultFont(), lang: 'en' },
            })
            setReady(true)
        }
        mount()
        return () => {
            destroyed = true
            if (designerRef.current) { try { designerRef.current.destroy() } catch {} designerRef.current = null }
        }
    }, [campaign.id])

    const handleSave = async () => {
        if (!designerRef.current) return
        setSaving(true)
        try {
            const template = designerRef.current.getTemplate()
            const res = await authFetch(`/api/campaigns/${campaign.id}`, {
                method: 'PUT',
                body: JSON.stringify({ template_json: JSON.stringify(template) }),
            })
            const data = await res.json()
            if (!data.success) throw new Error(data.message)
            onSave({ ...campaign, template_json: JSON.stringify(template) })
            setSavedMsg(true)
            setTimeout(() => setSavedMsg(false), 2200)
        } catch (e) { console.error('Save error:', e) }
        finally { setSaving(false) }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <DesignerToolbar
                designerRef={designerRef}
                ready={ready}
                campaignName={campaign.name}
                showTemplates={showTemplates}
                setShowTemplates={setShowTemplates}
                onNext={null}
            />
            {/* Save button row */}
            <div style={{ padding: '6px 14px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Tip: Add a <strong>QR</strong> field — auto-filled with each recipient's unique tracking URL.
                </span>
                <button onClick={handleSave} disabled={saving || !ready} className="btn-primary" style={{ padding: '6px 16px', fontSize: 13 }}>
                    {saving ? <Loader2 size={14} className="animate-spin" /> : savedMsg ? <><CheckCircle2 size={14} /> Saved</> : <><Save size={14} /> Save</>}
                </button>
            </div>
            <div ref={containerRef} style={{ flex: 1, minHeight: 0, overflow: 'hidden' }} />
            {showTemplates && <StarterTemplateModal onClose={() => setShowTemplates(false)} designerRef={designerRef} />}
        </div>
    )
}

// ── Existing campaign: Generate tab ───────────────────────────────────────────

const GenerateTab = ({ campaign }) => {
    const { authFetch } = useAuth()
    const [csvRecords, setCsvRecords] = useState([])
    const [csvFileName, setCsvFileName] = useState('')
    const [generating, setGenerating] = useState(false)
    const [count, setCount] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [done, setDone] = useState(false)
    const intervalRef = useRef(null)

    const template = campaign.template_json ? (() => { try { return JSON.parse(campaign.template_json) } catch { return null } })() : null
    const qrField = template ? findQrField(template) : null
    const hasTemplate = !!template && template.schemas.some(p => p.length > 0)

    const handleUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => { setCsvRecords(parseCsv(ev.target.result)); setCsvFileName(file.name) }
        reader.readAsText(file)
        e.target.value = ''
        setDone(false)
    }

    const handleGenerate = async () => {
        if (!template || csvRecords.length === 0) return
        setGenerating(true); setDone(false); setCount(0)
        const total = csvRecords.length
        try {
            const recipients = csvRecords.map((row, i) => ({
                display_name: row.name || row.Name || row.email || row.Email || `Recipient ${i + 1}`,
                csv_data: row, tracking_id: crypto.randomUUID(),
            }))
            await authFetch(`/api/campaigns/${campaign.id}/recipients`, { method: 'POST', body: JSON.stringify({ recipients }) })

            const startTime = Date.now(); let sim = 0
            intervalRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000
                const target = Math.min(Math.floor(total * 0.88), Math.floor(elapsed * 35))
                if (target > sim) { sim = target; setCount(sim); setSpeed(Math.round(sim / Math.max(elapsed, 0.01))) }
            }, 80)

            const [{ generate }, { getDefaultFont, getInputFromTemplate }] = await Promise.all([import('@pdfme/generator'), import('@pdfme/common')])
            const plugins = await getPlugins()
            const baseInput = getInputFromTemplate(template)[0] || {}
            const apiBase = import.meta.env.DEV ? window.location.origin : 'https://formfreedom-backend.onrender.com'
            const inputs = recipients.map(r => { const input = { ...baseInput, ...r.csv_data }; if (qrField) input[qrField] = `${apiBase}/api/t/${r.tracking_id}`; return input })

            const pdf = await generate({ template, inputs, options: { font: getDefaultFont() }, plugins })
            clearInterval(intervalRef.current)
            setCount(total); setSpeed(Math.round(total / ((Date.now() - startTime) / 1000))); setDone(true)

            const blob = new Blob([pdf.buffer], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a'); a.href = url; a.download = `${campaign.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`; a.click()
            URL.revokeObjectURL(url)
        } catch (err) {
            clearInterval(intervalRef.current)
            console.error('Generation error:', err); alert(`Generation failed: ${err.message}`)
        } finally { setGenerating(false) }
    }

    const total = csvRecords.length
    const pct = total > 0 ? Math.round((count / total) * 100) : 0

    return (
        <div style={{ padding: '1.5rem', maxWidth: 680, overflowY: 'auto', height: '100%' }}>
            {!hasTemplate && (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', fontSize: 14, color: '#92400e' }}>
                    Design a template in the <strong>Design</strong> tab first.
                </div>
            )}
            <div style={{ marginBottom: '1.5rem' }}>
                <label className="field-label" style={{ display: 'block', marginBottom: 8 }}>Upload CSV</label>
                <label style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                    border: `1.5px dashed ${csvRecords.length > 0 ? '#86efac' : 'var(--border)'}`,
                    borderRadius: 8, cursor: 'pointer', fontSize: 14,
                    background: csvRecords.length > 0 ? '#f0fdf4' : 'var(--bg)',
                }}>
                    <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleUpload} />
                    {csvRecords.length > 0
                        ? <><CheckCircle2 size={16} color="#16a34a" /> {csvFileName} — <strong>{csvRecords.length} rows</strong></>
                        : <><Upload size={16} /> Click to upload CSV</>}
                </label>
            </div>

            {generating && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                        <span className="gen-counter" style={{ fontSize: 56 }}>{count}</span>
                        <div style={{ paddingBottom: 6 }}>
                            <div style={{ fontWeight: 600, color: 'var(--ink)' }}>/ {total} PDFs</div>
                            {speed > 0 && <div style={{ fontSize: 12, color: 'var(--muted)' }}><Zap size={11} style={{ display: 'inline' }} /> {speed}/sec</div>}
                        </div>
                    </div>
                    <div className="gen-bar-wrap"><div className="gen-bar-fill" style={{ width: `${pct}%` }} /></div>
                </div>
            )}

            {done && (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', fontSize: 14, color: '#166534' }}>
                    <CheckCircle2 size={16} style={{ display: 'inline', marginRight: 6 }} />
                    <strong>{total} PDFs generated</strong> at {speed} PDFs/sec — download started.
                </div>
            )}

            <button onClick={handleGenerate} disabled={generating || !hasTemplate || csvRecords.length === 0} className="btn-primary" style={{ padding: '11px 24px', fontSize: 14 }}>
                {generating ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><Download size={16} /> Generate & Download</>}
            </button>
        </div>
    )
}

// ── Existing campaign: Scans tab ───────────────────────────────────────────────

const ScansTab = ({ campaign }) => {
    const { authFetch } = useAuth()
    const [recipients, setRecipients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authFetch(`/api/campaigns/${campaign.id}/recipients`)
            .then(r => r.json())
            .then(data => { if (data.success) setRecipients(data.recipients) })
            .finally(() => setLoading(false))
    }, [campaign.id])

    if (loading) return <div className="empty-state"><Loader2 size={24} className="animate-spin" /></div>

    if (recipients.length === 0) return (
        <div className="empty-state">
            <Users size={40} style={{ color: 'var(--border)', marginBottom: '1rem' }} />
            <p>No recipients yet.</p>
            <p style={{ fontSize: 13 }}>Use the <strong>Generate</strong> tab to create personalised PDFs.</p>
        </div>
    )

    const totalScans = recipients.reduce((sum, r) => sum + Number(r.scan_count || 0), 0)
    const scannedCount = recipients.filter(r => Number(r.scan_count) > 0).length

    return (
        <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
                {[{ label: 'Recipients', value: recipients.length }, { label: 'Scanned', value: scannedCount }, { label: 'Total Scans', value: totalScans }].map(s => (
                    <div key={s.label} className="stat-card" style={{ flex: 1, padding: '1rem 1.25rem' }}>
                        <div className="stat-card-value" style={{ fontSize: '1.75rem' }}>{s.value}</div>
                        <div className="stat-card-label">{s.label}</div>
                    </div>
                ))}
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                            {['Recipient', 'Scans', 'Last Scanned'].map(h => (
                                <th key={h} style={{ padding: '10px 16px', textAlign: h === 'Scans' ? 'center' : 'left', fontWeight: 700, fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', width: h === 'Scans' ? 80 : undefined }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map(r => (
                            <tr key={r.id} style={{ borderBottom: '1px solid var(--border-2)' }}>
                                <td style={{ padding: '11px 16px', fontWeight: 500, color: 'var(--ink)' }}>{r.display_name || '—'}</td>
                                <td style={{ padding: '11px 16px', textAlign: 'center' }}>
                                    <span style={{ background: Number(r.scan_count) > 0 ? '#f0fdf4' : 'var(--bg)', color: Number(r.scan_count) > 0 ? '#16a34a' : 'var(--muted)', padding: '2px 10px', borderRadius: 20, fontWeight: 600, fontSize: 13 }}>
                                        {r.scan_count}
                                    </span>
                                </td>
                                <td style={{ padding: '11px 16px', color: 'var(--muted)', fontSize: 13 }}>
                                    {r.last_scanned ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={12} /> {new Date(r.last_scanned).toLocaleString()}</span> : '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// ── Campaign Detail ────────────────────────────────────────────────────────────

const DETAIL_TABS = [
    { key: 'design',   label: 'Design',   icon: <FileText size={14} /> },
    { key: 'generate', label: 'Generate', icon: <Download size={14} /> },
    { key: 'scans',    label: 'Scans',    icon: <BarChart2 size={14} /> },
]

const CampaignDetail = ({ campaign, onDelete, onUpdate, initialTab = 'design' }) => {
    const { authFetch } = useAuth()
    const [activeTab, setActiveTab] = useState(initialTab)
    const [local, setLocal] = useState(campaign)

    useEffect(() => { setLocal(campaign); setActiveTab(initialTab) }, [campaign.id]) // eslint-disable-line

    const handleDelete = async () => {
        if (!confirm(`Delete "${campaign.name}"? This removes all recipients and scan data.`)) return
        await authFetch(`/api/campaigns/${campaign.id}`, { method: 'DELETE' })
        onDelete(campaign.id)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--surface)', flexShrink: 0 }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.15rem' }}>{local.name}</h2>
                    {local.redirect_url && <p style={{ margin: '3px 0 0', color: 'var(--muted)', fontSize: 12 }}>↗ {local.redirect_url}</p>}
                </div>
                <button onClick={handleDelete} className="btn-danger"><Trash2 size={14} /> Delete</button>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface)', padding: '0 1.5rem', flexShrink: 0 }}>
                {DETAIL_TABS.map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
                        border: 'none', borderBottom: activeTab === tab.key ? '2px solid var(--ink)' : '2px solid transparent',
                        background: 'none', cursor: 'pointer', fontSize: 13, marginBottom: -1,
                        fontWeight: activeTab === tab.key ? 600 : 400,
                        color: activeTab === tab.key ? 'var(--ink)' : 'var(--muted)',
                        fontFamily: "'Satoshi', sans-serif",
                    }}>
                        {tab.icon}{tab.label}
                    </button>
                ))}
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
                {activeTab === 'design'   && <DesignTab campaign={local} onSave={u => { setLocal(u); onUpdate(u) }} />}
                {activeTab === 'generate' && <GenerateTab campaign={local} />}
                {activeTab === 'scans'    && <ScansTab campaign={local} />}
            </div>
        </div>
    )
}

// ── Scan Analytics (folded into campaigns page) ────────────────────────────────

const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const AnalyticsPanel = () => {
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
    const campaignsWithScans = stats?.per_campaign?.filter(c => parseInt(c.scan_count) > 0).length ?? 0

    return (
        <div style={{ padding: '2rem', overflowY: 'auto', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ margin: '0 0 3px' }}>Scan Analytics</h3>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>QR scan activity across all campaigns</p>
                </div>
                <div style={{ display: 'inline-flex', gap: 2, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-pill)', padding: 3 }}>
                    {[7, 30, 90].map(d => (
                        <button key={d} onClick={() => setDays(d)} style={{ padding: '4px 12px', borderRadius: 'calc(var(--r-pill) - 3px)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: days === d ? 600 : 500, color: days === d ? 'var(--ink)' : 'var(--muted)', background: days === d ? 'var(--surface)' : 'transparent', fontFamily: "'Satoshi', sans-serif" }}>{d}d</button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                    { icon: <Activity size={16} color="var(--accent)" />, label: 'Total Scans (all time)', value: loading ? '—' : stats?.total_scans ?? 0 },
                    { icon: <QrCode size={16} color="var(--accent)" />, label: 'Campaigns with Scans', value: loading ? '—' : campaignsWithScans },
                    { icon: <ScanLine size={16} color="var(--accent)" />, label: `Scans (${days}d)`, value: loading ? '—' : (stats?.chart?.reduce((a, b) => a + b.count, 0) ?? 0) },
                ].map((kpi, i) => (
                    <div key={i} className="stat-card" style={{ padding: '1rem' }}>
                        <div className="stat-card-icon">{kpi.icon}</div>
                        <div className="stat-card-value">{kpi.value}</div>
                        <div className="stat-card-label">{kpi.label}</div>
                    </div>
                ))}
            </div>

            <div className="stat-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1.25rem', fontSize: '0.95rem' }}>Scans over time</h3>
                {loading ? (
                    <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 size={20} className="animate-spin" style={{ color: 'var(--muted)' }} /></div>
                ) : allZero ? (
                    <div style={{ height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <ScanLine size={24} style={{ color: 'var(--border)' }} />
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>No scans in this period</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={160}>
                        <AreaChart data={stats.chart} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                            <defs>
                                <linearGradient id="scanGrad2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.14} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: "'Satoshi', sans-serif" }} tickLine={false} axisLine={false} interval={days === 7 ? 0 : 4} />
                            <YAxis tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: "'Satoshi', sans-serif" }} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: "'Satoshi', sans-serif", fontSize: 13 }} labelFormatter={d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} formatter={v => [v, 'Scans']} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />
                            <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} fill="url(#scanGrad2)" dot={false} activeDot={{ r: 4, fill: '#2563EB', strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>

            {stats?.per_campaign?.length > 0 && (
                <>
                    <h3 style={{ margin: '0 0 1rem', fontSize: '0.95rem' }}>By Campaign</h3>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: 'var(--bg)' }}>
                                    {['Campaign', 'Recipients', 'Scans', 'Scan Rate', 'Last Scan'].map(h => (
                                        <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {stats.per_campaign.map(c => {
                                    const r = parseInt(c.recipient_count) || 0
                                    const s = parseInt(c.scan_count) || 0
                                    const rate = r > 0 ? Math.round((s / r) * 100) : 0
                                    return (
                                        <tr key={c.id} style={{ borderBottom: '1px solid var(--border-2)' }}>
                                            <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{c.name}</td>
                                            <td style={{ padding: '10px 14px', color: 'var(--muted)' }}>{r}</td>
                                            <td style={{ padding: '10px 14px', fontWeight: 700, color: s > 0 ? 'var(--ink)' : 'var(--muted)' }}>{s}</td>
                                            <td style={{ padding: '10px 14px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <div style={{ width: 50, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                                                        <div style={{ width: `${Math.min(rate, 100)}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                                                    </div>
                                                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{rate}%</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '10px 14px', color: 'var(--muted)', fontSize: 12 }}>{c.last_scanned ? new Date(c.last_scanned).toLocaleDateString() : '—'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

// ── Main CampaignsPage ────────────────────────────────────────────────────────

const CampaignsPage = ({ wizardTrigger = 0 }) => {
    const { authFetch } = useAuth()
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState('list') // 'list' | 'wizard' | 'detail' | 'analytics'
    const [selected, setSelected] = useState(null)
    const [selectedInitialTab, setSelectedInitialTab] = useState('design')

    // Wizard state
    const [wizardStep, setWizardStep] = useState(0)
    const [wizardMeta, setWizardMeta] = useState(null)       // { name, redirectUrl }
    const [wizardTemplate, setWizardTemplate] = useState(null)
    const prevTrigger = useRef(0)

    useEffect(() => {
        authFetch('/api/campaigns')
            .then(r => r.json())
            .then(data => { if (data.success) setCampaigns(data.campaigns) })
            .finally(() => setLoading(false))
    }, [])

    const startWizard = useCallback(() => {
        setWizardStep(0); setWizardMeta(null); setWizardTemplate(null); setView('wizard')
    }, [])

    useEffect(() => {
        if (wizardTrigger > prevTrigger.current) { prevTrigger.current = wizardTrigger; startWizard() }
    }, [wizardTrigger, startWizard])

    const handleWizardDone = (newCampaign) => {
        const entry = {
            id: newCampaign.id,
            name: newCampaign.name,
            redirect_url: newCampaign.redirectUrl || null,
            recipient_count: newCampaign.recipientCount,
            scan_count: 0,
            created_at: new Date().toISOString(),
        }
        setCampaigns(prev => [entry, ...prev])
        // Auto-navigate to the new campaign's scans tab
        setSelected(entry)
        setSelectedInitialTab('scans')
        setView('detail')
    }

    const handleDelete = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id))
        if (selected?.id === id) { setSelected(null); setView('list') }
    }

    const handleUpdate = (updated) => {
        setCampaigns(prev => prev.map(c => c.id === updated.id ? { ...c, ...updated } : c))
        setSelected(prev => prev?.id === updated.id ? { ...prev, ...updated } : prev)
    }

    // ── Wizard view ──
    if (view === 'wizard') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ padding: '0 1.5rem', height: 54, borderBottom: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                    <button onClick={() => setView('list')} className="icon-btn" title="Cancel" style={{ flexShrink: 0 }}>
                        <X size={18} />
                    </button>
                    <StepIndicator current={wizardStep} />
                </div>
                <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                    {wizardStep === 0 && (
                        <SetupStep
                            onNext={(meta) => { setWizardMeta(meta); setWizardStep(1) }}
                        />
                    )}
                    {wizardStep === 1 && (
                        <GalleryStep
                            onBack={() => setWizardStep(0)}
                            onSelect={(template) => { setWizardTemplate(template); setWizardStep(2) }}
                        />
                    )}
                    {wizardStep === 2 && (
                        <DesignerStep
                            key={JSON.stringify(wizardTemplate?.basePdf)}
                            initialTemplate={wizardTemplate}
                            campaignName={wizardMeta?.name}
                            onBack={() => setWizardStep(1)}
                            onNext={(tpl) => { setWizardTemplate(tpl); setWizardStep(3) }}
                        />
                    )}
                    {wizardStep === 3 && (
                        <GenerateStep
                            template={wizardTemplate}
                            campaignMeta={wizardMeta}
                            onBack={() => setWizardStep(2)}
                            onDone={handleWizardDone}
                        />
                    )}
                </div>
            </div>
        )
    }

    // ── Split panel (list + detail/analytics) ──
    const rightContent = () => {
        if (view === 'analytics') return <AnalyticsPanel />
        if (view === 'detail' && selected) {
            return (
                <CampaignDetail
                    key={selected.id}
                    campaign={selected}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    initialTab={selectedInitialTab}
                />
            )
        }
        return (
            <div className="empty-state" style={{ height: '100%' }}>
                <QrCode size={40} style={{ color: 'var(--border)', marginBottom: '1rem' }} />
                <p style={{ fontWeight: 600, color: 'var(--ink)' }}>No campaign selected</p>
                <p style={{ fontSize: 13 }}>Choose a campaign from the list or create a new one.</p>
                <button onClick={startWizard} className="btn-primary" style={{ padding: '10px 20px', fontSize: 14, marginTop: '0.5rem' }}>
                    <Plus size={15} /> New Campaign
                </button>
            </div>
        )
    }

    return (
        <div className="page-layout" style={{ height: '100%' }}>
            {/* Left: campaign list */}
            <div className="form-list">
                <div className="form-list-header">
                    <h3 style={{ margin: 0 }}>Campaigns</h3>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button
                            onClick={() => setView('analytics')}
                            className={`icon-btn${view === 'analytics' ? ' active' : ''}`}
                            title="Scan Analytics"
                            style={{ color: view === 'analytics' ? 'var(--accent)' : undefined }}
                        >
                            <BarChart2 size={15} />
                        </button>
                        <button onClick={startWizard} className="btn-primary" style={{ padding: '7px 12px', fontSize: 13 }}>
                            <Plus size={14} /> New
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>
                        <Loader2 size={20} className="animate-spin" />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>
                        No campaigns yet.<br />
                        <button onClick={startWizard} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: "'Satoshi', sans-serif", padding: '4px 0' }}>
                            Create your first →
                        </button>
                    </div>
                ) : (
                    campaigns.map(c => (
                        <button
                            key={c.id}
                            className={`form-list-item${selected?.id === c.id && view === 'detail' ? ' active' : ''}`}
                            onClick={() => { setSelected(c); setSelectedInitialTab('design'); setView('detail') }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <QrCode size={14} color="var(--muted)" />
                                <span style={{ fontWeight: 500, fontSize: 14, textAlign: 'left', color: 'var(--ink)' }}>{c.name}</span>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3, display: 'flex', gap: 12 }}>
                                <span>{c.recipient_count ?? 0} recipients</span>
                                <span>{c.scan_count ?? 0} scans</span>
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Right: detail / analytics / empty */}
            <div style={{ flex: 1, overflow: 'hidden', height: '100%' }}>
                {rightContent()}
            </div>
        </div>
    )
}

export default CampaignsPage
