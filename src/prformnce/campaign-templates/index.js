import Focus from './Focus'
import { DEFAULT_BRAND_COLOR, DEFAULT_FIELDS } from './shared'

/* Template registry — id → definition.
 * Adding a new template:
 *   1. Create <YourTemplate>.jsx exporting a default component with
 *      props { config, onSubmit, submitting, submitted, campaignName }
 *   2. Register it below with an id, name, description, defaultConfig.
 */

export const TEMPLATES = {
    focus: {
        id: 'focus',
        name: 'Focus',
        description: 'Airy two-column layout with an oversized headline and a form-forward card. Best for waitlists, RSVPs, single-purpose lead capture.',
        component: Focus,
        defaultConfig: {
            eyebrow: 'Limited access',
            headline: 'Something worth waiting for.',
            subhead: "Drop your details and we'll be in touch the moment doors open.",
            brand_color: DEFAULT_BRAND_COLOR,
            image_url: '',
            cta_text: 'Notify me',
            form_fields: DEFAULT_FIELDS,
            success_message: "You're on the list. Watch your inbox.",
            contact: { email: '', phone: '' },
        },
    },
}

export const TEMPLATE_LIST = Object.values(TEMPLATES)

export const getTemplate = (id) => TEMPLATES[id] || TEMPLATES.focus
