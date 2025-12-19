import React from "react";
import { Target, Users, Zap } from "lucide-react";

const About = () => {
    return (
        <section id="about">
            <div
                className="container"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "4rem",
                }}
            >
                <div style={{ flex: "1 1 400px" }}>
                    <div style={{ position: "relative" }}>
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                            alt="Team meeting"
                            style={{
                                borderRadius: "var(--radius-lg)",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: "-30px",
                                right: "-30px",
                                backgroundColor: "var(--color-secondary)",
                                padding: "2rem",
                                borderRadius: "var(--radius-lg)",
                                maxWidth: "200px",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "3rem",
                                    fontWeight: "800",
                                    color: "var(--color-white)",
                                    marginBottom: "0.5rem",
                                    lineHeight: 1,
                                }}
                            >
                                12+
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontWeight: 600,
                                    color: "rgba(255,255,255,0.8)",
                                }}
                            >
                                Years of Experience
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ flex: "1 1 400px" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            color: "var(--color-white)",
                        }}
                    >
                        We Are Digital Architects
                    </h2>
                    <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
                        Founded in 2023, Webzards was born from a passion to
                        merge creative design with data-driven marketing. We
                        don't just clear paths; we build highways to success for
                        our clients.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                        }}
                    >
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div
                                style={{
                                    background: "rgba(0, 155, 119, 0.1)",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    height: "fit-content",
                                    color: "var(--color-accent)",
                                }}
                            >
                                <Target size={24} />
                            </div>
                            <div>
                                <h3
                                    style={{
                                        fontSize: "1.25rem",
                                        marginBottom: "0.5rem",
                                        color: "var(--color-white)",
                                    }}
                                >
                                    Mission
                                </h3>
                                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                                    To empower brands with the tools and
                                    strategies they need to dominate their
                                    market.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div
                                style={{
                                    background: "rgba(91, 46, 145, 0.2)",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    height: "fit-content",
                                    color: "var(--color-secondary-light)",
                                }}
                            >
                                <Users size={24} />
                            </div>
                            <div>
                                <h3
                                    style={{
                                        fontSize: "1.25rem",
                                        marginBottom: "0.5rem",
                                        color: "var(--color-white)",
                                    }}
                                >
                                    Team
                                </h3>
                                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                                    A diverse group of designers, developers,
                                    and strategists working in harmony.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
