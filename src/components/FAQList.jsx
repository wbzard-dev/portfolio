import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQItem = ({ faq, isOpen, onToggle }) => (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
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
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>
                {faq.q}
            </h3>
            <span style={{ flexShrink: 0, color: "var(--text-muted)" }}>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
            </span>
        </button>
        {/* Answers stay in the DOM when collapsed so crawlers can still index them */}
        <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
            aria-hidden={!isOpen}
        >
            <p style={{ paddingBottom: "1.5rem", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: "640px" }}>
                {faq.a}
            </p>
        </motion.div>
    </div>
);

const FAQList = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(0);
    return (
        <div>
            {faqs.map((faq, i) => (
                <FAQItem
                    key={i}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
            ))}
        </div>
    );
};

export default FAQList;
