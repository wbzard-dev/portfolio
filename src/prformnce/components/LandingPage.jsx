import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// ── Animation primitives ───────────────────────────────────────────────────────

const Reveal = ({ children, delay = 0, y = 28, style, className }) => (
    <motion.div style={style} className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.65, delay, ease }}
    >
        {children}
    </motion.div>
)

const DrawLine = ({ color = 'var(--border)' }) => (
    <motion.div
        style={{ height: 1, background: color, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
    />
)

// Mount-time word mask reveal (hero only)
const HeroText = ({ children, delay = 0, style }) => {
    const words = String(children).split(' ')
    return (
        <span style={{ display: 'block', ...style }}>
            {words.map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.22em' }}>
                    <motion.span
                        style={{ display: 'inline-block' }}
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: delay + i * 0.09, ease }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

// Scroll-triggered word mask reveal
const ScrollText = ({ children, delay = 0, style, className }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10% 0px' })
    const words = String(children).trim().split(/\s+/)
    return (
        <div ref={ref} className={className} style={style}>
            {words.map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}>
                    <motion.span
                        style={{ display: 'inline-block' }}
                        initial={{ y: '110%' }}
                        animate={inView ? { y: 0 } : {}}
                        transition={{ duration: 0.72, delay: delay + i * 0.065, ease }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    )
}

// Horizontal marquee
const Ticker = () => {
    const items = ['Form Endpoints', 'QR Campaigns', 'Scan Analytics', 'Email Leads', 'Live Dashboard', 'No-Code Setup', 'PDF Generation', 'Bulk Export']
    const list = [...items, ...items]
    return (
        <div style={{ overflow: 'hidden', padding: '0.875rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
            <motion.div
                style={{ display: 'flex', width: 'max-content' }}
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                {list.map((item, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)', opacity: 0.45, padding: '0 1.75rem' }}>
                            {item}
                        </span>
                        <span style={{ color: 'var(--accent)', opacity: 0.5, fontSize: '7px' }}>◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
    {
        number: '01',
        title: 'Form Endpoints',
        tag: 'Lead capture',
        desc: 'Get a unique URL for any HTML form in under 60 seconds. Point your form\'s action attribute at it — that\'s it. Every submission lands in your dashboard, searchable and exportable, with no backend work on your end.',
        bullets: ['Works with any HTML form — no JS needed', 'Accepts JSON and URL-encoded POST bodies', 'Full submission history with search and export'],
    },
    {
        number: '02',
        title: 'QR Campaigns',
        tag: 'Personalised distribution',
        desc: 'Design a PDF template in-browser, upload a CSV of recipients, and Prformnce generates one personalised PDF per person — each with a unique QR code embedded. Distribute the PDFs. Track every scan in real time.',
        bullets: ['In-browser PDF designer — no Photoshop needed', 'Bulk generation — hundreds of PDFs in seconds', 'Per-recipient QR tracking, not batch'],
    },
    {
        number: '03',
        title: 'Email Leads',
        tag: 'Follow-up at scale',
        desc: 'Select any leads from your submissions inbox and send them a personalised email in one click. Built-in templates for follow-ups, offers, reminders, and more — with a live preview before you send.',
        bullets: ['Built-in templates: follow-up, offer, reminder, welcome', 'Live email preview before sending', 'Personalised with each lead\'s own data'],
    },
    {
        number: '04',
        title: 'Analytics Dashboard',
        tag: "Know what's working",
        desc: 'One dashboard for all your lead activity. See submission trends over time, your top-performing forms, who scanned which QR, scan rates per campaign, and recent activity — updated in real time.',
        bullets: ['Submissions chart with period comparison', 'Per-campaign scan rate and heatmap', 'KPI cards with delta vs prior period'],
    },
]

const problems = [
    {
        number: '01',
        before: 'Your HTML form sends data somewhere. You check your email and hope nothing slipped through.',
        after: 'Every submission hits your dashboard the moment it\'s sent — searchable, filterable, ready to act on.',
    },
    {
        number: '02',
        before: 'You print 500 badges or flyers with a generic QR code. You never know who actually scanned it.',
        after: 'Every recipient gets their own unique QR. You see exactly who scanned, how many times, and when.',
    },
    {
        number: '03',
        before: 'You want to follow up with leads but they\'re scattered across spreadsheets and inboxes.',
        after: 'Select any leads in your dashboard and send a personalised email in one click. No CSV export needed.',
    },
]

const useCases = [
    { label: 'Events', desc: 'Generate personalised entry badges or conference passes for every attendee. Know the moment someone arrives by tracking their unique QR scan at the door.' },
    { label: 'Education', desc: 'Issue certificates or workshop passes in bulk. Track who actually attended by watching scan activity after distribution.' },
    { label: 'Marketing', desc: 'Embed form endpoints in landing pages, collect leads without a backend, then follow up with templated email campaigns directly from your dashboard.' },
    { label: 'Real Estate', desc: 'Create personalised property brochures with QR codes for each prospect. Know who\'s seriously interested by who scanned their unique code.' },
]

const plans = [
    {
        name: 'Free', price: '₹0', period: 'forever',
        desc: 'Try everything. No card needed.',
        features: ['3 form endpoints', '500 submissions / month', '2 QR campaigns', 'Email leads from submissions', 'Basic analytics'],
        cta: 'Get started free', href: '/prformnce/signup', featured: false,
    },
    {
        name: 'Pro', price: '₹799', period: '/ month',
        desc: 'For teams that run campaigns at scale.',
        features: ['Unlimited form endpoints', '50,000 submissions / month', 'Unlimited QR campaigns', 'Email leads from submissions', 'QR scan tracking & analytics', 'Submissions chart & KPI dashboard', 'Priority support'],
        cta: 'Start Pro', href: '/prformnce/signup', featured: true,
    },
    {
        name: 'Team', price: 'Custom', period: '',
        desc: 'Higher volume, dedicated support.',
        features: ['Everything in Pro', 'Higher submission volume', 'Team onboarding session', 'Dedicated support channel'],
        cta: 'Contact us', href: 'mailto:vivekg.work@gmail.com?subject=Prformnce Team Plan', featured: false, external: true,
    },
]

// ── Feature row ───────────────────────────────────────────────────────────────

const FeatureRow = ({ f }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-12% 0px' })
    return (
        <div ref={ref} style={{ paddingBottom: '4rem' }}>
            <DrawLine />
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(64px,96px) 1fr', gap: '2rem', paddingTop: '2.25rem' }}>
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.05, ease }}
                >
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '3.5rem', color: 'var(--border)', lineHeight: 1, display: 'block' }}>
                        {f.number}
                    </span>
                </motion.div>
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.12, ease }}
                        style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}
                    >
                        <h3 style={{ margin: 0, fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: 'var(--ink)' }}>{f.title}</h3>
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>{f.tag}</span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.2, ease }}
                        style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text)', maxWidth: '600px', margin: '0 0 1.5rem' }}
                    >
                        {f.desc}
                    </motion.p>
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                        {f.bullets.map((b, j) => (
                            <li key={j} style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500, paddingLeft: '1.25rem', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>—</span>
                                {b}
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </div>
    )
}

// ── Main ──────────────────────────────────────────────────────────────────────

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
    const heroY       = useTransform(scrollYProgress, [0, 0.65], [0, -64])

    const closeMenu = () => setMenuOpen(false)

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

            {/* ── Navbar ── */}
            <header className="landing-nav">
                <Link to="/prformnce" className="landing-logo" onClick={closeMenu}>
                    <div className="landing-logo-dot" />
                    Prformnce
                </Link>

                {/* Desktop nav */}
                <nav className="landing-nav-desktop">
                    <a href="#problem"      className="nav-link">Why Prformnce</a>
                    <a href="#features"     className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it works</a>
                    <a href="#pricing"      className="nav-link">Pricing</a>
                </nav>
                <div className="landing-nav-ctas">
                    <Link to="/prformnce/login"  className="btn-ghost"   style={{ padding: '8px 18px', fontSize: '14px' }}>Sign in</Link>
                    <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>Get started free</Link>
                </div>

                {/* Mobile hamburger */}
                <button className="landing-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
                    {menuOpen ? (
                        <span style={{ fontSize: '22px', lineHeight: 1, color: 'var(--ink)', fontFamily: 'sans-serif', display: 'block' }}>×</span>
                    ) : (
                        <span className="hamburger-bars">
                            <span /><span /><span />
                        </span>
                    )}
                </button>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden', position: 'sticky', top: 64, zIndex: 48, background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
                    >
                        <div style={{ padding: '1.5rem clamp(1.5rem, 4vw, 2rem) 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[['#problem','Why Prformnce'],['#features','Features'],['#how-it-works','How it works'],['#pricing','Pricing']].map(([href, label]) => (
                                <a key={href} href={href} className="nav-link" style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)' }} onClick={closeMenu}>
                                    {label}
                                </a>
                            ))}
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Link to="/prformnce/login"  className="btn-ghost"   style={{ textAlign: 'center', padding: '11px 18px', justifyContent: 'center' }} onClick={closeMenu}>Sign in</Link>
                                <Link to="/prformnce/signup" className="btn-primary" style={{ textAlign: 'center', padding: '11px 18px', justifyContent: 'center' }} onClick={closeMenu}>Get started free</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main style={{ flex: 1 }}>

                {/* ── Hero ── */}
                <section ref={heroRef} style={{
                    minHeight: '100vh', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                    padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 6vw, 6rem)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <motion.div style={{ opacity: heroOpacity, y: heroY, width: '100%', maxWidth: '920px' }}>

                        {/* <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2.5rem' }}
                        >
                            Forms · QR Campaigns · Scan Analytics
                        </motion.p> */}

                        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(3.25rem, 8.5vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: '2rem' }}>
                            <HeroText delay={0.15}>Capture leads.</HeroText>
                            <HeroText delay={0.32}>Track every</HeroText>
                            <HeroText delay={0.50} style={{ color: 'var(--accent)' }}>touchpoint.</HeroText>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.82, ease }}
                            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 2.75rem' }}
                        >
                            Instant form endpoints. Personalised QR-code PDFs. Live analytics.
                            Know exactly who engaged, when, and how.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.96, ease }}
                            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '13px 30px', fontSize: '16px' }}>Start for free</Link>
                            <a href="#how-it-works" className="btn-ghost" style={{ padding: '13px 30px', fontSize: '16px' }}>See how it works</a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.15, duration: 0.6, ease }}
                            style={{
                                display: 'flex', justifyContent: 'center', marginTop: '4.5rem', flexWrap: 'wrap',
                                border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
                                background: 'var(--surface)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
                            }}
                        >
                            {[
                                { value: '< 2 min', label: 'Setup time' },
                                { value: '500+',    label: 'Submissions / day' },
                                { value: '100%',    label: 'Client-side PDF gen' },
                                { value: '₹0',      label: 'To get started' },
                            ].map((s, i) => (
                                <div key={s.label} style={{ flex: '1', minWidth: '120px', padding: '1.5rem 1rem', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                                    <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500, marginTop: '5px' }}>{s.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.7, duration: 0.8 }}
                            style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}
                        >
                            <div style={{ width: 22, height: 34, borderRadius: 11, border: '1.5px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px' }}>
                                <motion.div
                                    animate={{ y: [0, 13, 0] }}
                                    transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{ width: 3, height: 6, borderRadius: 2, background: 'var(--muted)' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── Ticker ── */}
                <Ticker />

                {/* ── Problem ── */}
                <section id="problem" style={{ background: 'var(--ink)', padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)' }}>
                    <div style={{ maxWidth: '860px', margin: '0 auto' }}>

                        <Reveal style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.3)' }}>The problem</span>
                        </Reveal>

                        <ScrollText
                            style={{
                                fontFamily: "'Anton', sans-serif",
                                fontSize: 'clamp(1.85rem, 4vw, 3.25rem)',
                                color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em',
                                textAlign: 'center', marginBottom: '5rem',
                            }}
                        >
                            You're collecting leads. But you don't know what happens next.
                        </ScrollText>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {problems.map((p, i) => (
                                <Reveal key={i} delay={i * 0.1}>
                                    <div style={{
                                        display: 'grid', gridTemplateColumns: '52px 1fr', gap: '2rem',
                                        padding: i > 0 ? '3rem 0' : '0 0 3rem',
                                        borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                    }}>
                                        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '2.25rem', color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>
                                            {p.number}
                                        </span>
                                        <div>
                                            <p style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1rem)', color: 'rgba(255,255,255,0.32)', lineHeight: 1.75, marginBottom: '0.875rem', fontStyle: 'italic', margin: '0 0 0.875rem' }}>
                                                "{p.before}"
                                            </p>
                                            <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
                                                {p.after}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section id="features" style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)' }}>
                    <Reveal style={{ marginBottom: '4.5rem' }}>
                        <span className="section-eyebrow">What you get</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', margin: '0.5rem 0 1rem' }}>Four tools. One dashboard.</h2>
                        <p style={{ color: 'var(--text)', maxWidth: '480px', fontSize: '1.05rem', lineHeight: 1.75, margin: 0 }}>
                            Everything you need to collect, distribute, track, and follow up — without stitching together five different tools.
                        </p>
                    </Reveal>
                    {features.map((f, i) => <FeatureRow key={i} f={f} />)}
                </section>

                {/* ── How it works ── */}
                <section id="how-it-works" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)' }}>
                    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                        <Reveal style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                            <span className="section-eyebrow">How it works</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', margin: '0.5rem 0 0' }}>Two flows. Both take minutes.</h2>
                        </Reveal>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: '4rem' }}>

                            {/* Flow 1 */}
                            <div>
                                <Reveal style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '1rem', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)', margin: 0 }}>
                                        Form Endpoint Flow
                                    </h3>
                                </Reveal>
                                {[
                                    { num: '1', title: 'Create a form', desc: 'Give it a name. Prformnce generates a unique submission URL instantly.' },
                                    { num: '2', title: 'Drop it into your HTML', desc: 'Set action="<your-endpoint>" on any <form> tag. That\'s your entire backend.' },
                                    { num: '3', title: 'Leads arrive live', desc: 'Every submission shows up in your dashboard in real time. Search, filter, email directly.' },
                                ].map((step, i) => (
                                    <Reveal key={i} delay={i * 0.1} style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.25rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Anton', sans-serif", fontSize: '1rem', color: 'var(--accent)' }}>
                                                {step.num}
                                            </div>
                                            {i < 2 && (
                                                <motion.div
                                                    style={{ width: 1, flex: 1, minHeight: '2.5rem', background: 'var(--border)', transformOrigin: 'top' }}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease }}
                                                />
                                            )}
                                        </div>
                                        <div style={{ paddingTop: '6px', paddingBottom: '1.75rem' }}>
                                            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)', marginBottom: '4px' }}>{step.title}</div>
                                            <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{step.desc}</div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            {/* Flow 2 */}
                            <div>
                                <Reveal style={{ marginBottom: '2rem' }}>
                                    <h3 style={{ fontFamily: "'Anton', sans-serif", fontSize: '1rem', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)', margin: 0 }}>
                                        QR Campaign Flow
                                    </h3>
                                </Reveal>
                                {[
                                    { num: '1', title: 'Design your PDF', desc: 'Pick a template or start blank. Customise everything in the browser — no Photoshop needed.' },
                                    { num: '2', title: 'Upload your CSV', desc: 'One row per recipient. Prformnce maps your columns and assigns each person a unique QR code.' },
                                    { num: '3', title: 'Generate and distribute', desc: 'Download a PDF bundle — one page per person. Distribute digitally or print and hand out.' },
                                    { num: '4', title: 'Track engagement', desc: 'See who scanned, how many times, and when. Know exactly who engaged with your material.' },
                                ].map((step, i) => (
                                    <Reveal key={i} delay={i * 0.1} style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.25rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Anton', sans-serif", fontSize: '1rem', color: 'var(--accent)' }}>
                                                {step.num}
                                            </div>
                                            {i < 3 && (
                                                <motion.div
                                                    style={{ width: 1, flex: 1, minHeight: '2.5rem', background: 'var(--border)', transformOrigin: 'top' }}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease }}
                                                />
                                            )}
                                        </div>
                                        <div style={{ paddingTop: '6px', paddingBottom: '1.75rem' }}>
                                            <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)', marginBottom: '4px' }}>{step.title}</div>
                                            <div style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>{step.desc}</div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Use cases ── */}
                <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)' }}>
                    <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-eyebrow">Who it's for</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', margin: '0.5rem 0 0' }}>Built for whoever needs to know who showed up</h2>
                    </Reveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {useCases.map((u, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -5, boxShadow: 'var(--shadow-md, 0 8px 24px rgba(0,0,0,0.08))' }}
                                    transition={{ duration: 0.25, ease }}
                                    style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', background: 'var(--surface)', height: '100%', cursor: 'default' }}
                                >
                                    <h3 style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, fontSize: '1.75rem', color: 'var(--ink)', marginBottom: '0.875rem', lineHeight: 1 }}>{u.label}</h3>
                                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.8, color: 'var(--text)' }}>{u.desc}</p>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ── Mid CTA ── */}
                <div style={{ background: 'var(--accent-tint)', borderTop: '1px solid rgba(37,99,235,0.15)', borderBottom: '1px solid rgba(37,99,235,0.15)', padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}>
                    <Reveal>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', marginBottom: '0.75rem', color: 'var(--ink)' }}>Ready to see it in action?</h2>
                        <p style={{ color: 'var(--text)', fontSize: '1rem', marginBottom: '1.75rem' }}>Free plan. No credit card. Set up your first form endpoint in under 2 minutes.</p>
                        <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '13px 32px', fontSize: '16px' }}>Create your free account</Link>
                    </Reveal>
                </div>

                {/* ── Pricing ── */}
                <section id="pricing" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)' }}>
                    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                        <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <span className="section-eyebrow">Pricing</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', margin: '0.5rem 0 1rem' }}>Start free. Scale when you need to.</h2>
                            <p style={{ color: 'var(--text)', fontSize: '1.05rem', maxWidth: '400px', margin: '0 auto' }}>No credit card required. The free plan includes everything to get started.</p>
                        </Reveal>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
                            {plans.map((plan, i) => (
                                <Reveal key={i} delay={i * 0.1}>
                                    <div className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                                        {plan.featured && <div className="pricing-badge">Most Popular</div>}
                                        <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--muted)' }}>
                                            {plan.name}
                                        </div>
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: '2.75rem', lineHeight: 1, color: plan.featured ? '#fff' : 'var(--ink)' }}>{plan.price}</span>
                                            {plan.period && <span style={{ fontSize: '14px', marginLeft: '4px', color: plan.featured ? 'rgba(255,255,255,0.45)' : 'var(--muted)' }}>{plan.period}</span>}
                                        </div>
                                        <p style={{ fontSize: '13px', marginBottom: '1.5rem', lineHeight: 1.5, color: plan.featured ? 'rgba(255,255,255,0.55)' : 'var(--muted)' }}>{plan.desc}</p>
                                        <ul style={{ margin: '0 0 1.75rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                            {plan.features.map(f => (
                                                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--text)' }}>
                                                    <span style={{ color: plan.featured ? 'rgba(255,255,255,0.4)' : 'var(--accent)', fontWeight: 700, flexShrink: 0, lineHeight: 1.5 }}>—</span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        {plan.external ? (
                                            <a href={plan.href} style={{ display: 'block', textAlign: 'center', padding: '11px 20px', borderRadius: 'var(--r-sm)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', fontFamily: "'Satoshi', sans-serif", background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--border)', transition: 'border-color 0.15s, color 0.15s' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink)' }}>
                                                {plan.cta}
                                            </a>
                                        ) : (
                                            <Link to={plan.href} style={{ display: 'block', textAlign: 'center', padding: '11px 20px', borderRadius: 'var(--r-sm)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', fontFamily: "'Satoshi', sans-serif", background: plan.featured ? '#fff' : 'var(--accent)', color: plan.featured ? 'var(--ink)' : '#fff', transition: 'opacity 0.15s, transform 0.12s' }}
                                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                                                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none' }}>
                                                {plan.cta}
                                            </Link>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.3} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap', marginTop: '2.5rem' }}>
                            {['No credit card to start', 'Cancel anytime', 'Upgrade from your dashboard'].map(item => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>—</span>
                                    {item}
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </section>

                {/* ── Final CTA Band ── */}
                <div className="cta-band">
                    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                        <ScrollText style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: '1.25rem' }}>
                            Stop guessing. Start knowing.
                        </ScrollText>
                        <Reveal delay={0.3}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 auto 2.5rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
                                Set up your first form endpoint or QR campaign in minutes. Free, no card required.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/prformnce/signup" className="btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>Get started free</Link>
                                <Link to="/prformnce/login"
                                    style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.18)', borderRadius: 'var(--r-sm)', textDecoration: 'none', fontFamily: "'Satoshi', sans-serif", transition: 'color 0.12s, border-color 0.12s' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}>
                                    Sign in
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem clamp(1.5rem, 5vw, 3rem)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#E5E7EB', letterSpacing: '-0.02em' }}>Prformnce</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {[['#problem','Why Prformnce'],['#features','Features'],['#how-it-works','How it works'],['#pricing','Pricing']].map(([href, label]) => (
                            <a key={href} href={href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}>{label}</a>
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
