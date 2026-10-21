import React from "react";
import { motion } from "framer-motion";

const statements = [
    {
        number: "01",
        text: "One team for your website, app, social media, SEO and ads. No juggling five freelancers.",
    },
    {
        number: "02",
        text: "We build for enquiries and sales, not just for good looks.",
    },
    {
        number: "03",
        text: "Every campaign is tracked, so you know which rupee brought which customer.",
    },
    {
        number: "04",
        text: "You own everything: domain, code, ad accounts and pages. No lock-in.",
    },
    {
        number: "05",
        text: "Startup speed from Bangalore, with real local understanding of Shivamogga.",
    },
];

const WhyDifferent = () => (
    <section
        style={{
            background: "var(--bg-dark)",
            color: "var(--text-on-dark)",
            padding: "var(--section-pad) 0",
        }}
    >
        <div className="container">
            {/* Header */}
            <div style={{ maxWidth: "640px", marginBottom: "clamp(3rem, 8vw, 5rem)" }}>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}
                >
                    Why Wbzard Labs
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                >
                    Built for founders, not big brands.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    style={{ marginTop: "1.25rem", fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}
                >
                    Big agencies are built for big retainers. New businesses need speed, clarity and every rupee working hard. Here's what that means in practice.
                </motion.p>
            </div>

            {/* Statements */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                {statements.map((s, i) => (
                    <motion.div
                        key={s.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "3rem 1fr",
                            gap: "1.5rem",
                            alignItems: "baseline",
                            padding: "1.75rem 0",
                            borderBottom: i < statements.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                        }}
                    >
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", paddingTop: "0.3rem" }}>
                            {s.number}
                        </span>
                        <p style={{ fontSize: "clamp(1.15rem, 3vw, 1.7rem)", fontFamily: "'Anton', Arial, sans-serif", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2, color: "#fff" }}>
                            {s.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default WhyDifferent;
