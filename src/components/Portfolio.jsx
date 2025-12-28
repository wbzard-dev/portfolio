import React from "react";
import { ExternalLink } from "lucide-react";

const projects = [
    {
        title: "Neon Tech",
        category: "Web Design & SEO",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        description: "Redesigned website and 200% increase in organic traffic.",
    },
    {
        title: "Flow Fitness",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        description: "Launched a viral campaign reaching 1M+ users.",
    },
    {
        title: "EcoMarket",
        category: "E-commerce PPC",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
        description: "Optimized ad spend reduced CPA by 40%.",
        link: "#",
    },
    {
        title: "Blokz",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
        description:
            "A modern, high-performance e-commerce platform built for scale.",
        link: "https://blokz.store/",
    },
];

const Portfolio = () => {
    return (
        <section id="portfolio">
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            color: "var(--color-text)",
                        }}
                    >
                        Selected Works
                    </h2>
                    <p style={{ maxWidth: "600px", margin: "0 auto" }}>
                        See how we've helped other businesses achieve their
                        goals.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="portfolio-card"
                            style={{
                                borderRadius: "var(--radius-lg)",
                                overflow: "hidden",
                                position: "relative",
                                group: "project",
                                height: "400px",
                            }}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="portfolio-img"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: "transform 0.5s ease",
                                }}
                            />
                            <div
                                className="portfolio-overlay"
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: "2rem",
                                    background:
                                        "linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)",
                                    transform: "translateY(20px)",
                                    opacity: 0.9,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <span
                                    style={{
                                        color: "var(--color-accent)",
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        display: "block",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {project.category}
                                </span>
                                <h3
                                    style={{
                                        fontSize: "1.5rem",
                                        color: "var(--color-white)",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    style={{
                                        color: "var(--color-text-muted)",
                                        marginBottom: "1.5rem",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    {project.description}
                                </p>
                                <a
                                    href={project.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-link"
                                    style={{
                                        color: "var(--color-white)",
                                        fontWeight: 600,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        textDecoration: "none",
                                    }}
                                >
                                    View Case Study <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .portfolio-card:hover .portfolio-img {
          transform: scale(1.05);
        }
        .portfolio-card:hover .portfolio-overlay {
          transform: translateY(0);
        }
        .btn-link:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
        </section>
    );
};

export default Portfolio;
