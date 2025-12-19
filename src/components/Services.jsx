import React from "react";
import {
    Search,
    MousePointer,
    Monitor,
    BarChart,
    PenTool,
    Share2,
} from "lucide-react";

const services = [
    {
        icon: <Search size={32} />,
        title: "Search Engine Optimization",
        description:
            "Rank higher on Google with our data-driven SEO strategies that drive organic traffic.",
    },
    {
        icon: <MousePointer size={32} />,
        title: "Pay-Per-Click Advertising",
        description:
            "Maximize ROI with targeted campaigns on Google Ads, Meta, and LinkedIn.",
    },
    {
        icon: <Monitor size={32} />,
        title: "Web Design & Development",
        description:
            "Stunning, high-performance websites built to convert visitors into customers.",
    },
    {
        icon: <PenTool size={32} />,
        title: "Content Marketing",
        description:
            "Compelling storytelling that builds authority and engages your audience.",
    },
    {
        icon: <Share2 size={32} />,
        title: "Social Media Management",
        description:
            "Build a community around your brand with consistent, high-quality social content.",
    },
    {
        icon: <BarChart size={32} />,
        title: "Analytics & Reporting",
        description:
            "Transparent reporting so you know exactly where every dollar goes.",
    },
];

const Services = () => {
    return (
        <section
            id="services"
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
                        Our Expertise
                    </h2>
                    <p style={{ maxWidth: "600px", margin: "0 auto" }}>
                        We provide a full spectrum of digital marketing services
                        to help your business grow.
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
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            style={{
                                backgroundColor: "var(--color-bg)",
                                padding: "2rem",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                transition:
                                    "transform 0.3s ease, box-shadow 0.3s ease",
                                cursor: "default",
                            }}
                        >
                            <div
                                style={{
                                    color: "var(--color-accent)",
                                    marginBottom: "1.5rem",
                                    background: "rgba(0, 155, 119, 0.1)",
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {service.icon}
                            </div>
                            <h3
                                style={{
                                    fontSize: "1.5rem",
                                    marginBottom: "1rem",
                                    color: "var(--color-white)",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p style={{ marginBottom: 0 }}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border-color: var(--color-secondary);
        }
      `}</style>
        </section>
    );
};

export default Services;
