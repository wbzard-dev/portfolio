import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../config/site";
import FormCTA from "./FormCTA";

const cyclingWords = ["Online.", "Found.", "Noticed.", "Growing."];

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(i => (i + 1) % cyclingWords.length);
        }, 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <section
            id="hero"
            style={{
                height: "100svh",
                minHeight: "620px",
                background: "var(--bg-dark)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                padding: "calc(64px + 0.75rem) 1.5rem 3rem",
            }}
        >
            {/* Dot grid */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 0)",
                backgroundSize: "36px 36px",
                zIndex: 1,
                pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1000px" }}>

                {/* Page h1: static line + cycling word */}
                <h1 style={{ fontSize: "inherit", lineHeight: "inherit", letterSpacing: "normal" }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            display: "block",
                            fontFamily: "'Satoshi', sans-serif",
                            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: "rgba(255,255,255,0.45)",
                            letterSpacing: "0.01em",
                            marginBottom: "0.25rem",
                        }}
                    >
                        Starting a business? Let's get it
                    </motion.span>

                    {/* Cycling word */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        style={{
                            height: "clamp(5rem, 14vw, 12rem)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            marginBottom: "2rem",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={cyclingWords[index]}
                                initial={{ y: "60%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "-60%", opacity: 0 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: "block",
                                    fontFamily: "'Anton', Arial, sans-serif",
                                    fontWeight: 400,
                                    fontSize: "clamp(4.5rem, 13vw, 11rem)",
                                    lineHeight: 1,
                                    letterSpacing: "-0.01em",
                                    color: "#fff",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {cyclingWords[index]}
                            </motion.span>
                        </AnimatePresence>
                    </motion.span>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.45)",
                        maxWidth: "520px",
                        margin: "0 auto 2.25rem",
                        lineHeight: 1.7,
                    }}
                >
                    Website, app, social media, SEO and Meta &amp; Google Ads for founders and new businesses in Bangalore and Shivamogga. One team and one launch plan, from day zero.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}
                >
                    <FormCTA
                        location="hero"
                        className="btn-primary-dark"
                        style={{ fontSize: "0.875rem", padding: "0.875rem 1.75rem" }}
                    />
                    <button
                        className="btn-outline-dark"
                        data-cal-link={site.calLink}
                        style={{ fontSize: "0.875rem", padding: "0.875rem 1.75rem" }}
                    >
                        Book a Free Call
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
