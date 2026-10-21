import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Linkedin } from "lucide-react";
import SEO from "./SEO";
import CTASection from "./CTASection";
import FormCTA from "./FormCTA";
import { about } from "../data/about";
import { works } from "../data/work";
import { serviceList } from "../data/services";
import { locationList } from "../data/locations";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const aboutSchema = {
    "@context":   "https://schema.org",
    "@type":      "AboutPage",
    "url":        `${site.url}/about`,
    "name":       `About ${site.name}`,
    "description": about.oneLiner,
    "about":      { "@id": `${site.url}/#organization` },
};

const founderSchema = {
    "@context": "https://schema.org",
    "@type":    "Person",
    "@id":      `${site.url}/about#founder`,
    "name":     site.founder,
    "jobTitle": "Founder",
    "worksFor": { "@id": `${site.url}/#organization` },
    "url":      `${site.url}/about`,
    ...(site.social.linkedin ? { "sameAs": [site.social.linkedin] } : {}),
};

const AboutPage = () => (
    <div style={{ background: "var(--bg)" }}>
        <SEO
            title={`About ${site.name} — Digital Launch Partner for Startups in Bangalore & Shivamogga`}
            description={`${about.oneLiner} Websites, apps, social media, SEO and Meta & Google Ads under one roof.`}
            url="/about"
            breadcrumbs={[{ name: "About", path: "/about" }]}
            jsonLd={[aboutSchema, founderSchema]}
        />

        {/* ── Hero ── */}
        <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(3.5rem, 7vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
            <div className="container">
                <motion.p className="section-label" {...fadeUp(0.05)}>About Us</motion.p>
                <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, maxWidth: "16ch", marginBottom: "1.5rem" }}>
                    We help new businesses launch online properly.
                </motion.h1>
                <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text)", maxWidth: "640px", lineHeight: 1.7, marginBottom: "1rem" }}>
                    {about.oneLiner}
                </motion.p>
                <motion.p {...fadeUp(0.25)} style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "640px", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                    {about.summary}
                </motion.p>
                <motion.div {...fadeUp(0.3)}>
                    <FormCTA location="about-hero" />
                </motion.div>
            </div>
        </section>

        {/* ── Facts ── */}
        <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                    <motion.div {...fadeUp(0)}>
                        <p className="section-label">At a Glance</p>
                        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "1.5rem" }}>The short version.</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                            <img
                                src={`${import.meta.env.BASE_URL}images/vivek.jpg`}
                                alt={`${site.founder}, founder of ${site.name}`}
                                width="64"
                                height="64"
                                loading="lazy"
                                style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
                            />
                            <div>
                                <p style={{ fontWeight: 700 }}>{site.founder}</p>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Founder, {site.name}</p>
                                {site.social.linkedin && (
                                    <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)", marginTop: "0.25rem" }}>
                                        <Linkedin size={13} /> LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                    <motion.dl {...fadeUp(0.1)} style={{ margin: 0 }}>
                        {about.facts.map((f, i) => (
                            <div key={f.label} style={{ display: "grid", gridTemplateColumns: "minmax(110px, 30%) 1fr", gap: "1rem", padding: "1rem 0", borderBottom: i < about.facts.length - 1 ? "1px solid var(--border)" : "none" }}>
                                <dt style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-muted)", paddingTop: "0.15rem" }}>{f.label}</dt>
                                <dd style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>{f.value}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>
            </div>
        </section>

        {/* ── Principles ── */}
        <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <motion.p className="section-label" {...fadeUp(0)}>How We Work</motion.p>
                <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                    What you can expect from us.
                </motion.h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                    {about.principles.map((p, i) => (
                        <motion.div key={p.title} {...fadeUp(i * 0.06)} className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>0{i + 1}</span>
                            <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{p.title}</h3>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Services, areas & work ── */}
        <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(2.5rem, 6vw, 4rem)" }}>
                    <motion.div {...fadeUp(0)}>
                        <p className="section-label">Services</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                            {serviceList.map(s => (
                                <Link key={s.slug} to={s.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, color: "var(--accent)" }}>
                                    {s.label} <ArrowRight size={13} />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp(0.06)}>
                        <p className="section-label">Where We Work</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                            {locationList.map(l => (
                                <Link key={l.slug} to={l.href} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, color: "var(--accent)" }}>
                                    {l.city} ({l.altName}) <ArrowRight size={13} />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div {...fadeUp(0.12)}>
                        <p className="section-label">Selected Work</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                            {works.filter(w => w.role !== "Personal Portfolio").map(w => (
                                w.href ? (
                                    <a key={w.title} href={w.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                                        <span style={{ fontWeight: 600 }}>{w.title}</span>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>· {w.role}</span>
                                        <ArrowUpRight size={13} color="var(--accent)" />
                                    </a>
                                ) : (
                                    <p key={w.title}>
                                        <span style={{ fontWeight: 600 }}>{w.title}</span>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}> · {w.role}</span>
                                    </p>
                                )
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        <CTASection headline="Starting something new? Let's talk." />
    </div>
);

export default AboutPage;
