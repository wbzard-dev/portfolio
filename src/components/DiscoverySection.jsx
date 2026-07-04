import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const topics = [
    "Your current workflows and how your team operates",
    "Existing software tools and what's working (or not)",
    "Operational bottlenecks and repetitive manual tasks",
    "Growth goals and where technology can help",
    "Automation and custom software opportunities",
];

const DiscoverySection = () => (
    <section
        id="discovery"
        style={{
            background: "#0A0A10",
            color: "var(--text-on-dark)",
            padding: "var(--section-pad) 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
    >
        <div className="container">
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
                gap: "clamp(3rem, 8vw, 6rem)",
                alignItems: "center",
            }}>
                {/* Left */}
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}
                    >
                        Business Discovery Session
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}
                    >
                        Let's talk about your business.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "2rem" }}
                    >
                        Before discussing software, automation, or any solution — we want to understand how your business operates.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "2.5rem" }}
                    >
                        <button
                            className="btn-primary-dark"
                            data-cal-link="vivek-g-ts38ii/30min"
                        >
                            Book Your Discovery Session <ArrowRight size={15} />
                        </button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}
                    >
                        No sales pitch. No predefined packages. Just a practical conversation.
                    </motion.p>
                </div>

                {/* Right — topics */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "var(--radius-lg)",
                        padding: "2.25rem",
                    }}
                >
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
                        What we'll discuss
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {topics.map((topic, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                                <div style={{
                                    flexShrink: 0,
                                    width: "18px",
                                    height: "18px",
                                    borderRadius: "50%",
                                    background: "rgba(37,99,235,0.25)",
                                    border: "1px solid rgba(37,99,235,0.5)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: "1px",
                                }}>
                                    <Check size={10} color="#93B4F8" strokeWidth={3} />
                                </div>
                                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                                    {topic}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default DiscoverySection;
