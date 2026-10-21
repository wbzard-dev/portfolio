import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { serviceList, launchPackage } from "../data/services";

const cards = [
    ...serviceList.map(s => ({ icon: s.icon, title: s.label, desc: s.cardDesc, href: s.href })),
    { icon: launchPackage.icon, title: launchPackage.label, desc: launchPackage.cardDesc, href: launchPackage.href, featured: true },
];

const Services = () => (
    <section id="services" style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
        <div className="container">
            {/* Header */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(2.5rem, 6vw, 4rem)", gap: "1.5rem" }}>
                <div>
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Services
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                    >
                        Everything you need to launch and grow.
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontSize: "0.875rem", color: "var(--text-muted)", maxWidth: "300px", lineHeight: 1.65 }}
                >
                    Pick one service, or let us run the whole launch. Either way, everything is built to work together.
                </motion.p>
            </div>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "1.25rem",
            }}>
                {cards.map((s, i) => (
                    <motion.div
                        key={s.href}
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
                            gap: "1rem",
                            transition: "box-shadow 0.25s ease",
                            ...(s.featured ? { background: "var(--bg-dark)", color: "#fff", borderColor: "var(--bg-dark)" } : {}),
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                        <div style={{
                            color: s.featured ? "#93B4F8" : "var(--accent)",
                            width: "fit-content",
                            padding: "0.625rem",
                            background: s.featured ? "rgba(37,99,235,0.2)" : "#EEF3FF",
                            borderRadius: "8px",
                        }}>
                            {s.icon}
                        </div>
                        <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                            {s.title}
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: s.featured ? "rgba(255,255,255,0.6)" : "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>
                            {s.desc}
                        </p>
                        <Link
                            to={s.href}
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, color: s.featured ? "#93B4F8" : "var(--accent)", marginTop: "0.25rem", transition: "gap 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.gap = "0.65rem"}
                            onMouseLeave={e => e.currentTarget.style.gap = "0.4rem"}
                        >
                            {s.featured ? "See what's included" : `Explore ${s.title}`} <ArrowRight size={13} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
