import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { works, stats } from "../data/work";
import WorkCard from "./WorkCard";

export const WorkStats = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            marginBottom: "clamp(2rem, 5vw, 3rem)",
        }}
    >
        {stats.map(s => (
            <div key={s.label} style={{ background: "var(--bg-surface)", padding: "1.5rem 1.75rem" }}>
                <p style={{ fontFamily: "'Anton', Arial, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", lineHeight: 1.05, color: "var(--text)" }}>{s.value}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, marginTop: "0.4rem" }}>{s.label}</p>
            </div>
        ))}
    </motion.div>
);

const Work = ({ limit = 6 }) => (
    <section id="work" style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
        <div className="container">
            {/* Header */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem", marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
                <div style={{ maxWidth: "640px" }}>
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Work
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                    >
                        Brands we've helped launch and grow.
                    </motion.h2>
                </div>
                <Link to="/work" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>
                    See all work &amp; creatives <ArrowRight size={14} />
                </Link>
            </div>

            <WorkStats />

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "1.25rem",
            }}>
                {works.slice(0, limit).map((w, i) => <WorkCard key={w.id} work={w} index={i} />)}
            </div>
        </div>
    </section>
);

export default Work;
