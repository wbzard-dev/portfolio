import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowRight, FileText, QrCode, BarChart2, Mail,
    CheckCircle2, ChevronRight, Zap, Users, ScanLine,
    LayoutTemplate, Upload, Download, MousePointerClick,
} from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const Logo = () => (
    <Link to="/prformnce" className="landing-logo">
        <div className="landing-logo-dot" />
        Prformnce
    </Link>
)

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
    {
        icon: <FileText size={22} color="#2563EB" />,
        title: 'Form Endpoints',
        tag: 'Lead capture',
        desc: 'Get a unique URL for any HTML form in under 60 seconds. Point your form\'s action attribute at it — that\'s it. Every submission lands in your dashboard, searchable and exportable, with no backend work on your end.',
        bullets: [
            'Works with any HTML <form> — no JS needed',
            'Accepts JSON and URL-encoded POST bodies',
            'Full submission history with search',
        ],
    },
    {
        icon: <QrCode size={22} color="#2563EB" />,
        title: 'QR Campaigns',
        tag: 'Personalised distribution',
        desc: 'Design a PDF template in-browser, upload a CSV of recipients, and Prformnce generates one personalised PDF per person — each with a unique QR code embedded. Distribute the PDFs. Track every scan in real time.',
        bullets: [
            'In-browser PDF designer (no Photoshop needed)',
            'Bulk generation — hundreds of PDFs in seconds',
            'Per-recipient QR tracking, not batch',
        ],
    },
    {
        icon: <Mail size={22} color="#2563EB" />,
        title: 'Email Leads',
        tag: 'Follow-up at scale',
        desc: 'Select any leads from your submissions inbox and send them a personalised email in one click. Built-in templates for follow-ups, offers, reminders, and more — with a live preview before you send.',
        bullets: [
            'Built-in templates: follow-up, offer, reminder, welcome',
            'Live email preview before sending',
            'Personalised with each lead\'s own data',
        ],
    },
    {
        icon: <BarChart2 size={22} color="#2563EB" />,
        title: 'Analytics Dashboard',
        tag: 'Know what\'s working',
        desc: 'One dashboard for all your lead activity. See submission trends over time, your top-performing forms, who scanned which QR, scan rates per campaign, and recent activity — updated in real time.',
        bullets: [
            'Submissions chart with period comparison',
            'Per-campaign scan rate & heatmap',
            'KPI cards with delta vs prior period',
        ],
    },
]

const useCases = [
    {
        label: 'Events',
        icon: '🎟️',
        desc: 'Generate personalised entry badges or conference passes for every attendee. Know the moment someone arrives by tracking their QR scan at the door.',
    },
    {
        label: 'Education',
        icon: '🎓',
        desc: 'Issue certificates or workshop passes in bulk. Track who actually attended by watching scan activity after distribution.',
    },
    {
        label: 'Marketing',
        icon: '📣',
        desc: 'Embed form endpoints in landing pages, collect leads without a backend, then follow up with templated email campaigns directly from your dashboard.',
    },
    {
        label: 'Real Estate',
        icon: '🏠',
        desc: 'Create personalised property brochures with QR codes for each prospect. Know who\'s seriously interested by who scanned their unique code.',
    },
]

const plans = [
    {
        name: 'Free',
        price: '₹0',
        period: 'forever',
        desc: 'Try everything. No card needed.',
        features: [
            '3 form endpoints',
            '500 submissions / month',
            '2 QR campaigns',
            'Email leads from submissions',
            'Basic analytics',
        ],
        cta: 'Get started free',
        featured: false,
    },
    {
        name: 'Pro',
        price: '₹799',
        period: '/ month',
        desc: 'For teams that run campaigns at scale.',
        features: [
            'Unlimited form endpoints',
            '50,000 submissions / month',
            'Unlimited QR campaigns',
            'Email leads from submissions',
            'QR scan tracking & analytics',
            'Submissions chart & KPI dashboard',
            'Priority support',
        ],
        cta: 'Start Pro',
        featured: true,
    },
    {
        name: 'Team',
        price: 'Custom',
        period: '',
        desc: 'Higher volume, dedicated support.',
        features: [
            'Everything in Pro',
            'Higher submission volume',
            'Team onboarding session',
            'Dedicated support channel',
        ],
        cta: 'Contact us',
        featured: false,
        contactUs: true,
    },
]

