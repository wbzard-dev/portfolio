import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import FormCTA from "./FormCTA";
import { site, whatsappUrl } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const CTASection = ({
    label    = "Get Started",
    headline = "Let's plan your launch.",
    body     = "Tell us about your business and we'll send you a free, practical launch plan, whether or not you work with us.",
    whatsappText,
}) => {
    const wa = whatsappUrl(whatsappText);
    return (
        <section style={{ background: "var(--bg-dark)", color: "#fff", padding: "var(--section-pad) 0" }}>
            <div className="container" style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
                <motion.p
                    {...fadeUp(0)}
                    style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}
                >
                    {label}
                </motion.p>
                <motion.h2 {...fadeUp(0.07)} style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                    {headline}
                </motion.h2>
                <motion.p {...fadeUp(0.14)} style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                    {body}
                </motion.p>
                <motion.div {...fadeUp(0.2)} style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <FormCTA location="cta-section" className="btn-primary-dark" style={{ fontSize: "0.9rem", padding: "1rem 2rem" }} />
                    {wa && (
                        <a className="btn-outline-dark" href={wa} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}>
                            <MessageCircle size={16} /> Chat on WhatsApp
                        </a>
                    )}
                </motion.div>
                <motion.p {...fadeUp(0.26)} style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                    Prefer to talk?{" "}
                    <button data-cal-link={site.calLink} style={{ background: "none", border: "none", padding: 0, color: "#93B4F8", fontWeight: 600, cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}>
                        Book a free 30-minute call
                    </button>
                </motion.p>
            </div>
        </section>
    );
};

export default CTASection;
