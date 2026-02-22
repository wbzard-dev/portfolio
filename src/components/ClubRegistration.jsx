import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Upload, Laptop, Palette, Send, Phone, Mail } from "lucide-react";

/**
 * .root Technical Club - Member Recruitment 2026
 * Stunning Landing Page & Registration Form
 */

const PixelBackground = () => {
    const particles = useMemo(() =>
        [...Array(60)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 10,
            duration: Math.random() * 4 + 2,
            size: Math.random() * 4 + 2
        })), []);

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
            opacity: 0.6
        }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: ["0vh", "60vh"],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    style={{
                        position: "absolute",
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: "#a4ff01",
                        boxShadow: `0 0 ${p.size * 2}px #a4ff01`,
                        borderRadius: "1px"
                    }}
                />
            ))}
        </div>
    );
};

const ClubRegistration = () => {
    const [domain, setDomain] = useState("");
    const [status, setStatus] = useState(""); // "", "sending", "success", "error"
    const [showModal, setShowModal] = useState(false);

    // Optional: Only lock scroll if user really wants to avoid background jitter
    // But for now, let's keep it simple to allow pull-to-refresh and native feel
    /*
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showModal]);
    */

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        setStatus("sending");

        try {
            const response = await fetch("https://orca-app-xc7lo.ondigitalocean.app/api/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus("success");
                form.reset();
                setDomain("");
                if (window.gtag) {
                    window.gtag("event", "club_registration_success", {
                        event_category: "registration",
                        event_label: data.domain || "unknown",
                    });
                }
            } else {
                setStatus("error");
                if (window.gtag) {
                    window.gtag("event", "club_registration_error", {
                        event_category: "registration",
                        reason: result.message || "server_error",
                    });
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            if (window.gtag) {
                window.gtag("event", "club_registration_error", {
                    event_category: "registration",
                    reason: "fetch_error",
                });
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    const inputStyles = {
        width: "100%",
        padding: "1rem 1.25rem",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    };

    const labelStyles = {
        fontSize: "0.85rem",
        fontWeight: "600",
        color: "#a4ff01",
        marginBottom: "0.5rem",
        display: "block",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    };

    const modalContent = [
        "This is not a participation club — it is a working technical body.",
        "As a member, you contribute through real execution, not just attendance.",
        "You will work on structured technical projects and real problem statements.",
        "You may lead teams, organize events, and mentor juniors.",
        "You gain hands-on experience in planning, execution, and documentation.",
        "You develop professional discipline, accountability, and leadership skills.",
        "Your contributions become verified experience and portfolio proof.",
        "Selection is intentional — commitment and responsibility matter here.",
        "This role is for students ready to grow through ownership and execution.",
        "Root access isn't given, it's earned."
    ];

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f1417 0%, #0a0a0a 100%)",
            color: "#fff",
            padding: "2rem 1rem",
            position: "relative",
            overflowX: "hidden"
        }}>
            <PixelBackground />

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(8px)",
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem"
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#0f1417",
                                border: "1px solid rgba(164, 255, 1, 0.2)",
                                borderRadius: "24px",
                                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                                maxWidth: "600px",
                                width: "calc(100% - 2rem)",
                                maxHeight: "80vh",
                                overflowY: "auto",
                                WebkitOverflowScrolling: "touch",
                                position: "relative",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                                scrollbarWidth: "thin",
                                scrollbarColor: "#a4ff01 rgba(255,255,255,0.05)"
                            }}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    position: "absolute",
                                    top: "1.5rem",
                                    right: "1.5rem",
                                    background: "none",
                                    border: "none",
                                    color: "rgba(255,255,255,0.4)",
                                    cursor: "pointer",
                                    fontSize: "1.2rem"
                                }}
                            >
                                ✕
                            </button>
                            <h2 style={{ color: "#a4ff01", marginBottom: "2rem", fontSize: "1.8rem" }}>Why be a .root Member?</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {modalContent.map((point, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                        <div style={{ color: "#a4ff01", marginTop: "0.3rem" }}>●</div>
                                        <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.5, margin: 0 }}>
                                            {i === modalContent.length - 1 ? <strong>{point}</strong> : point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated Background Orbs */}
            <div style={{
                position: "absolute",
                top: "-10%",
                right: "-5%",
                width: "40vw",
                height: "40vw",
                background: "radial-gradient(circle, rgba(164, 255, 1, 0.05) 0%, transparent 70%)",
                zIndex: 0,
                pointerEvents: "none"
            }} />

            <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
                {/* Header */}
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4rem" }}>
                    <div>
                        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "2.5rem", fontWeight: "700", color: "#a4ff01", lineHeight: 1 }}>
                            .root
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <a
                            href="tel:6361196364"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "38px",
                                height: "38px",
                                borderRadius: "10px",
                                background: "rgba(255, 255, 255, 0.05)",
                                backdropFilter: "blur(10px)",
                                border: "none",
                                color: "rgba(255, 255, 255, 0.8)",
                                transition: "all 0.3s ease"
                            }}
                            className="cta-icon"
                        >
                            <Phone size={18} />
                        </a>
                        <a
                            href="mailto:rootclub.community@gmail.com"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "38px",
                                height: "38px",
                                borderRadius: "10px",
                                background: "rgba(255, 255, 255, 0.05)",
                                backdropFilter: "blur(10px)",
                                border: "none",
                                color: "rgba(255, 255, 255, 0.8)",
                                transition: "all 0.3s ease"
                            }}
                            className="cta-icon"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Hero Section */}
                    <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1, marginBottom: "1.5rem" }}>
                            JOIN THE <span style={{ color: "#a4ff01" }}>.ROOT</span> CREW
                        </h1>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                background: "none",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                                fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                                color: "#a4ff01",
                                fontWeight: "600",
                                textDecoration: "underline",
                                textUnderlineOffset: "8px",
                                transition: "all 0.3s ease",
                                padding: "0.5rem"
                            }}
                            className="why-link"
                        >
                            Why be a .root Member?
                        </button>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", letterSpacing: "0.05em" }}>
                            (Click here to learn more)
                        </div>
                    </motion.div>

                    {/* Registration Form */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            background: "rgba(255, 255, 255, 0.02)",
                            backdropFilter: "blur(20px)",
                            borderRadius: "32px",
                            padding: "clamp(1.5rem, 5vw, 3.5rem)",
                            border: "1px solid rgba(164, 255, 1, 0.1)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        }}
                    >
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center", opacity: 0.9 }}>
                            Member Recruitment 2026
                        </h2>
                        <p style={{ textAlign: "center", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>
                            Fill out the below form.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                            {/* Row 1: Name and USN */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={labelStyles}>Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        placeholder="Enter your full name"
                                        style={inputStyles}
                                        className="form-input"
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={labelStyles}>USN / Registration Number *</label>
                                    <input
                                        type="text"
                                        name="usn"
                                        required
                                        placeholder="Enter your USN"
                                        style={inputStyles}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Phone and Email */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={labelStyles}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        pattern="[0-9]{10}"
                                        title="Please enter a 10 digit phone number"
                                        placeholder="10-digit number"
                                        style={inputStyles}
                                        className="form-input"
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={labelStyles}>Email ID *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="you@example.com"
                                        style={inputStyles}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Branch and Semester */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={labelStyles}>Branch *</label>
                                    <select name="branch" required defaultValue="" style={inputStyles} className="form-select">
                                        <option value="" disabled>Select Branch</option>
                                        <option value="CSE">CSE</option>
                                        <option value="CSE (IoT)">CSE (IoT)</option>
                                        <option value="AIML">AIML</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="ME">ME</option>
                                        <option value="CIVIL">CIVIL</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label style={labelStyles}>Semester *</label>
                                    <select name="semester" required defaultValue="" style={inputStyles} className="form-select">
                                        <option value="" disabled>Select Semester</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                            <option key={sem} value={sem}>{sem}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Domain Selection */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label style={labelStyles}>Which domain would you like to join? *</label>
                                <select
                                    name="domain"
                                    required
                                    defaultValue=""
                                    style={inputStyles}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="" disabled>Select Domain</option>
                                    <option value="tech">Tech</option>
                                    <option value="non tech">Non Tech</option>
                                </select>
                            </div>

                            {/* Conditional Domain Logic */}
                            <AnimatePresence mode="wait">
                                {domain === "tech" && (
                                    <motion.div
                                        key="tech-section"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ display: "flex", flexDirection: "column", gap: "2rem", overflow: "hidden" }}
                                    >
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={labelStyles}>Mention techstack/technologies you know *</label>
                                            <textarea
                                                name="techstack"
                                                required={domain === "tech"}
                                                rows="4"
                                                placeholder="React, Node.js, Python, etc."
                                                style={{ ...inputStyles, resize: "vertical" }}
                                                className="form-input"
                                            />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={labelStyles}>Current skill level in this domain *</label>
                                            <select name="skillLevel" required={domain === "tech"} defaultValue="" style={inputStyles} className="form-select">
                                                <option value="" disabled>Select Level</option>
                                                <option value="Beginner">Beginner (Learning basics)</option>
                                                <option value="Intermediate">Intermediate (Built small projects)</option>
                                                <option value="Advanced">Advanced (Confident & experienced)</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}

                                {domain === "non tech" && (
                                    <motion.div
                                        key="non-tech-section"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ display: "flex", flexDirection: "column", gap: "2rem", overflow: "hidden" }}
                                    >
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={labelStyles}>What field are you into? *</label>
                                            <select name="nonTechField" required={domain === "non tech"} defaultValue="" style={inputStyles} className="form-select">
                                                <option value="" disabled>Select Field</option>
                                                <option value="content creation">Content Creation</option>
                                                <option value="Media & design">Media & Design</option>
                                                <option value="Anchoring/Emcee">Anchoring/Emcee</option>
                                                <option value="Video Editing/Photography">Video Editing/Photography</option>
                                            </select>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={labelStyles}>Upload your works / Portfolio Link</label>
                                            <div style={{ position: "relative" }}>
                                                <input
                                                    type="text"
                                                    name="portfolio"
                                                    placeholder="Link to your portfolio or drive"
                                                    style={inputStyles}
                                                    className="form-input"
                                                />
                                                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", display: "block" }}>
                                                    Provide a link to your best work (Drive/Behance/GitHub)
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Final Question */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label style={labelStyles}>What value can you bring to .root as a member? *</label>
                                <textarea
                                    name="valueContribution"
                                    required
                                    rows="4"
                                    placeholder="Tell us why we should pick you!"
                                    style={{ ...inputStyles, resize: "vertical" }}
                                    className="form-input"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#b5ff33" }}
                                whileTap={{ scale: 0.98 }}
                                disabled={status === "sending"}
                                style={{
                                    background: status === "success" ? "#22c55e" : "#a4ff01",
                                    color: "#000",
                                    padding: "1.25rem",
                                    borderRadius: "12px",
                                    border: "none",
                                    fontWeight: "800",
                                    fontSize: "1.1rem",
                                    cursor: status === "sending" ? "not-allowed" : "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.75rem",
                                    transition: "all 0.3s ease",
                                    marginTop: "1rem"
                                }}
                            >
                                {status === "success" ? (
                                    <>SUCCESSFULLY SUBMITTED <Check size={20} /></>
                                ) : status === "sending" ? (
                                    "SUBMITTING..."
                                ) : (
                                    <>JOIN THE CREW <Send size={20} /></>
                                )}
                            </motion.button>

                            {status === "error" && (
                                <p style={{ color: "#ef4444", textAlign: "center", fontSize: "0.9rem" }}>
                                    Oops! Something went wrong. Please try again or contact us directly.
                                </p>
                            )}
                        </form>
                    </motion.div>

                    <div style={{
                        textAlign: "center",
                        fontSize: "0.65rem",
                        color: "rgba(255, 255, 255, 0.2)",
                        marginTop: "2rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontWeight: "500"
                    }}>
                        In association with wbzard
                    </div>
                </motion.div>

                {/* Footer simple */}
                <footer style={{ marginTop: "6rem", textAlign: "center", opacity: 0.5, fontSize: "0.8rem", paddingBottom: "2rem" }}>
                    © 2026 .root Technical Club. All rights reserved.
                </footer>
            </div>

            <style>{`
                .form-input:focus, .form-select:focus {
                    border-color: #a4ff01 !important;
                    box-shadow: 0 0 0 1px #a4ff01 !important;
                }
                .why-link:hover {
                    color: #fff !important;
                    opacity: 0.8;
                    transform: scale(1.05);
                }
                .cta-icon:hover {
                    background: rgba(164, 255, 1, 0.1) !important;
                    border-color: #a4ff01 !important;
                    color: #a4ff01 !important;
                    transform: translateY(-2px);
                }
                .form-select option {
                    background: #0f1417;
                    color: #fff;
                }
                @media (max-width: 600px) {
                    .container { padding: 0 1rem; }
                }
            `}</style>
        </div>
    );
};

export default ClubRegistration;
