import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin } from "lucide-react";
import SEO from "./SEO";
import FAQList from "./FAQList";
import CTASection from "./CTASection";
import FormCTA from "./FormCTA";
import NotFound from "./NotFound";
import { faqSchema } from "../lib/schema";
import { shivamoggaServices, shivamoggaServiceList } from "../data/shivamogga";
import { locations } from "../data/locations";
import { posts } from "../data/posts";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

// /shivamogga/:service — one page per high-intent local search ("website design in Shivamogga", …).
const LocalServicePage = () => {
    const { service } = useParams();
    const s = shivamoggaServices[service];
    if (!s) return <NotFound />;

    const path = `/shivamogga/${service}`;
    const others = shivamoggaServiceList.filter(o => o.slug !== service);
    const guides = posts.filter(p => (p.locations || []).includes("shivamogga") && p.category !== "Careers").slice(0, 4);
    const areas = locations.shivamogga.areas;

    const serviceSchema = {
        "@context":    "https://schema.org",
        "@type":       "Service",
        "name":        `${s.label} in Shivamogga`,
        "serviceType": s.label,
        "description": s.seoDesc,
        "url":         `${site.url}${path}`,
        "provider":    { "@id": `${site.url}/#organization` },
        "areaServed":  [
            { "@type": "City", "name": "Shivamogga", "alternateName": "Shimoga" },
            ...["Bhadravati", "Sagar", "Tirthahalli", "Shikaripura"].map(name => ({ "@type": "City", name })),
        ],
    };

    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO
                title={s.seoTitle}
                description={s.seoDesc}
                keywords={s.keywords}
                image="/images/og/shivamogga.png"
                url={path}
                breadcrumbs={[{ name: "Shivamogga", path: "/locations/shivamogga" }, { name: s.label, path }]}
                jsonLd={[serviceSchema, faqSchema(s.faqs)]}
            />

            {/* ── Hero ── */}
            <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(3.5rem, 7vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0.05)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                        <MapPin size={12} /> {s.label} · Shivamogga (Shimoga)
                    </motion.p>
                    <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.25rem)", lineHeight: 1.0, maxWidth: "16ch", marginBottom: "1.25rem" }}>
                        {s.h1}
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: "620px", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                        {s.intro}
                    </motion.p>
                    <motion.div {...fadeUp(0.28)} style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                        <FormCTA location={`shivamogga-${service}`} />
                        <button className="btn-secondary" data-cal-link={site.calLink}>Book a Free Call</button>
                    </motion.div>
                </div>
            </section>

            {/* ── Why ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>The Shivamogga Market</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)", maxWidth: "22ch" }}>
                        {s.whyTitle}
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
                        {s.why.map((w, i) => (
                            <motion.div key={w.title} {...fadeUp(i * 0.07)} style={{ padding: "1.75rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>0{i + 1}</span>
                                <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{w.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Includes + who ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        {[{ label: "What's Included", title: s.includesTitle, items: s.includes }, { label: "Who We Help", title: s.whoTitle, items: s.who }].map((blk, b) => (
                            <motion.div key={blk.label} {...fadeUp(b * 0.08)}>
                                <p className="section-label">{blk.label}</p>
                                <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", lineHeight: 1.2, marginBottom: "1.75rem" }}>{blk.title}</h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                                    {blk.items.map(it => (
                                        <div key={it} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                                            <div style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                                <Check size={11} color="var(--accent)" strokeWidth={3} />
                                            </div>
                                            <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{it}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Cost + areas ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">Pricing</p>
                            <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", lineHeight: 1.2, marginBottom: "1.25rem" }}>{s.costTitle}</h2>
                            <p style={{ fontSize: "0.98rem", lineHeight: 1.8, marginBottom: "1.75rem" }}>{s.cost}</p>
                            <FormCTA location={`shivamogga-${service}-pricing`}>Get a Fixed Quote</FormCTA>
                        </motion.div>
                        <motion.div {...fadeUp(0.08)}>
                            <p className="section-label">Areas We Serve</p>
                            <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", lineHeight: 1.2, marginBottom: "1.25rem" }}>Across Shivamogga district.</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
                                {areas.map(a => (
                                    <span key={a} style={{ fontSize: "0.82rem", fontWeight: 500, padding: "0.45rem 0.9rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "100px" }}>{a}</span>
                                ))}
                            </div>
                            <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.875rem" }}>
                                More services in Shivamogga
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                {others.map(o => (
                                    <Link key={o.slug} to={o.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, color: "var(--accent)" }}>
                                        {o.label} in Shivamogga <ArrowRight size={13} />
                                    </Link>
                                ))}
                                <Link to="/locations/shivamogga" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, color: "var(--accent)" }}>
                                    All digital marketing services in Shivamogga <ArrowRight size={13} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Guides ── */}
            {guides.length > 0 && (
                <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0 0" }}>
                    <div className="container">
                        <motion.p className="section-label" {...fadeUp(0)}>Guides for Shivamogga Businesses</motion.p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
                            {guides.map(g => (
                                <Link key={g.slug} to={`/blog/${g.slug}`} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{g.category}</span>
                                    <h3 style={{ fontSize: "1rem", lineHeight: 1.35 }}>{g.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQ ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">FAQ</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>{s.label} in Shivamogga: questions.</h2>
                        </motion.div>
                        <motion.div {...fadeUp(0.1)}>
                            <FAQList faqs={s.faqs} />
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTASection
                headline={`${s.label} in Shivamogga? Let's talk.`}
                whatsappText={`Hi Wbzard Labs, I'm interested in ${s.label} for my business in Shivamogga.`}
            />
        </div>
    );
};

export default LocalServicePage;
