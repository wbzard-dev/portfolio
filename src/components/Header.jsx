import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { serviceList } from "../data/services";
import { locationList } from "../data/locations";
import { site } from "../config/site";
import FormCTA from "./FormCTA";

const navLinks = [
    { name: "Launch Package", href: "/startup-launch-package" },
    { name: "Work",           href: "/#work" },
    { name: "Blog",           href: "/blog" },
    { name: "Contact",        href: "/#contact" },
];

const dropdowns = [
    { name: "Services",  items: serviceList.map(s => ({ name: s.label, href: s.href })) },
    { name: "Locations", items: locationList.map(l => ({ name: l.city, href: l.href, desc: `Startups & businesses in ${l.city}` })) },
];

const Dropdown = ({ menu, open, onToggle, textCol, textHover }) => (
    <div style={{ position: "relative" }}>
        <button
            onClick={onToggle}
            aria-expanded={open}
            style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                fontFamily: "'Satoshi', sans-serif",
                fontSize: "0.875rem", fontWeight: 500,
                color: open ? textHover : textCol,
                background: "none", border: "none", cursor: "pointer",
                padding: 0, transition: "color 0.2s ease",
            }}
        >
            {menu.name} <ChevronDown size={14} style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
        </button>
        {open && (
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
                    minWidth: "240px",
                    zIndex: 100,
                }}
            >
                {menu.items.map(item => (
                    <Link
                        key={item.href}
                        to={item.href}
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
                        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{item.name}</span>
                        {item.desc && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{item.desc}</span>}
                    </Link>
                ))}
            </motion.div>
        )}
    </div>
);

const Header = () => {
    const [scrollY, setScrollY]   = useState(0);
    const [hidden, setHidden]     = useState(false);
    const [lastY, setLastY]       = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const navRef                  = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

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

    useEffect(() => { setMenuOpen(false); setOpenMenu(null); }, [location]);

    useEffect(() => {
        const handler = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
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
                navigate(href);
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const mutedLabel = { fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pastHero ? "var(--text-muted)" : "rgba(255,255,255,0.35)", marginBottom: "0.75rem" };

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
                    <Link to="/" style={{ display: "flex", alignItems: "center" }} aria-label={`${site.name} home`}>
                        <img
                            src={`${import.meta.env.BASE_URL}images/final-logo.png`}
                            alt={site.name}
                            width="140"
                            height="70"
                            style={{
                                height: "70px",
                                width: "auto",
                                filter: pastHero ? "none" : "brightness(0) invert(1)",
                                transition: "filter 0.4s ease",
                            }}
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav ref={navRef} className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
                        {dropdowns.map(menu => (
                            <Dropdown
                                key={menu.name}
                                menu={menu}
                                open={openMenu === menu.name}
                                onToggle={() => setOpenMenu(o => o === menu.name ? null : menu.name)}
                                textCol={textCol}
                                textHover={textHover}
                            />
                        ))}
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

                        <FormCTA location="header" arrow={false} style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}>
                            Free Launch Plan
                        </FormCTA>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        className="nav-mobile"
                        onClick={() => setMenuOpen(o => !o)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: logoCol, padding: "0.5rem", transition: "color 0.4s ease" }}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
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
                    className="nav-mobile"
                    style={{
                        position: "fixed",
                        top: "64px",
                        left: 0,
                        right: 0,
                        maxHeight: "calc(100vh - 64px)",
                        overflowY: "auto",
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

                    {dropdowns.map(menu => (
                        <div key={menu.name} style={{ borderTop: `1px solid ${borderCol}`, paddingTop: "1rem" }}>
                            <p style={mutedLabel}>{menu.name}</p>
                            {menu.items.map(item => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    style={{ display: "block", fontSize: "1rem", fontWeight: 500, color: pastHero ? "var(--text)" : "#fff", marginBottom: "0.6rem" }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    ))}

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                        <FormCTA location="mobile-menu" />
                        <button className="btn-secondary" data-cal-link={site.calLink} style={{ color: pastHero ? "var(--text)" : "#fff" }}>
                            Book a Call
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default Header;
