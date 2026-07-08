import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, CheckCircle, Users, Award, Briefcase,
    Code2, Globe, Terminal, Linkedin, FileText, Zap, Brain,
    ChevronDown, Star, Clock, Shield, BookOpen, Layers, Rocket,
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
        desc: '"Proficient in React, Node.js, MongoDB" — so does every other resume in the pile. Recruiters skip right past you.',
    },
];

const curriculum = [
    {
        phase: "Phase 1",
        title: "Foundation",
        weekRange: "Weeks 1–2",
        subtitle: "Build learning muscles and understand how the web actually works.",
        color: "#2563EB",
        icon: <Brain size={18} />,
        weeks: [
            {
                week: 1,
                title: "How to Learn",
                tag: "Mindset",
                bullets: [
                    "Feynman Technique — teach-back for deep understanding, not surface recall",
                    "Spaced repetition — why cramming fails; how to actually retain code",
                    "First principles thinking — break any problem down to atoms",
                    "The developer learning curve: syntax → framework → architecture confusion",
                    "VS Code setup, git basics, and the debugging mindset",
                ],
                deliverable: "Learning journal setup + 5-question quiz applying the Feynman Technique",
            },
            {
                week: 2,
                title: "Developer Toolkit & Web Fundamentals",
                tag: "Fundamentals",
                bullets: [
                    "Terminal basics: navigating, running scripts, and not being afraid of the command line",
                    "Git workflow: commits, branching, pull requests, and why your commit history matters",
                    "GitHub setup: SSH keys, pushing your first repo, writing a meaningful README",
                    "What actually happens when you visit a URL: DNS → TCP → TLS → HTTP → browser render",
                    "HTTP status codes, headers, cookies — what they are and why every dev must know them",
                ],
                deliverable: "GitHub profile set up + first repo pushed + Network Trace Analysis on 3 real websites",
            },
        ],
    },
    {
        phase: "Phase 2",
        title: "The Stack",
        weekRange: "Weeks 3–8",
        subtitle: "Ship two real, deployed projects. Cover the full MERN stack and core DevOps.",
        color: "#7C3AED",
        icon: <Layers size={18} />,
        weeks: [
            {
                week: 3,
                title: "JavaScript Fundamentals + Project 1 Kickoff",
                tag: "JavaScript",
                bullets: [
                    "Variables, types, scope, the call stack — why it matters, not just what it is",
                    "Functions: pure vs impure, closures, higher-order functions",
                    "Async JavaScript: callbacks → promises → async/await, error handling",
                    "Project 1 kickoff: Project 1 (MERN) — build your first 3 REST routes",
                    "Mini-projects: calculator, promise-based data fetcher, async image loader",
                ],
                deliverable: "Backend scaffolded: GET all, GET one, POST create routes working in Postman",
            },
            {
                week: 4,
                title: "React Fundamentals + Project 1 Frontend",
                tag: "React",
                bullets: [
                    "JSX, functional components, props and state (useState)",
                    "useEffect — dependency arrays, cleanup, side effects done right",
                    "Controlled inputs, forms, conditional rendering, lists and keys",
                    "API integration: fetch, loading states, error handling, CORS explained",
                    "Connect Project 1 frontend to your backend — it talks to a real API",
                ],
                deliverable: "Frontend 80% complete — form, list, delete, and category filter working",
            },
            {
                week: 5,
                title: "Node.js, Express & Databases",
                tag: "Backend",
                bullets: [
                    "Node.js event loop — why everything is async and how it works",
                    "Express middleware, routing, URL params vs query params",
                    "MongoDB: documents vs relational, Mongoose schemas, CRUD operations",
                    "Environment variables (.env), error handling patterns, API design conventions",
                    "Polish Project 1 backend: validation, proper status codes, tested routes",
                ],
                deliverable: "All CRUD routes working, tested in Postman, backend ready for deployment",
            },
            {
                week: 6,
                title: "DevOps & Deployment — Ship Project 1",
                tag: "DevOps",
                bullets: [
                    "Git & GitHub: meaningful commits, branching, pull requests",
                    "Deployment pipeline: local → staging → production",
                    "Docker basics: what containerization is, write a Dockerfile, push to Docker Hub",
                    "Deploy frontend to Vercel, backend to Railway — live app at a real URL",
                    "Write a README that explains your project to a recruiter in 30 seconds",
                ],
                deliverable: "Project 1 live and deployed — share the link",
            },
            {
                week: 7,
                title: "Advanced React + Project 2 Kickoff",
                tag: "React Advanced",
                bullets: [
                    "State management: useContext, useReducer, state lifting — when to use which",
                    "Custom hooks — write your own, stop repeating logic",
                    "Performance: useMemo, useCallback, React.memo — only where it matters",
                    "Project 2 kickoff: Project 2 — design database schema and component tree",
                    "Intro to drag-and-drop (React Beautiful DnD / dnd-kit)",
                ],
                deliverable: "Project 2 scaffolded: schema designed, backend routes planned",
            },
            {
                week: 8,
                title: "Full Project Sprint — Ship Project 2",
                tag: "Build Week",
                bullets: [
                    "Build out Project 2: columns, cards, board statistics with drag-and-drop",
                    "Advanced MongoDB: aggregation pipelines, nested document updates",
                    "State management under complexity — how to stay in control",
                    "Error handling at the UI level: what if a drag fails? What if save fails?",
                    "Deploy Project 2 — second live project on your portfolio",
                ],
                deliverable: "Project 2 live and deployed with clean commit history",
            },
        ],
    },
    {
        phase: "Phase 3",
        title: "Career",
        weekRange: "Weeks 9–12",
        subtitle: "Interview prep, portfolio polish, and your capstone project. Get job-ready.",
        color: "#059669",
        icon: <Rocket size={18} />,
        weeks: [
            {
                week: 9,
                title: "Portfolio Polish + Interview Prep Basics",
                tag: "Portfolio",
                bullets: [
                    "What employers actually look at in your GitHub — and what they skip",
                    "Writing READMEs that explain the why, not just the what",
                    "Introduction to behavioral interviews — how to tell a project story",
                    "Technical interview structure for fresh grads — what to expect",
                    "Build or polish your GitHub portfolio page / personal site",
                ],
                deliverable: "Both project repos polished with updated READMEs + portfolio page live",
            },
            {
                week: 10,
                title: "Technical Interview Prep + Mock Interview #1",
                tag: "Interview Prep",
                bullets: [
                    "How technical interviews are structured — what interviewers actually look for",
                    "Problem-solving framework: read → clarify → think aloud → code → optimise",
                    "Walking through your own project under pressure — articulating decisions confidently",
                    "Common patterns in coding questions: loops, conditions, data manipulation",
                    "1-on-1 mock interview #1: full project walk-through + one live coding problem",
                ],
                deliverable: "Mock interview #1 completed with recorded feedback session",
            },
            {
                week: 11,
                title: "LinkedIn + Resume + Mock Interview #2",
                tag: "Career Assets",
                bullets: [
                    "LinkedIn: headline, about section, projects linked, skills backed by proof",
                    "ATS-ready resume: achievement-focused bullets, right keywords, no fancy graphics",
                    "Turn tasks into impact: 'Built a full-stack app with real users, deployed end-to-end'",
                    "Content strategy: posting about what you built, not just links",
                    "Mock interview #2: light system design ('Design a URL shortener') + behavioral",
                ],
                deliverable: "LinkedIn fully updated + ATS resume finalized + mock interview #2 done",
            },
            {
                week: 12,
                title: "Capstone Project + Final Interview",
                tag: "Capstone",
                bullets: [
                    "Build anything with MERN — your choice (finance dashboard, recipe app, job board…)",
                    "Must be deployed, documented, and have 2+ non-trivial features",
                    "Record a 2–3 minute demo video — pitch it like you're in an interview",
                    "Post on LinkedIn: what you built, what you learned, what's next",
                    "Final capstone interview (1 hr): project deep-dive, DSA, system design, behavioral",
                ],
                deliverable: "Project 3 live + demo video + LinkedIn post + final interview completed",
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
        a: "Students, recent graduates, and self-taught developers who can write code but feel like they're missing the bigger picture. If you want to go from 'I write code' to 'I understand systems', this is for you.",
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
        a: "Selected top performers from the cohort get internship opportunities through Wbzard Labs. Selection is based on project quality, consistency, and overall performance.",
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
                <ChevronDown
                    size={18}
                    style={{
                        color: "rgba(255,255,255,0.45)",
                        flexShrink: 0,
                        marginTop: 2,
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                    }}
                />
            </div>
            <AnimatePresence>
                {open && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: "0.75rem" }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, overflow: "hidden" }}
                    >
                        {a}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

function WeekAccordion({ item, color, isOpen, onToggle }) {
    return (
        <div style={{
            border: `1px solid ${isOpen ? color + "40" : "rgba(255,255,255,0.07)"}`,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            transition: "border-color 0.25s ease",
            background: isOpen ? `${color}06` : "rgba(255,255,255,0.02)",
        }}>
            {/* Header row */}
            <button
                onClick={onToggle}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.1rem 1.4rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                }}
            >
                {/* Week pill */}
                <span style={{
                    flexShrink: 0,
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: color,
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                    borderRadius: "999px",
                    padding: "0.2rem 0.6rem",
                    whiteSpace: "nowrap",
                }}>
                    Wk {item.week}
                </span>

                {/* Title */}
                <span style={{
                    flex: 1,
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#fff",
                }}>
                    {item.title}
                </span>

                {/* Tag */}
                <span style={{
                    display: "none",
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.3)",
                    whiteSpace: "nowrap",
                }} className="week-tag">
                    {item.tag}
                </span>

                {/* Chevron */}
                <ChevronDown
                    size={16}
                    style={{
                        flexShrink: 0,
                        color: isOpen ? color : "rgba(255,255,255,0.3)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease, color 0.2s ease",
                    }}
                />
            </button>

            {/* Expanded content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{ padding: "0 1.4rem 1.4rem", paddingTop: 0 }}>
                            <div style={{ borderTop: `1px solid ${color}20`, paddingTop: "1.1rem" }}>
                                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.1rem" }}>
                                    {item.bullets.map((b, i) => (
                                        <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, marginTop: "0.45rem", flexShrink: 0 }} />
                                            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "0.6rem",
                                    padding: "0.8rem 1rem",
                                    background: `${color}10`,
                                    borderRadius: "var(--radius-sm)",
                                    border: `1px solid ${color}20`,
                                }}>
                                    <CheckCircle size={14} style={{ color, flexShrink: 0, marginTop: "0.2rem" }} />
                                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                                        <strong style={{ color, fontWeight: 600 }}>Deliverable: </strong>{item.deliverable}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Video Embed ────────────────────────────────────────── */
function VideoEmbed({ videoId }) {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        let destroyed = false;

        const initPlayer = () => {
            if (destroyed || !containerRef.current) return;
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    loop: 1,
                    playlist: videoId,
                    controls: 0,
                    rel: 0,
                    playsinline: 1,
                    iv_load_policy: 3,
                    disablekb: 1,
                },
                events: {
                    onReady(e) {
                        e.target.playVideo();
                        if (!destroyed) setPlaying(true);
                    },
                    onStateChange(e) {
                        if (!destroyed) setPlaying(e.data === window.YT.PlayerState.PLAYING);
                    },
                },
            });
        };

        if (window.YT?.Player) {
            initPlayer();
        } else {
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                document.head.appendChild(tag);
            }
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                prev?.();
                initPlayer();
            };
        }

        return () => {
            destroyed = true;
            playerRef.current?.destroy();
        };
    }, [videoId]);

    const toggle = () => {
        const p = playerRef.current;
        if (!p) return;
        playing ? p.pauseVideo() : p.playVideo();
    };

    return (
        <div onClick={toggle} style={{ position: "absolute", inset: 0, cursor: "pointer" }}>
            <div
                ref={containerRef}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            />
            {!playing && (
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.4)",
                }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{
                            width: 0, height: 0,
                            borderTop: "12px solid transparent",
                            borderBottom: "12px solid transparent",
                            borderLeft: "20px solid #fff",
                            marginLeft: 4,
                        }} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Razorpay Button ────────────────────────────────────── */
