import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, X } from 'lucide-react'

const TOUR_KEY = 'prformnce_tour_v1_done'
const SPOTLIGHT_PAD = 10

const STEPS = [
    {
        target: null,
        title: 'Welcome to Prformnce',
        body: 'Prformnce helps you collect leads with embeddable HTML forms, track submissions, run email campaigns, and create QR code campaigns — all in one clean workspace. This quick tour takes under a minute.',
        position: 'center',
    },
    {
        target: '[data-tour="sidebar-nav"]',
        title: 'Navigation',
        body: 'Use the sidebar to move between your Overview dashboard and your Workspace. The Workspace is where your Forms and QR Campaigns live.',
        position: 'right',
    },
    {
        target: '[data-tour="stat-cards"]',
        title: 'At-a-glance metrics',
        body: 'Your key numbers are surfaced here — total forms created, all submissions received, QR campaigns, and your top-performing form. These update in real time as leads come in.',
        position: 'bottom',
    },
    {
        target: '[data-tour="new-form-btn"]',
        title: 'Create a form',
        body: 'Click "New Form" to create a form in seconds. Prformnce gives you a unique endpoint URL — set it as the action of any HTML <form> on your site and submissions land here automatically.',
        position: 'left',
    },
    {
        target: '[data-tour="sidebar-workspace"]',
        title: 'Forms & QR Campaigns',
        body: 'In the Workspace you can manage all your forms, browse every submission, bulk-email leads using built-in templates, and create personalised QR campaigns with scan tracking.',
        position: 'right',
    },
]

const getTooltipStyle = (rect, position) => {
    const TW = 360
    const GAP = SPOTLIGHT_PAD + 18

    if (!rect || position === 'center') {
        return {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 440,
        }
    }

    const vw = window.innerWidth
    const vh = window.innerHeight

    switch (position) {
        case 'right': {
            const left = Math.min(rect.right + GAP, vw - TW - 16)
            const top = Math.max(16, Math.min(rect.top + rect.height / 2 - 100, vh - 240))
            return { position: 'fixed', top, left, width: TW }
        }
        case 'left': {
            const right = Math.max(16, vw - rect.left + GAP)
            const top = Math.max(16, Math.min(rect.top + rect.height / 2 - 100, vh - 240))
            return { position: 'fixed', top, right, width: TW }
        }
        case 'bottom': {
            const top = rect.bottom + GAP
            const left = Math.max(16, Math.min(rect.left + rect.width / 2 - TW / 2, vw - TW - 16))
            return { position: 'fixed', top, left, width: TW }
        }
        case 'top': {
            const bottom = vh - rect.top + GAP
            const left = Math.max(16, Math.min(rect.left + rect.width / 2 - TW / 2, vw - TW - 16))
            return { position: 'fixed', bottom, left, width: TW }
        }
        default:
            return { position: 'fixed', top: 80, right: 24, width: TW }
    }
}

export const shouldShowTour = () => !localStorage.getItem(TOUR_KEY)

export const GuidedTour = ({ onEnd }) => {
    const [step, setStep] = useState(0)
    const [rect, setRect] = useState(null)
    const [alive, setAlive] = useState(true)

    const current = STEPS[step]

    const measureTarget = useCallback(() => {
        if (!current.target) { setRect(null); return }
        const el = document.querySelector(current.target)
        if (!el) { setRect(null); return }
        setRect(el.getBoundingClientRect())
    }, [current.target])

    useEffect(() => {
        measureTarget()
        window.addEventListener('resize', measureTarget)
        return () => window.removeEventListener('resize', measureTarget)
    }, [measureTarget])

    const dismiss = () => {
        localStorage.setItem(TOUR_KEY, '1')
        setAlive(false)
        setTimeout(onEnd, 250)
    }

    const next = () => {
        if (step < STEPS.length - 1) setStep(s => s + 1)
        else dismiss()
    }
    const prev = () => { if (step > 0) setStep(s => s - 1) }

    const tooltipStyle = getTooltipStyle(rect, current.position)

    const spotlightRect = rect ? {
        position: 'fixed',
        top: rect.top - SPOTLIGHT_PAD,
        left: rect.left - SPOTLIGHT_PAD,
        width: rect.width + SPOTLIGHT_PAD * 2,
        height: rect.height + SPOTLIGHT_PAD * 2,
        borderRadius: 12,
        boxShadow: '0 0 0 9999px rgba(13, 17, 23, 0.72)',
        border: '2px solid rgba(37, 99, 235, 0.55)',
        pointerEvents: 'none',
        zIndex: 9998,
        transition: 'top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease',
    } : null

    return (
        <AnimatePresence>
            {alive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ position: 'fixed', inset: 0, zIndex: 9997, pointerEvents: 'none' }}
                >
                    {/* Full backdrop for centered/no-target steps */}
                    {!rect && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(13,17,23,0.72)', pointerEvents: 'all' }}
                        />
                    )}

                    {/* Spotlight cutout */}
                    {rect && <div style={spotlightRect} />}

                    {/* Tooltip card */}
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            ...tooltipStyle,
                            background: 'var(--surface)',
                            borderRadius: 'var(--r-xl)',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-lg)',
                            padding: '1.5rem',
                            pointerEvents: 'all',
                            zIndex: 9999,
                        }}
                    >
                        {/* Header row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            {/* Progress dots */}
                            <div style={{ display: 'flex', gap: 5, alignItems: 'center', paddingTop: 2 }}>
                                {STEPS.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ width: i === step ? 18 : 6, background: i === step ? 'var(--accent)' : i < step ? 'rgba(37,99,235,0.3)' : 'var(--border)' }}
                                        transition={{ duration: 0.2 }}
                                        style={{ height: 6, borderRadius: 3 }}
                                    />
                                ))}
                                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif", marginLeft: 4 }}>
                                    {step + 1}/{STEPS.length}
                                </span>
                            </div>
                            <button
                                onClick={dismiss}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4, borderRadius: 6, display: 'flex', lineHeight: 1, flexShrink: 0 }}
                                title="Close tour"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        <h3 style={{ margin: '0 0 0.5rem', fontFamily: "'Anton', sans-serif", fontSize: '1.35rem', fontWeight: 400, color: 'var(--ink)', letterSpacing: '0.01em', lineHeight: 1.1 }}>
                            {current.title}
                        </h3>
                        <p style={{ margin: '0 0 1.25rem', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--text)', fontFamily: "'Satoshi', sans-serif" }}>
                            {current.body}
                        </p>

                        {/* Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                onClick={dismiss}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--muted)', fontFamily: "'Satoshi', sans-serif", padding: '4px 0' }}
                            >
                                Skip tour
                            </button>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {step > 0 && (
                                    <button
                                        onClick={prev}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 5,
                                            background: 'var(--bg)', border: '1px solid var(--border)',
                                            borderRadius: 'var(--r-sm)', padding: '8px 14px',
                                            cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                                            fontFamily: "'Satoshi', sans-serif", color: 'var(--ink)',
                                        }}
                                    >
                                        <ArrowLeft size={13} /> Back
                                    </button>
                                )}
                                <button
                                    onClick={next}
                                    className="btn-primary"
                                    style={{ padding: '8px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                >
                                    {step === STEPS.length - 1 ? 'Done!' : <><span>Next</span><ArrowRight size={13} /></>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
