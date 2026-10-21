import React from "react";
import { motion } from "framer-motion";
import FAQList from "./FAQList";
import FormCTA from "./FormCTA";
import { homeFaqs } from "../data/faqs";



const FAQSection = () => (
    <section id="contact" style={{ background: "var(--bg)", padding: "var(--section-pad) 0" }}>
        <div className="container">
            {/* FAQ */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
                gap: "clamp(3rem, 8vw, 6rem)",
                marginBottom: "clamp(4rem, 10vw, 7rem)",
                alignItems: "start",
            }}>
                <div>
                    <motion.p
                        className="section-label"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        FAQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.05 }}
                        style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1 }}
                    >
                        Questions founders ask us.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <FAQList faqs={homeFaqs} />
                </motion.div>
            </div>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                    background: "var(--bg-dark)",
                    color: "var(--text-on-dark)",
                    borderRadius: "var(--radius-lg)",
                    padding: "clamp(2.5rem, 6vw, 4rem)",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "2rem",
                }}
            >
                <div>
                    <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                        Ready to launch properly?
                    </h2>
                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: "440px", lineHeight: 1.65 }}>
                        Website, app, social, SEO or ads: tell us where you are, and we'll show you the fastest route to your first customers.
                    </p>
                </div>
                <FormCTA location="faq" className="btn-primary-dark" style={{ fontSize: "0.9rem", padding: "1rem 2rem" }} />
            </motion.div>
        </div>
    </section>
);

export default FAQSection;
