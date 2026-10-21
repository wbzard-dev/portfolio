import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, IndianRupee, MonitorPlay, FolderGit2, Award } from "lucide-react";
import SEO from "./SEO";
import FAQList from "./FAQList";
import CourseForm from "./CourseForm";
import NotFound from "./NotFound";
import { faqSchema } from "../lib/schema";
import { courses, courseList } from "../data/courses";
import { posts } from "../data/posts";
import { site } from "../config/site";

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const rupees = (n) => `₹${n.toLocaleString("en-IN")}`;

const scrollToEnroll = (e) => {
    e.preventDefault();
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CoursePage = () => {
    const { slug } = useParams();
    const c = courses[slug];
    if (!c) return <NotFound />;

    const path = `/courses/${slug}`;
    const other = courseList.find(o => o.slug !== slug);
    const guides = posts.filter(p => p.category === "Careers").slice(0, 3);

    const courseSchema = {
        "@context":    "https://schema.org",
        "@type":       "Course",
        "name":        `${c.name} (Online, for Shivamogga)`,
        "description": c.seoDesc,
        "url":         `${site.url}${path}`,
        "provider":    { "@type": "Organization", "name": site.name, "sameAs": site.url },
        "inLanguage":  "en",
        "educationalLevel": c.level,
        "teaches":     c.curriculum.map(m => m.title),
        "offers": {
            "@type":         "Offer",
            "category":      "Paid",
            "price":         c.fee,
            "priceCurrency": "INR",
            "availability":  "https://schema.org/InStock",
            "url":           `${site.url}${path}#enroll`,
        },
        "hasCourseInstance": {
            "@type":          "CourseInstance",
            "courseMode":     "Online",
            "courseWorkload": "PT3H",
            "courseSchedule": { "@type": "Schedule", "duration": "PT3H", "repeatFrequency": "Daily", "repeatCount": parseInt(c.durationISO.slice(1), 10) },
            "location":       { "@type": "VirtualLocation", "url": `${site.url}${path}` },
        },
    };

    const facts = [
        { icon: <IndianRupee size={16} />, label: "Fee",      value: rupees(c.fee) },
        { icon: <Clock size={16} />,       label: "Duration", value: c.duration },
        { icon: <MonitorPlay size={16} />, label: "Format",   value: "Live online + recordings" },
        { icon: <FolderGit2 size={16} />,  label: "Projects", value: c.projects },
        { icon: <Award size={16} />,       label: "Certificate", value: "Included" },
    ];

    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO
                title={c.seoTitle}
                description={c.seoDesc}
                keywords={c.keywords}
                image={`/images/og/${slug}.png`}
                url={path}
                breadcrumbs={[{ name: "Courses", path: "/courses" }, { name: c.short, path }]}
                jsonLd={[courseSchema, faqSchema(c.faqs)]}
            />

            {/* ── Hero ── */}
            <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
                <div className="container">
                    <motion.p {...fadeUp(0.05)} style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
                        {c.short} Course · Live Online · Shivamogga &amp; Karnataka
                    </motion.p>
                    <motion.h1 {...fadeUp(0.12)} style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)", lineHeight: 1.0, marginBottom: "1.25rem", maxWidth: "16ch" }}>
                        {c.headline}
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "600px" }}>
                        {c.subheadline}
                    </motion.p>
                    <motion.div {...fadeUp(0.26)} style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.25rem" }}>
                        {facts.map(f => (
                            <span key={f.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.82rem", padding: "0.5rem 0.9rem", borderRadius: "100px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}>
                                <span style={{ color: "#93B4F8", display: "inline-flex" }}>{f.icon}</span>
                                <strong style={{ fontWeight: 600 }}>{f.label}:</strong> {f.value}
                            </span>
                        ))}
                    </motion.div>
                    <motion.div {...fadeUp(0.32)} style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                        <a href="#enroll" onClick={scrollToEnroll} className="btn-primary-dark" style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}>
                            Register for {rupees(c.fee)} <ArrowRight size={16} />
                        </a>
                        <a href="#curriculum" onClick={(e) => { e.preventDefault(); document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline-dark" style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}>
                            See the Syllabus
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── Why ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>Why This Course</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)", maxWidth: "20ch" }}>
                        Built for how developers actually get hired now.
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                        {c.problems.map((p, i) => (
                            <motion.div key={p.title} {...fadeUp(i * 0.07)} className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>0{i + 1}</span>
                                <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{p.title}</h3>
                                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Curriculum ── */}
            <section id="curriculum" style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0", scrollMarginTop: "5rem" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>Syllabus</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "0.75rem" }}>
                        {c.short} course syllabus.
                    </motion.h2>
                    <motion.p {...fadeUp(0.1)} style={{ color: "var(--text-muted)", marginBottom: "clamp(2.5rem, 5vw, 3.5rem)", maxWidth: "560px", lineHeight: 1.7 }}>
                        {c.duration} · {c.workload} · {c.format}.
                    </motion.p>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {c.curriculum.map((m, i) => (
                            <motion.div
                                key={m.title}
                                {...fadeUp(i * 0.05)}
                                style={{ display: "grid", gridTemplateColumns: "minmax(90px, 140px) 1fr", gap: "1.5rem", padding: "1.5rem 0", borderBottom: i < c.curriculum.length - 1 ? "1px solid var(--border)" : "none" }}
                            >
                                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", paddingTop: "0.2rem" }}>
                                    Module {i + 1}<br /><span style={{ color: "var(--text-muted)" }}>{m.phase}</span>
                                </span>
                                <div>
                                    <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{m.title}</h3>
                                    <ul style={{ paddingLeft: "1.1rem", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                                        {m.topics.map(t => <li key={t}>{t}</li>)}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Outcomes + audience ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        {[{ label: "What You'll Achieve", title: "By the end of the course.", items: c.outcomes }, { label: "Who It's For", title: "This course is for you if…", items: c.audience }].map((blk, b) => (
                            <motion.div key={blk.label} {...fadeUp(b * 0.08)}>
                                <p className="section-label">{blk.label}</p>
                                <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", lineHeight: 1.2, marginBottom: "1.75rem" }}>{blk.title}</h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {blk.items.map(it => (
                                        <div key={it} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                                            <div style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                                <Check size={11} color="var(--accent)" strokeWidth={3} />
                                            </div>
                                            <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{it}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Fee + form ── */}
            <section id="enroll" style={{ background: "var(--bg-dark)", color: "#fff", padding: "var(--section-pad) 0", scrollMarginTop: "4rem" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
                                Fee &amp; Next Batch
                            </p>
                            <p style={{ fontFamily: "'Anton', Arial, sans-serif", fontSize: "clamp(3.5rem, 9vw, 5.5rem)", lineHeight: 1 }}>{rupees(c.fee)}</p>
                            <p style={{ color: "rgba(255,255,255,0.55)", margin: "0.75rem 0 2rem", lineHeight: 1.7 }}>
                                One-time fee for the full {c.duration.split(",")[0]} course. Next batch: dates announced to registered students first.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                                {["Live weekend sessions + all recordings", c.projects, "Mock interviews, resume and LinkedIn review", "Course completion certificate", "Doubt support and student community"].map(it => (
                                    <div key={it} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                                        <div style={{ flexShrink: 0, width: "20px", height: "20px", borderRadius: "50%", background: "rgba(37,99,235,0.25)", border: "1px solid rgba(37,99,235,0.5)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                            <Check size={11} color="#93B4F8" strokeWidth={3} />
                                        </div>
                                        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>{it}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div {...fadeUp(0.1)} style={{ background: "var(--bg)", color: "var(--text)", borderRadius: "var(--radius-lg)", padding: "clamp(1.5rem, 4vw, 2.25rem)" }}>
                            <h2 style={{ fontSize: "1.35rem", lineHeight: 1.2, marginBottom: "0.4rem" }}>Register your interest</h2>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                                We'll WhatsApp you the batch dates, timings and payment details.
                            </p>
                            <CourseForm defaultCourse={c.short} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">FAQ</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "2rem" }}>
                                {c.short} course questions.
                            </h2>
                            {other && (
                                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                                    Also see our{" "}
                                    <Link to={other.href} style={{ color: "var(--accent)", fontWeight: 600 }}>{other.short} course ({rupees(other.fee)}) →</Link>
                                </p>
                            )}
                            {guides.length > 0 && (
                                <>
                                    <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.875rem" }}>Career guides</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                        {guides.map(g => (
                                            <Link key={g.slug} to={`/blog/${g.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>
                                                {g.title} <ArrowRight size={13} />
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                        <motion.div {...fadeUp(0.1)}>
                            <FAQList faqs={c.faqs} />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursePage;
