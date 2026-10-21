import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { locationList } from "../data/locations";

const ServiceAreas = () => (
    <section id="locations" style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
        <div className="container">
            <div style={{ maxWidth: "640px", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
                <motion.p
                    className="section-label"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Where We Work
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                >
                    Rooted in Karnataka. Built for founders.
                </motion.h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "1.25rem" }}>
                {locationList.map((l, i) => (
                    <motion.div
                        key={l.slug}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.08 }}
                    >
                        <Link
                            to={l.href}
                            className="card"
                            style={{ padding: "2.25rem", display: "flex", flexDirection: "column", gap: "1rem", height: "100%", transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                        >
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                                <MapPin size={13} /> {l.city} · {l.altName}
                            </span>
                            <h3 style={{ fontSize: "1.3rem", lineHeight: 1.25 }}>{l.headline}</h3>
                            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>
                                {l.subheadline}
                            </p>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)" }}>
                                Digital marketing &amp; websites in {l.city} <ArrowRight size={13} />
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default ServiceAreas;
