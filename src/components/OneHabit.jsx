import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    FaFire,
    FaChartBar,
    FaBell,
    FaCheckCircle,
    FaTrophy,
    FaBraille,
    FaBrain,
    FaInfinity
} from "react-icons/fa";
import SEO from "./SEO";

const OneHabit = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const theme = {
        primary: "#4f46e5",
        secondary: "#818cf8",
        bg: "#0a0a0a",
        text: "#ffffff",
    };

    const sectionVariants = {
        initial: { opacity: 0, y: 50 },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: theme.bg, color: theme.text, overflowX: "hidden" }}
        >
            <SEO
                title="One Habit | Master the Singularity"
                description="A behavioral framework designed to bridge the gap between human intent and automated action. Focus on a single core behavior until it becomes autonomous."
                url="https://wbzard-dev.github.io/portfolio/one-habit"
            />
            <section style={{ minHeight: "100vh", padding: "clamp(6rem, 15vw, 10rem) 1.5rem 4rem", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
                <div style={{
                    position: "absolute",
                    width: "100%", height: "100%",
                    left: 0, top: 0,
                    background: `linear-gradient(45deg, ${theme.bg} 0%, ${theme.primary}22 100%)`,
                    zIndex: 1
                }} />

                <div className="container" style={{ position: "relative", zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                        className="mobile-center"
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(2rem, 5vw, 3rem)" }} className="mobile-center-flex">
                            <div style={{ width: "20px", height: "20px", background: theme.primary, borderRadius: "4px", boxShadow: `0 0 10px ${theme.primary}` }} />
                            <span style={{ fontSize: "clamp(0.6rem, 2vw, 0.8rem)", letterSpacing: "0.5em", fontWeight: 800, opacity: 0.6 }}>RITUAL_01 / ONE HABIT</span>
                        </div>

                        <h1 style={{
                            fontSize: "clamp(2.5rem, 11vw, 8.5rem)",
                            fontWeight: "900",
                            lineHeight: 0.8,
                            letterSpacing: "-0.06em",
                            textTransform: "uppercase"
                        }}>
                            MASTER THE <br />
                            <span style={{ color: "transparent", WebkitTextStroke: `1px ${theme.secondary}` }}>SINGULARITY.</span>
                        </h1>

                        <p style={{
                            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                            maxWidth: "600px",
                            marginTop: "clamp(2rem, 5vw, 4rem)",
                            opacity: 0.6,
                            lineHeight: 1.5
                        }}>
                            One Habit is the antidote to complexity. A behavioral framework designed to bridge the gap between human intent and automated action.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: "absolute",
                        bottom: "-10%", right: "-5%",
                        width: "clamp(300px, 45vw, 45vw)", height: "clamp(300px, 45vw, 45vw)",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${theme.primary}33 0%, transparent 70%)`,
                        border: `1px solid ${theme.primary}44`,
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ color: theme.primary, opacity: 0.2, fontSize: "clamp(5rem, 15vw, 15rem)" }}
                    >
                        <FaInfinity />
                    </motion.div>
                </motion.div>
            </section>

            {/* --- THE SCIENCE (DATA RICH) --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(300px, 100%, 500px), 1fr))", gap: "clamp(3rem, 10vw, 10rem)", alignItems: "center" }}>
                        <motion.div
                            variants={sectionVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                        >
                            <span style={{ fontSize: "0.75rem", letterSpacing: "0.4em", color: theme.primary, fontWeight: 900 }}>BEHAVIORAL ARCHITECTURE</span>
                            <h2 style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", marginTop: "1.5rem", lineHeight: 1 }}>BUILT ON <br />COGNITIVE NUDGES.</h2>
                            <p style={{ marginTop: "clamp(1.5rem, 5vw, 3rem)", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", opacity: 0.6, lineHeight: 1.6 }}>
                                Traditional trackers overwhelm with choice. One Habit utilizes the **Power of One**—focusing the entire neural capacity on a single, core behavior until it becomes autonomous.
                            </p>
                            <div style={{ marginTop: "clamp(2rem, 5vw, 4rem)", display: "flex", flexWrap: "wrap", gap: "clamp(1.5rem, 5vw, 3rem)" }}>
                                <div>
                                    <h4 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "0.5rem" }}>98%</h4>
                                    <span style={{ opacity: 0.4, fontSize: "0.8rem", letterSpacing: "0.1em" }}>RETENTION RATE</span>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "0.5rem" }}>2.4M</h4>
                                    <span style={{ opacity: 0.4, fontSize: "0.8rem", letterSpacing: "0.1em" }}>STREAKS LOGGED</span>
                                </div>
                            </div>
                        </motion.div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            {[
                                { icon: <FaBrain />, title: "Neural Pathways", desc: "Automated logging reduces cognitive friction by 80%." },
                                { icon: <FaBraille />, title: "Pattern Recognition", desc: "AI analyzing of streak decay and peak performance orbits." },
                                { icon: <FaInfinity />, title: "Infinite Loop", desc: "Self-sustaining feedback systems that reward consistency." }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass"
                                    style={{ padding: "2.5rem", borderRadius: "20px", borderLeft: `4px solid ${theme.primary}` }}
                                >
                                    <div style={{ color: theme.primary, marginBottom: "1rem", fontSize: "1.5rem" }}>{feature.icon}</div>
                                    <h4 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{feature.title}</h4>
                                    <p style={{ opacity: 0.5, fontSize: "0.95rem" }}>{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CUSTOM SCROLL VISUALIZATION --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem", background: "rgba(255,255,255,0.02)" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "clamp(4rem, 10vw, 8rem)" }}>
                        <h2 style={{ fontSize: "clamp(2rem, 8vw, 6rem)", fontWeight: 900 }}>IDENTITY <span style={{ opacity: 0.2 }}>CONSISTENCY.</span></h2>
                    </div>

                    <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", padding: "0 1rem" }}>
                        <div style={{
                            position: "absolute", top: "50%", left: 0, right: 0,
                            height: "2px", background: "rgba(255,255,255,0.1)", zIndex: 1
                        }} />
                        <motion.div
                            style={{
                                position: "absolute", top: "50%", left: 0, right: 0,
                                height: "2px", background: theme.primary, scaleX: springProgress, transformOrigin: "left", zIndex: 2
                            }}
                        />

                        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
                            {["INTENT", "ACTION", "RITUAL", "IDENTITY"].map((label, i) => (
                                <motion.div
                                    key={label}
                                    className="glass"
                                    style={{
                                        width: "clamp(60px, 18vw, 120px)",
                                        height: "clamp(60px, 18vw, 120px)",
                                        borderRadius: "50%",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        textAlign: "center", fontSize: "clamp(0.5rem, 2vw, 0.7rem)", fontWeight: 800,
                                        letterSpacing: "0.1em", background: theme.bg,
                                        border: `1px solid rgba(255,255,255,0.1)`
                                    }}
                                >
                                    {label}
                                </motion.div>
                            ))}
                        </div>
                        <p style={{ textAlign: "center", marginTop: "4rem", opacity: 0.4, fontSize: "0.8rem", letterSpacing: "0.2em" }}>SCROLL TO VISUALIZE THE HABIT CYCLE</p>
                    </div>
                </div>
            </section>

            {/* --- ARTIFACT UI SHOWCASE --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 400px), 1fr))", gap: "clamp(3rem, 10vw, 6rem)", alignItems: "center" }}>
                        <motion.div
                            variants={sectionVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="glass"
                            style={{ borderRadius: "clamp(20px, 5vw, 40px)", padding: "clamp(1.5rem, 5vw, 4rem)", position: "relative", border: `1px solid ${theme.primary}33` }}
                        >
                            <div style={{
                                position: "absolute",
                                top: "-20%", left: "-10%",
                                width: "120%", height: "120%",
                                background: `radial-gradient(circle, ${theme.primary}11 0%, transparent 70%)`,
                                zIndex: -1
                            }} />
                            <div style={{
                                width: "100%", aspectRatio: "9/16", background: "rgba(0,0,0,0.5)",
                                borderRadius: "clamp(15px, 3vw, 30px)", border: "1px solid rgba(255,255,255,0.1)",
                                padding: "clamp(1rem, 3vw, 2rem)", display: "flex", flexDirection: "column", gap: "1.5rem"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <FaInfinity color={theme.primary} />
                                    <span style={{ fontSize: "0.6rem", opacity: 0.5 }}>00:42 AM</span>
                                </div>
                                <h4 style={{ fontSize: "clamp(1.25rem, 4.5vw, 2rem)", fontWeight: 900 }}>DRINK WATER</h4>
                                <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
                                    <div style={{ width: "100%", height: "60%", background: `linear-gradient(to top, ${theme.primary}, transparent)`, borderRadius: "10px" }} />
                                </div>
                                <span style={{ textAlign: "center", fontWeight: 900, fontSize: "clamp(2rem, 8vw, 3rem)" }}>28</span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={sectionVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                        >
                            <h3 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.1, marginBottom: "clamp(1.5rem, 5vw, 2.5rem)" }}>ELIMINATING THE GAP.</h3>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { title: "Zero Clutter", desc: "No ads, no social feeds, no distractions. Just your behavior." },
                                    { title: "Local Encryption", desc: "Your data never leaves the device. Biometric locked." },
                                    { title: "Haptic Feedback", desc: "Crafted sensory responses for every success marker." }
                                ].map((item, idx) => (
                                    <li key={idx} style={{ display: "flex", gap: "1rem" }}>
                                        <FaCheckCircle color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                        <div>
                                            <strong style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", display: "block", marginBottom: "0.25rem" }}>{item.title}</strong>
                                            <p style={{ opacity: 0.5, lineHeight: 1.5, fontSize: "0.95rem" }}>{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section style={{ padding: "clamp(8rem, 15vw, 15rem) 1.5rem", textAlign: "center", background: theme.primary, color: theme.bg }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9 }}>
                            BEYOND <br />RESOLUTION.
                        </h2>
                        <div style={{ marginTop: "clamp(2rem, 5vw, 4rem)" }}>
                            <a
                                href="#"
                                style={{
                                    padding: "1.25rem clamp(2rem, 8vw, 4rem)",
                                    background: theme.bg,
                                    color: theme.primary,
                                    borderRadius: "100px",
                                    fontSize: "clamp(1rem, 4vw, 1.2rem)",
                                    fontWeight: 800,
                                    display: "inline-block"
                                }}
                            >
                                START THE RITUAL
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
                @media (max-width: 768px) {
                    section { padding: 6rem 1.5rem !important; }
                    .container { padding: 0 1.5rem !important; }
                    h1 { line-height: 1 !important; }
                    .glass { padding: 2.5rem 1.5rem !important; }
                    .mobile-center { align-items: center !important; text-align: center !important; }
                    .mobile-center-flex { justify-content: center !important; }
                }
            `}</style>
        </motion.div>
    );
};

export default OneHabit;
