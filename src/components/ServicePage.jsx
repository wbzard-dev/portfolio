import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
    LayoutDashboard, Users, Globe, BarChart3, Settings, GitBranch,
    FileText, Layers, Target, UserCheck, Bell, Sparkles, Zap,
    Search, Smartphone, Database, MessageSquare, BookOpen, Bot,
    Briefcase, Calendar,
} from "lucide-react";
import SEO from "./SEO";

// ─── Service configs ──────────────────────────────────────────────────────────

const services = {
    "custom-software-development": {
        label:       "Custom Software Development",
        headline:    "Software built around your business.",
        subheadline: "Most businesses don't fit perfectly into off-the-shelf software. We build custom solutions designed around your workflows, processes, and operational goals.",
        seoDesc:     "Custom software development services — internal dashboards, CRM systems, client portals, and workflow platforms built specifically for your business.",

        problemHeadline: "Why off-the-shelf software falls short.",
        problems: [
            "Forces your team to adapt to the software's logic, not yours",
            "You pay for features you never use",
            "Disconnected tools create duplicate data entry and manual workarounds",
            "Spreadsheets fill the gaps left by generic software",
            "No single source of truth for your operations",
            "Scaling the business means the software breaks first",
        ],

        solutionsHeadline: "What we build.",
        solutions: [
            { icon: <LayoutDashboard size={22} />, title: "Internal Dashboards",        desc: "Real-time visibility into your operations, built around the metrics that matter to your team." },
            { icon: <Users size={22} />,           title: "Custom CRM Systems",          desc: "A CRM designed around your sales process and customer relationships — not a generic pipeline." },
            { icon: <Globe size={22} />,           title: "Client Portals",              desc: "Give your clients a dedicated space to track projects, share documents, and communicate." },
            { icon: <BarChart3 size={22} />,       title: "Reporting Systems",           desc: "Automated reports that surface the right data at the right time — no manual compiling." },
            { icon: <Settings size={22} />,        title: "Operations Platforms",        desc: "End-to-end management systems for your core business operations." },
            { icon: <GitBranch size={22} />,       title: "Workflow Platforms",          desc: "Software that mirrors how your team actually works and routes tasks automatically." },
            { icon: <FileText size={22} />,        title: "Document Management",         desc: "Centralise documents, contracts, and records with the right access controls." },
            { icon: <Layers size={22} />,          title: "SaaS Platforms",              desc: "Building a product? We can take your idea from concept to a fully deployed SaaS." },
        ],

        processHeadline: "How we work.",
        process: [
            { number: "01", title: "Discovery",   desc: "We understand your business, workflows, and what the software needs to achieve." },
            { number: "02", title: "Planning",    desc: "We map out the architecture, scope, and timeline before writing a single line of code." },
            { number: "03", title: "Design",      desc: "Functional UI design focused on how your team will actually use the software." },
            { number: "04", title: "Development", desc: "We build in iterations so you can see progress and give feedback throughout." },
            { number: "05", title: "Deployment",  desc: "We handle the launch, testing, and rollout — your team is trained and ready to go." },
            { number: "06", title: "Support",     desc: "Ongoing maintenance, improvements, and feature additions as your business evolves." },
        ],
    },

    "business-automation": {
        label:       "Business Process Automation",
        headline:    "Eliminate repetitive work.",
        subheadline: "Manual processes slow growth. Automation reduces repetitive work, improves consistency, and frees your team to focus on work that actually moves the business forward.",
        seoDesc:     "Business process automation services — lead management, client onboarding, reporting, and internal workflow automation for growing businesses.",

        problemHeadline: "Signs your business needs automation.",
        problems: [
            "Your team spends hours on repetitive data entry every week",
            "Follow-ups, reminders, and notifications happen manually",
            "Reports are compiled by hand from multiple sources",
            "New client onboarding is inconsistent and time-consuming",
            "Errors creep in because processes depend on memory",
            "The business can't scale without hiring more people for admin",
        ],

        solutionsHeadline: "What we automate.",
        solutions: [
            { icon: <Target size={22} />,      title: "Lead Management",          desc: "Capture, qualify, and follow up on leads automatically — no manual tracking required." },
            { icon: <UserCheck size={22} />,   title: "Client Onboarding",        desc: "Consistent, professional onboarding that runs itself from first contact to kickoff." },
            { icon: <BarChart3 size={22} />,   title: "Reporting Automation",     desc: "Automated reports delivered to the right people at the right time." },
            { icon: <GitBranch size={22} />,   title: "Internal Workflows",       desc: "Route tasks, approvals, and handoffs automatically between your team members." },
            { icon: <FileText size={22} />,    title: "Document Automation",      desc: "Generate contracts, proposals, and documents automatically from your data." },
            { icon: <Bell size={22} />,        title: "Notification Systems",     desc: "Trigger the right alerts and updates to the right people without manual oversight." },
            { icon: <Users size={22} />,       title: "CRM Automation",           desc: "Keep your CRM updated automatically — no manual data entry after every interaction." },
            { icon: <Sparkles size={22} />,    title: "AI-Powered Workflows",     desc: "Layer AI on top of your processes to handle classification, summarisation, and routing." },
        ],

        processHeadline: "Benefits of automation.",
        process: [
            { number: "01", title: "Reduce manual work",       desc: "Hours of repetitive tasks are handled automatically, every day." },
            { number: "02", title: "Improve consistency",      desc: "Every process runs the same way, every time — no human error." },
            { number: "03", title: "Save time at scale",       desc: "As your business grows, automation handles the increased volume." },
            { number: "04", title: "Better visibility",        desc: "Every step of every process is logged and traceable." },
            { number: "05", title: "Reduce operational costs", desc: "Less time on admin means more time on work that generates revenue." },
            { number: "06", title: "Faster response times",    desc: "Automated triggers respond to events instantly, not when someone checks their inbox." },
        ],
    },

    "website-development": {
        label:       "Website Development",
        headline:    "Websites built for business outcomes.",
        subheadline: "A website should do more than look professional. It should generate leads, support customer acquisition, and integrate with how your business operates.",
        seoDesc:     "Business website development — lead generation websites, service websites, and customer portals built around your business goals.",

        problemHeadline: "What most websites get wrong.",
        problems: [
            "Designed to look good in a portfolio — not to convert visitors into clients",
            "Built without understanding the customer journey",
            "No integration with your CRM, booking system, or operations",
            "Slow load times that kill SEO and user experience",
            "Hard to update without a developer for every change",
            "No clear path from visitor to enquiry to client",
        ],

        solutionsHeadline: "What we build.",
        solutions: [
            { icon: <Globe size={22} />,      title: "Business Websites",      desc: "Professional, conversion-focused websites for established businesses." },
            { icon: <Briefcase size={22} />,  title: "Service Websites",       desc: "Websites built to showcase your services and generate qualified enquiries." },
            { icon: <Layers size={22} />,     title: "Startup Websites",       desc: "Fast, credible websites that help early-stage companies build trust quickly." },
            { icon: <LayoutDashboard size={22} />, title: "Landing Pages",    desc: "High-converting pages built around a single, specific goal." },
            { icon: <UserCheck size={22} />,  title: "Customer Portals",       desc: "Give your clients a dedicated login area to manage their relationship with you." },
            { icon: <Calendar size={22} />,   title: "Booking Websites",       desc: "Websites with integrated scheduling so clients can book directly." },
            { icon: <Settings size={22} />,   title: "Integration-Ready Sites", desc: "Built to connect with your CRM, automation tools, and business systems." },
            { icon: <FileText size={22} />,   title: "Content Platforms",      desc: "Websites with a CMS so your team can publish and update without a developer." },
        ],

        processHeadline: "What every website we build includes.",
        process: [
            { number: "01", title: "SEO Optimisation",         desc: "Built with clean structure, fast load times, and on-page SEO from the start." },
            { number: "02", title: "Mobile Responsive",        desc: "Looks and works perfectly on every screen size." },
            { number: "03", title: "Fast Performance",         desc: "Optimised for Core Web Vitals — fast sites rank better and convert better." },
            { number: "04", title: "Analytics Integration",    desc: "Full visibility into who visits, where they come from, and what they do." },
            { number: "05", title: "CRM & Tool Integration",   desc: "Connects to your existing business systems so leads flow automatically." },
            { number: "06", title: "Scalable Architecture",    desc: "Built to grow — adding pages, features, or integrations is straightforward." },
        ],
    },

    "ai-solutions": {
        label:       "AI Solutions",
        headline:    "Practical AI for modern businesses.",
        subheadline: "AI should create measurable business value. We help businesses implement AI that improves productivity, automates repetitive tasks, and streamlines operations — without unnecessary complexity.",
        seoDesc:     "Practical AI solutions for businesses — AI assistants, workflow automation, knowledge systems, and AI-powered processes built around real business needs.",

        problemHeadline: "Where AI creates real value.",
        problems: [
            "Answering the same customer questions repeatedly, manually",
            "Sorting and categorising large volumes of data or documents",
            "Generating reports, summaries, or content that follows a pattern",
            "Internal knowledge that lives in people's heads, not systems",
            "Workflows that require human judgement for simple decisions",
            "Time spent on tasks that follow clear rules but still need a person",
        ],

        solutionsHeadline: "What we implement.",
        solutions: [
            { icon: <MessageSquare size={22} />, title: "Customer Support AI",     desc: "AI assistants that handle common queries, qualify leads, and escalate when needed." },
            { icon: <BookOpen size={22} />,      title: "Knowledge Management",    desc: "Make your internal knowledge searchable and accessible to your team instantly." },
            { icon: <Zap size={22} />,           title: "Workflow Automation",     desc: "AI-powered workflows that classify, route, and process information automatically." },
            { icon: <FileText size={22} />,      title: "Content Operations",      desc: "Automate first drafts, summaries, and content following your brand guidelines." },
            { icon: <Database size={22} />,      title: "Data Processing",         desc: "Extract, transform, and organise data from documents and unstructured sources." },
            { icon: <Bot size={22} />,           title: "Internal Assistants",     desc: "AI tools your team can query for information, status updates, and decisions." },
            { icon: <BarChart3 size={22} />,     title: "Business Intelligence",   desc: "Surface insights from your data without building a full analytics team." },
            { icon: <GitBranch size={22} />,     title: "Process Intelligence",    desc: "Identify bottlenecks and improvement opportunities in your existing workflows." },
        ],

        processHeadline: "Our philosophy on AI.",
        process: [
            { number: "01", title: "AI when it makes sense",    desc: "We don't recommend AI because it's popular. We recommend it when it creates genuine, measurable value." },
            { number: "02", title: "Start with the problem",    desc: "Every AI implementation begins with understanding the business problem — not the technology." },
            { number: "03", title: "Sometimes automation is enough", desc: "Not everything needs AI. Often a simpler, more reliable automation achieves the same result." },
            { number: "04", title: "No black boxes",            desc: "We build AI implementations your team understands, can manage, and can course-correct." },
            { number: "05", title: "Measure the impact",        desc: "Every implementation has a clear success metric — time saved, errors reduced, volume handled." },
            { number: "06", title: "Build on what you have",    desc: "We work with your existing tools and data wherever possible, rather than starting from scratch." },
        ],
    },
};

