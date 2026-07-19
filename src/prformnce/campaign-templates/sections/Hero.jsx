import React from 'react'
import { motion } from 'framer-motion'
import { hexToRgba } from '../shared'

/* ── Hero section ─────────────────────────────────────────────────────────
 * Two-column airy layout: text on the left, optional image on the right.
 * If no image, text is centered and gets more breathing room.
 * ──────────────────────────────────────────────────────────────────────── */

const Hero = ({ config, brandColor }) => {
    const hasImage = !!config?.image_url
    const hasCta = !!config?.cta_text

    return (
        <section
            style={{
                padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 48px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle brand-tinted glow */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-15%',
                    width: 640,
                    height: 640,
                    background: `radial-gradient(circle, ${hexToRgba(brandColor, 0.10)} 0%, transparent 60%)`,
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    maxWidth: 1180,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: hasImage ? 'minmax(0, 1.15fr) minmax(0, 1fr)' : '1fr',
                    gap: 72,
                    alignItems: 'center',
                    textAlign: hasImage ? 'left' : 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
                className="section-hero-grid"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={hasImage ? {} : { maxWidth: 760, margin: '0 auto' }}
                >
                    {config?.eyebrow && (
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '6px 14px',
                                borderRadius: 100,
                                background: hexToRgba(brandColor, 0.10),
                                color: brandColor,
                                fontSize: 12,
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                marginBottom: 24,
                            }}
                        >
                            <span style={{
                                width: 6, height: 6, borderRadius: '50%', background: brandColor,
                            }} />
                            {config.eyebrow}
                        </div>
                    )}

                    <h1
                        style={{
                            fontFamily: 'Anton, sans-serif',
                            fontWeight: 400,
                            fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
                            lineHeight: 0.98,
                            letterSpacing: '-0.015em',
                            margin: 0,
                            marginBottom: 22,
                            color: '#0D0D0D',
                        }}
                    >
                        {config?.headline || 'Your headline goes here'}
                    </h1>

                    {config?.subhead && (
                        <p
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
                                lineHeight: 1.55,
                                color: '#4B5563',
                                margin: 0,
                                marginBottom: hasCta ? 32 : 0,
                                maxWidth: hasImage ? 520 : 620,
                                ...(hasImage ? {} : { marginLeft: 'auto', marginRight: 'auto' }),
                            }}
                        >
                            {config.subhead}
                        </p>
                    )}

                    {hasCta && (
                        <a
                            href={config.cta_url || '#form'}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '14px 26px',
                                background: brandColor,
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: 10,
                                fontWeight: 600,
                                fontSize: 15,
                                boxShadow: `0 8px 24px ${hexToRgba(brandColor, 0.28)}`,
                                transition: 'transform 120ms ease, box-shadow 120ms ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-1px)'
                                e.currentTarget.style.boxShadow = `0 12px 32px ${hexToRgba(brandColor, 0.35)}`
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'none'
                                e.currentTarget.style.boxShadow = `0 8px 24px ${hexToRgba(brandColor, 0.28)}`
                            }}
                        >
                            {config.cta_text}
                        </a>
                    )}
                </motion.div>

                {hasImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow: '0 24px 48px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05)',
                            aspectRatio: '4 / 5',
                        }}
                    >
                        <img
                            src={config.image_url}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </motion.div>
                )}
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .section-hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                }
            `}</style>
        </section>
    )
}

export default Hero
