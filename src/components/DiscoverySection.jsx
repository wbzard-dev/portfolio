import React from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "../config/site";
import FormCTA from "./FormCTA";

const topics = [
    "Your business idea, your customers and your competition",
    "Whether you need a website, an app, or both, and in what order",
    "A social media plan that suits your brand and your time",
    "Local SEO and Google Business Profile for Bangalore or Shivamogga",
    "A realistic ad budget and first-90-day goals",
];

const DiscoverySection = () => {
    const wa = whatsappUrl();
    return (
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
                            Free Launch Plan
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}
                        >
                            Let's map out your launch.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "2rem" }}
                        >
                            Whether you're pre-launch or a few months in, we'll look at where you are and tell you the most useful next step, even if that step isn't hiring us.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "2.5rem" }}
                        >
                            <FormCTA location="discovery" className="btn-primary-dark" />
                            <button className="btn-outline-dark" data-cal-link={site.calLink}>
                                Book a 30-min Call
                            </button>
                            {wa && (
                                <a className="btn-outline-dark" href={wa} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle size={15} /> WhatsApp us
                                </a>
                            )}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}
                        >
                            No hard sell. No jargon. Just a practical plan for your business.
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
                            What we'll cover
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
};

export default DiscoverySection;
