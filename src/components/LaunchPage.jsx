import React from "react";
import { motion } from "framer-motion";
import { Check, Globe, MapPin, Instagram, Target, Megaphone, BarChart3 } from "lucide-react";
import SEO from "./SEO";
import LeadForm from "./LeadForm";
import FAQList from "./FAQList";
import { faqSchema } from "../lib/schema";
import CTASection from "./CTASection";
import Work from "./Work";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const highlights = [
    "A fast, SEO-ready website built to get enquiries",
    "Google Business Profile so you show up on Maps",
    "A social media framework with your first 30 days of content",
    "Tracking set up properly before you spend on ads",
];

const included = [
    { icon: <Globe size={22} />,     title: "Launch Website",           desc: "A mobile-first website or landing page with clear messaging, WhatsApp and enquiry buttons, and on-page SEO." },
    { icon: <MapPin size={22} />,    title: "Google Business Profile",  desc: "Created or optimised with the right categories, services, photos and a review routine, for Bangalore or Shivamogga map searches." },
    { icon: <Instagram size={22} />, title: "Social Media Framework",   desc: "Profile setup, content pillars, brand templates, a reels playbook and a 90-day calendar, with the first 30 days produced with you." },
    { icon: <Target size={22} />,    title: "Tracking & Analytics",     desc: "GA4, Search Console, Meta Pixel and Google Ads conversion tracking installed and tested." },
    { icon: <Megaphone size={22} />, title: "First Ad Campaign",        desc: "Optional: a Meta or Google Ads test campaign with a dedicated landing page and a controlled budget." },
    { icon: <BarChart3 size={22} />, title: "30-Day Launch Review",     desc: "What worked, what to drop, and a clear plan for the next 90 days." },
];

const phases = [
    { number: "01", title: "Discover",  desc: "A kickoff call to understand your offer, customers, competitors and goals. You get a written launch plan." },
    { number: "02", title: "Build",     desc: "Website, Google Business Profile, social profiles, templates and tracking, with your review at every step." },
    { number: "03", title: "Go live",   desc: "Launch day: website live, first posts published, Search Console submitted and ads switched on if included." },
    { number: "04", title: "Learn",     desc: "A 30-day review of traffic, enquiries and content, and the plan for what comes next." },
];

const launchFaqs = [
    { q: "How much does the Startup Launch Package cost?", a: "The package is quoted per business, because a one-page service launch and a multi-product e-commerce launch are very different jobs. You'll get a fixed, itemised quote after a free 30-minute call, with no obligation." },
    { q: "How long does it take to launch?", a: "Most launches go live in three to five weeks, depending mainly on how quickly content, photos and approvals come together. We share a dated timeline at kickoff." },
    { q: "Is ad spend included?", a: "No. Ad spend is paid directly to Meta or Google from ad accounts in your business's name. We recommend a test budget that suits your category before you commit anything." },
    { q: "I already have a website. Can I still use the package?", a: "Yes. We'll audit what you have and only rebuild what's holding you back. Many founders keep their site and use the package for Google Business Profile, social media, SEO and tracking." },
    { q: "Do you work outside Bangalore and Shivamogga?", a: "Yes. Most work happens online, so we can launch businesses anywhere in Karnataka or India." },
];

const LaunchPage = () => (
    <div style={{ background: "var(--bg)" }}>
        <SEO
            title="Startup Launch Package — Website, Social Media, SEO & Ads for New Businesses"
            description="Launch your new business online with one plan: website, Google Business Profile, social media framework, SEO basics and ads-ready tracking. For founders in Bangalore and Shivamogga. Free launch call."
            keywords="startup launch package, website and social media package for new business, digital marketing package for startups Bangalore, small business marketing package Shivamogga, new business online setup"
            image="/images/og/startup-launch-package.png"
            url="/startup-launch-package"
            breadcrumbs={[{ name: "Startup Launch Package", path: "/startup-launch-package" }]}
            jsonLd={[faqSchema(launchFaqs)]}
        />

        {/* ── Hero + form ── */}
        <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "center" }}>
                    <div>
                        <motion.p {...fadeUp(0.05)} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
                            Startup Launch Package · Bangalore &amp; Shivamogga
                        </motion.p>
                        <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)", lineHeight: 1.0, marginBottom: "1.25rem" }}>
                            Your new business, launched online in one plan.
                        </motion.h1>
                        <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "520px" }}>
                            Stop stitching together separate freelancers. Get your website, Google presence, social media and tracking set up together by one team, so you start getting customers from day one.
                        </motion.p>
                        <motion.div {...fadeUp(0.28)} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                            {highlights.map(h => (
                                <div key={h} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                                    <div style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "rgba(37,99,235,0.25)", border: "1px solid rgba(37,99,235,0.5)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                        <Check size={11} color="#93B4F8" strokeWidth={3} />
                                    </div>
                                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>{h}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        id="get-started"
                        {...fadeUp(0.2)}
                        style={{ background: "var(--bg)", color: "var(--text)", borderRadius: "var(--radius-lg)", padding: "clamp(1.5rem, 4vw, 2.25rem)", boxShadow: "0 20px 60px rgba(0,0,0,0.35)", scrollMarginTop: "6rem" }}
                    >
                        <h2 style={{ fontSize: "1.35rem", lineHeight: 1.2, marginBottom: "0.4rem" }}>Get your free launch plan</h2>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                            Tell us about your business. We'll reply within one working day with next steps.
                        </p>
                        <LeadForm />
                    </motion.div>
                </div>
            </div>
        </section>

        {/* ── What's included ── */}
        <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <motion.p className="section-label" {...fadeUp(0)}>What's Included</motion.p>
                <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                    Everything a new business needs to go live.
                </motion.h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                    {included.map((it, i) => (
                        <motion.div
                            key={it.title}
                            {...fadeUp(i * 0.06)}
                            className="card"
                            style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}
                        >
                            <div style={{ color: "var(--accent)", background: "#EEF3FF", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {it.icon}
                            </div>
                            <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{it.title}</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{it.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Phases ── */}
        <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <motion.p className="section-label" {...fadeUp(0)}>How It Works</motion.p>
                <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                    Four phases. One accountable team.
                </motion.h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: "1.25rem" }}>
                    {phases.map((p, i) => (
                        <motion.div
                            key={p.number}
                            {...fadeUp(i * 0.07)}
                            style={{ padding: "1.75rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "0.625rem" }}
                        >
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>{p.number}</span>
                            <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{p.title}</h3>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <Work />

        {/* ── FAQ ── */}
        <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                    <motion.div {...fadeUp(0)}>
                        <p className="section-label">FAQ</p>
                        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>About the Launch Package.</h2>
                    </motion.div>
                    <motion.div {...fadeUp(0.1)}>
                        <FAQList faqs={launchFaqs} />
                    </motion.div>
                </div>
            </div>
        </section>

        <CTASection
            headline="Prefer to talk it through?"
            body="Book a free 30-minute launch call. We'll look at your business and tell you exactly what we'd do first."
            whatsappText="Hi Wbzard Labs, I'm interested in the Startup Launch Package."
        />
    </div>
);

export default LaunchPage;
