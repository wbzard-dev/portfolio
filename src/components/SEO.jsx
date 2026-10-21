import React from "react";
import { Helmet } from "react-helmet-async";
import { site } from "../config/site";

const absolute = (pathOrUrl) =>
    !pathOrUrl ? `${site.url}/` : pathOrUrl.startsWith("http") ? pathOrUrl : `${site.url}${pathOrUrl}`;

const organizationSchema = {
    "@context":    "https://schema.org",
    "@type":       "ProfessionalService",
    "@id":         `${site.url}/#organization`,
    "name":        site.name,
    "description": site.description,
    "url":         site.url,
    "logo":        site.logo,
    "image":       site.ogImage,
    "email":       site.email,
    ...(site.phone ? { "telephone": site.phone } : {}),
    "priceRange":  "₹₹",
    "founder":     { "@type": "Person", "name": site.founder, ...(site.social.linkedin ? { "sameAs": [site.social.linkedin] } : {}) },
    "address": {
        "@type":           "PostalAddress",
        "addressRegion":   "Karnataka",
        "addressCountry":  "IN",
    },
    "areaServed": [
        { "@type": "City", "name": "Bengaluru", "alternateName": "Bangalore" },
        { "@type": "City", "name": "Shivamogga", "alternateName": "Shimoga" },
        { "@type": "State", "name": "Karnataka" },
    ],
    "knowsAbout": [
        "Website development", "Mobile app development", "MVP development",
        "Search engine optimisation", "Local SEO", "Social media marketing",
        "Meta Ads", "Google Ads", "Performance marketing",
    ],
    // Company profiles only; the LinkedIn link is the founder's personal profile (attached to "founder" above).
    "sameAs": [site.social.instagram].filter(Boolean),
};

const SEO = ({
    title          = "Website, SEO & Digital Marketing for Startups in Bangalore & Shivamogga",
    description    = site.description,
    keywords       = "startup website development Bangalore, digital marketing agency Shivamogga, website development Shivamogga, SEO services Bangalore, social media marketing for startups, Meta ads agency Bangalore, Google ads agency Bangalore, app development for startups",
    image          = site.ogImage,
    url            = "/",
    type           = "website",
    author         = site.founder,
    datePublished  = null,
    dateModified   = null,
    breadcrumbs    = null,     // [{ name, path }]
    jsonLd         = [],       // extra schema.org objects (FAQPage, Service, …)
    noindex        = false,
    abstract       = null,     // article summary (key takeaways)
}) => {
    const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
    const canonical = absolute(url);
    const imageUrl  = absolute(image);
    const isArticle = type === "article";

    const schemas = [organizationSchema];

    if (isArticle) {
        schemas.push({
            "@context":         "https://schema.org",
            "@type":            "BlogPosting",
            "headline":         title,
            "description":      description,
            "url":              canonical,
            "mainEntityOfPage": canonical,
            "image":            imageUrl,
            "datePublished":    datePublished,
            "dateModified":     dateModified || datePublished,
            "author":           author === site.founder
                ? { "@type": "Person", "@id": `${site.url}/about#founder`, "name": author, "url": `${site.url}/about` }
                : { "@type": "Person", "name": author },
            "publisher":        { "@id": `${site.url}/#organization` },
            "inLanguage":       "en-IN",
            ...(abstract ? { "abstract": abstract } : {}),
        });
    }

    if (breadcrumbs?.length) {
        schemas.push({
            "@context": "https://schema.org",
            "@type":    "BreadcrumbList",
            "itemListElement": [{ name: "Home", path: "/" }, ...breadcrumbs].map((b, i) => ({
                "@type":    "ListItem",
                "position": i + 1,
                "name":     b.name,
                "item":     absolute(b.path),
            })),
        });
    }

    schemas.push(...jsonLd);

    return (
        <Helmet>
            <html lang="en-IN" />
            <title>{fullTitle}</title>
            <meta name="description"  content={description} />
            <meta name="keywords"     content={keywords} />
            <meta name="robots"       content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
            <link rel="canonical"     href={canonical} />

            <meta property="og:type"        content={isArticle ? "article" : "website"} />
            <meta property="og:url"         content={canonical} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image"       content={imageUrl} />
            <meta property="og:image:width"  content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name"   content={site.name} />
            <meta property="og:locale"      content="en_IN" />
            {isArticle && datePublished && <meta property="article:published_time" content={datePublished} />}

            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image"       content={imageUrl} />

            <meta name="geo.region"    content="IN-KA" />
            <meta name="geo.placename" content="Bengaluru; Shivamogga" />

            {site.verification.google && <meta name="google-site-verification" content={site.verification.google} />}
            {site.verification.meta   && <meta name="facebook-domain-verification" content={site.verification.meta} />}

            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
            ))}
        </Helmet>
    );
};

export default SEO;
