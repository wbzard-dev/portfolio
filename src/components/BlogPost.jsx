import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaShareAlt } from "react-icons/fa";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            const modules = import.meta.glob("../../data/*.yaml");
            const entry = Object.entries(modules).find(([path]) => {
                const fileName = path.split("/").pop();
                return fileName === `${id}.yaml`;
            });

            if (entry) {
                const data = await entry[1]();
                setPost(data.default || data);
            }
            setLoading(false);
        };

        loadPost();
    }, [id]);

    if (loading) return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: "40px", height: "40px", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#fff", borderRadius: "50%" }}
            />
        </div>
    );

    if (!post) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
            <h2 style={{ fontSize: "2rem" }}>ARTIFACT NOT FOUND</h2>
            <Link to="/blog" className="glass" style={{ padding: "1rem 2rem", borderRadius: "100px" }}>BACK TO JOURNAL</Link>
        </div>
    );

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingBottom: "10rem" }}
        >
            {/* --- POST HERO --- */}
            <div style={{ height: "70vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", paddingBottom: "clamp(3rem, 10vw, 6rem)" }}>
                <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,1) 100%)" }} />
                </div>

                <div className="container" style={{ position: "relative", zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <Link
                            to="/blog"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                opacity: 0.6,
                                marginBottom: "2rem"
                            }}
                        >
                            <FaArrowLeft /> BACK TO JOURNAL
                        </Link>

                        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", opacity: 0.5 }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FaCalendarAlt /> {new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FaUser /> {post.author.toUpperCase()}</span>
                        </div>

                        <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", maxWidth: "1000px", lineHeight: 1, marginBottom: "0" }}>
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* --- CONTENT --- */}
            <div className="container" style={{ marginTop: "clamp(4rem, 10vw, 8rem)" }}>
                <div style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.85)"
                }} className="blog-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* --- FOOTER --- */}
                <div style={{
                    maxWidth: "800px",
                    margin: "5rem auto 0",
                    paddingTop: "3rem",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 800, opacity: 0.4 }}>FILED UNDER:</span>
                        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--color-primary)" }}>{post.category?.toUpperCase()}</span>
                    </div>
                    <button style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.6 }}>
                        <FaShareAlt /> SHARE
                    </button>
                </div>
            </div>

            <style>{`
                .blog-content h1 { font-size: 2.5rem; margin: 4rem 0 2rem; }
                .blog-content h2 { font-size: 2rem; margin: 3.5rem 0 1.5rem; }
                .blog-content h3 { font-size: 1.5rem; margin: 2.5rem 0 1rem; }
                .blog-content p { margin-bottom: 2rem; }
                .blog-content ul { margin-bottom: 2rem; padding-left: 1.5rem; }
                .blog-content li { margin-bottom: 0.75rem; }
                .blog-content blockquote { border-left: 4px solid var(--color-primary); padding-left: 2rem; margin: 4rem 0; font-style: italic; opacity: 0.8; }
                .blog-content strong { color: #fff; font-weight: 700; }
                .blog-content code { background: rgba(255,255,255,0.05); padding: 0.2rem 0.4rem; borderRadius: 4px; font-size: 0.9em; }
            `}</style>
        </motion.article>
    );
};

export default BlogPost;
