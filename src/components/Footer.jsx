import React from "react";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

const Footer = () => {
    return (
        <footer style={{ background: "var(--color-bg)", padding: "var(--section-padding) 0 3rem" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "clamp(6rem, 15vw, 10rem)", position: "relative" }}>
                    <h2 style={{
                        fontSize: "clamp(5rem, 25vw, 15rem)",
                        letterSpacing: "-0.05em",
                        opacity: 0.03,
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 0,
                        pointerEvents: "none",
                        whiteSpace: "nowrap"
                    }}>
                        WBZARD
                    </h2>
                    <div style={{ position: "relative", zIndex: 1, paddingTop: "2rem" }}>
                        <h3 style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", marginBottom: "clamp(1rem, 3vw, 2rem)" }}>Wanna work with us?</h3>
                        <a href="mailto:wbzard.dev@gmail.com" style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", fontWeight: 800, textDecoration: "underline" }}>
                            SAY HELLO.
                        </a>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "clamp(2rem, 5vw, 4rem)",
                    gap: "2rem"
                }}>
                    <div style={{ minWidth: "200px" }}>
                        <a href="/" style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "Syne, sans-serif" }}>W.</a>
                        <p style={{ marginTop: "1rem", color: "var(--color-text-muted)", maxWidth: "300px" }}>Crafting digital experiences that matter.</p>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem, 8vw, 4rem)" }}>
                        <div>
                            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "1.5rem" }}>Socials</h4>
                            <div style={{ display: "flex", gap: "1.5rem" }}>
                                {/* <a href="#" style={{ color: "var(--color-text-muted)" }}><Twitter size={20} /></a> */}
                                {/* <a href="#" style={{ color: "var(--color-text-muted)" }}><Linkedin size={20} /></a> */}
                                <a href="https://www.instagram.com/wbzard/" style={{ color: "var(--color-text-muted)" }}><Instagram size={20} /></a>
                                {/* <a href="#" style={{ color: "var(--color-text-muted)" }}><Github size={20} /></a> */}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: "0.8rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "1.5rem" }}>Legal</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <a href="#" style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Privacy Policy</a>
                                <a href="#" style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "6rem", textAlign: "center", fontSize: "0.8rem", color: "var(--color-text-muted)", opacity: 0.5 }}>
                    &copy; {new Date().getFullYear()} WBZARD. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
