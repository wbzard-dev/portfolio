import React from 'react'
import { getSectionDef } from './sections'
import { DEFAULT_BRAND_COLOR } from './shared'

/* ── Focus template ───────────────────────────────────────────────────────
 * Thin shell that renders the ordered `sections` array from config.
 * Each section is a registered component in the SECTION_CATALOG.
 * ──────────────────────────────────────────────────────────────────────── */

const Focus = ({ config, campaignName, onSubmit, submitting, submitted }) => {
    const sections = Array.isArray(config?.sections) ? config.sections : []
    const brandColor = config?.brand_color || DEFAULT_BRAND_COLOR

    if (sections.length === 0) {
        // Never publish an empty page — but guard just in case
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F9F9F7',
                color: '#6B7280',
                fontFamily: 'Satoshi, sans-serif',
            }}>
                This page has no content yet.
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#F9F9F7',
            fontFamily: 'Satoshi, sans-serif',
            color: '#0D0D0D',
        }}>
            {sections.map(section => {
                const def = getSectionDef(section.type)
                if (!def) return null
                const Component = def.component
                return (
                    <Component
                        key={section.id}
                        config={section.config || {}}
                        brandColor={brandColor}
                        campaignName={campaignName}
                        onSubmit={onSubmit}
                        submitting={submitting}
                        submitted={submitted}
                    />
                )
            })}
        </div>
    )
}

export default Focus
