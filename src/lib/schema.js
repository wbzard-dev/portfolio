import { site } from "../config/site";

// schema.org helpers shared across pages.
export const faqSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name":  f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
});

// Homepage: ties the site to the organisation entity for search engines and AI assistants.
export const websiteSchema = {
    "@context":   "https://schema.org",
    "@type":      "WebSite",
    "@id":        `${site.url}/#website`,
    "url":        `${site.url}/`,
    "name":       site.name,
    "description": site.description,
    "inLanguage": "en-IN",
    "publisher":  { "@id": `${site.url}/#organization` },
};
