import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowRight, FileText, QrCode, BarChart2,
    CheckCircle2, Star, Shield, Clock, Zap
} from 'lucide-react'

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
}

const Logo = () => (
    <Link to="/app" className="landing-logo">
        <div className="landing-logo-dot" />
        GetSanket
    </Link>
)

const features = [
    {
        icon: <FileText size={20} color="#2563EB" />,
        title: 'Smart Form Endpoints',
        desc: 'Generate a unique API endpoint for any HTML form in seconds. Every submission captured, timestamped, and stored automatically.',
        bullets: ['Works with any HTML form', 'No backend code required', 'Instant notifications']
    },
    {
        icon: <QrCode size={20} color="#2563EB" />,
        title: 'QR Campaign Generator',
        desc: 'Upload a CSV, pick a template, and generate personalized PDFs with unique trackable QR codes per recipient.',
        bullets: ['Bulk PDF generation', 'Per-recipient QR tracking', 'Custom branding support']
    },
    {
        icon: <BarChart2 size={20} color="#2563EB" />,
        title: 'Engagement Analytics',
        desc: 'See exactly who submitted, who scanned, when and from where. Identify your hottest leads and act fast.',
        bullets: ['Real-time dashboard', 'Geolocation data', 'Full submission history']
    }
]

const testimonials = [
    {
        name: 'Priya M.',
        role: 'Growth Lead, Fintech startup',
        text: 'GetSanket cut our lead response time in half. We know the moment someone submits — no more checking spreadsheets.'
    },
    {
        name: 'Rajan K.',
        role: 'Head of Events, EdTech co.',
        text: 'The QR campaign feature is a game changer. We tracked 3,000 attendees at our last conference with zero setup friction.'
    },
    {
        name: 'Sneha P.',
        role: 'Founder, D2C Brand',
        text: 'Finally a tool that just works. I set up my first form endpoint in under 5 minutes and submissions started flowing.'
    }
]

const plans = [
    {
        name: 'Free',
        price: '₹0',
        period: 'forever',
        features: ['3 form endpoints', '500 submissions/month', '2 QR campaigns', 'Email leads from submissions', 'Submission analytics'],
        cta: 'Get started free',
        featured: false
    },
    {
        name: 'Pro',
        price: '₹799',
        period: '/month',
        features: ['Unlimited form endpoints', '50,000 submissions/month', 'Unlimited QR campaigns', 'Email leads from submissions', 'QR scan tracking & analytics', 'Submissions chart & KPI dashboard', 'Priority support'],
        cta: 'Start Pro',
        featured: true
    },
    {
        name: 'Team',
        price: 'Custom',
        period: '',
        features: ['Everything in Pro', 'Higher submission volume', 'Team onboarding', 'Dedicated support'],
        cta: 'Contact us',
        featured: false,
        contactUs: true
    }
]

