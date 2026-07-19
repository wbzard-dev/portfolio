import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { FormField, SubmitButton, hexToRgba, DEFAULT_FIELDS } from '../shared'

/* ── Form section ─────────────────────────────────────────────────────────
 * Centered form card inside a full-width band. Success state replaces card.
 * ──────────────────────────────────────────────────────────────────────── */

const Form = ({ config, brandColor, campaignName, onSubmit, submitting, submitted }) => {
    const fields = (config?.form_fields?.length ? config.form_fields : DEFAULT_FIELDS)
    const [formData, setFormData] = useState({})

    const handleChange = (name, value) => setFormData(prev => ({ ...prev, [name]: value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onSubmit?.(formData)
    }

    const successMessage = config?.success_message || "Thanks — we'll be in touch shortly."

    return (
        <section
            id="form"
            style={{
                padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)',
                background: '#F9F9F7',
                borderTop: '1px solid #E5E4E0',
                borderBottom: '1px solid #E5E4E0',
            }}
        >
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                {config?.section_headline && (
                    <h2
                        style={{
                            margin: 0,
                            marginBottom: 12,
                            fontFamily: 'Satoshi, sans-serif',
                            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.15,
                            color: '#0D0D0D',
                        }}
                    >
                        {config.section_headline}
                    </h2>
                )}
                {config?.section_subhead && (
                    <p style={{
                        margin: 0, marginBottom: 32,
                        fontSize: 15,
                        color: '#6B7280',
                        lineHeight: 1.55,
                    }}>
                        {config.section_subhead}
                    </p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background: '#fff',
                        borderRadius: 20,
                        padding: 36,
                        boxShadow: '0 24px 48px rgba(0,0,0,0.06), 0 8px 16px rgba(0,0,0,0.04)',
                        border: '1px solid #F0EFEC',
                        textAlign: 'left',
                    }}
                >
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', textAlign: 'center',
                                padding: '20px 8px',
                            }}
                        >
                            <div style={{
                                width: 64, height: 64, borderRadius: '50%',
                                background: hexToRgba(brandColor, 0.12),
                                color: brandColor,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: 20,
                            }}>
                                <CheckCircle2 size={32} strokeWidth={2} />
                            </div>
                            <h3 style={{
                                fontFamily: 'Satoshi, sans-serif',
                                fontWeight: 700, fontSize: '1.4rem',
                                margin: 0, marginBottom: 8, color: '#0D0D0D',
                                letterSpacing: '-0.02em',
                            }}>
                                You're all set.
                            </h3>
                            <p style={{
                                fontSize: 15, color: '#6B7280', lineHeight: 1.55,
                                margin: 0, maxWidth: 340,
                            }}>
                                {successMessage}
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            {/* Honeypot */}
                            <input
                                type="text" name="b_hp" tabIndex={-1} autoComplete="off"
                                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                                onChange={e => handleChange('b_hp', e.target.value)}
                            />
                            {fields.map(field => (
                                <FormField
                                    key={field.name}
                                    field={field}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    brandColor={brandColor}
                                />
                            ))}
                            <SubmitButton brandColor={brandColor} submitting={submitting} style={{ marginTop: 6 }}>
                                {submitting ? 'Sending…' : (config?.cta_text || 'Submit')}
                            </SubmitButton>
                            <p style={{
                                fontSize: 12, color: '#9CA3AF',
                                textAlign: 'center', margin: 0, marginTop: 4,
                            }}>
                                By submitting you agree to be contacted about {campaignName || 'this campaign'}.
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export default Form
