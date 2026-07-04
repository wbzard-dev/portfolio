import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO, BrightStart",
        content: "Wbzard Labs completely transformed our online presence. Our leads have tripled since the new site went live!",
    },
    {
        name: "Mark Davis",
        role: "Marketing Director, TechFlow",
        content: "The team is incredibly responsive and knowledgeable. Best agency experience I've had in 10 years.",
    },
    {
        name: "Emily Chen",
        role: "Founder, StyleSpace",
        content: "They didn't just build a website; they built a brand identity that perfectly captures our vision.",
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" style={{ background: "var(--color-bg)", padding: "var(--section-padding) 0" }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: "clamp(3rem, 10vw, 6rem)" }}
                >
                    <span style={{ fontSize: "0.85rem", letterSpacing: "0.2em", color: "var(--color-text-muted)" }}>
                        CLIENT TESTIMONIALS
                    </span>
                    <h2 style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", marginTop: "1rem" }}>
                        TRUSTED BY LEADERS
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 350px), 1fr))",
                        gap: "2rem",
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass"
                            style={{
                                padding: "clamp(1.5rem, 5vw, 3rem)",
                                borderRadius: "var(--radius-lg)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem",
                                position: "relative"
                            }}
                        >
                            <Quote size={"clamp(30px, 5vw, 40px)"} style={{ opacity: 0.1, position: "absolute", top: "1.5rem", right: "1.5rem" }} />
                            <p style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)", lineHeight: 1.6, color: "var(--color-text-muted)", fontStyle: "italic", margin: 0 }}>
                                "{testimonial.content}"
                            </p>
                            <div>
                                <h4 style={{ fontSize: "1rem", margin: "0 0 0.25rem 0" }}>{testimonial.name}</h4>
                                <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{testimonial.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
