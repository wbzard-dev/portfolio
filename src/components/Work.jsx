import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const works = [
    {
        title: "QuickFix Services",
        role:  "Web Development",
        desc:  "Business website built to convert local service inquiries into booked jobs.",
        href:  "https://www.quickfixservices.co.in/",
    },
    {
        title: "The Rugged",
        role:  "Web Development",
        desc:  "Brand website designed around the product line and a clear path to purchase.",
        href:  "https://the-rugged.com/",
    },
    {
        title: "Bionoids",
        role:  "SEO & Social Media Marketing",
        desc:  "On-page SEO across key pages, keyword research, and content restructuring, paired with a full social media content calendar, creatives, and brand profile optimization.",
        href:  "https://bionoids.in",
    },
    {
        title: "Intignis Industries",
        role:  "SEO & Social Media Marketing",
        desc:  "On-page and technical SEO audits, metadata and image alt-tag optimization, and ongoing social media planning, creative production, and performance monitoring.",
        href:  "https://www.intignisindustries.com",
    },
    {
        title: "Intignis Healthcare",
        role:  "SEO & Social Media Marketing",
        desc:  "Comprehensive on-page SEO, keyword and content optimization, and a social media strategy built to grow brand visibility across digital platforms.",
        href:  null,
    },
    {
        title: "Kadamba Escultura",
        role:  "Website Development & SEO",
        desc:  "Designed, built, and maintained a responsive company website, then optimized titles, meta descriptions, URLs, and image SEO for stronger navigation and search performance.",
        href:  "https://kadambaescultura.com",
    },
    {
        title: "vivekg.work",
        role:  "Personal Portfolio",
        desc:  "My personal site — a running record of the projects, experiments, and work behind everything here.",
        href:  "https://vivekg.work",
    },
];

const Work = () => (
    <section id="work" style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
        <div className="container">
            {/* Header */}
            <div style={{ maxWidth: "640px", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
                <motion.p
                    className="section-label"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Work
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                >
                    Recent projects we've shipped.
                </motion.h2>
            </div>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "1.25rem",
            }}>
                {works.map((w, i) => {
                    const Card = w.href ? motion.a : motion.div;
                    return (
                        <Card
                            key={w.title}
                            {...(w.href ? { href: w.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.06 }}
                            whileHover={w.href ? { y: -6, borderColor: "var(--accent)" } : undefined}
                            className="card"
                            style={{
                                padding: "2rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                                textDecoration: "none",
                                color: "inherit",
                                cursor: w.href ? "pointer" : "default",
                                transition: "box-shadow 0.25s ease, border-color 0.25s ease",
                            }}
                            onMouseEnter={e => { if (w.href) e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                            onMouseLeave={e => { if (w.href) e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                                    {w.title}
                                </h3>
                                {w.href && (
                                    <motion.span
                                        className="work-arrow"
                                        style={{ display: "inline-flex", flexShrink: 0, marginTop: "0.15rem" }}
                                    >
                                        <ArrowUpRight size={18} style={{ color: "var(--accent)" }} />
                                    </motion.span>
                                )}
                            </div>
                            {w.role && (
                                <span style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)" }}>
                                    {w.role}
                                </span>
                            )}
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                                {w.desc}
                            </p>
                        </Card>
                    );
                })}
            </div>
            <style>{`
                .card:has(.work-arrow) { overflow: hidden; }
                .work-arrow { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                a.card:hover .work-arrow { transform: translate(3px, -3px); }
            `}</style>
        </div>
    </section>
);

export default Work;
