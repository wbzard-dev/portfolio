import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, BarChart3, Globe, Shield, Zap } from "lucide-react";

const services = [
    {
        icon: <Search size={28} />,
        title: "SEO Wizardry",
        desc: "Rank higher and dominate search results with our advanced SEO strategies.",
    },
    {
        icon: <PenTool size={28} />,
        title: "Content Craft",
        desc: "Engaging content that turns casual readers into loyal brand advocates.",
    },
    {
        icon: <BarChart3 size={28} />,
        title: "PPC Magic",
        desc: "Data-driven advertising that maximizes ROI and accelerates growth.",
    },
    {
        icon: <Globe size={28} />,
        title: "Web Design",
        desc: "Beautiful, high-converting websites built with modern technologies.",
    },
    {
        icon: <Shield size={28} />,
        title: "Brand Strategy",
        desc: "Building solid foundations for brands that want to stand the test of time.",
    },
    {
        icon: <Zap size={28} />,
        title: "Performance",
        desc: "Lightning fast experiences that keep your users coming back for more.",
    },
];

const Services = () => {
    return (
        <section id="services" style={{ background: "var(--color-bg)" }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: "clamp(3rem, 10vw, 6rem)", textAlign: "center" }}
                >
                    <span style={{ fontSize: "0.85rem", letterSpacing: "0.2em", color: "var(--color-text-muted)" }}>
                        OUR SERVICES
                    </span>
                    <h2 style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", marginTop: "1rem" }}>
                        EXPERT SOLUTIONS
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 100%, 350px), 1fr))",
                        gap: "clamp(1.5rem, 3vw, 2rem)",
                    }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass"
                            style={{
                                padding: "3rem",
                                borderRadius: "var(--radius-lg)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem",
                                transition: "border-color 0.3s",
                            }}
                            whileHover={{ borderColor: "rgba(255,255,255,0.3)", y: -10 }}
                        >
                            <div style={{ color: "var(--color-text)" }}>{service.icon}</div>
                            <h3 style={{ fontSize: "1.5rem", textTransform: "none", letterSpacing: "0" }}>
                                {service.title}
                            </h3>
                            <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
