import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight, CheckCircle, Play, Users, Award, Briefcase,
    Code2, Globe, Terminal, Linkedin, FileText, Zap, Brain,
    ChevronDown, ChevronUp, Star, Clock, Shield
} from "lucide-react";
import SEO from "./SEO";

/* ─── Animation helpers ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true },
};

const itemVariant = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

/* ─── Data ───────────────────────────────────────────────── */
const painPoints = [
    {
        icon: <Code2 size={22} />,
        title: "You know the syntax, not the system",
        desc: "You can write React components all day. But ask you how a request travels from browser to server and back — and it gets uncomfortable.",
    },
    {
        icon: <Zap size={22} />,
        title: "AI can replicate your skills in seconds",
        desc: "Copy-paste coding, Stack Overflow searches, ChatGPT prompts — AI does all of that better and faster. Surface-level skills are now a commodity.",
    },
    {
        icon: <Users size={22} />,
        title: "Your profile looks like everyone else's",
        desc: "\"Proficient in React, Node.js, MongoDB\" — so does every other resume in the pile. Recruiters skip right past you.",
    },
];

const modules = [
    {
        phase: "Phase 1 — Foundation",
        color: "#2563EB",
        items: [
            {
                icon: <Brain size={18} />,
                title: "How to Learn",
                desc: "First principles thinking, Feynman technique, spaced repetition, building mental models. Learn how to learn — so every new technology takes you days, not months.",
            },
            {
                icon: <Globe size={18} />,
                title: "How the Internet Works",
                desc: "DNS, TCP/IP, HTTP/HTTPS, how browsers render pages, what happens when you type a URL. The fundamentals every engineer must know.",
            },
        ],
    },
    {
        phase: "Phase 2 — The Stack",
        color: "#7C3AED",
        items: [
            {
                icon: <Code2 size={18} />,
                title: "MERN Stack — Full Course",
                desc: "MongoDB, Express, React, Node.js from scratch. Three real projects. REST APIs, auth, state management, database design. No shortcuts.",
            },
            {
                icon: <Terminal size={18} />,
                title: "DevOps Basics — Deploy Real Apps",
                desc: "Linux basics, Git, Docker intro, CI/CD pipelines, deploying to a VPS or cloud (AWS/Railway). Every project you build, you ship.",
            },
        ],
    },
    {
        phase: "Phase 3 — Career",
        color: "#059669",
        items: [
            {
                icon: <Briefcase size={18} />,
                title: "Mock Interviews",
                desc: "Live mock interviews with real feedback. DSA basics, system design conversations, behavioural rounds. Know what to say and how to say it.",
            },
            {
                icon: <Linkedin size={18} />,
                title: "LinkedIn Domination",
                desc: "Profile audit, content strategy, how to get noticed by recruiters. Build a LinkedIn presence that works while you sleep.",
            },
            {
                icon: <FileText size={18} />,
                title: "ATS-Ready Resume",
                desc: "A resume that gets past the bots and impresses the humans. Template, personal review, and iteration until it's right.",
            },
        ],
    },
];

const perks = [
    { icon: <Award size={20} />, title: "Course Completion Certificate", desc: "Wbzard Labs certified. Shareable on LinkedIn." },
    { icon: <Users size={20} />, title: "1-on-1 Mock Interview Sessions", desc: "Real feedback, not generic advice." },
    { icon: <Linkedin size={20} />, title: "LinkedIn Profile Review", desc: "Personal audit from someone who's done it." },
    { icon: <FileText size={20} />, title: "ATS Resume Review", desc: "We rewrite it until recruiters notice you." },
    { icon: <Star size={20} />, title: "Paid Internship (Selected)", desc: "Top performers get real internship opportunities through Wbzard Labs." },
    { icon: <Shield size={20} />, title: "Private Community Access", desc: "Lifetime access to the cohort community." },
];

const faqs = [
    {
        q: "Who is this cohort for?",
        a: "Anyone who codes but feels like they're missing the bigger picture — students, recent graduates, self-taught developers who want to go from 'I write code' to 'I understand systems'.",
    },
    {
        q: "Do I need prior coding experience?",
        a: "Basic familiarity with any programming language helps, but we start from first principles. If you understand what a variable is and have written a loop, you're ready.",
    },
    {
        q: "How long is the cohort?",
        a: "12 weeks, part-time. Designed so you can complete it alongside college or a full-time job. Approximately 8–10 hours per week.",
    },
    {
        q: "Is it live or recorded?",
        a: "Live sessions every weekend, all recorded. Miss a session? Watch the recording. Everything is async-friendly.",
    },
    {
        q: "What about the paid internship?",
        a: "Selected top performers from the cohort will get internship opportunities through Wbzard Labs. Selection is based on project quality, consistency, and overall performance during the cohort.",
    },
    {
        q: "When does the next batch start?",
        a: "We're finalizing the start date. Register your interest now to get early access and priority seat allocation.",
    },
];

