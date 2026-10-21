import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin } from "lucide-react";
import SEO from "./SEO";
import FAQList from "./FAQList";
import { faqSchema } from "../lib/schema";
import CTASection from "./CTASection";
import FormCTA from "./FormCTA";
import { locations, locationList } from "../data/locations";
import { serviceList } from "../data/services";
import { shivamoggaServiceList } from "../data/shivamogga";
import { posts } from "../data/posts";
import { works } from "../data/work";
import { asset } from "../lib/assets";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const LocationPage = () => {
    const { city } = useParams();
    const l = locations[city];

    if (!l) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "var(--bg)" }}>
            <SEO title="Page not found" noindex url={`/locations/${city}`} />
            <h1 style={{ fontSize: "1.5rem" }}>Page not found</h1>
            <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
    );

    const path = `/locations/${city}`;
    const localPosts = posts.filter(p => (p.locations || []).includes(city) && p.category !== "Careers").slice(0, 3);
    const otherLocation = locationList.find(o => o.slug !== city);
    // Shivamogga has dedicated local service pages; link to those where they exist.
    const serviceHref = (sv) => (city === "shivamogga" && shivamoggaServiceList.find(x => x.service === sv.slug)?.href) || sv.href;

    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO
                title={l.seoTitle}
                description={l.seoDesc}
                keywords={l.keywords}
                image={`/images/og/${city}.png`}
                url={path}
                breadcrumbs={[{ name: l.city, path }]}
                jsonLd={[faqSchema(l.faqs)]}
            />

            {/* ── Hero ── */}
            <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(3.5rem, 7vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0.05)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                        <MapPin size={12} /> {l.city} ({l.altName})
                    </motion.p>
                    <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, maxWidth: "15ch", marginBottom: "1.25rem" }}>
                        {l.headline}
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                        {l.subheadline}
                    </motion.p>
                    <motion.div {...fadeUp(0.28)} style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                        <FormCTA location="location-hero" />
                        <button className="btn-secondary" data-cal-link={site.calLink}>
                            Book a Free Call
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── Local context ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>The {l.city} Market</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)", maxWidth: "18ch" }}>
                        {l.contextHeadline}
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                        {l.context.map((c, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.07)}
                                style={{ padding: "1.75rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "0.625rem" }}
                            >
                                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>0{i + 1}</span>
                                <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{c.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{c.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Local success story ── */}
            {works.filter(w => w.city === city).slice(0, 1).map(w => (
                <section key={w.id} style={{ background: "var(--bg-dark)", color: "#fff", padding: "clamp(3.5rem, 8vw, 5.5rem) 0" }}>
                    <div className="container">
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(2rem, 6vw, 4rem)", alignItems: "center" }}>
                            <motion.div {...fadeUp(0)}>
                                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
                                    {l.city} Success Story
                                </p>
                                <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "1rem" }}>{w.title}: from launch to paying customers.</h2>
                                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                                    {w.results.map(r => (
                                        <div key={r.label}>
                                            <p style={{ fontFamily: "'Anton', Arial, sans-serif", fontSize: "clamp(2rem, 5vw, 2.8rem)", lineHeight: 1, color: "#93B4F8" }}>{r.value}</p>
                                            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", marginTop: "0.35rem" }}>{r.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "1.5rem" }}>{w.desc}</p>
                                <Link to={`/work#${w.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, color: "#93B4F8" }}>
                                    See the creatives <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                            {w.cover && (
                                <motion.img
                                    {...fadeUp(0.1)}
                                    src={asset(w.cover.src)}
                                    alt={`${w.title} campaign creative`}
                                    width={w.cover.size[0]}
                                    height={w.cover.size[1]}
                                    loading="lazy"
                                    style={{ width: "100%", height: "auto", borderRadius: "var(--radius-lg)" }}
                                />
                            )}
                        </div>
                    </div>
                </section>
            ))}

            {/* ── Services ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>Services in {l.city}</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        Everything your launch needs.
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                        {serviceList.map((s, i) => (
                            <motion.div key={s.slug} {...fadeUp(i * 0.06)}>
                                <Link
                                    to={serviceHref(s)}
                                    className="card"
                                    style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem", height: "100%", transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                                >
                                    <div style={{ color: "var(--accent)", background: "#EEF3FF", width: "44px", height: "44px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {s.icon}
                                    </div>
                                    <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{s.label} in {l.city}</h3>
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>{s.cardDesc}</p>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)" }}>
                                        Learn more <ArrowRight size={13} />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Who we help + areas ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">Who We Help</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "2rem" }}>{l.whoHeadline}</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {l.who.map((w, i) => (
                                    <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                                        <div style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                            <Check size={11} color="var(--accent)" strokeWidth={3} />
                                        </div>
                                        <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{w}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div {...fadeUp(0.1)}>
                            <p className="section-label">Areas We Serve</p>
                            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.75rem)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                                Across {l.city} and nearby.
                            </h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {l.areas.map(a => (
                                    <span key={a} style={{ fontSize: "0.82rem", fontWeight: 500, padding: "0.45rem 0.9rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "100px" }}>
                                        {a}
                                    </span>
                                ))}
                            </div>
                            {otherLocation && (
                                <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                                    Also launching in {otherLocation.city}?{" "}
                                    <Link to={otherLocation.href} style={{ color: "var(--accent)", fontWeight: 600 }}>
                                        See how we help {otherLocation.city} businesses →
                                    </Link>
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Local guides ── */}
            {localPosts.length > 0 && (
                <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0 0" }}>
                    <div className="container">
                        <motion.p className="section-label" {...fadeUp(0)}>Guides for {l.city} founders</motion.p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                            {localPosts.map(p => (
                                <Link key={p.slug} to={`/blog/${p.slug}`} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{p.category}</span>
                                    <h3 style={{ fontSize: "1rem", lineHeight: 1.35 }}>{p.title}</h3>
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{p.excerpt}</p>
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
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>
                                Questions from {l.city} founders.
                            </h2>
                        </motion.div>
                        <motion.div {...fadeUp(0.1)}>
                            <FAQList faqs={l.faqs} />
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTASection
                headline={`Launching in ${l.city}? Let's talk.`}
                whatsappText={`Hi Wbzard Labs, I'm starting a business in ${l.city} and want to talk about going online.`}
            />
        </div>
    );
};

export default LocationPage;
