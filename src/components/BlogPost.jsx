import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import SEO from "./SEO";
import { posts, getPost, formatDate, coverSrc } from "../data/posts";
import { site } from "../config/site";
import FormCTA from "./FormCTA";

// Internal links inside markdown should use client-side routing; external ones open in a new tab.
const MarkdownLink = ({ href = "", children }) =>
    href.startsWith("/")
        ? <Link to={href}>{children}</Link>
        : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;

const BlogPost = () => {
    const { id } = useParams();
    const post = getPost(id);

    if (!post) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "var(--bg)" }}>
            <SEO title="Post not found" noindex url={`/blog/${id}`} />
            <h1 style={{ fontSize: "1.5rem", color: "var(--text)" }}>Post not found</h1>
            <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
    );

    const isGeneratedCover = /^\/images\/(blog|og)\//.test(post.coverImage || "");   // text baked in — show whole, never crop
    // Same category first, preferring posts for the same city, then same-city posts from other categories.
    const sharesCity = p => p.locations.some(l => post.locations.includes(l));
    const others     = posts.filter(p => p.slug !== post.slug);
    const related    = [
        ...others.filter(p => p.category === post.category && sharesCity(p)),
        ...others.filter(p => p.category === post.category && !sharesCity(p)),
        ...others.filter(p => p.category !== post.category && sharesCity(p)),
    ].slice(0, 3);
    const wordCount   = post.content.split(/\s+/).filter(Boolean).length;
    const readMinutes = Math.max(1, Math.round(wordCount / 220));
    const places      = post.locations.map(l => ({ bangalore: "Bengaluru", shivamogga: "Shivamogga" }[l])).filter(Boolean);

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "var(--bg)", paddingBottom: "8rem" }}
        >
            <SEO
                title={post.seoTitle || post.title}
                description={post.metaDescription || post.excerpt}
                keywords={post.keywords}
                image={post.coverImage || site.ogImage}
                url={`/blog/${id}`}
                type="article"
                author={post.author}
                datePublished={post.date}
                dateModified={post.updated}
                abstract={post.takeaways?.join(" ")}
                imageAlt={post.title}
                section={post.category}
                tags={post.keywords}
                wordCount={wordCount}
                places={places}
                breadcrumbs={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${id}` }]}
            />

            {/* Cover image hero */}
            {/* Generated covers have the title baked in, so show them whole on a matching dark backdrop; photos fill the frame. */}
            <div style={{
                height: "clamp(300px, 55vh, 520px)",
                position: "relative",
                overflow: "hidden",
                background: "var(--bg-dark)",
                ...(isGeneratedCover ? { padding: "calc(64px + 1.5rem) var(--container-pad) 5.5rem", boxSizing: "border-box" } : {}),
            }}>
                <img
                    src={coverSrc(post)}
                    alt={post.title}
                    width="1200"
                    height="630"
                    fetchpriority="high"
                    style={{ width: "100%", height: "100%", objectFit: isGeneratedCover ? "contain" : "cover" }}
                />
                {!isGeneratedCover && (
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)" }} />
                )}
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
                            {formatDate(post.date, "long")}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                            <User size={12} />
                            {post.author}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                            <Clock size={12} />
                            {readMinutes} min read
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
                    {/* Quick answers up front — the part readers skim and AI assistants quote */}
                    {post.takeaways?.length > 0 && (
                        <aside aria-labelledby="key-takeaways" style={{ background: "#EEF3FF", border: "1px solid #D6E2FF", borderRadius: "var(--radius-lg)", padding: "clamp(1.25rem, 3vw, 1.75rem)", marginBottom: "2.5rem" }}>
                            <h2 id="key-takeaways" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.875rem" }}>
                                Key takeaways
                            </h2>
                            <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                                {post.takeaways.map((t, i) => (
                                    <li key={i} style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{t}</li>
                                ))}
                            </ul>
                        </aside>
                    )}
                    <div className="blog-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink }}>
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

                    {/* Conversion box — blog readers are often founders mid-decision */}
                    <div style={{ marginTop: "3rem", background: "var(--bg-dark)", color: "#fff", borderRadius: "var(--radius-lg)", padding: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.875rem" }}>
                            {site.name}
                        </p>
                        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.75rem)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                            Want this done for your business?
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "520px" }}>
                            We help founders in Bangalore and Shivamogga launch with a website, social media, SEO and ads that work together. Tell us about your business and get a free launch plan.
                        </p>
                        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                            <FormCTA location="blog-post" className="btn-primary-dark" />
                            <button className="btn-outline-dark" data-cal-link={site.calLink}>
                                Book a Free Call
                            </button>
                        </div>
                    </div>

                    {related.length > 0 && (
                        <div style={{ marginTop: "3rem" }}>
                            <p className="section-label">Keep reading</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {related.map(r => (
                                    <Link key={r.slug} to={`/blog/${r.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: 600, color: "var(--accent)" }}>
                                        {r.title} <ArrowRight size={14} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Raw HTML, not a text child: SSR escapes the quotes in text children, which breaks hydration */}
            <style dangerouslySetInnerHTML={{ __html: `
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
                .blog-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.65rem; font-size: 0.92rem; display: block; overflow-x: auto; }
                .blog-content th, .blog-content td { text-align: left; padding: 0.7rem 0.9rem; border-bottom: 1px solid var(--border); vertical-align: top; }
                .blog-content th { font-weight: 700; background: var(--bg-subtle); white-space: nowrap; }
            ` }} />
        </motion.article>
    );
};

export default BlogPost;
