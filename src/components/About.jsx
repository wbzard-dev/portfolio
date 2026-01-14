import React from "react";
import { motion } from "framer-motion";

const About = () => {
    const itemVariants = {
        initial: { opacity: 0, y: 40 },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section id="about" style={{ background: "var(--color-bg)", padding: "var(--section-padding) 0" }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(300px, 100%, 500px), 1fr))",
                    gap: "clamp(3rem, 10vw, 10rem)"
                }}>
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        variants={itemVariants}
                    >
                        <span style={{ fontSize: "0.85rem", letterSpacing: "0.4em", color: "var(--color-text-muted)", fontWeight: 700 }}>
                            OUR GENESIS
                        </span>
                        <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", marginTop: "1rem", lineHeight: 0.9 }}>
                            THE QUEST FOR PERFECTION.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        variants={itemVariants}
                        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                    >
                        <p style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
                            We operate at the delicate intersection of architecture and digital storytelling. Founded on the principle that excellence is the only baseline, Wbzard crafts digital artifacts that resonate long after the first interaction.
                        </p>
                        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, opacity: 0.8 }}>
                            Our approach is methodical, yet poetic. We dismantle complex problems to build intuitive solutions, ensuring every pixel serves a purpose and every interaction tells a part of your brand legacy.
                        </p>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "2rem",
                            marginTop: "2rem",
                            borderTop: "1px solid var(--color-border)",
                            paddingTop: "clamp(2rem, 5vw, 3rem)"
                        }}>
                            <div>
                                <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-text-muted)", display: "block", marginBottom: "0.5rem" }}>LEGACY</span>
                                <span style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: 800 }}>BORN 2015</span>
                            </div>
                            <div>
                                <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--color-text-muted)", display: "block", marginBottom: "0.5rem" }}>IMPACT</span>
                                <span style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: 800 }}>150+ BUILDS</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Background Narrative Ornament - Hidden on small mobile */}
            <div style={{
                position: "absolute",
                left: "1rem",
                bottom: "5%",
                opacity: 0.1,
                fontSize: "0.65rem",
                writingMode: "vertical-rl",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                pointerEvents: "none"
            }} className="hide-mobile">
                ARCHITECTING THE FUTURE OF DIGITAL COMMERCE
            </div>
        </section>
    );
};

export default About;
