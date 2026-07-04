import React from "react";
import { motion } from "framer-motion";

const painPoints = [
    "Managing leads and customer data manually",
    "Relying on spreadsheets for critical operations",
    "Switching between multiple disconnected tools",
    "Repeating the same tasks every single day",
    "Paying for subscriptions they barely use",
    "No visibility into what's actually happening in the business",
];

const ProblemSection = () => (
    <section id="problem" style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
        <div className="container">
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                gap: "clamp(3rem, 8vw, 6rem)",
                alignItems: "start",
            }}>
                {/* Left — headline */}
                <div>
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        The Problem
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}
                    >
                        Technology should make business simpler.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.7 }}
                    >
                        So why does it often feel like the opposite?
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        style={{ marginTop: "2.5rem", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "400px", borderLeft: "2px solid var(--border)", paddingLeft: "1.25rem" }}
                    >
                        As businesses grow, these inefficiencies become expensive. Most agencies respond by selling another service.
                        <br /><br />
                        <strong style={{ color: "var(--text)", fontWeight: 600, fontStyle: "normal" }}>We respond by understanding the business first.</strong>
                    </motion.p>
                </div>

                {/* Right — pain points */}
                <div style={{ paddingTop: "0.5rem" }}>
                    {painPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.09 }}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "1rem",
                                padding: "1.1rem 0",
                                borderBottom: i < painPoints.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            <span style={{
                                flexShrink: 0,
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "var(--text-muted)",
                                marginTop: "0.45rem",
                            }} />
                            <p style={{ fontSize: "0.975rem", color: "var(--text)", lineHeight: 1.55, fontWeight: 400 }}>
                                {point}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default ProblemSection;
