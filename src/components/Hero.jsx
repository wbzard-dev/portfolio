import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
    return (
        <section
            id="home"
            style={{
                paddingTop: "180px",
                paddingBottom: "100px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Glows */}
            <div
                style={{
                    position: "absolute",
                    top: "-20%",
                    right: "-10%",
                    width: "600px",
                    height: "600px",
                    background:
                        "radial-gradient(circle, rgba(91, 46, 145, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
                    borderRadius: "50%",
                    zIndex: -1,
                    filter: "blur(60px)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-10%",
                    left: "-10%",
                    width: "500px",
                    height: "500px",
                    background:
                        "radial-gradient(circle, rgba(0, 155, 119, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
                    borderRadius: "50%",
                    zIndex: -1,
                    filter: "blur(60px)",
                }}
            />

            <div className="container">
                <div
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "rgba(91, 46, 145, 0.2)",
                            border: "1px solid rgba(106, 76, 147, 0.4)",
                            padding: "8px 16px",
                            borderRadius: "50px",
                            color: "var(--color-secondary-light)",
                            marginBottom: "1.5rem",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                        }}
                    >
                        <Sparkles size={16} />
                        <span>Digital Magic for Modern Brands</span>
                    </div>

                    <h1
                        style={{
                            fontSize: "3.5rem",
                            marginBottom: "1.5rem",
                            letterSpacing: "-0.02em",
                            color: "var(--color-text)",
                        }}
                    >
                        We Craft Digital Experiences That{" "}
                        <span className="text-gradient">
                            Scale Your Business
                        </span>
                    </h1>

                    <p
                        style={{
                            fontSize: "1.25rem",
                            lineHeight: "1.6",
                            marginBottom: "2.5rem",
                            maxWidth: "600px",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        Webzards is a full-service digital marketing agency. We
                        perform wizardry with SEO, PPC, and Web Design to turn
                        visitors into loyal customers.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <a
                            href="#contact"
                            className="btn btn-primary"
                            style={{ padding: "16px 32px", fontSize: "1.1rem" }}
                        >
                            Let's Talk Growth{" "}
                            <ArrowRight
                                size={20}
                                style={{ marginLeft: "8px" }}
                            />
                        </a>
                        <a
                            href="#portfolio"
                            className="btn btn-outline"
                            style={{ padding: "16px 32px", fontSize: "1.1rem" }}
                        >
                            View Our Work
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          h1 { fontSize: 2.5rem !important; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