function RazorpayButton({ onSuccess }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const form = document.createElement("form");

        // Razorpay Payment Button submits this form with razorpay_payment_id on success.
        // Intercept it so React handles the success state instead of a page reload.
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            if (data.razorpay_payment_id) onSuccess(data);
        });

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.setAttribute("data-payment_button_id", "pl_TAw1dvTn5e8e75");
        script.async = true;
        form.appendChild(script);

        const el = containerRef.current;
        if (el) el.appendChild(form);

        return () => { if (el) el.innerHTML = ""; };
    }, []);

    return <div ref={containerRef} style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }} />;
}

/* ─── Registration Form ──────────────────────────────────── */
function RegistrationForm() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", level: "", stack: "", why: "" });
    const [formStatus, setFormStatus] = useState("idle");
    const [paid, setPaid] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("loading");
        try {
            const res = await fetch("https://formfreedom-backend.onrender.com/api/s/c4e2b0dc-21a2-4afb-97a5-79966d3c4587", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setFormStatus("submitted");
            } else {
                setFormStatus("error");
            }
        } catch {
            setFormStatus("error");
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
        boxSizing: "border-box",
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

    /* ── Congratulations screen ── */
    if (paid) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                    style={{
                        width: 72, height: 72, borderRadius: "50%",
                        background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        boxShadow: "0 0 40px rgba(37,99,235,0.4)",
                    }}
                >
                    <Star size={32} style={{ color: "#fff", fill: "#fff" }} />
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.45 }}
                    style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, fontSize: "2rem", color: "#fff", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}
                >
                    CONGRATULATIONS!
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36, duration: 0.4 }}
                    style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "2rem", lineHeight: 1.7 }}
                >
                    Your seat is confirmed. You're part of <strong style={{ color: "#fff" }}>Cohort v1.</strong>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.44, duration: 0.4 }}
                    style={{
                        display: "flex", flexDirection: "column", gap: "0.65rem",
                        textAlign: "left", marginBottom: "2rem",
                    }}
                >
                    {[
                        "Check your email — we'll send next steps shortly",
                        "Join the private community once you receive the invite",
                        "First live session details will be shared on WhatsApp",
                    ].map(item => (
                        <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <CheckCircle size={15} style={{ color: "#10B981", flexShrink: 0, marginTop: "0.2rem" }} />
                            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}
                >
                    Payment confirmed · Secured by Razorpay
                </motion.p>
            </motion.div>
        );
    }

    /* ── Step 2: payment screen ── */
    if (formStatus === "submitted") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}
            >
                {/* Step indicators */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <CheckCircle size={16} style={{ color: "#10B981" }} />
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#10B981", letterSpacing: "0.05em" }}>STEP 1 DONE</span>
                    </div>
                    <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            background: "rgba(37,99,235,0.3)", border: "2px solid #2563EB",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.6rem", fontWeight: 700, color: "#60A5FA" }}>2</span>
                        </div>
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#60A5FA", letterSpacing: "0.05em" }}>CONFIRM SEAT</span>
                    </div>
                </div>

                <CheckCircle size={40} style={{ color: "#10B981", margin: "0 auto 1rem" }} />
                <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#fff", marginBottom: "0.5rem" }}>
                    Application saved!
                </h3>
                <p style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", maxWidth: "300px", margin: "0 auto 2rem", lineHeight: 1.75 }}>
                    One last step — complete your payment to <strong style={{ color: "rgba(255,255,255,0.8)" }}>lock in your seat.</strong>
                </p>

                <RazorpayButton onSuccess={() => setPaid(true)} />

                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", marginTop: "1.25rem" }}>
                    Secured by Razorpay · UPI · Cards · Netbanking · Wallets
                </p>
            </motion.div>
        );
    }

    /* ── Step 1: the form ── */
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

            {formStatus === "error" && (
                <p style={{ color: "#F87171", fontSize: "0.85rem", fontFamily: "'Satoshi', sans-serif" }}>
                    Something went wrong. Please email us directly at vivekg.work@gmail.com
                </p>
            )}

            <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn-primary-dark"
                style={{ fontSize: "0.95rem", padding: "1rem 2rem", width: "100%", justifyContent: "center", opacity: formStatus === "loading" ? 0.7 : 1 }}
            >
                {formStatus === "loading" ? "Submitting..." : "Apply for the Cohort"} <ArrowRight size={16} />
            </button>

            <p style={{ textAlign: "center", fontFamily: "'Satoshi', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                Step 1 of 2 · Payment happens on the next screen
            </p>
        </form>
    );
}

