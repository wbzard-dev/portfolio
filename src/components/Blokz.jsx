import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    FaBolt,
    FaTags,
    FaChartLine,
    FaUserCheck,
    FaExclamationTriangle,
    FaMapMarkedAlt,
    FaStore,
    FaCheck,
    FaTimes,
    FaArrowRight
} from "react-icons/fa";

const Blokz = () => {
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 800], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    const theme = {
        primary: "#f38b2a",
        primaryLight: "#fff0e0",
        bg: "#0a0a0a",
        text: "#ffffff"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: theme.bg, color: theme.text, overflowX: "hidden" }}
        >
            {/* --- BRANDED HERO --- */}
            <section style={{ minHeight: "100vh", padding: "clamp(6rem, 15vw, 10rem) 1.5rem 4rem", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: `radial-gradient(circle at 80% 20%, ${theme.primary}22 0%, transparent 60%)`,
                        zIndex: 1
                    }}
                />

                <div className="container" style={{ position: "relative", zIndex: 10 }}>
                    <motion.div style={{ opacity: opacityHero, display: "flex", flexDirection: "column", alignItems: "flex-start" }} className="mobile-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(2rem, 5vw, 3rem)" }}
                            className="mobile-center-flex"
                        >
                            <img
                                src="https://ik.imagekit.io/ugdlmxlzt/logo.svg?updatedAt=1764950686563"
                                alt="Blokz Logo"
                                style={{ height: "clamp(30px, 5vw, 45px)", filter: "drop-shadow(0 0 10px rgba(243,139,42,0.3))" }}
                            />
                            <div style={{ height: "2px", width: "clamp(30px, 10vw, 60px)", background: theme.primary }} className="hide-mobile" />
                            <span style={{ fontSize: "clamp(0.6rem, 2vw, 0.8rem)", letterSpacing: "0.4em", fontWeight: 800, color: theme.primary }}>REINVENTING RETAIL</span>
                        </motion.div>

                        <motion.h1
                            style={{
                                fontSize: "clamp(2.5rem, 11vw, 8.5rem)",
                                fontWeight: "900",
                                lineHeight: 0.85,
                                letterSpacing: "-0.05em",
                                textTransform: "uppercase",
                                marginBottom: "2rem"
                            }}
                        >
                            LIGHTING UP <br />
                            <span style={{ color: theme.primary }}>THE KIRANAS.</span>
                        </motion.h1>

                        <motion.p
                            style={{
                                fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                                maxWidth: "700px",
                                color: "rgba(255,255,255,0.6)",
                                lineHeight: 1.6,
                                marginBottom: "clamp(2rem, 5vw, 4rem)"
                            }}
                        >
                            Empowering the 13 million local shops that built India. Blokz is the technological backbone for high-performance sustainable digitization.
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    style={{
                        position: "absolute",
                        right: "-5%",
                        bottom: "10%",
                        fontSize: "25vw",
                        opacity: 0.03,
                        fontWeight: 900,
                        y: yHero,
                        pointerEvents: "none",
                        fontFamily: "Syne, sans-serif",
                        WebkitTextStroke: `2px ${theme.primary}`
                    }}
                >
                    ORANGE
                </motion.div>
            </section>

            {/* --- THE CRISIS (DATA RICH) --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem", position: "relative" }}>
                <div className="container">
                    <motion.div
                        variants={sectionVariants}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        style={{ marginBottom: "clamp(3rem, 10vw, 6rem)" }}
                    >
                        <span style={{ color: theme.primary, letterSpacing: "0.3em", fontSize: "0.8rem", fontWeight: 800 }}>01 / THE CRISIS</span>
                        <h2 style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", marginTop: "1rem", lineHeight: 1 }}>DECODING THE <br className="hide-mobile" />COMMUNITY ABANDONMENT.</h2>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 400px), 1fr))", gap: "2rem" }}>
                        {[
                            {
                                label: "REDUCED FOOTFALL",
                                value: "40-45%",
                                desc: "Decrease in monthly spending at local Kiranas due to Quick-Commerce apps burning cash.",
                                color: "#ef4444"
                            },
                            {
                                label: "LOGISTICS LOSS",
                                value: "₹80-120",
                                desc: "Average loss per order incurred by dark-store centralized warehouse models.",
                                color: theme.primary
                            },
                            {
                                label: "MARKET IMPACT",
                                value: "13M+",
                                desc: "Neighborhood shops facing an existential threat from unsustainable business practices.",
                                color: "#fff"
                            }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass"
                                style={{ padding: "clamp(1.5rem, 5vw, 3rem)", borderRadius: "var(--radius-lg)", borderTop: `4px solid ${stat.color}` }}
                            >
                                <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", opacity: 0.5 }}>{stat.label}</span>
                                <h3 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 900, margin: "1rem 0", color: stat.color }}>{stat.value}</h3>
                                <p style={{ opacity: 0.7, lineHeight: 1.6, fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMPARISON (EXTENSIVE DATA) --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem", background: "rgba(255,255,255,0.02)" }}>
                <div className="container">
                    <motion.div
                        variants={sectionVariants}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        style={{ textAlign: "center", marginBottom: "clamp(3rem, 10vw, 6rem)" }}
                    >
                        <h2 style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>SYSTEM <span style={{ color: theme.primary }}>ARCHITECTURE.</span></h2>
                        <p style={{ opacity: 0.5, marginTop: "1rem", fontSize: "0.95rem" }}>A side-by-side comparison of sustainability vs cash-burn models.</p>
                    </motion.div>

                    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: "1rem" }}>
                        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px", minWidth: "700px" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", padding: "1.25rem", opacity: 0.4, fontSize: "0.75rem", letterSpacing: "0.1em" }}>FEATURE</th>
                                    <th style={{ textAlign: "left", padding: "1.25rem", color: "#ef4444", fontSize: "0.75rem", letterSpacing: "0.1em" }}>DARK STORES / Q-COMM</th>
                                    <th style={{ textAlign: "left", padding: "1.25rem", color: theme.primary, fontSize: "0.75rem", letterSpacing: "0.1em", background: "rgba(255,255,255,0.05)", borderRadius: "10px 10px 0 0" }}>BLOKZ HYPERLOCAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Inventory Model", "Centralized Dark-Stores", "Existing Local Kiranas"],
                                    ["Profitability", "Net Burning (Negative Unit Economics)", "Profitable (100% Margin Retention)"],
                                    ["Delivery Latency", "10-20 Mins (High Fatigue)", "30-60 Mins (Sustainable Local)"],
                                    ["Merchant Impact", "Replace & Compete", "Empower & Digitise"],
                                    ["Community Value", "Zero Local Integration", "Preserves Social Fabric"],
                                    ["Commission", "25-30% High Cut", "0% Pure Technology Model"]
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: "1.25rem", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.9rem" }}>{row[0]}</td>
                                        <td style={{ padding: "1.25rem", opacity: 0.6, borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.9rem" }}>{row[1]}</td>
                                        <td style={{ padding: "1.25rem", fontWeight: 600, color: theme.primary, background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "0.9rem" }}>{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "1rem", opacity: 0.4, fontSize: "0.7rem" }} className="hide-desktop">
                        SWIPE TO VIEW FULL TABLE →
                    </div>
                </div>
            </section>

            {/* --- ECOSYSTEM DEEP DIVE --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 500px), 1fr))", gap: "clamp(2rem, 5vw, 4rem)" }}>
                        {/* CUSTOMER SIDE */}
                        <motion.div
                            variants={sectionVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="glass"
                            style={{ padding: "clamp(2rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)", borderRadius: "var(--radius-lg)", position: "relative" }}
                        >
                            <div style={{ position: "absolute", top: "2rem", right: "2rem", opacity: 0.1 }} className="hide-mobile"><FaBolt size={80} /></div>
                            <h4 style={{ color: theme.primary, letterSpacing: "0.2em", marginBottom: "2rem", fontSize: "0.8rem" }}>FOR CUSTOMERS</h4>
                            <h3 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "2.5rem", lineHeight: 1.1 }}>CONVENIENCE WITHOUT COMPROMISE.</h3>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <FaCheck color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ fontSize: "1rem" }}>Fast Local Delivery</strong>
                                        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Leveraging existing proximity for rapid fulfillment.</p>
                                    </div>
                                </li>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <FaCheck color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ fontSize: "1rem" }}>Fair Pricing</strong>
                                        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Zero hidden convenience fees or surged pricing.</p>
                                    </div>
                                </li>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <FaCheck color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ fontSize: "1rem" }}>Trusted Quality</strong>
                                        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Buy from the person you've known for decades.</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        {/* MERCHANT SIDE */}
                        <motion.div
                            variants={sectionVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="glass"
                            style={{ padding: "clamp(2rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)", borderRadius: "var(--radius-lg)", background: `${theme.primary}11`, border: `1px solid ${theme.primary}44` }}
                        >
                            <h4 style={{ color: theme.primary, letterSpacing: "0.2em", marginBottom: "2rem", fontSize: "0.8rem" }}>FOR SHOPKEEPERS</h4>
                            <h3 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "2.5rem", lineHeight: 1.1 }}>PROFITABLE GROWTH FOR ALL.</h3>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <FaCheck color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ fontSize: "1rem" }}>0% Commission</strong>
                                        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Pure SaaS model. We don't touch your margins.</p>
                                    </div>
                                </li>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <FaCheck color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ fontSize: "1rem" }}>Inventory Management</strong>
                                        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Simple tech to track stocks and expiry in real-time.</p>
                                    </div>
                                </li>
                                <li style={{ display: "flex", gap: "1rem" }}>
                                    <FaCheck color={theme.primary} style={{ marginTop: "5px", flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ fontSize: "1rem" }}>Brand Partnerships</strong>
                                        <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Direct access to big brand loyalty and trade programs.</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 3-STEP INTEGRATION --- */}
            <section style={{ padding: "var(--section-padding) 1.5rem", background: "rgba(255,255,255,0.01)" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 10vw, 6rem)" }}>
                        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>READY IN <span style={{ color: theme.primary }}>THREE STEPS.</span></h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                        {[
                            { step: "01", title: "DIGITIZE", desc: "Fast onboarding of inventory via barcode scanning." },
                            { step: "02", title: "ACTIVATE", desc: "Launch your local storefront to neighbourhood radius." },
                            { step: "03", title: "OPERATE", desc: "Receive orders directly with instant settlements." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                style={{ padding: "clamp(2rem, 5vw, 3.5rem)", background: "rgba(255,255,255,0.03)", borderRadius: "20px" }}
                            >
                                <span style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: theme.primary, opacity: 0.3 }}>{item.step}</span>
                                <h4 style={{ fontSize: "1.25rem", margin: "1rem 0" }}>{item.title}</h4>
                                <p style={{ opacity: 0.5, lineHeight: 1.6, fontSize: "0.95rem" }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section style={{ padding: "clamp(8rem, 15vw, 15rem) 1.5rem", textAlign: "center", background: theme.primary }}>
                <div className="container" style={{ color: theme.bg }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <h2 style={{ fontSize: "clamp(2rem, 10vw, 6rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 0.9, marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
                            JOIN THE <br />HYPERLOCAL REVOLUTION.
                        </h2>
                        <a
                            href="https://blokz.store/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "1.25rem clamp(2rem, 8vw, 4rem)",
                                background: "#000",
                                color: "#fff",
                                borderRadius: "100px",
                                fontSize: "clamp(1rem, 4vw, 1.2rem)",
                                fontWeight: 800,
                                display: "inline-block",
                            }}
                        >
                            PARTNER WITH US <FaArrowRight style={{ marginLeft: "10px" }} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Global Mobile Responsive Styles */}
            <style>{`
                @media (max-width: 768px) {
                    section { padding: 6rem 1.5rem !important; }
                    .container { padding: 0 1.5rem !important; }
                    h1 { line-height: 1 !important; }
                    table { display: block; overflow-x: auto; }
                    .glass { padding: 2.5rem 1.5rem !important; }
                    .mobile-center { align-items: center !important; text-align: center !important; }
                    .mobile-center-flex { justify-content: center !important; }
                }
            `}</style>
        </motion.div>
    );
};

export default Blokz;
