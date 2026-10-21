import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SEO from "./SEO";
import { courseList } from "../data/courses";
import { posts } from "../data/posts";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const listSchema = {
    "@context": "https://schema.org",
    "@type":    "ItemList",
    "itemListElement": courseList.map((c, i) => ({
        "@type":    "ListItem",
        "position": i + 1,
        "url":      `${site.url}${c.href}`,
        "name":     c.name,
    })),
};

const CoursesIndex = () => {
    const guides = posts.filter(p => p.category === "Careers");
    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO
                title="Software Courses in Shivamogga — MERN Stack & DevOps (Live Online, ₹5,000)"
                description="Live online MERN stack and DevOps courses for students and freshers in Shivamogga (Shimoga). Real projects, interview prep and a certificate. ₹5,000 per course."
                keywords="software courses Shivamogga, IT courses Shimoga, MERN stack course Shivamogga, DevOps course Shivamogga, full stack course Shimoga, coding classes Shivamogga"
                image="/images/og/courses.png"
                url="/courses"
                breadcrumbs={[{ name: "Courses", path: "/courses" }]}
                jsonLd={[listSchema]}
            />

            <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(3.5rem, 7vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0.05)}>Courses · Live Online</motion.p>
                    <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, maxWidth: "15ch", marginBottom: "1.25rem" }}>
                        Developer courses for Shivamogga.
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.7 }}>
                        Job-focused MERN stack and DevOps courses, taught live online so you can learn from Shivamogga without moving to Bangalore. Real projects, interview prep and a certificate, for {`₹${courseList[0].fee.toLocaleString("en-IN")}`} per course.
                    </motion.p>
                </div>
            </section>

            <section style={{ padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "1.25rem" }}>
                        {courseList.map((c, i) => (
                            <motion.div key={c.slug} {...fadeUp(i * 0.08)}>
                                <Link
                                    to={c.href}
                                    className="card"
                                    style={{ padding: "2.25rem", display: "flex", flexDirection: "column", gap: "1rem", height: "100%", transition: "box-shadow 0.25s ease, transform 0.25s ease" }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                                >
                                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                                        {c.duration} · ₹{c.fee.toLocaleString("en-IN")}
                                    </span>
                                    <h2 style={{ fontSize: "1.4rem", lineHeight: 1.25 }}>{c.short} Course</h2>
                                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{c.subheadline}</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                                        {c.outcomes.slice(0, 3).map(o => (
                                            <span key={o} style={{ display: "flex", gap: "0.6rem", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                                <Check size={15} color="var(--accent)" style={{ flexShrink: 0, marginTop: "2px" }} /> {o}
                                            </span>
                                        ))}
                                    </div>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>
                                        View syllabus &amp; register <ArrowRight size={14} />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {guides.length > 0 && (
                        <div style={{ marginTop: "clamp(3rem, 7vw, 5rem)" }}>
                            <p className="section-label">Career Guides for Shivamogga Students</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                                {guides.map(g => (
                                    <Link key={g.slug} to={`/blog/${g.slug}`} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                        <h3 style={{ fontSize: "1rem", lineHeight: 1.35 }}>{g.title}</h3>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{g.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CoursesIndex;
