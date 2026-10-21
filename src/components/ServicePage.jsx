import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "./SEO";
import FAQList from "./FAQList";
import { faqSchema } from "../lib/schema";
import CTASection from "./CTASection";
import FormCTA from "./FormCTA";
import { services, serviceList, legacyServiceRedirects } from "../data/services";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const ServicePage = () => {
    const { slug } = useParams();
    const s = services[slug];

    if (legacyServiceRedirects[slug]) return <Navigate to={`/services/${legacyServiceRedirects[slug]}`} replace />;

    if (!s) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "var(--bg)" }}>
            <SEO title="Service not found" noindex url={`/services/${slug}`} />
            <h1 style={{ fontSize: "1.5rem" }}>Service not found</h1>
            <Link to="/#services" className="btn-primary">Back to Services</Link>
        </div>
    );

    const path = `/services/${slug}`;
    const related = serviceList.filter(r => r.slug !== slug);
    const serviceSchema = {
        "@context":    "https://schema.org",
        "@type":       "Service",
        "name":        s.label,
        "serviceType": s.label,
        "description": s.seoDesc,
        "url":         `${site.url}${path}`,
        "provider":    { "@id": `${site.url}/#organization` },
        "areaServed":  [{ "@type": "City", "name": "Bengaluru" }, { "@type": "City", "name": "Shivamogga" }],
        "audience":    { "@type": "BusinessAudience", "audienceType": "Startups and new businesses" },
    };

    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO
                title={s.seoTitle}
                description={s.seoDesc}
                keywords={s.keywords}
                image={`/images/og/${slug}.png`}
                url={path}
                breadcrumbs={[{ name: "Services", path: "/#services" }, { name: s.label, path }]}
                jsonLd={[serviceSchema, faqSchema(s.faqs)]}
            />

            {/* ── Hero ── */}
            <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(3.5rem, 7vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <motion.div {...fadeUp(0.05)}>
                        <Link
                            to="/#services"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "2rem", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                        >
                            <ArrowLeft size={13} /> All Services
                        </Link>
                    </motion.div>
                    <motion.p className="section-label" {...fadeUp(0.1)}>{s.label} · Bangalore &amp; Shivamogga</motion.p>
                    <motion.h1 {...fadeUp(0.15)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, maxWidth: "14ch", marginBottom: "1.25rem" }}>
                        {s.headline}
                    </motion.h1>
                    <motion.p {...fadeUp(0.22)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: "560px", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                        {s.subheadline}
                    </motion.p>
                    <motion.div {...fadeUp(0.3)} style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                        <FormCTA location="service-hero" />
                        <button className="btn-secondary" data-cal-link={site.calLink}>
                            Book a Free Call
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── Problem section ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">The Problem</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>{s.problemHeadline}</h2>
                        </motion.div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {s.problems.map((p, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp(i * 0.07)}
                                    style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "1rem 0", borderBottom: i < s.problems.length - 1 ? "1px solid var(--border)" : "none" }}
                                >
                                    <div style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4444", display: "block" }} />
                                    </div>
                                    <p style={{ fontSize: "0.925rem", color: "var(--text)", lineHeight: 1.6 }}>{p}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Solutions grid ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>What We Offer</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        {s.solutionsHeadline}
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: "1.25rem" }}>
                        {s.solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.06)}
                                className="card"
                                style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem", transition: "box-shadow 0.25s ease" }}
                                whileHover={{ y: -3 }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                            >
                                <div style={{ color: "var(--accent)", background: "#EEF3FF", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {sol.icon}
                                </div>
                                <h3 style={{ fontSize: "0.975rem", lineHeight: 1.3 }}>{sol.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{sol.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Process / Benefits ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>How We Work</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        {s.processHeadline}
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                        {s.process.map((step, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.07)}
                                style={{ padding: "1.75rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "0.625rem" }}
                            >
                                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>
                                    {step.number}
                                </span>
                                <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{step.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">FAQ</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "2rem" }}>
                                {s.label} questions, answered.
                            </h2>
                            <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                                Related services
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                {related.map(r => (
                                    <Link key={r.slug} to={r.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
                                        {r.label} <ArrowRight size={13} />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div {...fadeUp(0.1)}>
                            <FAQList faqs={s.faqs} />
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTASection
                headline="Let's talk about your launch."
                whatsappText={`Hi Wbzard Labs, I'm interested in ${s.label}.`}
            />
        </div>
    );
};

export default ServicePage;
