import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import SEO from "./SEO";
import { site, whatsappUrl } from "../config/site";

// Conversion destination — kept out of the index and sitemap so it only counts real form submissions.
const ThankYou = () => {
    const wa = whatsappUrl("Hi Wbzard Labs, I just sent an enquiry on your website.");
    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "clamp(7rem, 14vw, 9rem) 0 5rem" }}>
            <SEO title="Thank you" description="Thanks for your enquiry." url="/thank-you" noindex />
            <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ color: "var(--accent)", display: "inline-flex", marginBottom: "1.5rem" }}>
                    <CheckCircle2 size={56} strokeWidth={1.5} />
                </motion.div>
                <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.05, marginBottom: "1.25rem" }}>
                    Thanks, we've got it.
                </h1>
                <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2.25rem" }}>
                    We'll review your details and get back to you within one working day. Want to move faster? Pick a time for your free launch call now.
                </p>
                <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" data-cal-link={site.calLink}>
                        Book Your Launch Call <ArrowRight size={15} />
                    </button>
                    {wa && (
                        <a className="btn-secondary" href={wa} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={15} /> WhatsApp us
                        </a>
                    )}
                </div>
                <p style={{ marginTop: "2.5rem", fontSize: "0.9rem" }}>
                    <Link to="/blog" style={{ color: "var(--accent)", fontWeight: 600 }}>Meanwhile, read our founder guides →</Link>
                </p>
            </div>
        </div>
    );
};

export default ThankYou;
