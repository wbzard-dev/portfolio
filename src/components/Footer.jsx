import React from "react";
import { Rocket, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: "var(--color-bg)",
                padding: "4rem 0 2rem",
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "3rem",
                        marginBottom: "4rem",
                    }}
                >
                    {/* Brand */}
                    <div style={{ maxWidth: "300px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "1.5rem",
                                fontWeight: "800",
                                color: "var(--color-white)",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <Rocket className="text-accent" size={28} />
                            <span>Webzards</span>
                        </div>
                        <p>
                            Transforming businesses through digital innovation.
                            We build the future of the web.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4
                            style={{
                                color: "var(--color-white)",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Company
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {["About", "Services", "Portfolio", "Contact"].map(
                                (item) => (
                                    <li
                                        key={item}
                                        style={{ marginBottom: "1rem" }}
                                    >
                                        <a
                                            href={`#${item.toLowerCase()}`}
                                            className="footer-link"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4
                            style={{
                                color: "var(--color-white)",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Services
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {[
                                "SEO Optimization",
                                "Web Design",
                                "Social Media",
                                "Content Strategy",
                            ].map((item) => (
                                <li key={item} style={{ marginBottom: "1rem" }}>
                                    <a href="#" className="footer-link">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4
                            style={{
                                color: "var(--color-white)",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Follow Us
                        </h4>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <a href="#" className="social-link">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="social-link">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="social-link">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="social-link">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        textAlign: "center",
                        paddingTop: "2rem",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                    }}
                >
                    &copy; {new Date().getFullYear()} Webzards Digital Agency.
                    All rights reserved.
                </div>
            </div>
            <style>{`
        .footer-link {
          color: var(--color-text-muted);
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: var(--color-accent);
        }
        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--color-white);
          transition: all 0.3s ease;
        }
        .social-link:hover {
          background: var(--color-accent);
          transform: translateY(-3px);
        }
      `}</style>
        </footer>
    );
};

export default Footer;
