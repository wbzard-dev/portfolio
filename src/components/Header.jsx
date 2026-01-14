import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setIsScrolled(currentY > 50);

            if (currentY > lastY && currentY > 200) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    const navLinks = [
        { name: "Work", href: "/#portfolio" },
        { name: "Services", href: "/#services" },
        { name: "About", href: "/#about" },
        { name: "Journal", href: "/blog" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: "fixed",
                top: "1.5rem",
                left: 0,
                right: 0,
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
                padding: "0 1rem"
            }}
        >
            <nav
                className="glass"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(0.75rem, 3vw, 2rem)",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "100px",
                    pointerEvents: "auto",
                    width: "fit-content",
                    maxWidth: "95vw"
                }}
            >
                <a
                    href="/"
                    style={{
                        fontFamily: "Syne, sans-serif",
                        fontSize: "clamp(1rem, 4vw, 1.25rem)",
                        fontWeight: "800",
                        letterSpacing: "-0.05em",
                        marginRight: "0.25rem"
                    }}
                >
                    W.
                </a>

                <div style={{ display: "flex", gap: "clamp(0.6rem, 2vw, 1.25rem)" }} className="nav-links-container">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            style={{
                                fontSize: "clamp(0.65rem, 2.5vw, 0.75rem)",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                opacity: 0.6,
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                whiteSpace: "nowrap"
                            }}
                            className="nav-item-link"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
            <style>{`
                .nav-item-link:hover {
                    opacity: 1 !important;
                    transform: translateY(-1px);
                }
                @media (max-width: 380px) {
                    .nav-links-container { gap: 0.5rem !important; }
                    nav { padding: 0.5rem 1rem !important; }
                }
            `}</style>
        </motion.header>
    );
};

export default Header;