// ── Component ─────────────────────────────────────────────────────────────────

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

            {/* ── Navbar ── */}
            <header className="landing-nav">
                <Logo />
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#problem"    className="nav-link">Why Prformnce</a>
                    <a href="#features"   className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it works</a>
                    <a href="#pricing"    className="nav-link">Pricing</a>
                </nav>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Link to="/prformnce/login" className="btn-ghost" style={{ padding: '8px 18px', fontSize: '14px' }}>Sign in</Link>
                    <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                        Get started free <ArrowRight size={14} />
                    </Link>
                </div>
            </header>

            <main style={{ flex: 1 }}>

                {/* ── Hero ── */}
                <section style={{
                    padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 6vw, 5rem)',
                    textAlign: 'center',
                    maxWidth: '860px',
                    margin: '0 auto',
                }}>
                    <motion.div variants={stagger} initial="hidden" animate="show">
                        <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
                            <span className="eyebrow-badge">
                                <Zap size={11} /> Forms · QR Campaigns · Scan Analytics
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="font-display"
                            style={{
                                fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                                color: 'var(--ink)',
                                marginBottom: '1.5rem',
                                lineHeight: 1.0,
                            }}
                        >
                            Capture leads.<br />
                            <span style={{ color: 'var(--accent)' }}>Track every touchpoint.</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            style={{
                                fontSize: 'clamp(1rem, 2vw, 1.175rem)',
                                color: 'var(--text)',
                                maxWidth: '600px',
                                margin: '0 auto 2.5rem',
                                lineHeight: 1.8,
                            }}
                        >
                            Prformnce gives you instant form endpoints, personalised QR-code PDFs, and a live
                            analytics dashboard — so you know exactly who engaged, when, and how.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '13px 28px', fontSize: '16px' }}>
                                Start for free <ArrowRight size={17} />
                            </Link>
                            <a href="#how-it-works" className="btn-ghost" style={{ padding: '13px 28px', fontSize: '16px' }}>
                                See how it works
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        style={{
                            display: 'flex', justifyContent: 'center',
                            marginTop: '4rem', flexWrap: 'wrap',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--r-lg)',
                            background: 'var(--surface)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-sm)',
                        }}
                    >
                        {[
                            { value: '< 2 min', label: 'Setup time' },
                            { value: '500+',    label: 'Submissions / day' },
                            { value: '100%',    label: 'Client-side PDF gen' },
                            { value: '₹0',      label: 'To get started' },
                        ].map((s, i) => (
                            <div key={s.label} style={{
                                flex: '1', minWidth: '120px',
                                padding: '1.5rem 1rem', textAlign: 'center',
                                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                            }}>
                                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.75rem', color: 'var(--ink)', lineHeight: 1 }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500, marginTop: '4px' }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* ── Problem ── */}
                <section id="problem" style={{
                    background: 'var(--ink)',
                    padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
                }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{ textAlign: 'center', marginBottom: '3rem' }}
                        >
                            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>The problem</span>
                            <h2 style={{
                                fontFamily: "'Anton', sans-serif", fontWeight: 400,
                                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                                color: '#fff', lineHeight: 1.05, marginBottom: '1.25rem',
                            }}>
                                You're collecting leads.<br />But you don't know what happens next.
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto' }}>
                                Form submissions disappear into email inboxes. QR codes on flyers never tell you who scanned them.
                                You send a brochure and have no idea if anyone even opened it.
                                Prformnce closes that gap.
                            </p>
                        </motion.div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                            {[
                                {
                                    before: 'Your HTML form sends data… somewhere. You check your email and hope nothing slipped through.',
                                    after: 'Every submission hits your Prformnce dashboard instantly — searchable, filterable, ready to act on.',
                                },
                                {
                                    before: 'You print 500 badges or flyers with a generic QR code. You never know who actually scanned it.',
                                    after: 'Every recipient gets their own unique QR. You see exactly who scanned, how many times, and when.',
                                },
                                {
                                    before: 'You want to follow up with leads but they\'re scattered across spreadsheets and inboxes.',
                                    after: 'Select any leads in your dashboard and send a personalised email in one click — no CSV export needed.',
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.45, delay: i * 0.1 }}
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 'var(--r-lg)',
                                        padding: '1.75rem',
                                    }}
                                >
                                    <div style={{ marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ef4444' }}>Before</span>
                                        <p style={{ margin: '6px 0 0', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>{item.before}</p>
                                    </div>
                                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '1rem 0' }} />
                                    <div>
                                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#22c55e' }}>With Prformnce</span>
                                        <p style={{ margin: '6px 0 0', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)' }}>{item.after}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section id="features" style={{
                    maxWidth: '1100px', margin: '0 auto',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <span className="section-eyebrow">Features</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
                            Four tools. One dashboard.
                        </h2>
                        <p style={{ color: 'var(--text)', maxWidth: '480px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.75 }}>
                            Everything you need to collect, distribute, track, and follow up — without stitching together five different tools.
                        </p>
                    </div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}
                    >
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="card"
                                style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                                    <div className="feature-icon-wrap">{f.icon}</div>
                                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                                        {f.tag}
                                    </span>
                                </div>
                                <h3 style={{ marginBottom: '0.625rem', fontSize: '1.15rem' }}>{f.title}</h3>
                                <p style={{ margin: '0 0 1.5rem', fontSize: '14px', lineHeight: 1.8, color: 'var(--text)', flex: 1 }}>
                                    {f.desc}
                                </p>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {f.bullets.map(b => (
                                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>
                                            <CheckCircle2 size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ── How it works ── */}
                <section id="how-it-works" style={{
                    background: 'var(--bg-subtle)',
                    borderTop: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
                }}>
                    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="section-eyebrow">How it works</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                                Two flows. Both take minutes.
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem' }}>

                            {/* Flow 1 — Forms */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileText size={16} color="var(--accent)" />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Form Endpoint Flow</h3>
                                </div>
                                {[
                                    { icon: <MousePointerClick size={15} />, title: 'Create a form', desc: 'Give it a name. Prformnce generates a unique submission URL instantly.' },
                                    { icon: <ChevronRight size={15} />, title: 'Drop it into your HTML', desc: 'Set action="<your-endpoint>" on any <form> tag. That\'s your entire backend.' },
                                    { icon: <ScanLine size={15} />, title: 'Leads arrive live', desc: 'Every submission shows up in your dashboard in real time. Search, filter, email directly.' },
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: '50%',
                                                background: 'var(--surface)', border: '1px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'var(--accent)', flexShrink: 0,
                                            }}>
                                                {step.icon}
                                            </div>
                                            {i < 2 && <div style={{ width: 1, flex: 1, background: 'var(--border)', minHeight: 24 }} />}
                                        </div>
                                        <div style={{ paddingBottom: '0.75rem' }}>
                                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: 3 }}>{step.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.65 }}>{step.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Flow 2 — QR Campaigns */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <QrCode size={16} color="var(--accent)" />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem' }}>QR Campaign Flow</h3>
                                </div>
                                {[
                                    { icon: <LayoutTemplate size={15} />, title: 'Design your PDF', desc: 'Pick a template (badge, certificate, voucher) or start blank. Customise everything in the browser.' },
                                    { icon: <Upload size={15} />, title: 'Upload your CSV', desc: 'One row per recipient. Prformnce maps your columns to template fields and assigns each person a unique QR code.' },
                                    { icon: <Download size={15} />, title: 'Generate & distribute', desc: 'Download a single PDF bundle — one page per person. Distribute digitally or print. Watch scans come in live.' },
                                    { icon: <BarChart2 size={15} />, title: 'Track engagement', desc: 'See who scanned, how many times, and when. Filter by scanned vs not yet. Know exactly who engaged.' },
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: '50%',
                                                background: 'var(--surface)', border: '1px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: 'var(--accent)', flexShrink: 0,
                                            }}>
                                                {step.icon}
                                            </div>
                                            {i < 3 && <div style={{ width: 1, flex: 1, background: 'var(--border)', minHeight: 24 }} />}
                                        </div>
                                        <div style={{ paddingBottom: '0.75rem' }}>
                                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: 3 }}>{step.title}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.65 }}>{step.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Use cases ── */}
                <section style={{
                    maxWidth: '1100px', margin: '0 auto',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span className="section-eyebrow">Use cases</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                            Built for whoever needs to know who showed up
                        </h2>
                    </div>
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}
                    >
                        {useCases.map((u, i) => (
                            <motion.div key={i} variants={fadeUp} className="card" style={{ padding: '1.75rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>{u.icon}</div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{u.label}</h3>
                                <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.75, color: 'var(--text)' }}>{u.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ── Mid-page CTA ── */}
                <div style={{
                    background: 'var(--accent-tint)',
                    borderTop: '1px solid rgba(37,99,235,0.15)',
                    borderBottom: '1px solid rgba(37,99,235,0.15)',
                    padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
                    textAlign: 'center',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.75rem', color: 'var(--ink)' }}>
                            Ready to see it in action?
                        </h2>
                        <p style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '1.75rem' }}>
                            Free plan. No credit card. Set up your first form endpoint in under 2 minutes.
                        </p>
                        <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '13px 32px', fontSize: '16px' }}>
                            Create your free account <ArrowRight size={17} />
                        </Link>
                    </motion.div>
                </div>

                {/* ── Pricing ── */}
                <section id="pricing" style={{
                    background: 'var(--bg-subtle)',
                    borderTop: '1px solid var(--border)',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
                }}>
                    <div style={{ maxWidth: '940px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="section-eyebrow">Pricing</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '0.875rem' }}>
                                Start free. Scale when you need to.
                            </h2>
                            <p style={{ color: 'var(--text)', fontSize: '1.05rem', maxWidth: '420px', margin: '0 auto' }}>
                                No credit card required. The free plan includes everything to get started — upgrade when your volume grows.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '1.25rem',
                            alignItems: 'center',
                        }}>
                            {plans.map((plan, i) => (
                                <div key={i} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                                    {plan.featured && <div className="pricing-badge">Most Popular</div>}

                                    <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>
                                        {plan.name}
                                    </div>

                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '2.75rem', lineHeight: 1, color: plan.featured ? '#fff' : 'var(--ink)' }}>
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span style={{ fontSize: '14px', marginLeft: '4px', color: plan.featured ? 'rgba(255,255,255,0.45)' : 'var(--muted)' }}>
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>

                                    <p style={{ fontSize: '13px', color: plan.featured ? 'rgba(255,255,255,0.55)' : 'var(--muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                        {plan.desc}
                                    </p>

                                    <ul style={{ margin: '0 0 1.75rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                        {plan.features.map(f => (
                                            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '14px', color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--text)' }}>
                                                <CheckCircle2 size={15} color={plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--accent)'} style={{ flexShrink: 0, marginTop: 1 }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.contactUs ? (
                                        <a
                                            href="mailto:vivekg.work@gmail.com?subject=Prformnce Team Plan"
                                            style={{
                                                display: 'block', textAlign: 'center',
                                                padding: '11px 20px', borderRadius: 'var(--r-sm)',
                                                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                                                fontFamily: "'Satoshi', sans-serif",
                                                background: 'transparent',
                                                color: 'var(--ink)',
                                                border: '1.5px solid var(--border)',
                                                transition: 'border-color 0.15s, color 0.15s',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink)' }}
                                        >
                                            {plan.cta}
                                        </a>
                                    ) : (
                                        <Link
                                            to="/prformnce/signup"
                                            style={{
                                                display: 'block', textAlign: 'center',
                                                padding: '11px 20px', borderRadius: 'var(--r-sm)',
                                                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                                                fontFamily: "'Satoshi', sans-serif",
                                                background: plan.featured ? '#fff' : 'var(--accent)',
                                                color: plan.featured ? 'var(--ink)' : '#fff',
                                                transition: 'opacity 0.15s, transform 0.12s',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}
                                        >
                                            {plan.cta}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* FAQ-style reassurances */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', marginTop: '2.5rem' }}>
                            {[
                                { icon: <CheckCircle2 size={14} />, label: 'No credit card to start' },
                                { icon: <CheckCircle2 size={14} />, label: 'Cancel anytime' },
                                { icon: <CheckCircle2 size={14} />, label: 'Upgrade from your dashboard' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
                                    <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Final CTA Band ── */}
                <div className="cta-band">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ maxWidth: '620px', margin: '0 auto' }}
                    >
                        <h2 style={{
                            fontFamily: "'Anton', sans-serif", fontWeight: 400,
                            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                            color: '#fff', lineHeight: 1.0, marginBottom: '1.25rem',
                        }}>
                            Stop guessing.<br />Start knowing.
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.55)', margin: '0 auto 2.5rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            Set up your first form endpoint or QR campaign in minutes. Free, no card required.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '13px 32px', fontSize: '16px' }}>
                                Get started free <ArrowRight size={17} />
                            </Link>
                            <Link
                                to="/prformnce/login"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '13px 28px', fontSize: '16px', fontWeight: 500,
                                    color: 'rgba(255,255,255,0.65)',
                                    border: '1.5px solid rgba(255,255,255,0.18)',
                                    borderRadius: 'var(--r-sm)',
                                    textDecoration: 'none',
                                    fontFamily: "'Satoshi', sans-serif",
                                    transition: 'color 0.12s, border-color 0.12s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
                            >
                                Sign in
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer style={{
                background: 'var(--ink)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '2rem clamp(1.5rem, 5vw, 3rem)',
            }}>
                <div style={{
                    maxWidth: '1100px', margin: '0 auto',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#E5E7EB', letterSpacing: '-0.02em' }}>
                            Prformnce
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {['#problem', '#features', '#how-it-works', '#pricing'].map((href, i) => (
                            <a key={href} href={href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}>
                                {['Why Prformnce', 'Features', 'How it works', 'Pricing'][i]}
                            </a>
                        ))}
                        <Link to="/prformnce/login" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}>Sign in</Link>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Satoshi', sans-serif" }}>
                        © {new Date().getFullYear()} Prformnce
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
