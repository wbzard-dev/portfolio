import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

const projects = [
    {
        title: "Blokz",
        category: "E-Commerce Ecosystem",
        image: "https://ik.imagekit.io/ugdlmxlzt/logo.svg?updatedAt=1764950686563",
        link: "/blokz",
        color: "#f38b2a"
    },
    {
        title: "One Habit",
        category: "Product Detail App",
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800",
        link: "/one-habit",
        color: "#4f46e5"
    },
    {
        title: "QuickFix Services",
        category: "Business Website",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
        link: "https://www.quickfixservices.co.in/",
        color: "#10b981",
        external: true
    },
    {
        title: "The Rugged",
        category: "Brand Website",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        link: "https://the-rugged.com/",
        color: "#e11d48",
        external: true
    },
];

const Portfolio = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="portfolio" style={{ background: "var(--color-bg)", padding: "10rem 0" }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: "clamp(3rem, 10vw, 6rem)" }}
                >
                    <span style={{ fontSize: "0.85rem", letterSpacing: "0.2em", color: "var(--color-text-muted)" }}>
                        SELECTED WORKS
                    </span>
                    <h2 style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)", marginTop: "1rem" }}>
                        PROJECTS
                    </h2>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {projects.map((project, index) => {
                        const LinkComponent = project.external ? "a" : Link;
                        const linkProps = project.external
                            ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                            : { to: project.link };

                        return (
                        <LinkComponent
                            {...linkProps}
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                borderBottom: "1px solid var(--color-border)",
                                padding: "2.5rem 0",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                textDecoration: "none",
                            }}
                        >
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.25rem", display: "block" }}>
                                    0{index + 1}
                                </span>
                                <motion.h3
                                    animate={{ x: hoveredIndex === index ? 20 : 0 }}
                                    style={{
                                        fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
                                        margin: 0,
                                        transition: "color 0.3s",
                                        color: hoveredIndex === index ? project.color : "var(--color-text)"
                                    }}
                                >
                                    {project.title}
                                </motion.h3>
                            </div>

                            <motion.div
                                animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? -10 : 0 }}
                                style={{ zIndex: 2, display: "flex", alignItems: "center", gap: "1rem" }}
                                className="project-meta"
                            >
                                <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>{project.category}</span>
                                <MoveRight size={28} />
                            </motion.div>

                            {/* Hover Image Preview - Hidden on mobile for better UX */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        className="hover-preview"
                                        initial={{ opacity: 0, scale: 0.8, rotate: -5, y: -20 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, rotate: 5, y: 20 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            position: "absolute",
                                            right: "15%",
                                            top: "50%",
                                            width: "clamp(250px, 30vw, 400px)",
                                            height: "clamp(150px, 20vw, 250px)",
                                            zIndex: 1,
                                            pointerEvents: "none",
                                            overflow: "hidden",
                                            borderRadius: "var(--radius-md)",
                                            boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                                            transform: "translateY(-50%)"
                                        }}
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </LinkComponent>
                        );
                    })}
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .hover-preview { display: none !important; }
                    .project-meta { opacity: 1 !important; x: 0 !important; }
                    .project-meta span { display: none; }
                }
            `}</style>
        </section>
    );
};

export default Portfolio;
