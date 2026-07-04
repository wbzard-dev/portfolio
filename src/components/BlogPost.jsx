import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import SEO from "./SEO";

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            const modules = import.meta.glob("../../data/*.yaml");
            const entry = Object.entries(modules).find(([path]) =>
                path.split("/").pop() === `${id}.yaml`
            );
            if (entry) {
                const data = await entry[1]();
                setPost(data.default || data);
            }
            setLoading(false);
        };
        loadPost();
    }, [id]);

    if (loading) return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                style={{ width: "32px", height: "32px", border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%" }}
            />
        </div>
    );

    if (!post) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "var(--bg)" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--text)" }}>Post not found</h2>
            <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
    );

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "var(--bg)", paddingBottom: "8rem" }}
        >
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.coverImage || "https://wbzard.com/images/final-logo.png"}
                url={`https://wbzard.com/blog/${id}`}
                type="article"
                author={post.author}
                datePublished={post.date}
            />

            {/* Cover image hero */}
            <div style={{ height: "clamp(300px, 55vh, 520px)", position: "relative", overflow: "hidden" }}>
                <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)" }} />
            </div>

            {/* Post header — overlaps image bottom */}
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "clamp(1.75rem, 4vw, 2.75rem)",
                        marginTop: "-5rem",
                        position: "relative",
                        zIndex: 10,
                        maxWidth: "820px",
                    }}
                >
                    {/* Back link */}
                    <Link
                        to="/blog"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "1.25rem", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                    >
                        <ArrowLeft size={14} /> Back to Blog
                    </Link>

                    {/* Category + meta */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                        {post.category && (
                            <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.85rem", background: "#EEF3FF", color: "var(--accent)", borderRadius: "100px" }}>
                                {post.category}
                            </span>
                        )}
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                            <Calendar size={12} />
                            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                            <User size={12} />
                            {post.author}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.75rem)", lineHeight: 1.15, color: "var(--text)" }}>
                        {post.title}
                    </h1>
                </motion.div>

                {/* Article body */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.25 }}
                    style={{ maxWidth: "820px", marginTop: "3rem" }}
                >
                    <div className="blog-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <div style={{
                        marginTop: "4rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Filed under</span>
                            {post.category && (
                                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                    {post.category}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                        >
                            <Share2 size={14} /> Share
                        </button>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .blog-content { font-family: 'Satoshi', sans-serif; font-size: 1.05rem; line-height: 1.8; color: var(--text); }
                .blog-content h1 { font-family: 'Anton', Arial, sans-serif; font-size: clamp(1.8rem, 4vw, 2.75rem); margin: 3.5rem 0 1.25rem; line-height: 1.05; letter-spacing: -0.01em; color: var(--text); }
                .blog-content h2 { font-family: 'Satoshi', sans-serif; font-weight: 700; font-size: clamp(1.3rem, 3vw, 1.75rem); margin: 3rem 0 1rem; line-height: 1.2; letter-spacing: -0.02em; color: var(--text); }
                .blog-content h3 { font-family: 'Satoshi', sans-serif; font-weight: 600; font-size: clamp(1.1rem, 2.5vw, 1.35rem); margin: 2.25rem 0 0.875rem; line-height: 1.3; color: var(--text); }
                .blog-content p  { margin-bottom: 1.65rem; }
                .blog-content ul, .blog-content ol { margin-bottom: 1.65rem; padding-left: 1.5rem; }
                .blog-content li { margin-bottom: 0.6rem; }
                .blog-content blockquote { border-left: 3px solid var(--accent); padding: 0.875rem 0 0.875rem 1.5rem; margin: 2.5rem 0; font-size: 1.15rem; color: var(--text); background: #EEF3FF; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
                .blog-content strong { color: var(--text); font-weight: 700; }
                .blog-content code { font-family: monospace; background: var(--bg-subtle); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.88em; color: var(--text); border: 1px solid var(--border); }
                .blog-content pre { background: var(--bg-dark); padding: 1.5rem; border-radius: var(--radius-md); overflow-x: auto; margin-bottom: 1.65rem; }
                .blog-content pre code { background: none; border: none; color: rgba(255,255,255,0.85); font-size: 0.9rem; }
                .blog-content a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
                .blog-content img { width: 100%; border-radius: var(--radius-md); margin: 1.5rem 0; }
            `}</style>
        </motion.article>
    );
};

export default BlogPost;
