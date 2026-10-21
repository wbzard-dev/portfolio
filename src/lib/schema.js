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
