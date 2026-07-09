import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "About",    href: "/#about" },
    { name: "Blog",     href: "/blog" },
    { name: "Contact",  href: "/#contact" },
];

const cohortLinks = [
    { name: "Cohort v1", href: "/cohort/v1", badge: "New" },
];

const projectLinks = [
    { name: "Prformnce", href: "/prformnce", desc: "QR campaigns & lead tracking" },
];

const Header = () => {
    const [scrollY, setScrollY]         = useState(0);
    const [hidden, setHidden]           = useState(false);
    const [lastY, setLastY]             = useState(0);
    const [menuOpen, setMenuOpen]         = useState(false);
    const [cohortOpen, setCohortOpen]     = useState(false);
    const [projectsOpen, setProjectsOpen] = useState(false);
    const cohortRef                       = useRef(null);
    const projectsRef                     = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrollY(y);
            setHidden(y > lastY && y > 300);
            setLastY(y);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [lastY]);

    useEffect(() => { setMenuOpen(false); setCohortOpen(false); setProjectsOpen(false); }, [location]);

    useEffect(() => {
        const handler = (e) => {
            if (cohortRef.current && !cohortRef.current.contains(e.target)) setCohortOpen(false);
            if (projectsRef.current && !projectsRef.current.contains(e.target)) setProjectsOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Switch from dark (hero) to light (rest of page)
    const pastHero = scrollY > (typeof window !== "undefined" ? window.innerHeight * 0.85 : 700);

    const navBg      = pastHero ? "rgba(248,247,244,0.95)" : "rgba(15,15,15,0.85)";
    const borderCol  = pastHero ? "var(--border)" : "rgba(255,255,255,0.08)";
    const textCol    = pastHero ? "var(--text)" : "rgba(255,255,255,0.75)";
    const textHover  = pastHero ? "var(--text)" : "#fff";
    const logoCol    = pastHero ? "var(--text)" : "#fff";

    const handleNavClick = (e, href) => {
        if (href.startsWith("/#")) {
            e.preventDefault();
            const id = href.slice(2);
            if (location.pathname !== "/") {
                window.location.href = href;
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <motion.header
                variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -80, opacity: 0 } }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "fixed",
                    top: "0.75rem",
                    left: "1rem",
                    right: "1rem",
                    zIndex: 1000,
                    background: navBg,
                    backdropFilter: "blur(14px)",
                    borderRadius: "12px",
                    boxShadow: scrollY > 40 ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
                    transition: "background 0.4s ease, box-shadow 0.4s ease",
                }}
            >
                <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

                    {/* Logo */}
                    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="/images/final-logo.png"
                            alt="Wbzard Labs"
                            style={{
                                height: "70px",
                                width: "auto",
                                filter: pastHero ? "none" : "brightness(0) invert(1)",
                                transition: "filter 0.4s ease",
                            }}
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        {navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                style={{
                                    fontFamily: "'Satoshi', sans-serif",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    color: textCol,
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={e => e.target.style.color = textHover}
                                onMouseLeave={e => e.target.style.color = textCol}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Projects dropdown */}
                        <div ref={projectsRef} style={{ position: "relative" }}>
                            <button
                                onClick={() => setProjectsOpen(o => !o)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.3rem",
                                    fontFamily: "'Satoshi', sans-serif",
                                    fontSize: "0.875rem", fontWeight: 500,
                                    color: projectsOpen ? textHover : textCol,
                                    background: "none", border: "none", cursor: "pointer",
                                    padding: 0, transition: "color 0.2s ease",
                                }}
                            >
                                Projects <ChevronDown size={14} style={{ transition: "transform 0.2s ease", transform: projectsOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                            </button>
                            {projectsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        position: "absolute", top: "calc(100% + 0.75rem)", left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "#fff",
                                        border: "1px solid var(--border)",
                                        borderRadius: "var(--radius-md)",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                        padding: "0.5rem",
                                        minWidth: "220px",
                                        zIndex: 100,
                                    }}
                                >
                                    {projectLinks.map(pl => (
                                        <Link
                                            key={pl.name}
                                            to={pl.href}
                                            style={{
                                                display: "flex", flexDirection: "column",
                                                padding: "0.6rem 0.875rem",
                                                borderRadius: "var(--radius-sm)",
                                                fontFamily: "'Satoshi', sans-serif",
                                                color: "var(--text)",
                                                transition: "background 0.15s ease",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{pl.name}</span>
                                            {pl.desc && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{pl.desc}</span>}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Cohort dropdown */}
                        <div ref={cohortRef} style={{ position: "relative" }}>
                            <button
                                onClick={() => setCohortOpen(o => !o)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.3rem",
                                    fontFamily: "'Satoshi', sans-serif",
                                    fontSize: "0.875rem", fontWeight: 500,
                                    color: cohortOpen ? textHover : textCol,
                                    background: "none", border: "none", cursor: "pointer",
                                    padding: 0, transition: "color 0.2s ease",
                                }}
                            >
                                Cohort <ChevronDown size={14} style={{ transition: "transform 0.2s ease", transform: cohortOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                            </button>
                            {cohortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        position: "absolute", top: "calc(100% + 0.75rem)", left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "#fff",
                                        border: "1px solid var(--border)",
                                        borderRadius: "var(--radius-md)",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                        padding: "0.5rem",
                                        minWidth: "180px",
                                        zIndex: 100,
                                    }}
                                >
                                    {cohortLinks.map(cl => (
                                        <Link
                                            key={cl.name}
                                            to={cl.href}
                                            style={{
                                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                                padding: "0.6rem 0.875rem",
                                                borderRadius: "var(--radius-sm)",
                                                fontFamily: "'Satoshi', sans-serif",
                                                fontSize: "0.85rem", fontWeight: 500,
                                                color: "var(--text)",
                                                transition: "background 0.15s ease",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            {cl.name}
                                            {cl.badge && (
                                                <span style={{
                                                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em",
                                                    textTransform: "uppercase", color: "#fff",
                                                    background: "var(--accent)", borderRadius: "4px",
                                                    padding: "0.1rem 0.4rem",
                                                }}>
                                                    {cl.badge}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <button
                            className="btn-primary"
                            data-cal-link="vivek-g-ts38ii/30min"
                            style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}
                        >
                            Book a Call
                        </button>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        className="hide-desktop"
                        onClick={() => setMenuOpen(o => !o)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: logoCol, padding: "0.5rem", transition: "color 0.4s ease" }}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="hide-desktop"
                    style={{
                        position: "fixed",
                        top: "64px",
                        left: 0,
                        right: 0,
                        zIndex: 999,
                        background: pastHero ? "var(--bg)" : "var(--bg-dark)",
                        borderBottom: `1px solid ${borderCol}`,
                        padding: "1.5rem var(--container-pad) 2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                    }}
                >
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => { handleNavClick(e, link.href); setMenuOpen(false); }}
                            style={{ fontSize: "1rem", fontWeight: 500, color: pastHero ? "var(--text)" : "#fff" }}
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Mobile projects links */}
                    <div style={{ borderTop: `1px solid ${borderCol}`, paddingTop: "1rem" }}>
                        <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pastHero ? "var(--text-muted)" : "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
                            Projects
                        </p>
                        {projectLinks.map(pl => (
                            <Link
                                key={pl.name}
                                to={pl.href}
                                style={{ display: "flex", flexDirection: "column", marginBottom: "0.75rem" }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500, color: pastHero ? "var(--text)" : "#fff" }}>{pl.name}</span>
                                {pl.desc && <span style={{ fontSize: "0.8rem", color: pastHero ? "var(--text-muted)" : "rgba(255,255,255,0.5)" }}>{pl.desc}</span>}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile cohort links */}
                    <div style={{ borderTop: `1px solid ${borderCol}`, paddingTop: "1rem" }}>
                        <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pastHero ? "var(--text-muted)" : "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
                            Cohort
                        </p>
                        {cohortLinks.map(cl => (
                            <Link
                                key={cl.name}
                                to={cl.href}
                                style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: 500, color: pastHero ? "var(--text)" : "#fff", marginBottom: "0.5rem" }}
                            >
                                {cl.name}
                                {cl.badge && (
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "var(--accent)", borderRadius: "4px", padding: "0.1rem 0.4rem" }}>
                                        {cl.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    <button
                        className="btn-primary"
                        data-cal-link="vivek-g-ts38ii/30min"
                        style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
                    >
                        Book a Call
                    </button>
                </motion.div>
            )}
        </>
    );
};

export default Header;
