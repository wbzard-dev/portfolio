import React from "react";
import { Link } from "react-router-dom";
import SEO from "./SEO";

const NotFound = () => (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", background: "var(--bg)", padding: "8rem 1.5rem 4rem", textAlign: "center" }}>
        <SEO title="Page not found" description="This page doesn't exist." url="/404" noindex />
        <p className="section-label">404</p>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1 }}>Page not found.</h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "420px", lineHeight: 1.7 }}>
            The page you're looking for has moved or never existed. Try the homepage or our founder guides.
        </p>
        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/" className="btn-primary">Go to homepage</Link>
            <Link to="/blog" className="btn-secondary">Read the blog</Link>
        </div>
    </div>
);

export default NotFound;
