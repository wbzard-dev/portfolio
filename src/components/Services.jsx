import React from "react";
import { motion } from "framer-motion";
import { Code2, Zap, Globe, Sparkles, ArrowRight } from "lucide-react";

const services = [
    {
        icon:  <Code2 size={26} />,
        title: "Custom Software Development",
        desc:  "Internal dashboards, CRM systems, client portals, and workflow platforms — built specifically around how your business operates.",
        href:  "/services/custom-software-development",
    },
    {
        icon:  <Zap size={26} />,
        title: "Business Process Automation",
        desc:  "Eliminate repetitive manual work. From lead management and client onboarding to reporting and internal workflows.",
        href:  "/services/business-automation",
    },
    {
        icon:  <Globe size={26} />,
        title: "Website Development",
        desc:  "Websites built for business outcomes — lead generation, customer acquisition, and seamless integration with your operations.",
        href:  "/services/website-development",
    },
    {
        icon:  <Sparkles size={26} />,
        title: "AI Solutions",
        desc:  "Practical AI implementations that improve productivity and automate processes. No AI for the sake of AI — only what creates real value.",
        href:  "/services/ai-solutions",
    },
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
                        Solutions built around your business.
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontSize: "0.875rem", color: "var(--text-muted)", maxWidth: "280px", lineHeight: 1.65 }}
                >
                    Every service starts with understanding your business — not with a predefined package.
                </motion.p>
            </div>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "1.25rem",
            }}>
                {services.map((s, i) => (
                    <motion.div
                        key={i}
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
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                        <div style={{ color: "var(--accent)", width: "fit-content", padding: "0.625rem", background: "#EEF3FF", borderRadius: "8px" }}>
                            {s.icon}
                        </div>
                        <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                            {s.title}
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>
                            {s.desc}
                        </p>
                        <a
                            href={s.href}
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)", marginTop: "0.25rem", transition: "gap 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.gap = "0.65rem"}
                            onMouseLeave={e => e.currentTarget.style.gap = "0.4rem"}
                        >
                            Learn More <ArrowRight size={13} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
