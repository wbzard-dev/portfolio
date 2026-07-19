import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Shield, Sparkles, TrendingUp, Users, Rocket } from 'lucide-react'
import { hexToRgba } from '../shared'

/* ── Features section — 3-column grid ────────────────────────────────────
 * Each feature has an icon, title, and description.
 * Icons are from a fixed set, referenced by name in the config.
 * ──────────────────────────────────────────────────────────────────────── */

const ICONS = { Check, Zap, Star, Shield, Sparkles, TrendingUp, Users, Rocket }

const Features = ({ config, brandColor }) => {
    const features = config?.features?.length ? config.features : DEFAULT_FEATURES

    return (
        <section style={{
            padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)',
            background: '#fff',
        }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', textAlign: 'center' }}>
                {config?.section_headline && (
                    <h2 style={{
                        margin: 0, marginBottom: 12,
                        fontFamily: 'Satoshi, sans-serif',
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.15,
                        color: '#0D0D0D',
                    }}>
                        {config.section_headline}
                    </h2>
                )}
                {config?.section_subhead && (
                    <p style={{
                        margin: 0, marginBottom: 56,
                        fontSize: 15, color: '#6B7280', lineHeight: 1.55,
                        maxWidth: 620, marginLeft: 'auto', marginRight: 'auto',
                    }}>
                        {config.section_subhead}
                    </p>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 32,
                    textAlign: 'left',
                }}>
                    {features.map((feat, i) => {
                        const Icon = ICONS[feat.icon] || Check
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div style={{
                                    width: 44, height: 44,
                                    borderRadius: 10,
                                    background: hexToRgba(brandColor, 0.12),
                                    color: brandColor,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: 16,
                                }}>
                                    <Icon size={20} strokeWidth={2.2} />
                                </div>
                                <h3 style={{
                                    margin: 0, marginBottom: 6,
                                    fontFamily: 'Satoshi, sans-serif',
                                    fontSize: '1.05rem', fontWeight: 700,
                                    letterSpacing: '-0.01em',
                                    color: '#0D0D0D',
                                }}>
                                    {feat.title}
                                </h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: 14, color: '#6B7280', lineHeight: 1.6,
                                }}>
                                    {feat.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

const DEFAULT_FEATURES = [
    { icon: 'Zap',       title: 'Fast',    description: 'Set up in minutes, not hours. No developer needed.' },
    { icon: 'Shield',    title: 'Secure',  description: 'Every submission is stored safely, encrypted at rest.' },
    { icon: 'TrendingUp', title: 'Trackable', description: 'See every view, click, and conversion in one dashboard.' },
]

export default Features
