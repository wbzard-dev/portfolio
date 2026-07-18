import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone } from 'lucide-react'
import { FormField, SubmitButton, hexToRgba, DEFAULT_BRAND_COLOR, DEFAULT_FIELDS } from './shared'

/* ── Focus template ───────────────────────────────────────────────────────
 * Two-column airy LP. Left: eyebrow + oversized headline + subhead + contact.
 * Right: white card with form. Success state replaces card in-place.
 * Fully responsive: stacks on mobile.
 * ───────────────────────────────────────────────────────────────────────── */

const Focus = ({ config, onSubmit, submitting, submitted, campaignName }) => {
    const brand = config?.brand_color || DEFAULT_BRAND_COLOR
    const fields = (config?.form_fields?.length ? config.form_fields : DEFAULT_FIELDS)
    const [formData, setFormData] = useState({})

    const handleChange = (name, value) => setFormData(prev => ({ ...prev, [name]: value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onSubmit(formData)
    }

    const successMessage = config?.success_message || "Thanks — we'll be in touch."

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#F9F9F7',
                fontFamily: 'Satoshi, sans-serif',
                color: '#0D0D0D',
                display: 'flex',
                alignItems: 'center',
                padding: '48px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Soft brand-tinted background accents */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: 640,
                    height: 640,
                    background: `radial-gradient(circle, ${hexToRgba(brand, 0.09)} 0%, transparent 65%)`,
                    pointerEvents: 'none',
                }}
            />
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-15%',
                    width: 720,
                    height: 720,
                    background: `radial-gradient(circle, ${hexToRgba(brand, 0.05)} 0%, transparent 65%)`,
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: 1180,
                    margin: '0 auto',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
                    gap: 72,
                    alignItems: 'center',
                }}
                className="focus-lp-grid"
            >
                {/* ── LEFT: brand + copy ─────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    {config?.eyebrow && (
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '6px 14px',
                                borderRadius: 100,
                                background: hexToRgba(brand, 0.10),
                                color: brand,
                                fontSize: 12,
                                fontWeight: 600,
                                letterSpacing: '0.02em',
                                textTransform: 'uppercase',
                                marginBottom: 24,
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: brand,
                                }}
                            />
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
                        {config?.headline || 'Something worth waiting for.'}
                    </h1>

                    {config?.subhead && (
                        <p
                            style={{
                                fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
                                lineHeight: 1.55,
                                color: '#4B5563',
                                margin: 0,
                                marginBottom: 32,
                                maxWidth: 520,
                            }}
                        >
                            {config.subhead}
                        </p>
                    )}

                    {(config?.contact?.email || config?.contact?.phone) && (
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 20,
                                paddingTop: 24,
                                borderTop: '1px solid #E5E4E0',
                                fontSize: 14,
                                color: '#6B7280',
                            }}
                        >
                            {config.contact.email && (
                                <a
                                    href={`mailto:${config.contact.email}`}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        color: '#4B5563',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Mail size={15} />{config.contact.email}
                                </a>
                            )}
                            {config.contact.phone && (
                                <a
                                    href={`tel:${config.contact.phone}`}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        color: '#4B5563',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <Phone size={15} />{config.contact.phone}
                                </a>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* ── RIGHT: form card ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background: '#fff',
                        borderRadius: 20,
                        padding: 40,
                        boxShadow: '0 24px 48px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.04)',
                        border: '1px solid #F0EFEC',
                    }}
                >
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '24px 8px',
                            }}
                        >
                            <div
                                style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    background: hexToRgba(brand, 0.12),
                                    color: brand,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <CheckCircle2 size={32} strokeWidth={2} />
                            </div>
                            <h2
                                style={{
                                    fontFamily: 'Satoshi, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '1.5rem',
                                    letterSpacing: '-0.02em',
                                    margin: 0,
                                    marginBottom: 8,
                                    color: '#0D0D0D',
                                }}
                            >
                                You're all set.
                            </h2>
                            <p
                                style={{
                                    fontSize: 15,
                                    lineHeight: 1.55,
                                    color: '#6B7280',
                                    margin: 0,
                                    maxWidth: 340,
                                }}
                            >
                                {successMessage}
                            </p>
                        </motion.div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                        >
                            {/* Honeypot */}
                            <input
                                type="text"
                                name="b_hp"
                                tabIndex={-1}
                                autoComplete="off"
                                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                                onChange={(e) => handleChange('b_hp', e.target.value)}
                            />

                            {fields.map(field => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    brandColor={brand}
                                />
                            ))}

                            <SubmitButton brandColor={brand} submitting={submitting} style={{ marginTop: 6 }}>
                                {submitting ? 'Sending…' : (config?.cta_text || 'Submit')}
                            </SubmitButton>

                            <p
                                style={{
                                    fontSize: 12,
                                    color: '#9CA3AF',
                                    textAlign: 'center',
                                    margin: 0,
                                    marginTop: 4,
                                }}
                            >
                                By submitting you agree to be contacted about {campaignName || 'this campaign'}.
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>

            {/* Prformnce credit — subtle, bottom-left */}
            <div
                style={{
                    position: 'fixed',
                    bottom: 20,
                    left: 20,
                    fontSize: 11,
                    color: '#9CA3AF',
                    fontFamily: 'Satoshi, sans-serif',
                    letterSpacing: '0.02em',
                }}
            >
                Powered by <span style={{ color: '#4B5563', fontWeight: 600 }}>Prformnce</span>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .focus-lp-grid {
                        grid-template-columns: 1fr !important;
                        gap: 48px !important;
                    }
                }
            `}</style>
        </div>
    )
}

export default Focus
