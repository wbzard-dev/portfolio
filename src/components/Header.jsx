import React, { useState, useEffect } from "react";
import { Menu, X, Rocket } from "lucide-react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-70px 0px 0px 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Work", href: "#portfolio" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: isScrolled
                    ? "rgba(255, 255, 255, 0.95)"
                    : "transparent",
                backdropFilter: isScrolled ? "blur(10px)" : "none",
                borderBottom: isScrolled
                    ? "1px solid rgba(0, 0, 0, 0.1)"
                    : "none",
                transition: "all 0.3s ease",
                padding: isScrolled ? "1rem 0" : "1.5rem 0",
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <a
                    href="#"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "800",
                        color: "var(--color-text)",
                    }}
                >
                    <Rocket className="text-accent" size={28} />
                    <span>Webzards</span>
                </a>

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "none",
                        gap: "2rem",
                        alignItems: "center",
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            style={{
                                fontWeight: 500,
                                color:
                                    activeSection === link.href.substring(1)
                                        ? "var(--color-accent)"
                                        : "var(--color-text)",
                                fontSize: "0.95rem",
                                transition: "color 0.3s ease",
                            }}
                            className="nav-link"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="btn btn-primary">
                        Start Project
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ color: "var(--color-text)", display: "block" }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav */}
                {/* Mobile Nav */}
                <div
                    className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "var(--color-bg)",
                        padding: "2rem",
                        borderBottom: "1px solid rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        alignItems: "center",
                        zIndex: 999,
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color:
                                    activeSection === link.href.substring(1)
                                        ? "var(--color-accent)"
                                        : "var(--color-text)",
                                transition: "color 0.3s ease",
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="btn btn-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ width: "100%" }}
                    >
                        Start Project
                    </a>
                </div>
            </div>
            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        .nav-link:hover { color: var(--color-accent) !important; }
        
        .mobile-menu {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
          transition: all 0.3s ease-in-out;
        }
        .mobile-menu.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      `}</style>
        </header>
    );
};

export default Header;
