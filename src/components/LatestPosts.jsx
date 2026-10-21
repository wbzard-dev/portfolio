import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { posts, formatDate } from "../data/posts";

const LatestPosts = () => {
    const latest = posts.slice(0, 3);
    if (!latest.length) return null;

    return (
        <section id="guides" style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
            <div className="container">
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(2.5rem, 6vw, 4rem)", gap: "1.5rem" }}>
                    <div>
                        <motion.p
                            className="section-label"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Founder Guides
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                        >
                            Learn before you spend.
                        </motion.h2>
                    </div>
                    <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>
                        All guides <ArrowRight size={14} />
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.25rem" }}>
                    {latest.map((p, i) => (
                        <motion.div
                            key={p.slug}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.08 }}
                        >
                            <Link
                                to={`/blog/${p.slug}`}
                                className="card"
                                style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem", height: "100%", transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                            >
                                <span style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>
                                    {p.category} · {formatDate(p.date)}
                                </span>
                                <h3 style={{ fontSize: "1.1rem", lineHeight: 1.35 }}>{p.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>{p.excerpt}</p>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 700, color: "var(--accent)" }}>
                                    Read the guide <ArrowRight size={13} />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestPosts;
