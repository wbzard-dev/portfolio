import Focus from './Focus'
import { DEFAULT_BRAND_COLOR } from './shared'
import { createSection } from './sections'

/* Template registry — id → definition.
 *
 * Each template ships with a `default_sections()` factory that returns an
 * ordered array of section instances. The section editor uses this as the
 * starting point when a user picks the template.
 */

export const TEMPLATES = {
    focus: {
        id: 'focus',
        name: 'Focus',
        description: 'Airy two-column hero + form card. Ideal for waitlists, RSVPs, single-purpose lead capture.',
        component: Focus,
        default_sections: () => [
            {
                ...createSection('hero'),
                config: {
                    eyebrow: 'Limited access',
                    headline: 'Something worth waiting for.',
                    subhead: "Drop your details and we'll be in touch the moment doors open.",
                    image_url: '',
                    cta_text: '',
                    cta_url: '#form',
                },
            },
            {
                ...createSection('form'),
                config: {
                    section_headline: 'Get on the list',
                    section_subhead: 'Takes about 20 seconds.',
                    cta_text: 'Notify me',
                    success_message: "You're on the list. Watch your inbox.",
                    form_fields: [
                        { name: 'name',  label: 'Full name', type: 'text',  required: true, placeholder: 'Your name' },
                        { name: 'email', label: 'Email',     type: 'email', required: true, placeholder: 'you@example.com' },
                    ],
                },
            },
            {
                ...createSection('footer'),
                config: { email: '', phone: '', website: '', copyright: new Date().getFullYear().toString() },
            },
        ],
        defaultConfig: {
            brand_color: DEFAULT_BRAND_COLOR,
            get sections() { return TEMPLATES.focus.default_sections() },
        },
    },
}

// Materialize defaultConfig sections eagerly (getter → static array on read)
Object.values(TEMPLATES).forEach(tpl => {
    tpl.defaultConfig = {
        brand_color: DEFAULT_BRAND_COLOR,
        sections: tpl.default_sections(),
    }
})

export const TEMPLATE_LIST = Object.values(TEMPLATES)

export const getTemplate = (id) => TEMPLATES[id] || TEMPLATES.focus