const trust = [
    { icon: Shield, label: 'SOC 2 compliant' },
    { icon: Clock, label: 'Setup in under 2 minutes' },
    { icon: CheckCircle2, label: 'No credit card required' },
    { icon: Zap, label: 'Loved by 500+ teams' }
]

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

            {/* ── Navbar ── */}
            <header className="landing-nav">
                <Logo />

                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it works</a>
                    <a href="#pricing" className="nav-link">Pricing</a>
                </nav>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Link to="/app/login" className="btn-ghost" style={{ padding: '8px 18px', fontSize: '14px' }}>
                        Sign in
                    </Link>
                    <Link to="/app/signup" className="btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                        Get started free <ArrowRight size={14} />
                    </Link>
                </div>
            </header>

            <main style={{ flex: 1 }}>

                {/* ── Hero ── */}
                <section style={{
                    padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)',
                    textAlign: 'center',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    <motion.div variants={stagger} initial="hidden" animate="show">
                        <motion.div variants={fadeUp} style={{ marginBottom: '2rem' }}>
                            <span className="eyebrow-badge"><Zap size={11} /> Lead Tracking Platform</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="font-display"
                            style={{
                                fontSize: 'clamp(3.25rem, 7.5vw, 6.5rem)',
                                color: 'var(--ink)',
                                marginBottom: '1.5rem',
                                lineHeight: 1.0
                            }}
                        >
                            Stop missing leads.<br />
                            <span style={{ color: 'var(--accent)' }}>Start closing deals.</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            style={{
                                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                color: 'var(--text)',
                                maxWidth: '560px',
                                margin: '0 auto 2.5rem',
                                lineHeight: 1.75
                            }}
                        >
                            Real-time form submissions, QR campaign tracking, and engagement analytics —
                            all in one dashboard built for teams that can't afford to miss a lead.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <Link to="/app/signup" className="btn-primary" style={{ padding: '13px 28px', fontSize: '16px' }}>
                                Start for free <ArrowRight size={17} />
                            </Link>
                            <a href="#how-it-works" className="btn-ghost" style={{ padding: '13px 28px', fontSize: '16px' }}>
                                See how it works
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        style={{
                            display: 'flex', gap: '0', justifyContent: 'center',
                            marginTop: '4rem', flexWrap: 'wrap',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--r-lg)',
                            background: 'var(--surface)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        {[
                            { value: '2M+', label: 'Leads tracked' },
                            { value: '500+', label: 'Teams using GetSanket' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: '<2 min', label: 'Setup time' }
                        ].map((s, i) => (
                            <div key={s.label} style={{
                                flex: '1', minWidth: '120px',
                                padding: '1.5rem 1rem', textAlign: 'center',
                                borderRight: i < 3 ? '1px solid var(--border)' : 'none'
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

                {/* ── Trust strip ── */}
                <div style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--surface)',
                    padding: '1.1rem clamp(1.5rem, 5vw, 3rem)',
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', gap: 'clamp(1.5rem, 4vw, 3rem)',
                    flexWrap: 'wrap'
                }}>
                    {trust.map(({ icon: Icon, label }) => (
                        <div key={label} style={{
                            display: 'flex', alignItems: 'center', gap: '7px',
                            color: 'var(--text)', fontSize: '13px', fontWeight: 500
                        }}>
                            <Icon size={15} color="var(--accent)" />
                            {label}
                        </div>
                    ))}
                </div>

                {/* ── Features ── */}
                <section id="features" style={{
                    maxWidth: '1100px', margin: '0 auto',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <span className="section-eyebrow">Features</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
                            Everything you need to track leads at scale
                        </h2>
                        <p style={{ color: 'var(--text)', maxWidth: '500px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            Three powerful tools in one platform — form tracking, QR campaigns,
                            and analytics that actually tell you something useful.
                        </p>
                    </div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '1.25rem'
                        }}
                    >
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="card"
                                style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
                            >
                                <div className="feature-icon-wrap">{f.icon}</div>
                                <h3 style={{ marginBottom: '0.625rem', fontSize: '1.1rem' }}>{f.title}</h3>
                                <p style={{ margin: '0 0 1.25rem', fontSize: '14px', lineHeight: 1.75, color: 'var(--text)', flex: 1 }}>
                                    {f.desc}
                                </p>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                    {f.bullets.map(b => (
                                        <li key={b} style={{
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                            fontSize: '13px', color: 'var(--text)', fontWeight: 500
                                        }}>
                                            <CheckCircle2 size={14} color="var(--accent)" style={{ flexShrink: 0 }} />
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
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)'
                }}>
                    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="section-eyebrow">How it works</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                                Up and running in minutes
                            </h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                {
                                    n: '01',
                                    title: 'Create your tracker',
                                    desc: 'Set up a form endpoint or QR campaign in under 2 minutes — no code needed.'
                                },
                                {
                                    n: '02',
                                    title: 'Share your link or QR',
                                    desc: 'Embed the endpoint in your form or distribute QR codes to your audience.'
                                },
                                {
                                    n: '03',
                                    title: 'Watch leads arrive',
                                    desc: 'Monitor every submission and scan in real time from your GetSanket dashboard.'
                                }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--r-lg)',
                                        padding: '1.75rem 2rem'
                                    }}
                                >
                                    <div className="step-number">{step.n}</div>
                                    <div>
                                        <h3 style={{ marginBottom: '6px' }}>{step.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Testimonials ── */}
                <section style={{
                    maxWidth: '1100px', margin: '0 auto',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <span className="section-eyebrow">Customer stories</span>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}>
                            Teams that ship faster with GetSanket
                        </h2>
                    </div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1.25rem'
                        }}
                    >
                        {testimonials.map((t, i) => (
                            <motion.div key={i} variants={fadeUp} className="card" style={{ padding: '1.75rem' }}>
                                <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                                    {[...Array(5)].map((_, s) => <Star key={s} size={14} color="#F59E0B" fill="#F59E0B" />)}
                                </div>
                                <p style={{ margin: '0 0 1.25rem', fontSize: '14px', lineHeight: 1.8, color: 'var(--text)' }}>
                                    "{t.text}"
                                </p>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{t.name}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{t.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ── Pricing ── */}
                <section id="pricing" style={{
                    background: 'var(--bg-subtle)',
                    borderTop: '1px solid var(--border)',
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)'
                }}>
                    <div style={{ maxWidth: '920px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            <span className="section-eyebrow">Pricing</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '0.875rem' }}>
                                Start free. Scale as you grow.
                            </h2>
                            <p style={{ color: 'var(--text)', fontSize: '1.05rem', maxWidth: '420px', margin: '0 auto' }}>
                                No credit card required. Free plan includes everything to get started.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '1.25rem',
                            alignItems: 'center'
                        }}>
                            {plans.map((plan, i) => (
                                <div key={i} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                                    {plan.featured && <div className="pricing-badge">Most Popular</div>}

                                    <div style={{
                                        fontSize: '13px', fontWeight: 700, marginBottom: '0.75rem',
                                        color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--muted)',
                                        letterSpacing: '0.05em', textTransform: 'uppercase'
                                    }}>
                                        {plan.name}
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span style={{
                                            fontFamily: "'Anton', sans-serif",
                                            fontSize: '2.75rem', lineHeight: 1,
                                            color: plan.featured ? '#FFFFFF' : 'var(--ink)'
                                        }}>
                                            {plan.price}
                                        </span>
                                        <span style={{
                                            fontSize: '14px', marginLeft: '4px',
                                            color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--muted)'
                                        }}>
                                            {plan.period}
                                        </span>
                                    </div>

                                    <ul style={{
                                        margin: '0 0 1.75rem', padding: 0, listStyle: 'none',
                                        display: 'flex', flexDirection: 'column', gap: '9px'
                                    }}>
                                        {plan.features.map(f => (
                                            <li key={f} style={{
                                                display: 'flex', alignItems: 'center', gap: '9px',
                                                fontSize: '14px',
                                                color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--text)'
                                            }}>
                                                <CheckCircle2
                                                    size={15}
                                                    color={plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--accent)'}
                                                    style={{ flexShrink: 0 }}
                                                />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {plan.contactUs ? (
                                        <a
                                            href="mailto:vivekg.work@gmail.com?subject=GetSanket Team Plan"
                                            style={{
                                                display: 'block', textAlign: 'center',
                                                padding: '11px 20px', borderRadius: 'var(--r-sm)',
                                                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                                                fontFamily: "'Satoshi', sans-serif",
                                                background: 'transparent',
                                                color: 'var(--ink)',
                                                border: '1.5px solid var(--border)',
                                                transition: 'border-color 0.15s, color 0.15s'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink)' }}
                                        >
                                            {plan.cta}
                                        </a>
                                    ) : (
                                        <Link
                                            to="/app/signup"
                                            style={{
                                                display: 'block', textAlign: 'center',
                                                padding: '11px 20px', borderRadius: 'var(--r-sm)',
                                                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                                                fontFamily: "'Satoshi', sans-serif",
                                                background: plan.featured ? '#FFFFFF' : 'var(--accent)',
                                                color: plan.featured ? 'var(--ink)' : 'white',
                                                transition: 'opacity 0.15s, transform 0.12s'
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
                    </div>
                </section>

                {/* ── CTA Band ── */}
                <div className="cta-band">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ maxWidth: '600px', margin: '0 auto' }}
                    >
                        <h2 style={{
                            fontFamily: "'Anton', sans-serif", fontWeight: 400,
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#FFFFFF',
                            lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: '1.25rem'
                        }}>
                            Start tracking leads in 2 minutes
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0 auto 2.5rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                            Join hundreds of teams already using GetSanket to capture, track, and convert more leads.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link
                                to="/app/signup"
                                className="btn-primary"
                                style={{ padding: '13px 28px', fontSize: '16px' }}
                            >
                                Get started free <ArrowRight size={17} />
                            </Link>
                            <Link
                                to="/app/login"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '13px 28px', fontSize: '16px', fontWeight: 500,
                                    color: 'rgba(255,255,255,0.75)',
                                    border: '1.5px solid rgba(255,255,255,0.2)',
                                    borderRadius: 'var(--r-sm)',
                                    textDecoration: 'none',
                                    fontFamily: "'Satoshi', sans-serif",
                                    transition: 'color 0.12s, border-color 0.12s'
                                }}
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
                padding: '2rem clamp(1.5rem, 5vw, 3rem)'
            }}>
                <div style={{
                    maxWidth: '1100px', margin: '0 auto',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#E5E7EB', letterSpacing: '-0.02em' }}>
                            GetSanket
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {['Features', 'How it works', 'Pricing'].map(item => (
                            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}>
                                {item}
                            </a>
                        ))}
                        <Link to="/app/login" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}>Sign in</Link>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Satoshi', sans-serif" }}>
                        © {new Date().getFullYear()} GetSanket
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