// ─── Page component ───────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const ServicePage = () => {
    const { slug } = useParams();
    const s = services[slug];

    if (!s) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "var(--bg)" }}>
            <h2 style={{ fontSize: "1.5rem" }}>Service not found</h2>
            <Link to="/#services" className="btn-primary">Back to Services</Link>
        </div>
    );

    return (
        <div style={{ background: "var(--bg)" }}>
            <SEO title={s.label} description={s.seoDesc} url={`https://wbzard.com/services/${slug}`} />

            {/* ── Hero ── */}
            <section style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "clamp(3.5rem, 7vw, 5rem)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <motion.div {...fadeUp(0.05)}>
                        <Link
                            to="/#services"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "2rem", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                        >
                            <ArrowLeft size={13} /> All Services
                        </Link>
                    </motion.div>
                    <motion.p className="section-label" {...fadeUp(0.1)}>{s.label}</motion.p>
                    <motion.h1 {...fadeUp(0.15)} style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, maxWidth: "14ch", marginBottom: "1.25rem" }}>
                        {s.headline}
                    </motion.h1>
                    <motion.p {...fadeUp(0.22)} style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: "560px", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                        {s.subheadline}
                    </motion.p>
                    <motion.div {...fadeUp(0.3)}>
                        <button
                            className="btn-primary"
                            data-cal-link="vivek-g-ts38ii/30min"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                        >
                            Book a Discovery Session <ArrowRight size={15} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ── Problem section ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "start" }}>
                        <motion.div {...fadeUp(0)}>
                            <p className="section-label">The Problem</p>
                            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15 }}>{s.problemHeadline}</h2>
                        </motion.div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {s.problems.map((p, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp(i * 0.07)}
                                    style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "1rem 0", borderBottom: i < s.problems.length - 1 ? "1px solid var(--border)" : "none" }}
                                >
                                    <div style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px" }}>
                                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4444", display: "block" }} />
                                    </div>
                                    <p style={{ fontSize: "0.925rem", color: "var(--text)", lineHeight: 1.6 }}>{p}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Solutions grid ── */}
            <section style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>What We Offer</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        {s.solutionsHeadline}
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: "1.25rem" }}>
                        {s.solutions.map((sol, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.06)}
                                className="card"
                                style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.875rem", transition: "box-shadow 0.25s ease" }}
                                whileHover={{ y: -3 }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                            >
                                <div style={{ color: "var(--accent)", background: "#EEF3FF", width: "40px", height: "40px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {sol.icon}
                                </div>
                                <h3 style={{ fontSize: "0.975rem", lineHeight: 1.3 }}>{sol.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{sol.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Process / Benefits ── */}
            <section style={{ background: "var(--bg-subtle)", padding: "var(--section-pad) 0" }}>
                <div className="container">
                    <motion.p className="section-label" {...fadeUp(0)}>How We Work</motion.p>
                    <motion.h2 {...fadeUp(0.05)} style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.15, marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                        {s.processHeadline}
                    </motion.h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                        {s.process.map((step, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.07)}
                                style={{ padding: "1.75rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "0.625rem" }}
                            >
                                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em" }}>
                                    {step.number}
                                </span>
                                <h3 style={{ fontSize: "1rem", lineHeight: 1.3 }}>{step.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Discovery CTA ── */}
            <section style={{ background: "var(--bg-dark)", color: "#fff", padding: "var(--section-pad) 0" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
                    <motion.p
                        {...fadeUp(0)}
                        style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}
                    >
                        Get Started
                    </motion.p>
                    <motion.h2 {...fadeUp(0.07)} style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                        Let's talk about your business.
                    </motion.h2>
                    <motion.p {...fadeUp(0.14)} style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                        Before recommending any solution, we start with understanding how your business operates. No sales pitch. No predefined packages.
                    </motion.p>
                    <motion.div {...fadeUp(0.2)}>
                        <button
                            className="btn-primary-dark"
                            data-cal-link="vivek-g-ts38ii/30min"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", padding: "1rem 2rem" }}
                        >
                            Book a Discovery Session <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