/* ─── Sub-components ─────────────────────────────────────── */
function SectionLabel({ children, dark = false }) {
    return (
        <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,0.4)" : "var(--text-muted)",
            marginBottom: "1rem",
        }}>
            {children}
        </p>
    );
}

function FAQ({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            onClick={() => setOpen(o => !o)}
            style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                padding: "1.25rem 0",
                cursor: "pointer",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "0.975rem", color: "#fff" }}>{q}</p>
                {open ? <ChevronUp size={18} style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0, marginTop: 2 }} /> : <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.45)", flexShrink: 0, marginTop: 2 }} />}
            </div>
            {open && (
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginTop: "0.75rem" }}>
                    {a}
                </p>
            )}
        </div>
    );
}

/* ─── Registration Form ──────────────────────────────────── */
function RegistrationForm() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", level: "", stack: "", why: "" });
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "0.85rem 1rem",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "var(--radius-md)",
        color: "#fff",
        fontFamily: "'Satoshi', sans-serif",
        fontSize: "0.9rem",
        outline: "none",
        transition: "border-color 0.2s ease",
    };

    const labelStyle = {
        display: "block",
        fontFamily: "'Satoshi', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "rgba(255,255,255,0.55)",
        marginBottom: "0.4rem",
        letterSpacing: "0.04em",
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "3rem 1.5rem" }}
            >
                <CheckCircle size={48} style={{ color: "#10B981", margin: "0 auto 1.25rem" }} />
                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#fff", marginBottom: "0.75rem" }}>
                    You're on the list!
                </h3>
                <p style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", maxWidth: "360px", margin: "0 auto" }}>
                    We'll reach out to your email with the next steps. Keep an eye on your inbox.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid">
                <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="rahul@example.com" style={inputStyle} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="form-grid">
                <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Current Level *</label>
                    <select name="level" required value={form.level} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                        <option value="" disabled style={{ background: "#1a1a1a" }}>Select...</option>
                        <option value="Student" style={{ background: "#1a1a1a" }}>Student</option>
                        <option value="Fresh Graduate" style={{ background: "#1a1a1a" }}>Fresh Graduate</option>
                        <option value="Working Professional" style={{ background: "#1a1a1a" }}>Working Professional (0–2 yrs)</option>
                        <option value="Career Switcher" style={{ background: "#1a1a1a" }}>Career Switcher</option>
                        <option value="Self-taught" style={{ background: "#1a1a1a" }}>Self-taught Developer</option>
                    </select>
                </div>
            </div>

            <div>
                <label style={labelStyle}>Current Tech Stack (what you already know)</label>
                <input name="stack" value={form.stack} onChange={handleChange} placeholder="e.g. HTML, CSS, basic JavaScript, a bit of React..." style={inputStyle} />
            </div>

            <div>
                <label style={labelStyle}>Why do you want to join this cohort? *</label>
                <textarea
                    name="why"
                    required
                    value={form.why}
                    onChange={handleChange}
                    placeholder="Be honest. What's the gap you feel in your skills? What do you want to achieve?"
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                />
            </div>

            {status === "error" && (
                <p style={{ color: "#F87171", fontSize: "0.85rem", fontFamily: "'Satoshi', sans-serif" }}>
                    Something went wrong. Please email us directly at vivekg.work@gmail.com
                </p>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary-dark"
                style={{ fontSize: "0.95rem", padding: "1rem 2rem", width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.7 : 1 }}
            >
                {status === "loading" ? "Submitting..." : "Apply for the Cohort"} <ArrowRight size={16} />
            </button>

            <p style={{ textAlign: "center", fontFamily: "'Satoshi', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                Limited seats · No payment required to register interest
            </p>
        </form>
    );
}

/* ─── Main Component ─────────────────────────────────────── */
const CohortV1 = () => {
    return (
        <>
            <SEO
                title="Cohort v1 — Learn to Think Like an Engineer | Wbzard Labs"
                description="A 12-week cohort teaching MERN stack, DevOps, first principles thinking, mock interviews, LinkedIn optimization, and ATS resume prep. Limited seats."
                keywords="coding cohort, MERN stack course, first principles coding, developer bootcamp, wbzard labs"
            />

            <style>{`
                .cohort-pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
                .module-items-grid { display: grid; gap: 1rem; }
                .perks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
                .faq-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 4rem; align-items: start; }
                .form-section-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
                @media (max-width: 900px) {
                    .cohort-pain-grid { grid-template-columns: 1fr; }
                    .perks-grid { grid-template-columns: 1fr 1fr; }
                    .faq-cols { grid-template-columns: 1fr; gap: 0; }
                    .form-section-inner { grid-template-columns: 1fr; gap: 3rem; }
                }
                @media (max-width: 600px) {
                    .perks-grid { grid-template-columns: 1fr; }
                    .form-grid { grid-template-columns: 1fr !important; }
                }
                .cohort-input-focus:focus { border-color: var(--accent); }
            `}</style>

            {/* ── HERO ────────────────────────────────────── */}
            <section style={{
                height: "100svh",
                minHeight: "560px",
                background: "var(--bg-dark)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                padding: "80px 1.5rem 2rem",
            }}>
                {/* Dot grid */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
                    backgroundSize: "36px 36px",
                    zIndex: 1, pointerEvents: "none",
                }} />
                {/* Glow */}
                <div style={{
                    position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
                    width: "700px", height: "350px",
                    background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
                    zIndex: 1, pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", width: "100%" }}>
                    {/* Badge */}
                    {/* <motion.div {...fadeUp(0.1)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "1.25rem" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", display: "inline-block", flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#93C5FD", letterSpacing: "0.08em" }}>
                            Wbzard Labs · Cohort v1 · Limited Seats
                        </span>
                    </motion.div> */}

                    {/* Headline — 2 lines, tight */}
                    <motion.h1 {...fadeUp(0.2)} style={{
                        fontFamily: "'Anton', Arial, sans-serif",
                        fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                        lineHeight: 1.0,
                        letterSpacing: "-0.01em",
                        marginBottom: "1rem",
                    }}>
                        AI CAN'T REPLACE<br />
                        <span style={{ color: "var(--accent)" }}>ENGINEERS WHO THINK.</span>
                    </motion.h1>

                    {/* Sub */}
                    <motion.p {...fadeUp(0.32)} style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "clamp(0.875rem, 1.6vw, 1.05rem)",
                        color: "rgba(255,255,255,0.45)",
                        maxWidth: "520px",
                        margin: "0 auto 1.75rem",
                        lineHeight: 1.75,
                    }}>
                        Most developers copy-paste. A few understand <em>why</em> the code works.
                        Those are the ones AI can't replace — and <strong style={{ color: "rgba(255,255,255,0.82)" }}>companies fight to hire.</strong>
                    </motion.p>

                    {/* CTAs */}
                    <motion.div {...fadeUp(0.42)} style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                        <a href="#register" className="btn-primary-dark" style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}>
                            Apply Now — It's Free <ArrowRight size={15} />
                        </a>
                        <a href="#curriculum" className="btn-outline-dark" style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}>
                            See the Curriculum
                        </a>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div {...fadeUp(0.52)} style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
                        {[
                            { value: "12", label: "Weeks" },
                            { value: "30", label: "Seats Only" },
                            { value: "3", label: "Real Projects" },
                            { value: "100%", label: "Career Support" },
                        ].map(s => (
                            <div key={s.label} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.75rem", color: "#fff", lineHeight: 1 }}>{s.value}</p>
                                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: "0.2rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── VIDEO ───────────────────────────────────── */}
            <section style={{ background: "#0a0a0a", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <SectionLabel dark>Watch This First</SectionLabel>
                        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", color: "#fff", letterSpacing: "-0.025em" }}>
                            What this cohort will do for you
                        </h2>
                    </motion.div>

                    <motion.div {...fadeUp(0.1)} style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.08)",
                        maxWidth: "900px",
                        margin: "0 auto",
                    }}>
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Wbzard Labs Cohort v1 — Overview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute", top: 0, left: 0,
                                width: "100%", height: "100%",
                                border: "none",
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* ── PROBLEM ─────────────────────────────────── */}
            <section style={{ background: "#0a0a0a", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem", maxWidth: "640px" }}>
                        <SectionLabel dark>The Developer Trap</SectionLabel>
                        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "#fff", letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                            Why smart developers<br />still fear AI taking their job
                        </h2>
                        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                            It's not that you don't work hard. It's that the industry taught you <em>what</em> to type, not <em>how</em> to think.
                        </p>
                    </motion.div>

                    <motion.div className="cohort-pain-grid" variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                        {painPoints.map((p) => (
                            <motion.div key={p.title} variants={itemVariant} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "var(--radius-lg)",
                                padding: "2rem",
                            }}>
                                <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", color: "#60A5FA" }}>
                                    {p.icon}
                                </div>
                                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: "0.75rem" }}>{p.title}</h3>
                                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CURRICULUM ──────────────────────────────── */}
            <section id="curriculum" style={{ background: "var(--bg-dark)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.div {...fadeUp(0)} style={{ marginBottom: "4rem", maxWidth: "600px" }}>
                        <SectionLabel dark>The Curriculum</SectionLabel>
                        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "#fff", letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                            Everything, in the right order
                        </h2>
                        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                            No random tutorials. No skipping foundations. A structured path from "I can code" to "I can architect, ship, and explain anything."
                        </p>
                    </motion.div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
                        {modules.map((phase, pi) => (
                            <motion.div key={phase.phase} {...fadeUp(pi * 0.1)}>
                                {/* Phase header */}
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: phase.color, flexShrink: 0 }} />
                                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: phase.color }}>
                                        {phase.phase}
                                    </p>
                                </div>

                                <div className="module-items-grid" style={{ paddingLeft: "1.5rem", borderLeft: `2px solid ${phase.color}22` }}>
                                    {phase.items.map(item => (
                                        <div key={item.title} style={{
                                            background: "rgba(255,255,255,0.025)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                            borderRadius: "var(--radius-md)",
                                            padding: "1.5rem",
                                            display: "flex",
                                            gap: "1.25rem",
                                            alignItems: "flex-start",
                                        }}>
                                            <div style={{ width: 38, height: 38, borderRadius: "var(--radius-sm)", background: `${phase.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: phase.color, flexShrink: 0 }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.4rem" }}>{item.title}</h3>
                                                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PERKS ───────────────────────────────────── */}
            <section style={{ background: "#0a0a0a", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem", textAlign: "center" }}>
                        <SectionLabel dark>What You Get</SectionLabel>
                        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "#fff", letterSpacing: "-0.025em" }}>
                            More than a course.<br />A launchpad.
                        </h2>
                    </motion.div>

                    <motion.div className="perks-grid" variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                        {perks.map((p, i) => (
                            <motion.div key={p.title} variants={itemVariant} style={{
                                background: i === 4 ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.03)",
                                border: i === 4 ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "var(--radius-lg)",
                                padding: "1.75rem",
                            }}>
                                <div style={{ color: i === 4 ? "#FBBF24" : "#60A5FA", marginBottom: "1rem" }}>{p.icon}</div>
                                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "0.975rem", color: "#fff", marginBottom: "0.4rem" }}>
                                    {p.title}
                                    {i === 4 && <span style={{ fontSize: "0.7rem", background: "rgba(251,191,36,0.15)", color: "#FBBF24", borderRadius: "4px", padding: "0.1rem 0.4rem", marginLeft: "0.5rem", verticalAlign: "middle" }}>EXCLUSIVE</span>}
                                </h3>
                                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{p.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section style={{ background: "var(--bg-dark)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
                        <SectionLabel dark>FAQs</SectionLabel>
                        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#fff", letterSpacing: "-0.025em" }}>
                            Questions? Answered.
                        </h2>
                    </motion.div>

                    <div className="faq-cols">
                        <div>{faqs.slice(0, 3).map(f => <FAQ key={f.q} {...f} />)}</div>
                        <div>{faqs.slice(3).map(f => <FAQ key={f.q} {...f} />)}</div>
                    </div>
                </div>
            </section>

            {/* ── REGISTER ────────────────────────────────── */}
            <section id="register" style={{ background: "#050505", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div className="form-section-inner">
                        {/* Left — pitch */}
                        <motion.div {...fadeUp(0)}>
                            <SectionLabel dark>Secure Your Spot</SectionLabel>
                            <h2 style={{ fontFamily: "'Anton', Arial, sans-serif", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
                                30 SEATS.<br />
                                <span style={{ color: "var(--accent)" }}>ONE SHOT.</span>
                            </h2>
                            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "2rem" }}>
                                This isn't a recording you'll watch at 2x speed and forget. This is a cohort — structured, guided, accountable.
                                Register your interest now. No payment required.
                            </p>

                            {[
                                "No payment to register interest",
                                "Live sessions + all recordings",
                                "1-on-1 feedback, not just videos",
                                "Paid internship for top performers",
                            ].map(item => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                                    <CheckCircle size={16} style={{ color: "#10B981", flexShrink: 0 }} />
                                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>{item}</span>
                                </div>
                            ))}

                            <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "var(--radius-md)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                                    <Clock size={15} style={{ color: "rgba(255,255,255,0.35)" }} />
                                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Next Batch</span>
                                </div>
                                <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>
                                    Starting Soon — Date TBA
                                </p>
                                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.25rem" }}>
                                    Register now to get priority seat allocation and early access pricing.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right — form */}
                        <motion.div {...fadeUp(0.15)} style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "var(--radius-lg)",
                            padding: "2.5rem",
                        }}>
                            <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#fff", marginBottom: "0.5rem" }}>
                                Register Your Interest
                            </h3>
                            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>
                                Takes 2 minutes. We'll be in touch with next steps.
                            </p>
                            <RegistrationForm />
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CohortV1;
