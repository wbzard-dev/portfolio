import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import SEO from "./SEO";
import { posts, formatDate, coverSrc } from "../data/posts";

const Blog = () => {
    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <SEO
                title="Blog — Startup Marketing, SEO & Website Guides for Bangalore & Shivamogga"
                description="Practical guides for founders and new businesses in Bangalore and Shivamogga: website costs, local SEO, social media growth, Meta and Google Ads, and launch checklists."
                url="/blog"
                breadcrumbs={[{ name: "Blog", path: "/blog" }]}
            />

            {/* Page header */}
            <div style={{ paddingTop: "clamp(7rem, 15vw, 9rem)", paddingBottom: "clamp(3rem, 6vw, 4rem)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="section-label">Blog</p>
                        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.0, maxWidth: "14ch" }}>
                            Grow your business online.
                        </h1>
                        <p style={{ marginTop: "1.25rem", fontSize: "1rem", color: "var(--text-muted)", maxWidth: "480px", lineHeight: 1.7 }}>
                            Practical, no-jargon guides for founders and new businesses in Bangalore and Shivamogga, covering websites, SEO, social media and ads.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Posts grid */}
            <div className="container" style={{ padding: "clamp(3rem, 6vw, 5rem) var(--container-pad)" }}>
                {posts.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>No posts yet — check back soon.</p>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                        gap: "1.5rem",
                    }}>
                        {posts.map((post, i) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="card"
                                style={{
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                                }}
                                whileHover={{ y: -4 }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.07)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                            >
                                {/* Cover image */}
                                <Link
                                    to={`/blog/${post.slug}`}
                                    style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden" }}
                                >
                                    <img
                                        src={coverSrc(post)}
                                        alt={post.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                                        className="blog-cover-img"
                                        loading="lazy"
                                        width="1200"
                                        height="630"
                                    />
                                    {post.category && (
                                        <span style={{
                                            position: "absolute",
                                            top: "1rem",
                                            left: "1rem",
                                            fontFamily: "'Satoshi', sans-serif",
                                            fontSize: "0.65rem",
                                            fontWeight: 600,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            padding: "0.3rem 0.75rem",
                                            background: "rgba(255,255,255,0.92)",
                                            color: "var(--text)",
                                            borderRadius: "100px",
                                            backdropFilter: "blur(6px)",
                                        }}>
                                            {post.category}
                                        </span>
                                    )}
                                </Link>

                                {/* Content */}
                                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {/* Meta */}
                                    <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                            <Calendar size={11} />
                                            {formatDate(post.date)}
                                        </span>
                                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                                            <User size={11} />
                                            {post.author}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{ fontSize: "1.05rem", lineHeight: 1.35 }}>
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            style={{ color: "var(--text)", transition: "color 0.2s" }}
                                            onMouseEnter={e => e.target.style.color = "var(--accent)"}
                                            onMouseLeave={e => e.target.style.color = "var(--text)"}
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>

                                    {/* Excerpt */}
                                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>
                                        {post.excerpt}
                                    </p>

                                    {/* Read link */}
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.35rem",
                                            fontSize: "0.8rem",
                                            fontWeight: 600,
                                            color: "var(--accent)",
                                            marginTop: "0.25rem",
                                            transition: "gap 0.2s",
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.gap = "0.6rem"}
                                        onMouseLeave={e => e.currentTarget.style.gap = "0.35rem"}
                                    >
                                        Read article <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .blog-cover-img { transition: transform 0.5s ease; }
                article:hover .blog-cover-img { transform: scale(1.04); }
            `}</style>
        </div>
    );
};

export default Blog;
