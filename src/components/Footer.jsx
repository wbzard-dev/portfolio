import React from "react";
import { Instagram, Linkedin, MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { site, whatsappUrl } from "../config/site";
import { serviceList } from "../data/services";
import FormCTA from "./FormCTA";
import { locationList } from "../data/locations";

const companyLinks = [
    { label: "Startup Launch Package", href: "/startup-launch-package" },
    { label: "Our Work",               href: "/#work" },
    { label: "Blog & Guides",          href: "/blog" },
    { label: "FAQ",                    href: "/#contact" },
    { label: "Cohort for Developers",  href: "/cohort/v1" },
];

const headingStyle = { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted-dark)", marginBottom: "1.25rem" };
const linkStyle    = { fontSize: "0.875rem", color: "var(--text-muted-dark)", transition: "color 0.2s" };
const hoverOn      = e => e.currentTarget.style.color = "#fff";
const hoverOff     = e => e.currentTarget.style.color = "var(--text-muted-dark)";

const FooterLink = ({ href, children }) =>
    <Link to={href} style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{children}</Link>;

const Footer = () => {
    const wa = whatsappUrl();
    return (
        <footer style={{ background: "var(--bg-dark)", color: "var(--text-on-dark)", padding: "clamp(4rem, 8vw, 6rem) 0 2.5rem" }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: "3rem",
                    paddingBottom: "3rem",
                    borderBottom: "1px solid var(--border-dark)"
                }}>
                    {/* Brand */}
                    <div>
                        <Link to="/" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
                            <img
                                src={`${import.meta.env.BASE_URL}images/final-logo.png`}
                                alt={site.name}
                                width="140"
                                height="70"
                                loading="lazy"
                                style={{
                                    height: "70px",
                                    width: "auto",
                                    filter: "brightness(0) invert(1)",
                                }}
                            />
                        </Link>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted-dark)", lineHeight: 1.65, maxWidth: "260px" }}>
                            Websites, apps, social media, SEO and Meta &amp; Google Ads for startups and new businesses in Bangalore and Shivamogga.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <p style={headingStyle}>Services</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {serviceList.map(s => <FooterLink key={s.slug} href={s.href}>{s.label}</FooterLink>)}
                        </div>
                    </div>

                    {/* Company + locations */}
                    <div>
                        <p style={headingStyle}>Company</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                            {companyLinks.map(l => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
                        </div>
                        <p style={headingStyle}>Locations</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {locationList.map(l => <FooterLink key={l.slug} href={l.href}>{l.city} ({l.altName})</FooterLink>)}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={headingStyle}>Get in touch</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                            <a href={`mailto:${site.email}`} style={{ ...linkStyle, display: "inline-flex", alignItems: "center", gap: "0.5rem" }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                                <Mail size={15} /> {site.email}
                            </a>
                            {site.phone && (
                                <a href={`tel:${site.phone.replace(/\s/g, "")}`} style={{ ...linkStyle, display: "inline-flex", alignItems: "center", gap: "0.5rem" }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                                    <Phone size={15} /> {site.phone}
                                </a>
                            )}
                            {wa && (
                                <a href={wa} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, display: "inline-flex", alignItems: "center", gap: "0.5rem" }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                                    <MessageCircle size={15} /> WhatsApp
                                </a>
                            )}
                        </div>
                        <FormCTA location="footer" className="btn-primary-dark" style={{ fontSize: "0.78rem", padding: "0.625rem 1.25rem" }} />
                        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                            {site.social.instagram && (
                                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "var(--text-muted-dark)", transition: "color 0.2s" }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                                    <Instagram size={18} />
                                </a>
                            )}
                            {site.social.linkedin && (
                                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--text-muted-dark)", transition: "color 0.2s" }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                                    <Linkedin size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", paddingTop: "1.75rem" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted-dark)" }}>
                        © {new Date().getFullYear()} {site.name}. Serving Bangalore, Shivamogga and all of Karnataka.
                    </p>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <Link to="/privacy-policy" style={{ fontSize: "0.75rem", color: "var(--text-muted-dark)" }}>Privacy Policy</Link>
                        <Link to="/terms" style={{ fontSize: "0.75rem", color: "var(--text-muted-dark)" }}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
