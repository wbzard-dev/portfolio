import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import SEO from "./SEO";

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Dynamically import all yaml files from the data directory
        const loadPosts = async () => {
            const modules = import.meta.glob("../../data/*.yaml");
            const postData = await Promise.all(
                Object.entries(modules).map(async ([path, moduleAction]) => {
                    const data = await moduleAction();
                    const post = data.default || data;
                    // Use filename (without extension) as the ID for routing
                    const slug = path.split("/").pop().replace(".yaml", "");
                    return { ...post, customId: slug };
                })
            );

            // Sort by date descending
            const sortedPosts = postData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPosts(sortedPosts);
        };

        loadPosts();
    }, []);

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section style={{ padding: "clamp(8rem, 15vw, 12rem) 1.5rem 6rem", minHeight: "100vh" }}>
            <SEO
                title="Journal & Perspectives"
                description="Explore our latest thoughts, artifacts, and engineering insights on digital architecture and marketing."
                url="https://wbzard-dev.github.io/portfolio/blog"
            />
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: "clamp(4rem, 10vw, 6rem)" }}
                >
                    <span style={{ color: "var(--color-text-muted)", letterSpacing: "0.4em", fontSize: "0.75rem", fontWeight: 800, display: "block", marginBottom: "1rem" }}>JOURNAL & PERSPECTIVES</span>
                    <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 0.9 }}>THE <span style={{ color: "transparent", WebkitTextStroke: "1px var(--color-text)" }}>ARTIFACTS.</span></h1>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 100%, 400px), 1fr))",
                        gap: "2.5rem"
                    }}
                >
                    {posts.map((post) => (
                        <motion.article
                            key={post.customId}
                            variants={itemVariants}
                            className="glass"
                            style={{
                                borderRadius: "24px",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                            }}
                            whileHover={{ y: -10 }}
                        >
                            <Link to={`/blog/${post.customId}`} style={{ display: "block", position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                                    className="blog-card-img"
                                />
                                <div style={{
                                    position: "absolute",
                                    top: "1.5rem",
                                    left: "1.5rem",
                                    padding: "0.4rem 1rem",
                                    background: "rgba(0,0,0,0.5)",
                                    backdropFilter: "blur(6px)",
                                    borderRadius: "100px",
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.1em",
                                    border: "1px solid rgba(255,255,255,0.1)"
                                }}>
                                    {post.category?.toUpperCase() || "UNCLASSIFIED"}
                                </div>
                            </Link>

                            <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", fontSize: "0.65rem", color: "var(--color-text-muted)", fontWeight: 600 }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <FaCalendarAlt /> {new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <FaUser /> {post.author}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: "1.5rem", lineHeight: 1.2, marginBottom: "1rem" }}>
                                    <Link to={`/blog/${post.customId}`}>{post.title}</Link>
                                </h3>

                                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem", flex: 1 }}>
                                    {post.excerpt}
                                </p>

                                <Link
                                    to={`/blog/${post.customId}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        fontSize: "0.75rem",
                                        fontWeight: 800,
                                        letterSpacing: "0.1em",
                                        color: "var(--color-text)",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    READ ARTIFACT <FaArrowRight style={{ fontSize: "0.7rem" }} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
            <style>{`
                .blog-card-img:hover { transform: scale(1.05); }
                article:hover .blog-card-img { transform: scale(1.05); }
            `}</style>
        </section>
    );
};

export default Blog;
