import React from 'react'
import { Mail, Phone, Globe } from 'lucide-react'

/* ── Footer section ───────────────────────────────────────────────────────
 * Contact points + Prformnce credit. Minimal, low-contrast.
 * ──────────────────────────────────────────────────────────────────────── */

const Footer = ({ config, campaignName }) => (
    <section style={{
        padding: '40px clamp(20px, 5vw, 48px)',
        background: '#fff',
        borderTop: '1px solid #E5E4E0',
    }}>
        <div style={{
            maxWidth: 1180, margin: '0 auto',
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',
            gap: 20, flexWrap: 'wrap',
        }}>
            <div style={{
                display: 'flex', gap: 24, flexWrap: 'wrap',
                fontSize: 14, color: '#6B7280',
            }}>
                {config?.email && (
                    <a
                        href={`mailto:${config.email}`}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            color: '#4B5563', textDecoration: 'none',
                        }}
                    >
                        <Mail size={14} /> {config.email}
                    </a>
                )}
                {config?.phone && (
                    <a
                        href={`tel:${config.phone}`}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            color: '#4B5563', textDecoration: 'none',
                        }}
                    >
                        <Phone size={14} /> {config.phone}
                    </a>
                )}
                {config?.website && (
                    <a
                        href={config.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            color: '#4B5563', textDecoration: 'none',
                        }}
                    >
                        <Globe size={14} /> {new URL(config.website).hostname.replace('www.', '')}
                    </a>
                )}
            </div>
            <div style={{
                fontSize: 12, color: '#9CA3AF',
                display: 'flex', alignItems: 'center', gap: 6,
            }}>
                {config?.copyright && <span>© {config.copyright}</span>}
                <span>Powered by</span>
                <span style={{ color: '#4B5563', fontWeight: 600 }}>Prformnce</span>
            </div>
        </div>
    </section>
)

export default Footer