/* ─── Curriculum Phase Block ─────────────────────────────── */
function PhaseBlock({ phase }) {
    const [openWeek, setOpenWeek] = useState(null);

    const toggle = (week) => setOpenWeek(prev => prev === week ? null : week);

    return (
        <motion.div {...fadeUp(0)}>
            {/* Phase header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    background: `${phase.color}15`,
                    border: `1px solid ${phase.color}30`,
                    borderRadius: "var(--radius-sm)",
                    padding: "0.4rem 0.9rem",
                    color: phase.color,
                }}>
                    {phase.icon}
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {phase.phase}
                    </span>
                </div>
                <div>
                    <h3 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", lineHeight: 1.2 }}>
                        {phase.title}
                    </h3>
                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", marginTop: "0.1rem" }}>
                        {phase.weekRange} · {phase.subtitle}
                    </p>
                </div>
            </div>

            {/* Week accordions */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                paddingLeft: "1.25rem",
                borderLeft: `2px solid ${phase.color}25`,
            }}>
                {phase.weeks.map(item => (
                    <WeekAccordion
                        key={item.week}
                        item={item}
                        color={phase.color}
                        isOpen={openWeek === item.week}
                        onToggle={() => toggle(item.week)}
                    />
                ))}
            </div>
        </motion.div>
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
                .perks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
                .faq-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 4rem; align-items: start; }
                .form-section-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
                .week-tag { display: inline !important; }
                @media (max-width: 900px) {
                    .cohort-pain-grid { grid-template-columns: 1fr; }
                    .perks-grid { grid-template-columns: 1fr 1fr; }
                    .faq-cols { grid-template-columns: 1fr; gap: 0; }
                    .form-section-inner { grid-template-columns: 1fr; gap: 2.5rem; }
                    .form-grid { grid-template-columns: 1fr !important; }
                    .week-tag { display: none !important; }
                }
                @media (max-width: 600px) {
                    .perks-grid { grid-template-columns: 1fr; }
                }
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
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
                    backgroundSize: "36px 36px",
                    zIndex: 1, pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
                    width: "700px", height: "350px",
                    background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)",
                    zIndex: 1, pointerEvents: "none",
                }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", width: "100%" }}>
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

                    <motion.div {...fadeUp(0.42)} style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                        <a href="#register" className="btn-primary-dark" style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}>
                            Apply Now <ArrowRight size={15} />
                        </a>
                        <a href="#curriculum" className="btn-outline-dark" style={{ fontSize: "0.9rem", padding: "0.875rem 1.75rem" }}>
                            See the Curriculum
                        </a>
                    </motion.div>

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
                        <VideoEmbed videoId="D2OvYCVBff0" />
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
                    <motion.div {...fadeUp(0)} style={{ marginBottom: "4rem", maxWidth: "620px" }}>
                        <SectionLabel dark>The Curriculum</SectionLabel>
                        <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "#fff", letterSpacing: "-0.025em", marginBottom: "1rem" }}>
                            12 weeks. Every week has a job to do.
                        </h2>
                        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
                            No filler. No random tutorials. A structured path from "I can write code" to "I can architect, ship, and explain anything."
                        </p>
                    </motion.div>

                    {/* Phase blocks */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
                        {curriculum.map((phase, i) => (
                            <PhaseBlock key={i} phase={phase} />
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
                        <motion.div {...fadeUp(0)}>
                            <SectionLabel dark>Secure Your Spot</SectionLabel>
                            <h2 style={{ fontFamily: "'Anton', Arial, sans-serif", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
                                30 SEATS.<br />
                                <span style={{ color: "var(--accent)" }}>ONE SHOT.</span>
                            </h2>
                            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "2rem" }}>
                                This isn't a recording you'll watch at 2x speed and forget. This is a cohort — structured, guided, accountable.
                                Register your interest now.
                            </p>

                            {[
                                "Fill the form → pay → seat confirmed",
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
