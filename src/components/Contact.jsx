import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

const Contact = () => {
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        setStatus("sending");

        try {
            const response = await fetch("https://formspree.io/f/xdaakeed", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" style={{ background: "var(--color-bg)", padding: "var(--section-padding) 0" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 500px), 1fr))", gap: "clamp(3rem, 10vw, 6rem)" }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{ fontSize: "0.85rem", letterSpacing: "0.2em", color: "var(--color-text-muted)" }}>
                            GET IN TOUCH
                        </span>
                        <h2 style={{ fontSize: "clamp(2rem, 8vw, 5rem)", marginTop: "1rem", lineHeight: 1 }}>
                            LET'S START A PROJECT.
                        </h2>
                        <div style={{ marginTop: "clamp(2rem, 5vw, 3rem)" }}>
                            <p style={{ color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>Email us at</p>
                            <a
                                href="mailto:vivekg.work@gmail.com"
                                style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 600, textDecoration: "underline" }}
                            >
                                vivekg.work@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                        onSubmit={handleSubmit}
                        action="https://formspree.io/f/xdaakeed"
                        method="POST"
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.5, fontWeight: 700 }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="glass"
                                style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", color: "#fff" }}
                                placeholder="Your Name"
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.5, fontWeight: 700 }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="glass"
                                style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", color: "#fff" }}
                                placeholder="Email Address"
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.5, fontWeight: 700 }}>Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                required
                                className="glass"
                                style={{ padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", resize: "none", color: "#fff" }}
                                placeholder="How can we help?"
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === "sending"}
                            style={{
                                background: status === "success" ? "#22c55e" : "var(--color-text)",
                                color: "var(--color-bg)",
                                padding: "1.25rem",
                                borderRadius: "100px",
                                fontWeight: 700,
                                fontSize: "1rem",
                                cursor: status === "sending" ? "not-allowed" : "pointer",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "1rem",
                                transition: "all 0.3s ease"
                            }}
                        >
                            {status === "success" ? (
                                <>SENT <Check size={20} /></>
                            ) : status === "sending" ? (
                                "SENDING..."
                            ) : (
                                <>SEND INQUIRY <ArrowUpRight size={20} /></>
                            )}
                        </motion.button>
                        {status === "error" && (
                            <p style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center" }}>
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
