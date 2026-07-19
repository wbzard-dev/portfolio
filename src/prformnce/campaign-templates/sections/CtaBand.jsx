import React from 'react'
import { motion } from 'framer-motion'
import { hexToRgba } from '../shared'

/* ── CTA Band ─────────────────────────────────────────────────────────────
 * Full-width dark section with a headline and a scroll-to-form CTA.
 * ──────────────────────────────────────────────────────────────────────── */

const CtaBand = ({ config, brandColor }) => (
    <section style={{
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 48px)',
        background: '#0D0D0D',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
    }}>
        <div
            aria-hidden
            style={{
                position: 'absolute',
                top: '-50%', right: '-10%',
                width: 600, height: 600,
                background: `radial-gradient(circle, ${hexToRgba(brandColor, 0.20)} 0%, transparent 60%)`,
                pointerEvents: 'none',
            }}
        />
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
                maxWidth: 900, margin: '0 auto',
                textAlign: 'center',
                position: 'relative', zIndex: 1,
            }}
        >
            <h2 style={{
                margin: 0, marginBottom: 14,
                fontFamily: 'Anton, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#fff',
            }}>
                {config?.headline || 'Ready to get started?'}
            </h2>
            {config?.subhead && (
                <p style={{
                    margin: 0, marginBottom: 32,
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                    color: '#9CA3AF',
                    lineHeight: 1.55,
                    maxWidth: 580, marginLeft: 'auto', marginRight: 'auto',
                }}>
                    {config.subhead}
                </p>
            )}
            <a
                href={config?.cta_url || '#form'}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center', gap: 8,
                    padding: '14px 28px',
                    background: brandColor,
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 15,
                    boxShadow: `0 12px 32px ${hexToRgba(brandColor, 0.30)}`,
                    transition: 'transform 120ms ease, box-shadow 120ms ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = `0 16px 40px ${hexToRgba(brandColor, 0.40)}`
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = `0 12px 32px ${hexToRgba(brandColor, 0.30)}`
                }}
            >
                {config?.cta_text || 'Get started'}
            </a>
        </motion.div>
    </section>
)

export default CtaBand
