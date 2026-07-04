import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
    { label: "Services",           href: "/#services" },
    { label: "About",              href: "/#about" },
    { label: "Blog",               href: "/blog" },
    { label: "Contact",            href: "/#contact" },
    { label: "Discovery Session",  href: "/#discovery" },
];

const Footer = () => (
    <footer style={{ background: "var(--bg-dark)", color: "var(--text-on-dark)", padding: "clamp(4rem, 8vw, 6rem) 0 2.5rem" }}>
        <div className="container">
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "3rem",
                paddingBottom: "3rem",
                borderBottom: "1px solid var(--border-dark)"
            }}>
                {/* Brand */}
                <div>
                    <Link to="/" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
                        <img
                            src="/images/final-logo.png"
                            alt="Wbzard Labs"
                            style={{
                                height: "70px",
                                width: "auto",
                                filter: "brightness(0) invert(1)",
                            }}
                        />
                    </Link>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted-dark)", lineHeight: 1.65, maxWidth: "260px" }}>
                        Custom software, automation, and digital systems built around how your business actually works.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted-dark)", marginBottom: "1.25rem" }}>
                        Navigation
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {footerLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                style={{ fontSize: "0.875rem", color: "var(--text-muted-dark)", transition: "color 0.2s" }}
                                onMouseEnter={e => e.target.style.color = "#fff"}
                                onMouseLeave={e => e.target.style.color = "var(--text-muted-dark)"}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted-dark)", marginBottom: "1.25rem" }}>
                        Get in touch
                    </p>
                    <a
                        href="mailto:vivekg.work@gmail.com"
                        style={{ fontSize: "0.875rem", color: "var(--text-muted-dark)", display: "block", marginBottom: "1.5rem", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "var(--text-muted-dark)"}
                    >
                        vivekg.work@gmail.com
                    </a>
                    <button
                        className="btn-primary-dark"
                        data-cal-link="vivek-g-ts38ii/30min"
                        style={{ fontSize: "0.78rem", padding: "0.625rem 1.25rem" }}
                    >
                        Book a Discovery Session
                    </button>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                        <a href="https://www.instagram.com/wbzard/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted-dark)", transition: "color 0.2s" }}
                           onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "var(--text-muted-dark)"}>
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", paddingTop: "1.75rem" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted-dark)" }}>
                    © {new Date().getFullYear()} Wbzard Labs. All rights reserved.
                </p>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                    <a href="#" style={{ fontSize: "0.75rem", color: "var(--text-muted-dark)" }}>Privacy Policy</a>
                    <a href="#" style={{ fontSize: "0.75rem", color: "var(--text-muted-dark)" }}>Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
