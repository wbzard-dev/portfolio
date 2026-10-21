import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, Instagram, X, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "./SEO";
import CTASection from "./CTASection";
import { WorkStats } from "./Work";
import { works, studioWork } from "../data/work";
import { asset } from "../lib/assets";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const linkStyle = { display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" };

const Lightbox = ({ items, index, title, onClose, onMove }) => {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onMove(1);
            if (e.key === "ArrowLeft") onMove(-1);
        };
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", onKey); };
    }, [onClose, onMove]);

    const item = items[index];
    const btn = { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} creative ${index + 1} of ${items.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1rem" }}
        >
            <img
                src={asset(item.src)}
                alt={`${title} creative ${index + 1}`}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "min(100%, 1100px)", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }}
            />
            <button aria-label="Close" onClick={onClose} style={{ ...btn, top: "1.5rem", right: "1.5rem", transform: "none" }}><X size={20} /></button>
            {items.length > 1 && (
                <>
                    <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); onMove(-1); }} style={{ ...btn, left: "1rem" }}><ChevronLeft size={22} /></button>
                    <button aria-label="Next" onClick={(e) => { e.stopPropagation(); onMove(1); }} style={{ ...btn, right: "1rem" }}><ChevronRight size={22} /></button>
                </>
            )}
            <p style={{ position: "absolute", bottom: "1.25rem", left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                {title} · {index + 1} / {items.length}
            </p>
        </motion.div>
    );
};

const Gallery = ({ items, title, onOpen }) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem" }}>
        {items.map((g, i) => (
            <button
                key={g.src}
                onClick={() => onOpen(items, i, title)}
                aria-label={`Open ${title} creative ${i + 1}`}
                className="gallery-tile"
                style={{ padding: 0, border: "none", cursor: "zoom-in", aspectRatio: "4 / 5", overflow: "hidden", borderRadius: "var(--radius-sm)", background: "var(--bg-dark)" }}
            >
                <img
                    src={asset(g.src)}
                    alt={`${title} creative ${i + 1}`}
                    width={g.size[0]}
                    height={g.size[1]}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                />
            </button>
        ))}
    </div>
);

const WorkPage = () => {
    const [box, setBox] = useState(null); // { items, index, title }
    const open  = useCallback((items, index, title) => setBox({ items, index, title }), []);
    const close = useCallback(() => setBox(null), []);
    const move  = useCallback((d) => setBox(b => b && { ...b, index: (b.index + d + b.items.length) % b.items.length }), []);

    const portfolioSchema = {
        "@context": "https://schema.org",
        "@type":    "CollectionPage",
        "name":     `${site.name} — Work & Case Studies`,
        "url":      `${site.url}/work`,
        "hasPart":  works.map(w => ({
            "@type":       "CreativeWork",
            "name":        `${w.title} — ${w.role}`,
            "description": w.desc,
            "creator":     { "@id": `${site.url}/#organization` },
            ...(w.href ? { "url": w.href } : {}),
            ...(w.cover ? { "image": `${site.url}${w.cover.src}` } : {}),
        })),
    };

    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO
                title="Our Work — Websites, Social Media & Marketing Case Studies"
                description="Case studies from Wbzard Labs: ₹0 to ₹2L+ revenue in 3 weeks for a Shivamogga home-services business, 150+ registrations per event, 130+ creatives for a D2C brand, plus websites and SEO for Karnataka businesses."
                keywords="digital marketing case studies Shivamogga, social media portfolio Karnataka, website design portfolio Bangalore, Wbzard Labs work"
                image={works[0].cover.src}
                url="/work"
                breadcrumbs={[{ name: "Work", path: "/work" }]}
                jsonLd={[portfolioSchema]}
            />

            <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0.05)}>Our Work</motion.p>
                    <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, maxWidth: "15ch", marginBottom: "1.25rem" }}>
                        Real brands. Real results.
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: "620px", lineHeight: 1.7, marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
                        Websites, social media, content and campaigns for startups, local businesses and D2C brands across Shivamogga, Bangalore and Karnataka.
                    </motion.p>
                    <WorkStats />
                </div>
            </section>

            {works.map((w, i) => (
                <section key={w.id} id={w.id} style={{ background: i % 2 === 0 ? "var(--bg-subtle)" : "var(--bg)", padding: "clamp(3.5rem, 8vw, 6rem) 0", scrollMarginTop: "5rem" }}>
                    <div className="container">
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(2rem, 6vw, 4.5rem)", alignItems: "start" }}>
                            <motion.div {...fadeUp(0)}>
                                <p className="section-label" style={{ color: "var(--accent)" }}>{w.sector}</p>
                                <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "0.5rem" }}>{w.title}</h2>
                                <p style={{ fontWeight: 600, marginBottom: "1.25rem" }}>{w.role}</p>
                                {w.results?.length > 0 && (
                                    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                                        {w.results.map(r => (
                                            <div key={r.label}>
                                                <p style={{ fontFamily: "'Anton', Arial, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", lineHeight: 1, color: "var(--accent)" }}>{r.value}</p>
                                                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>{r.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--text-muted)", marginBottom: "1.25rem" }}>{w.desc}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                                    {w.services.map(s => (
                                        <span key={s} style={{ fontSize: "0.78rem", fontWeight: 500, padding: "0.4rem 0.8rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "100px" }}>{s}</span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                                    {w.href && <a href={w.href} target="_blank" rel="noopener noreferrer" style={linkStyle}><Globe size={15} /> Visit website <ArrowUpRight size={14} /></a>}
                                    {w.instagram && <a href={w.instagram} target="_blank" rel="noopener noreferrer" style={linkStyle}><Instagram size={15} /> See on Instagram <ArrowUpRight size={14} /></a>}
                                </div>
                            </motion.div>
                            <motion.div {...fadeUp(0.1)}>
                                {w.gallery ? (
                                    <Gallery items={w.gallery} title={w.title} onOpen={open} />
                                ) : w.cover ? (
                                    <a href={w.href || undefined} target="_blank" rel="noopener noreferrer" style={{ display: "block", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                                        <img src={asset(w.cover.src)} alt={`${w.title} website`} width={w.cover.size[0]} height={w.cover.size[1]} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", display: "block" }} />
                                    </a>
                                ) : null}
                            </motion.div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Our own brand */}
            <section style={{ background: works.length % 2 === 0 ? "var(--bg-subtle)" : "var(--bg)", padding: "clamp(3.5rem, 8vw, 6rem) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(2rem, 6vw, 4.5rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">In-house</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "1rem" }}>Our own brand.</h2>
                            <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--text-muted)" }}>{studioWork.desc}</p>
                        </motion.div>
                        <motion.div {...fadeUp(0.1)}>
                            <Gallery items={studioWork.gallery} title={studioWork.title} onOpen={open} />
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTASection headline="Want results like these?" body="Tell us about your business and we'll send you a free, practical launch plan, built on what's worked for the brands above." />

            <AnimatePresence>
                {box && <Lightbox items={box.items} index={box.index} title={box.title} onClose={close} onMove={move} />}
            </AnimatePresence>

            <style>{`.gallery-tile:hover img { transform: scale(1.05); }`}</style>
        </div>
    );
};

export default WorkPage;
