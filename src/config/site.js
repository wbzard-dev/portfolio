// Single source of truth for brand, contact and tracking settings.
// Anything left as "" is simply skipped at runtime — fill these in as they become available.

export const site = {
    name:        "Wbzard Labs",
    url:         "https://www.wbzard.com",   // canonical host — wbzard.com 301s here (Cloudflare)
    tagline:     "Launch partner for new businesses & startups",
    description: "Wbzard Labs helps founders and new businesses in Bangalore and Shivamogga launch and grow online — websites, apps, social media, SEO and Meta & Google Ads under one roof.",
    logo:        "https://www.wbzard.com/images/final-logo.png",
    ogImage:     "https://www.wbzard.com/images/og/default.png",
    founder:     "Vivek",

    // Contact — used in the footer, schema.org markup and lead CTAs.
    email:       "vivekg.work@gmail.com",
    phone:       "+91 96066 19285",     // shown in footer + LocalBusiness schema
    whatsapp:    "919606619285",        // digits only WITH country code (wa.me links break without it)
    calLink:     "vivek-g-ts38ii/30min",

    areas: ["Bangalore", "Shivamogga"],

    social: {
        instagram: "https://www.instagram.com/wbzard/",
        linkedin:  "https://www.linkedin.com/in/byviveek/",   // founder's profile
    },

    tracking: {
        ga4:                 "G-7WMQSEW2DZ",
        googleAdsId:         "",   // "AW-XXXXXXXXX"
        googleAdsLeadLabel:  "",   // conversion label for the "Lead" conversion action
        metaPixelId:         "",   // Meta (Facebook/Instagram) Pixel ID
    },

    verification: {
        google: "",   // Search Console HTML-tag token (content="...") — DNS verification also works
        meta:   "",   // Meta Business domain-verification token
    },

    // POST endpoint for the lead form (Formspree, Web3Forms, Getform, your own API…).
    // Leave empty to fall back to opening the visitor's email client.
    leadFormEndpoint: "https://formspree.io/f/xdearpej",

    // The site's one enquiry form. Every "Get your free launch plan" CTA links here.
    formPath: "/startup-launch-package#get-started",
};

export const whatsappUrl = (text = "Hi Wbzard Labs, I'd like to talk about launching my business online.") =>
    site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;
