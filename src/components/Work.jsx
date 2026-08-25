import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const works = [
    {
        title: "QuickFix Services",
        desc:  "Business website built to convert local service inquiries into booked jobs.",
        href:  "https://www.quickfixservices.co.in/",
    },
    {
        title: "The Rugged",
        desc:  "Brand website designed around the product line and a clear path to purchase.",
        href:  "https://the-rugged.com/",
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
                {works.map((w, i) => (
                    <motion.a
                        key={w.title}
                        href={w.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.08 }}
                        whileHover={{ y: -4 }}
                        className="card"
                        style={{
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            textDecoration: "none",
                            color: "inherit",
                            transition: "box-shadow 0.25s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                            <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                                {w.title}
                            </h3>
                            <ArrowUpRight size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.15rem" }} />
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                            {w.desc}
                        </p>
                    </motion.a>
                ))}
            </div>
        </div>
    </section>
);

export default Work;
