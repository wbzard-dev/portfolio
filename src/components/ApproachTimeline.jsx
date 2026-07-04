import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
    {
        number: "01",
        title:  "Understand",
        desc:   "We learn how your business operates — how information flows, how your team works, and where the friction lives.",
    },
    {
        number: "02",
        title:  "Analyze",
        desc:   "We map your workflows, identify manual tasks, audit your software stack, and find real opportunities to improve.",
    },
    {
        number: "03",
        title:  "Recommend",
        desc:   "No predefined packages. No unnecessary tools. Only recommendations that are directly aligned with your business goals.",
    },
    {
        number: "04",
        title:  "Build",
        desc:   "We develop software, automation, and digital systems designed around your workflows — not the other way around.",
    },
    {
        number: "05",
        title:  "Improve",
        desc:   "As your business evolves, your systems evolve with it. We provide ongoing support and continuous improvement.",
    },
];

const ApproachTimeline = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.8", "end 0.2"],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}
        >
            <div className="container">
                {/* Header */}
                <div style={{ maxWidth: "600px", marginBottom: "clamp(3rem, 8vw, 5rem)" }}>
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Approach
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                    >
                        We start by understanding your business.
                    </motion.h2>
                </div>

                {/* Timeline */}
                <div style={{ display: "flex", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "flex-start" }}>

                    {/* Scroll-driven line */}
                    <div
                        className="hide-mobile"
                        style={{
                            position: "relative",
                            flexShrink: 0,
                            width: "1px",
                            alignSelf: "stretch",
                            background: "var(--border)",
                            marginTop: "0.5rem",
                        }}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: lineHeight,
                                background: "var(--accent)",
                            }}
                        />
                    </div>

                    {/* Steps */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "3.5rem 1fr",
                                    gap: "1.5rem",
                                    padding: "2rem 0",
                                    borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                                    alignItems: "start",
                                }}
                            >
                                {/* Number */}
                                <span style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.1em",
                                    color: "var(--accent)",
                                    paddingTop: "0.25rem",
                                }}>
                                    {step.number}
                                </span>

                                {/* Content */}
                                <div>
                                    <h3 style={{
                                        fontFamily: "'Satoshi', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "1.15rem",
                                        marginBottom: "0.5rem",
                                        letterSpacing: "-0.015em",
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApproachTimeline;
