import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
    title = "Wbzard | Engineering Digital Legacies",
    description = "Boutique digital architecture firm building high-performance systems for brands that demand absolute excellence.",
    keywords = "digital architecture, software engineering, branding, web development, portfolio",
    image = "https://wbzard.com/og-image.jpg", // Default OG image path
    url = "https://wbzard.com",
    type = "website"
}) => {
    const siteName = "Wbzard";
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": type === "article" ? "BlogPosting" : "ProfessionalService",
                    "name": siteName,
                    "description": description,
                    "url": url,
                    "image": image,
                    ...(type === "article" ? {} : {
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "IN"
                        }
                    })
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
