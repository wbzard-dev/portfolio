import React from "react";
import ReactMarkdown from "react-markdown";
import SEO from "./SEO";
import { site } from "../config/site";

const LAST_UPDATED = "21 October 2026";

const privacy = `
${site.name} ("we", "us") respects your privacy. This policy explains what personal data we collect through **${site.url.replace("https://", "")}**, why we collect it, and the choices you have. We process personal data in line with India's Digital Personal Data Protection Act, 2023.

## What we collect

- **Information you give us** — when you fill in an enquiry form, book a call or message us: your name, phone/WhatsApp number, email, city, business details and anything you choose to write.
- **Booking information** — when you schedule a call through our Cal.com booking widget: the details you enter and the time you choose.
- **Usage and advertising data** — pages visited, device and browser type, approximate location, and how you arrived (for example, the ad or search that brought you). This is collected with cookies and similar technologies by Google Analytics, Google Ads and the Meta Pixel.

## Why we use it

- To respond to your enquiry and provide the services you ask for.
- To understand how our website is used and improve it.
- To measure and improve our advertising on Google, Instagram and Facebook, including showing relevant ads to people who have visited our site.

We do **not** sell your personal data.

## Who we share it with

We share data only with service providers who help us run our business, such as Google (Analytics, Ads, Workspace), Meta (Pixel and advertising), Cal.com (bookings), our form-handling provider and our hosting provider. Each processes data under its own privacy terms. We may also disclose information if required by law.

## Cookies and your choices

You can block or delete cookies in your browser settings, use the [Google Analytics opt-out add-on](https://tools.google.com/dlpage/gaoptout), manage Google ad personalisation at [adssettings.google.com](https://adssettings.google.com), and manage Meta ad preferences in your Facebook or Instagram account settings.

## How long we keep it

Enquiry and client information is kept for as long as needed to respond to you or deliver our services, and to meet legal and accounting obligations. Analytics data is retained according to the settings of the tools above.

## Your rights

You can ask us to access, correct or erase your personal data, withdraw consent for marketing contact, or raise a grievance. Email **${site.email}** and we'll respond within a reasonable time.

## Contact

Grievances and privacy questions: **${site.email}**

We may update this policy from time to time. The latest version will always be on this page.
`;

const terms = `
These terms govern your use of **${site.url.replace("https://", "")}**, operated by ${site.name}. By using this website you agree to them.

## Use of this website

The content on this website is for general information about our services and about digital marketing. It is not professional, legal or financial advice for your specific situation. You agree not to misuse the website, attempt to disrupt it, or copy its content for commercial use without permission.

## Our services

Information about our services, timelines and outcomes on this website is indicative. The exact scope, deliverables, timelines and fees for any project are set out in a written proposal or agreement, which takes precedence over anything on this website.

## No guaranteed results

Search rankings, social media reach and advertising performance depend on factors outside our control, including platform algorithms and market conditions. We do not guarantee specific rankings, follower numbers, leads or sales.

## Third-party platforms and links

Our work often involves third-party platforms such as Google, Meta, Cal.com and hosting providers. Their own terms and policies apply to your use of them. Links to other websites are provided for convenience, and we're not responsible for their content.

## Intellectual property

The design, text and graphics of this website belong to ${site.name} unless stated otherwise. Client work shown in our portfolio belongs to the respective clients.

## Limitation of liability

To the extent permitted by law, ${site.name} is not liable for any indirect or consequential loss arising from your use of this website.

## Governing law

These terms are governed by the laws of India, and disputes are subject to the courts of Karnataka.

## Contact

Questions about these terms: **${site.email}**
`;

const pages = {
    privacy: { title: "Privacy Policy",   path: "/privacy-policy", body: privacy, desc: `How ${site.name} collects, uses and protects your personal data, including cookies, Google Analytics, Google Ads and the Meta Pixel.` },
    terms:   { title: "Terms of Service", path: "/terms",          body: terms,   desc: `The terms that govern use of the ${site.name} website.` },
};

const LegalPage = ({ kind }) => {
    const p = pages[kind];
    return (
        <div style={{ background: "var(--bg)", padding: "clamp(7rem, 14vw, 9rem) 0 6rem" }}>
            <SEO title={p.title} description={p.desc} url={p.path} />
            <div className="container" style={{ maxWidth: "780px" }}>
                <p className="section-label">Legal</p>
                <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.05, marginBottom: "0.75rem" }}>{p.title}</h1>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "2.5rem" }}>Last updated: {LAST_UPDATED}</p>
                <div className="legal-content">
                    <ReactMarkdown>{p.body}</ReactMarkdown>
                </div>
            </div>
            <style>{`
                .legal-content { font-size: 0.98rem; line-height: 1.8; }
                .legal-content h2 { font-size: 1.25rem; margin: 2.25rem 0 0.75rem; }
                .legal-content p { margin-bottom: 1.1rem; color: var(--text); }
                .legal-content ul { padding-left: 1.4rem; margin-bottom: 1.1rem; }
                .legal-content li { margin-bottom: 0.5rem; }
                .legal-content a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
            `}</style>
        </div>
    );
};

export default LegalPage;
