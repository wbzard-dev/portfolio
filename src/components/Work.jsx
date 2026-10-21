import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { works } from "../data/work";

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
                    Brands we've helped launch and grow.
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
