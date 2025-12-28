import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    return (
        <section
            id="contact"
            style={{ backgroundColor: "var(--color-primary-light)" }}
        >
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2
                        style={{
                            fontSize: "2.5rem",
                            color: "var(--color-text)",
                        }}
                    >
                        Let's Build Something Great
                    </h2>
                    <p style={{ maxWidth: "600px", margin: "0 auto" }}>
                        Ready to take your digital presence to the next level?
                        Get in touch today.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "4rem",
                    }}
                >
                    {/* Contact Info */}
                    <div>
                        <h3
                            style={{
                                fontSize: "1.5rem",
                                marginBottom: "2rem",
                                color: "var(--color-text)",
                            }}
                        >
                            Get In Touch
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div style={{ color: "var(--color-accent)" }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4
                                        style={{
                                            margin: "0 0 0.5rem",
                                            fontSize: "1.1rem",
                                            color: "var(--color-text)",
                                        }}
                                    >
                                        Email Us
                                    </h4>
                                    <a
                                        href="mailto:hello@webzards.com"
                                        style={{
                                            color: "var(--color-text-muted)",
                                        }}
                                    >
                                        hello@webzards.com
                                    </a>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div style={{ color: "var(--color-accent)" }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4
                                        style={{
                                            margin: "0 0 0.5rem",
                                            fontSize: "1.1rem",
                                            color: "var(--color-text)",
                                        }}
                                    >
                                        Call Us
                                    </h4>
                                    <a
                                        href="tel:+15551234567"
                                        style={{
                                            color: "var(--color-text-muted)",
                                        }}
                                    >
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "flex-start",
                                }}
                            >
                                <div style={{ color: "var(--color-accent)" }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4
                                        style={{
                                            margin: "0 0 0.5rem",
                                            fontSize: "1.1rem",
                                            color: "var(--color-text)",
                                        }}
                                    >
                                        Visit Us
                                    </h4>
                                    <p style={{ margin: 0 }}>
                                        123 Digital Ave, Tech City, TC 90210
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        style={{
                            backgroundColor: "var(--color-bg)",
                            padding: "2.5rem",
                            borderRadius: "var(--radius-lg)",
                            border: "1px solid rgba(0,0,0,0.05)",
                        }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                    fontWeight: 500,
                                }}
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    borderRadius: "var(--radius-md)",
                                    color: "var(--color-text)",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                    fontWeight: 500,
                                }}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    borderRadius: "var(--radius-md)",
                                    color: "var(--color-text)",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "2rem" }}>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "0.5rem",
                                    fontWeight: 500,
                                }}
                            >
                                Message
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Tell us about your project..."
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    backgroundColor: "rgba(0,0,0,0.02)",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    borderRadius: "var(--radius-md)",
                                    color: "var(--color-text)",
                                    fontSize: "1rem",
                                    resize: "vertical",
                                }}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                        >
                            Send Message{" "}
                            <Send size={18} style={{ marginLeft: "8px" }} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
