import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 60 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: "var(--color-bg)",
                padding: "clamp(6rem, 15vw, 10rem) 1.5rem 4rem"
            }}
        >
            <motion.div
                className="container"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                style={{ position: "relative", zIndex: 2, opacity }}
            >
                <div style={{ overflow: "hidden", textAlign: "center" }} className="mobile-center">
                    <motion.span
                        variants={itemVariants}
                        style={{
                            fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                            letterSpacing: "0.3em",
                            color: "var(--color-text-muted)",
                            display: "block",
                            marginBottom: "clamp(1.5rem, 5vw, 2rem)",
                            fontWeight: 600
                        }}
                    >
                        STRATEGIC DIGITAL ARCHITECTURE
                    </motion.span>
                </div>

                <div className="hero-text-grid" style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.5rem, 2vw, 1rem)",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: "clamp(2.5rem, 12vw, 8.5rem)",
                            marginBottom: "0",
                            lineHeight: 0.8,
                            letterSpacing: "-0.05em",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            width: "100%",
                            textAlign: "left"
                        }}
                    >
                        <span style={{ display: "block" }} className="mobile-center">ENGINEERING</span>
                        <span style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            width: "100%",
                            gap: "clamp(0.5rem, 2vw, 1rem)",
                            marginTop: "clamp(0.5rem, 2vw, 1rem)"
                        }} className="hero-second-row">
                            <span style={{
                                color: "transparent",
                                WebkitTextStroke: "1px var(--color-text)",
                            }}>DIGITAL</span>
                            <span>LEGACIES.</span>
                        </span>
                    </motion.h1>
                </div>

                <motion.div
                    variants={itemVariants}
                    style={{
                        maxWidth: "600px",
                        marginTop: "clamp(3rem, 10vw, 5rem)",
                        marginLeft: "auto",
                        textAlign: "right"
                    }}
                    className="hero-desc-container"
                >
                    <p style={{
                        fontSize: "clamp(1rem, 3.5vw, 1.35rem)",
                        color: "var(--color-text-muted)",
                        fontWeight: 400,
                        lineHeight: 1.5
                    }}>
                        Wbzard is a boutique architecture firm for the digital age. We build high-performance systems for brands that demand absolute excellence.
                    </p>
                </motion.div>
            </motion.div>

            <style>{`
                @media (max-width: 768px) {
                    .mobile-center { text-align: center !important; }
                    .hero-second-row { justify-content: center !important; flex-direction: column !important; align-items: center !important; }
                    .hero-desc-container { text-align: center !important; margin: 3rem auto 0 !important; }
                    .hero-text-grid { align-items: center !important; }
                }
            `}</style>

            {/* Subtle Gradient Backdrops */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "10%",
                    right: "-5%",
                    width: "50vw",
                    height: "50vw",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                    zIndex: 1,
                    y: y1,
                }}
            />
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "-10%",
                    left: "-5%",
                    width: "40vw",
                    height: "40vw",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
                    zIndex: 1,
                    y: y2,
                }}
            />
        </section>
    );
};

export default Hero;
