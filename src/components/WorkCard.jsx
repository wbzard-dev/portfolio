import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Instagram } from "lucide-react";
import { asset } from "../lib/assets";

const linkStyle = { display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)" };

const WorkCard = ({ work: w, index = 0 }) => (
    <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
        className="card work-card"
        style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
        {w.cover && (
            <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--bg-dark)" }}>
                <img
                    src={asset(w.cover.src)}
                    alt={`${w.title} — ${w.role}`}
                    width={w.cover.size[0]}
                    height={w.cover.size[1]}
                    loading="lazy"
                    decoding="async"
                    className="work-cover"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
            </div>
        )}
        <div style={{ padding: "1.5rem 1.75rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>
                {w.sector}
            </span>
            <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                {w.title}
            </h3>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>{w.role}</p>
            {w.results?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {w.results.map(r => (
                        <span key={r.label} style={{ fontSize: "0.78rem", padding: "0.35rem 0.7rem", borderRadius: "100px", background: "#EEF3FF", color: "var(--text)" }}>
                            <strong style={{ color: "var(--accent)" }}>{r.value}</strong> {r.label}
                        </span>
                    ))}
                </div>
            )}
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>{w.desc}</p>
            {(w.href || w.instagram) && (
                <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                    {w.href && (
                        <a href={w.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                            <Globe size={14} /> Website <ArrowUpRight size={13} />
                        </a>
                    )}
                    {w.instagram && (
                        <a href={w.instagram} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                            <Instagram size={14} /> Instagram <ArrowUpRight size={13} />
                        </a>
                    )}
                </div>
            )}
        </div>
        <style>{`
            .work-cover { transition: transform 0.5s ease; }
            .work-card:hover .work-cover { transform: scale(1.03); }
        `}</style>
    </motion.article>
);

export default WorkCard;
