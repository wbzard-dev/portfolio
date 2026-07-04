import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

const faqs = [
    {
        q: "Do I need custom software, or will off-the-shelf tools work?",
        a: "Not every business needs custom software. Many achieve significant improvements through better automation and workflow design. During the discovery session, we'll honestly assess what approach makes the most sense for your specific situation — even if that means recommending existing tools.",
    },
    {
        q: "How much does custom software development cost?",
        a: "It depends on the scope, complexity, and integrations required. Because every solution is tailored to the business, pricing varies. We discuss this transparently during the discovery session once we understand your actual requirements — no vague quotes before that.",
    },
    {
        q: "Can you automate processes in our existing software stack?",
        a: "Yes. In most cases, improving and connecting existing systems is more effective (and cost-efficient) than replacing them. We work with your current stack wherever possible.",
    },
    {
        q: "Do you provide ongoing support after the project is delivered?",
        a: "Yes. We offer ongoing maintenance, feature improvements, and long-term support. The systems we build are designed to evolve alongside your business.",
    },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
        <button
            onClick={onToggle}
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.5rem 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
            }}
        >
            <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>
                {faq.q}
            </span>
            <span style={{ flexShrink: 0, color: "var(--text-muted)" }}>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
            </span>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                >
                    <p style={{ paddingBottom: "1.5rem", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "640px" }}>
                        {faq.a}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
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
                            Common questions.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                faq={faq}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        ))}
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
                            Ready to simplify your business?
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: "420px", lineHeight: 1.65 }}>
                            Whether you're considering custom software, automation, or simply want to understand what's possible — let's start with a conversation.
                        </p>
                    </div>
                    <button
                        className="btn-primary-dark"
                        data-cal-link="vivek-g-ts38ii/30min"
                        style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
                    >
                        Book Your Discovery Session <ArrowRight size={16} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
