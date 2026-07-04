import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "About",    href: "/#about" },
    { name: "Blog",     href: "/blog" },
    { name: "Contact",  href: "/#contact" },
];

const Header = () => {
    const [scrollY, setScrollY]     = useState(0);
    const [hidden, setHidden]       = useState(false);
    const [lastY, setLastY]         = useState(0);
    const [menuOpen, setMenuOpen]   = useState(false);
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

    useEffect(() => { setMenuOpen(false); }, [location]);

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
