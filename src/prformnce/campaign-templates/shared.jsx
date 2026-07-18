import React from 'react'
import { Loader2 } from 'lucide-react'

/* ── Shared form primitive for campaign LPs ──────────────────────────────────
 * Renders one input based on { name, label, type, required, placeholder }.
 * type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
 * For select: pass options: [{ value, label }]
 */
export const FormField = ({ field, value, onChange, brandColor }) => {
    const baseInput = {
        width: '100%',
        padding: '14px 16px',
        border: '1.5px solid #E5E4E0',
        borderRadius: 10,
        fontSize: 15,
        fontFamily: 'Satoshi, sans-serif',
        color: '#0D0D0D',
        background: '#fff',
        outline: 'none',
        transition: 'border-color 120ms ease, box-shadow 120ms ease',
    }

    const handleFocus = (e) => {
        e.target.style.borderColor = brandColor
        e.target.style.boxShadow = `0 0 0 3px ${hexToRgba(brandColor, 0.12)}`
    }
    const handleBlur = (e) => {
        e.target.style.borderColor = '#E5E4E0'
        e.target.style.boxShadow = 'none'
    }

    const shared = {
        name: field.name,
        placeholder: field.placeholder || '',
        required: field.required,
        value: value || '',
        onChange: (e) => onChange(field.name, e.target.value),
        onFocus: handleFocus,
        onBlur: handleBlur,
        style: baseInput,
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label
                htmlFor={field.name}
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#4B5563',
                    fontFamily: 'Satoshi, sans-serif',
                }}
            >
                {field.label}{field.required && <span style={{ color: '#dc2626', marginLeft: 3 }}>*</span>}
            </label>
            {field.type === 'textarea' ? (
                <textarea {...shared} rows={4} style={{ ...baseInput, resize: 'vertical', minHeight: 96 }} />
            ) : field.type === 'select' ? (
                <select {...shared}>
                    <option value="">Select…</option>
                    {(field.options || []).map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input {...shared} type={field.type || 'text'} />
            )}
        </div>
    )
}

/* ── Brand-colored submit button ─────────────────────────────────────────── */

export const SubmitButton = ({ brandColor, submitting, children, style }) => (
    <button
        type="submit"
        disabled={submitting}
        style={{
            width: '100%',
            padding: '14px 20px',
            background: brandColor,
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'Satoshi, sans-serif',
            cursor: submitting ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'transform 120ms ease, filter 120ms ease',
            filter: submitting ? 'saturate(0.7)' : 'none',
            ...style,
        }}
        onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.filter = 'brightness(1.08)' }}
        onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.filter = 'none' }}
    >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        {children}
    </button>
)

/* ── Utilities ────────────────────────────────────────────────────────────── */

export const hexToRgba = (hex, alpha = 1) => {
    const clean = hex.replace('#', '')
    const bigint = parseInt(clean.length === 3
        ? clean.split('').map(c => c + c).join('')
        : clean, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const DEFAULT_BRAND_COLOR = '#2563EB'

export const DEFAULT_FIELDS = [
    { name: 'name',  label: 'Full name', type: 'text',  required: true, placeholder: 'Your name' },
    { name: 'email', label: 'Email',     type: 'email', required: true, placeholder: 'you@example.com' },
]
