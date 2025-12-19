import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO, BrightStart",
        content:
            "Webzards completely transformed our online presence. Our leads have tripled since the new site went live!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
        name: "Mark Davis",
        role: "Marketing Director, TechFlow",
        content:
            "The team is incredibly responsive and knowledgeable. Best agency experience I've had in 10 years.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    },
    {
        name: "Emily Chen",
        role: "Founder, StyleSpace",
        content:
            "They didn't just build a website; they built a brand identity that perfectly captures our vision.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    },
];

const Testimonials = () => {
    return (
        <section
            id="testimonials"
            style={{ backgroundColor: "var(--color-primary-light)" }}
        >
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            color: "var(--color-white)",
                        }}
                    >
                        Client Love
                    </h2>
                    <p style={{ maxWidth: "600px", margin: "0 auto" }}>
                        Don't just take our word for it. Here's what our
                        partners say.
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
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="testimonial-card"
                            style={{
                                backgroundColor: "var(--color-bg)",
                                padding: "2.5rem",
                                borderRadius: "var(--radius-lg)",
                                position: "relative",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Quote
                                size={40}
                                style={{
                                    position: "absolute",
                                    top: "2rem",
                                    right: "2rem",
                                    color: "rgba(91, 46, 145, 0.2)",
                                }}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    gap: "0.25rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill="var(--color-accent)"
                                        color="var(--color-accent)"
                                    />
                                ))}
                            </div>

                            <p
                                style={{
                                    fontSize: "1.1rem",
                                    lineHeight: "1.6",
                                    marginBottom: "2rem",
                                    color: "var(--color-text-light)",
                                    fontStyle: "italic",
                                }}
                            >
                                "{testimonial.content}"
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                                <div>
                                    <h4
                                        style={{
                                            margin: 0,
                                            fontSize: "1rem",
                                            color: "var(--color-white)",
                                        }}
                                    >
                                        {testimonial.name}
                                    </h4>
                                    <span
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--color-text-muted)",
                                        }}
                                    >
                                        {testimonial.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
