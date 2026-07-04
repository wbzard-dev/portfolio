import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
    title          = "Wbzard Labs — Keeping Software Simple",
    description    = "Wbzard Labs helps businesses simplify operations through custom software, business automation, and practical digital systems built around how your business actually works.",
    keywords       = "custom software development, business automation, workflow automation, software consulting, web application development, AI solutions, Wbzard Labs",
    image          = "https://wbzard.com/images/final-logo.png",
    url            = "https://wbzard.com",
    type           = "website",
    author         = "Vivek",
    datePublished  = null,
}) => {
    const siteName = "Wbzard Labs";
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    const isArticle = type === "article";

    const jsonLd = isArticle
        ? {
            "@context":         "https://schema.org",
            "@type":            "BlogPosting",
            "headline":         fullTitle,
            "description":      description,
            "url":              url,
            "image":            image,
            "datePublished":    datePublished,
            "author": {
                "@type": "Person",
                "name":  author,
            },
            "publisher": {
                "@type": "Organization",
                "name":  siteName,
                "logo": {
                    "@type": "ImageObject",
                    "url":   "https://wbzard.com/images/final-logo.png",
                },
            },
        }
        : {
            "@context":    "https://schema.org",
            "@type":       "ProfessionalService",
            "name":        siteName,
            "description": description,
            "url":         url,
            "image":       image,
            "email":       "vivekg.work@gmail.com",
            "areaServed":  "Worldwide",
            "serviceType": [
                "Custom Software Development",
                "Business Process Automation",
                "Website Development",
                "AI Solutions",
            ],
            "founder": {
                "@type": "Person",
                "name":  "Vivek",
            },
            "sameAs": [
                "https://www.instagram.com/wbzard/",
            ],
            "address": {
                "@type":          "PostalAddress",
                "addressCountry": "IN",
            },
        };

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description"  content={description} />
            <meta name="keywords"     content={keywords} />
            <link rel="canonical"     href={url} />

            <meta property="og:type"        content={isArticle ? "article" : "website"} />
            <meta property="og:url"         content={url} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image"       content={image} />
            <meta property="og:site_name"   content={siteName} />
            {isArticle && datePublished && (
                <meta property="article:published_time" content={datePublished} />
            )}

            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:url"         content={url} />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image"       content={image} />

            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
