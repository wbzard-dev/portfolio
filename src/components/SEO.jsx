import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
    title       = "Wbzard Labs — Keeping Software Simple",
    description = "Wbzard Labs helps businesses simplify operations through custom software, business automation, and practical digital systems built around how your business actually works.",
    keywords    = "custom software development, business automation, workflow automation, software consulting, web application development, AI solutions, Wbzard Labs",
    image       = "https://wbzard.com/og-image.jpg",
    url         = "https://wbzard.com",
    type        = "website"
}) => {
    const siteName = "Wbzard Labs";
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description"  content={description} />
            <meta name="keywords"     content={keywords} />
            <link rel="canonical"     href={url} />

            <meta property="og:type"        content={type} />
            <meta property="og:url"         content={url} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image"       content={image} />
            <meta property="og:site_name"   content={siteName} />

            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:url"         content={url} />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image"       content={image} />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": type === "article" ? "BlogPosting" : "ProfessionalService",
                    "name": siteName,
                    "description": description,
                    "url": url,
                    "image": image,
                    ...(type !== "article" && {
                        "address": { "@type": "PostalAddress", "addressCountry": "IN" }
                    })
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
