import Hero from './Hero'
import FormSection from './Form'
import Features from './Features'
import CtaBand from './CtaBand'
import Footer from './Footer'
import { Sparkles, Layout, LayoutList, Megaphone, MoreHorizontal } from 'lucide-react'
import { DEFAULT_FIELDS } from '../shared'

/* ── Section catalog ──────────────────────────────────────────────────────
 * The single source of truth for what section types exist, their components,
 * their default config, and the editable fields shown in the section editor.
 * ──────────────────────────────────────────────────────────────────────── */

export const SECTION_CATALOG = {
    hero: {
        type: 'hero',
        name: 'Hero',
        description: 'Big headline, subhead, and an optional image or CTA.',
        component: Hero,
        icon: Sparkles,
        singleton: true, // Only one per page
        defaultConfig: {
            eyebrow: 'Limited access',
            headline: 'Something worth waiting for.',
            subhead: "Drop your details and we'll be in touch the moment doors open.",
            image_url: '',
            cta_text: '',
            cta_url: '#form',
        },
        fields: [
            { key: 'eyebrow',   label: 'Eyebrow (small label above headline)', type: 'text',     placeholder: 'Limited access' },
            { key: 'headline',  label: 'Headline',                              type: 'text',     placeholder: 'Something worth waiting for.' },
            { key: 'subhead',   label: 'Subhead',                               type: 'textarea', placeholder: 'One or two sentences of context.' },
            { key: 'image_url', label: 'Image URL (optional)',                  type: 'text',     placeholder: 'https://…' },
            { key: 'cta_text',  label: 'CTA button text (optional)',            type: 'text',     placeholder: 'Learn more' },
            { key: 'cta_url',   label: 'CTA link',                              type: 'text',     placeholder: '#form' },
        ],
    },

    form: {
        type: 'form',
        name: 'Form',
        description: 'The lead-capture form. Auto-hooked to your campaign.',
        component: FormSection,
        icon: Layout,
        singleton: true,
        defaultConfig: {
            section_headline: 'Get in touch',
            section_subhead: '',
            cta_text: 'Submit',
            success_message: "Thanks — we'll be in touch shortly.",
            form_fields: DEFAULT_FIELDS,
        },
        fields: [
            { key: 'section_headline', label: 'Section headline',   type: 'text',     placeholder: 'Get in touch' },
            { key: 'section_subhead',  label: 'Section subhead',    type: 'textarea', placeholder: 'One sentence explaining why to submit.' },
            { key: 'cta_text',         label: 'Submit button text', type: 'text',     placeholder: 'Submit' },
            { key: 'success_message',  label: 'Success message',    type: 'textarea', placeholder: "You're on the list." },
            // form_fields is edited in a dedicated UI, not the standard field editor
        ],
    },

    features: {
        type: 'features',
        name: 'Features',
        description: 'Three columns of icons with titles and descriptions.',
        component: Features,
        icon: LayoutList,
        singleton: false,
        defaultConfig: {
            section_headline: 'Why us',
            section_subhead: '',
            features: [
                { icon: 'Zap',        title: 'Fast',       description: 'Set up in minutes, not hours.' },
                { icon: 'Shield',     title: 'Secure',     description: 'Every submission stored safely.' },
                { icon: 'TrendingUp', title: 'Trackable',  description: 'Views, clicks, conversions in one place.' },
            ],
        },
        fields: [
            { key: 'section_headline', label: 'Section headline', type: 'text',     placeholder: 'Why us' },
            { key: 'section_subhead',  label: 'Section subhead',  type: 'textarea', placeholder: 'One sentence explaining.' },
            // features array is edited via a repeater UI
        ],
    },

    cta: {
        type: 'cta',
        name: 'CTA Band',
        description: 'Full-width dark band with a headline and a button.',
        component: CtaBand,
        icon: Megaphone,
        singleton: false,
        defaultConfig: {
            headline: 'Ready to get started?',
            subhead: '',
            cta_text: 'Get started',
            cta_url: '#form',
        },
        fields: [
            { key: 'headline', label: 'Headline',       type: 'text',     placeholder: 'Ready to get started?' },
            { key: 'subhead',  label: 'Subhead',        type: 'textarea', placeholder: '' },
            { key: 'cta_text', label: 'Button text',    type: 'text',     placeholder: 'Get started' },
            { key: 'cta_url',  label: 'Button link',    type: 'text',     placeholder: '#form' },
        ],
    },

    footer: {
        type: 'footer',
        name: 'Footer',
        description: 'Contact points and a Prformnce credit line.',
        component: Footer,
        icon: MoreHorizontal,
        singleton: true,
        defaultConfig: {
            email: '',
            phone: '',
            website: '',
            copyright: new Date().getFullYear().toString(),
        },
        fields: [
            { key: 'email',     label: 'Contact email',   type: 'text', placeholder: 'hello@example.com' },
            { key: 'phone',     label: 'Contact phone',   type: 'text', placeholder: '+91 98xxx xxxxx' },
            { key: 'website',   label: 'Website URL',     type: 'text', placeholder: 'https://…' },
            { key: 'copyright', label: 'Copyright line',  type: 'text', placeholder: '2026 Company Ltd' },
        ],
    },
}

export const SECTION_LIST = Object.values(SECTION_CATALOG)

export const getSectionDef = (type) => SECTION_CATALOG[type] || null

/* ── Helpers for section arrays ──────────────────────────────────────────── */

// Create a new section instance with a random id + default config for its type
export const createSection = (type) => {
    const def = SECTION_CATALOG[type]
    if (!def) return null
    return {
        id: `${type}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        config: JSON.parse(JSON.stringify(def.defaultConfig)),
    }
}
