// Client work — shown on the homepage (Work section), /work, the About page and llms.txt.
// Images live in /public/images/work/<folder>/. `size` = [width, height] to avoid layout shift.
// Social media case studies and metrics from Anurag G's portfolio (https://anuragg.work).

const img = (folder, n, size) => ({ src: `/images/work/${folder}/${String(n).padStart(2, "0")}.jpg`, size });

export const stats = [
    { value: "₹0 → ₹2L+", label: "Revenue for QuickFix Services in 3 weeks" },
    { value: "7.2L+",     label: "Views generated across client accounts" },
    { value: "120+",      label: "Leads in 14 days for a new Shivamogga business" },
    { value: "150+",      label: "Registrations per event for .root Tech Club" },
];

export const works = [
    {
        id:        "quickfix",
        title:     "QuickFix Services",
        sector:    "Home services · Shivamogga",
        city:      "shivamogga",
        role:      "Launch, Social Media & Lead Generation",
        services:  ["Brand launch", "Social media", "Lead generation", "Ad creatives"],
        desc:      "Took a brand-new home-services business from zero to paying customers. Positioning, launch creatives, service promos and technician recruitment drives, all built to drive calls and WhatsApp enquiries.",
        results:   [{ value: "₹0 → ₹2L+", label: "Revenue in 3 weeks" }, { value: "120+", label: "Leads in 14 days" }],
        instagram: "https://www.instagram.com/quickfixservices.shivamogga/",
        cover:     img("quickfix", 1, [1600, 831]),
        gallery:   [img("quickfix", 1, [1600, 831]), img("quickfix", 2, [1254, 1254]), img("quickfix", 3, [1254, 1254]), img("quickfix", 4, [1254, 1254]),
                    img("quickfix", 5, [1254, 1254]), img("quickfix", 6, [1254, 1254]), img("quickfix", 7, [900, 1600]), img("quickfix", 8, [1536, 1024])],
    },
    {
        id:        "bionoids",
        title:     "Bionoids India",
        sector:    "Wellness & beverages · D2C",
        role:      "Social Media, Content & SEO",
        services:  ["Monthly content", "Ad creatives", "Carousels & stories", "On-page SEO"],
        desc:      "Monthly content for a functional-beverage brand: ad campaign creatives, educational carousels, stories, infographics and topical posts, planned and produced month after month, alongside on-page SEO, keyword research and content restructuring for the website.",
        results:   [{ value: "130+", label: "Creatives, Jul – Oct" }],
        href:      "https://bionoids.in",
        instagram: "https://www.instagram.com/bionoids_india/",
        cover:     img("bionoids", 1, [1086, 1448]),
        gallery:   [img("bionoids", 1, [1086, 1448]), img("bionoids", 2, [1254, 1254]), img("bionoids", 3, [1086, 1448]), img("bionoids", 4, [1254, 1254]),
                    img("bionoids", 5, [1254, 1254]), img("bionoids", 6, [1254, 1254]), img("bionoids", 7, [1086, 1448]), img("bionoids", 8, [1254, 1254])],
    },
    {
        id:        "root-tech-club",
        title:     ".root Tech Club",
        sector:    "Student tech community",
        role:      "Instagram & Event Marketing",
        services:  ["Event launches", "Recruitment drives", "Visual system", "Partnerships"],
        desc:      "The club's whole Instagram presence: event launches, recruitment drives, countdowns and announcements, all in one bold visual system that fills the room every time.",
        results:   [{ value: "150+", label: "Registrations per event" }],
        instagram: "https://www.instagram.com/club_.root/",
        cover:     img("root-tech-club", 1, [1024, 1536]),
        gallery:   [img("root-tech-club", 1, [1024, 1536]), img("root-tech-club", 2, [1024, 1536]), img("root-tech-club", 3, [1066, 1599]), img("root-tech-club", 4, [1024, 1536]),
                    img("root-tech-club", 5, [878, 1118]), img("root-tech-club", 6, [1054, 1492]), img("root-tech-club", 7, [1024, 1536]), img("root-tech-club", 8, [1024, 1536])],
    },
    {
        id:        "the-rugged",
        title:     "The Rugged India",
        sector:    "Menswear · E-commerce",
        role:      "Website, Reels & Creatives",
        services:  ["E-commerce website", "Reels", "Marketing creatives"],
        desc:      "Brand website designed around the product line and a clear path to purchase, plus reels and marketing creatives built for social growth and brand visibility.",
        results:   [{ value: "10+", label: "Reels produced" }],
        href:      "https://the-rugged.com/",
        instagram: "https://www.instagram.com/the_rugged_india/",
        cover:     { src: "/images/work/sites/the-rugged.jpg", size: [1280, 800] },
    },
    {
        id:        "kadamba-escultura",
        title:     "Kadamba Escultura",
        sector:    "Stone & wood carving",
        role:      "Website Development & SEO",
        services:  ["Website design", "Maintenance", "On-page SEO"],
        desc:      "Designed, built and maintained a responsive company website, then optimised titles, meta descriptions, URLs and image SEO for stronger navigation and search performance.",
        results:   [],
        href:      "https://kadambaescultura.com",
        cover:     { src: "/images/work/sites/kadamba-escultura.jpg", size: [1280, 800] },
    },
    {
        id:        "intignis-industries",
        title:     "Intignis Industries",
        sector:    "Industrial · B2B",
        role:      "SEO & Social Media Marketing",
        services:  ["Technical SEO", "On-page SEO", "Social media"],
        desc:      "On-page and technical SEO audits, metadata and image alt-tag optimisation, and ongoing social media planning, creative production and performance monitoring.",
        results:   [],
        href:      "https://www.intignisindustries.com",
        cover:     { src: "/images/work/sites/intignis-industries.jpg", size: [1280, 800] },
    },
    {
        id:        "intignis-healthcare",
        title:     "Intignis Healthcare",
        sector:    "Healthcare",
        role:      "SEO & Social Media Marketing",
        services:  ["On-page SEO", "Content", "Social media strategy"],
        desc:      "Comprehensive on-page SEO, keyword and content optimisation, and a social media strategy built to grow brand visibility across digital platforms.",
        results:   [],
    },
];

// Our own brand creatives (shown on /work, not as a client case study).
export const studioWork = {
    title:   "Wbzard Labs",
    desc:    "Brand identity and promotional creatives for our own studio: playful, illustrated and built to stop the scroll.",
    gallery: [img("wbzard", 1, [1024, 1024]), img("wbzard", 2, [1024, 1536]), img("wbzard", 3, [1024, 1536]),
              img("wbzard", 4, [1055, 1491]), img("wbzard", 5, [1066, 1600]), img("wbzard", 6, [1600, 914])],
};

export const team = [
    { name: "Vivek G",  role: "Founder · Websites, Apps & SEO", linkedin: "https://www.linkedin.com/in/byviveek/" },
    { name: "Anurag G", role: "Social Media & Digital Marketing", linkedin: "https://linkedin.com/in/anurag-g-a30876322", portfolio: "https://anuragg.work" },
];
