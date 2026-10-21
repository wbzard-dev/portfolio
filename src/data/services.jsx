import React from "react";
import {
    Globe, Smartphone, Instagram, Search, Megaphone, Rocket,
    LayoutDashboard, ShoppingCart, Calendar, Gauge, FileText, Layers,
    Users, Bell, CreditCard, Database, Palette, CalendarDays, Camera,
    MessageCircle, TrendingUp, Hash, MapPin, Link2, PenTool, BarChart3,
    Target, Filter, MousePointerClick, Repeat, LineChart, Settings,
} from "lucide-react";

// Slugs are part of public URLs — changing one needs a redirect in App.jsx + public/_redirects.
export const services = {
    "website-development": {
        label:       "Website Development",
        icon:        <Globe size={26} />,
        cardDesc:    "Fast, mobile-first websites that turn visitors into enquiries — built SEO-ready and wired for Meta & Google Ads tracking from day one.",
        headline:    "A website that brings you customers.",
        subheadline: "Your website is usually the first thing a customer, investor or ad click sees. We design and build startup websites that load fast, rank on Google, and make it easy to enquire, book or buy.",
        seoTitle:    "Website Development for Startups & New Businesses in Bangalore & Shivamogga",
        seoDesc:     "Startup website development in Bangalore and Shivamogga — fast, SEO-ready business websites, landing pages and e-commerce stores built to generate enquiries and work with Meta & Google Ads.",
        keywords:    "website development Bangalore, website development Shivamogga, website design for startups, business website Bangalore, landing page design, ecommerce website development Karnataka",

        problemHeadline: "Why most new-business websites don't bring enquiries.",
        problems: [
            "Built to look nice, not to answer “why should I choose you?”",
            "Slow on mobile — where most of your visitors actually are",
            "No Google Business Profile, schema or on-page SEO, so nobody finds it",
            "Ad clicks land on a homepage with no clear next step",
            "No conversion tracking, so you can't tell which rupee worked",
            "Every small text change needs a developer and a week",
        ],

        solutionsHeadline: "What we build.",
        solutions: [
            { icon: <Globe size={22} />,           title: "Startup & Business Websites", desc: "Credible, conversion-focused sites that explain what you do in five seconds." },
            { icon: <Target size={22} />,          title: "Ad Landing Pages",            desc: "Single-goal pages built for Meta and Google Ads, with tracking that feeds the ad algorithms." },
            { icon: <ShoppingCart size={22} />,    title: "E-commerce Stores",           desc: "Shopify, WooCommerce or custom stores with UPI and card payments, ready to sell." },
            { icon: <Calendar size={22} />,        title: "Booking Websites",            desc: "For clinics, studios, salons, coaches and services — customers book without calling." },
            { icon: <FileText size={22} />,        title: "Blogs & Content Hubs",        desc: "A CMS you can update yourself, structured for SEO from the first post." },
            { icon: <Gauge size={22} />,           title: "Speed & Core Web Vitals",     desc: "Lean builds that load fast on a 4G phone — better rankings and cheaper ad clicks." },
            { icon: <LayoutDashboard size={22} />, title: "Website Redesigns",           desc: "Already have a site that isn't working? We rebuild around enquiries, not looks." },
            { icon: <MessageCircle size={22} />,   title: "WhatsApp & Lead Capture",     desc: "Click-to-WhatsApp, enquiry forms and call buttons that route straight to you." },
        ],

        processHeadline: "Every website we launch includes.",
        process: [
            { number: "01", title: "On-page SEO",            desc: "Keyword-mapped titles, meta descriptions, headings, schema markup and a sitemap ready for Search Console." },
            { number: "02", title: "Mobile-first design",    desc: "Designed for the phone first, then scaled up to desktop." },
            { number: "03", title: "Ads-ready tracking",     desc: "GA4, Google Ads conversion tracking and Meta Pixel installed and tested before launch." },
            { number: "04", title: "Google Business Profile", desc: "Set up or cleaned up so you show up on Google Maps in your area." },
            { number: "05", title: "You own everything",     desc: "Domain, hosting, code and logins are in your name. No lock-in." },
            { number: "06", title: "Launch support",         desc: "Training so your team can update content, plus post-launch fixes." },
        ],

        faqs: [
            { q: "How much does a website cost for a startup in Bangalore or Shivamogga?", a: "It depends on the number of pages, features (bookings, payments, logins) and whether content is ready. A focused launch website costs far less than an e-commerce store or a custom web app. We give a fixed quote after a free 30-minute call, once we know what the site actually needs to do." },
            { q: "How long does it take to build a website?", a: "A focused startup website with ready content is typically live in two to four weeks. E-commerce and custom-feature builds take longer. We share a week-by-week timeline before we start." },
            { q: "Will my website be ready for Google Ads and Meta Ads?", a: "Yes. We install GA4, Google Ads conversion tracking and the Meta Pixel, and build dedicated landing pages, so your ad accounts can optimise for real enquiries rather than clicks." },
            { q: "Do I own the website after it's built?", a: "Yes. The domain, hosting account and source code are registered to you. We can maintain it, but you're never locked in." },
        ],
    },

    "app-development": {
        label:       "App & MVP Development",
        icon:        <Smartphone size={26} />,
        cardDesc:    "Mobile apps, web apps and MVPs that get your idea into users' hands quickly — scoped to what you need to launch, not everything you might need someday.",
        headline:    "Ship your MVP. Learn from real users.",
        subheadline: "Founders don't need a perfect app on day one — they need a working product that real customers can use. We scope, design and build MVPs, mobile apps and web apps that launch fast and grow with you.",
        seoTitle:    "App & MVP Development for Startups in Bangalore & Shivamogga",
        seoDesc:     "Mobile app, web app and MVP development for startups in Bangalore and Shivamogga. Scoped for launch, built to scale — Android, iOS and web, with analytics and admin dashboards.",
        keywords:    "MVP development Bangalore, app development for startups, mobile app development Bangalore, app development Shivamogga, web app development India, startup app developers",

        problemHeadline: "Where first-time founders lose time and money.",
        problems: [
            "Building every feature before a single customer has used the product",
            "Agency quotes that are hard to compare and harder to understand",
            "A freelancer disappears halfway through and the code is unusable",
            "No admin panel, so the team runs operations from WhatsApp and Excel",
            "No analytics, so nobody knows which features people actually use",
            "An app that works, but nobody downloads because there's no launch plan",
        ],

        solutionsHeadline: "What we build.",
        solutions: [
            { icon: <Rocket size={22} />,          title: "MVPs",                    desc: "The smallest version of your product that real users can pay for or sign up to." },
            { icon: <Smartphone size={22} />,      title: "Android & iOS Apps",      desc: "Cross-platform apps from a single codebase, published to the Play Store and App Store." },
            { icon: <Layers size={22} />,          title: "Web Apps & SaaS",         desc: "Browser-based products, dashboards and subscription platforms." },
            { icon: <LayoutDashboard size={22} />, title: "Admin Dashboards",        desc: "Manage orders, users, bookings and content without touching the code." },
            { icon: <CreditCard size={22} />,      title: "Payments",                desc: "UPI, cards and subscriptions via Razorpay, Stripe or Cashfree." },
            { icon: <Bell size={22} />,            title: "Notifications",           desc: "Push, SMS, email and WhatsApp notifications that bring users back." },
            { icon: <Database size={22} />,        title: "Backend & Integrations",  desc: "APIs, databases and integrations with the tools you already use." },
            { icon: <Settings size={22} />,        title: "Internal Tools",          desc: "Simple software that replaces spreadsheets for orders, inventory or staff." },
        ],

        processHeadline: "How we build your product.",
        process: [
            { number: "01", title: "Scope the MVP",   desc: "We work out the one job your product must do brilliantly at launch, and park the rest." },
            { number: "02", title: "Clickable design", desc: "You see and test the app flow before any code is written." },
            { number: "03", title: "Build in sprints", desc: "Working builds every week or two, so you see real progress." },
            { number: "04", title: "Test & launch",    desc: "Testing on real devices, store submissions and production setup." },
            { number: "05", title: "Launch marketing", desc: "Landing page, app-store listing, social and ads, so the launch actually brings users." },
            { number: "06", title: "Iterate",          desc: "Analytics show what users do, and we prioritise the next features from that." },
        ],

        faqs: [
            { q: "Should my startup build an app or a website first?", a: "For most new businesses, a fast website plus a simple web app validates demand faster and cheaper than a native app. A mobile app makes sense when users need it daily, offline, or with device features like camera or location. We'll tell you honestly which fits your idea." },
            { q: "How much does MVP development cost?", a: "Cost follows scope: the number of user types, screens, integrations and platforms. Because we cut the MVP down to what's needed for launch, it's usually a fraction of a 'full' app quote. You get a fixed, itemised quote after scoping." },
            { q: "Will I own the source code?", a: "Yes. The code repository, app-store accounts and cloud accounts belong to your company." },
        ],
    },

    "social-media-marketing": {
        label:       "Social Media Framework",
        icon:        <Instagram size={26} />,
        cardDesc:    "A repeatable organic growth system for Instagram, LinkedIn, YouTube and Facebook — content pillars, calendar, templates and a posting rhythm your team can keep.",
        headline:    "Organic growth, built as a system.",
        subheadline: "Posting randomly doesn't build a brand. We set up your social media foundation — profiles, content pillars, templates, a 90-day calendar and a measurement routine — so you grow organically and consistently, with or without us.",
        seoTitle:    "Social Media Marketing for Startups in Bangalore & Shivamogga — Organic Growth Framework",
        seoDesc:     "Social media marketing for new businesses in Bangalore and Shivamogga. We build your Instagram, LinkedIn and YouTube framework — content pillars, calendar, reels templates and analytics — for organic growth.",
        keywords:    "social media marketing Bangalore, social media agency Shivamogga, Instagram marketing for startups, social media management for small business, organic growth strategy, content calendar for startups",

        problemHeadline: "Why most new brands stall on social media.",
        problems: [
            "Posting whenever someone remembers, with no plan behind it",
            "Content that talks about the business, not to the customer",
            "Every post designed from scratch, so it takes hours",
            "Reels without hooks, captions without calls to action",
            "Chasing follower counts instead of enquiries and DMs",
            "No idea what's working, because nobody checks the insights",
        ],

        solutionsHeadline: "What your framework includes.",
        solutions: [
            { icon: <Users size={22} />,        title: "Audience & Positioning", desc: "Who you're talking to, what they care about, and why they should follow you." },
            { icon: <Hash size={22} />,         title: "Content Pillars",        desc: "Four or five themes that make content easy to plan and keep your brand consistent." },
            { icon: <CalendarDays size={22} />, title: "90-Day Content Calendar", desc: "What to post, when, and on which platform, mapped to launches and festivals." },
            { icon: <Palette size={22} />,      title: "Brand Templates",        desc: "Canva or Figma templates for posts, carousels, stories and reel covers." },
            { icon: <Camera size={22} />,       title: "Reels Playbook",         desc: "Hook formulas, shot lists and editing guidelines for short-form video." },
            { icon: <Instagram size={22} />,    title: "Profile Optimisation",   desc: "Bio, highlights, links and keywords set up across Instagram, LinkedIn, Facebook and YouTube." },
            { icon: <MessageCircle size={22} />, title: "DM & Community Flow",   desc: "Saved replies and a WhatsApp handoff so conversations turn into customers." },
            { icon: <BarChart3 size={22} />,    title: "Monthly Insights Review", desc: "A simple dashboard: what grew reach, what drove enquiries, and what to do next." },
        ],

        processHeadline: "How we set it up.",
        process: [
            { number: "01", title: "Audit & research", desc: "Your profiles, your competitors, and what your audience already engages with." },
            { number: "02", title: "Strategy",         desc: "Positioning, pillars, platform mix and a realistic posting rhythm." },
            { number: "03", title: "Create the kit",   desc: "Templates, reels playbook, caption formulas and hashtag/keyword sets." },
            { number: "04", title: "First 30 days",    desc: "We produce and publish alongside you, so the system is proven before handover." },
            { number: "05", title: "Hand over or manage", desc: "Your team runs it with our playbook, or we keep managing it for you." },
            { number: "06", title: "Review monthly",   desc: "Double down on what works, drop what doesn't." },
        ],

        faqs: [
            { q: "Do you manage our social media, or only build the framework?", a: "Both. Many founders start with the framework and the first 30 days of content, then either run it in-house or keep us on for ongoing management." },
            { q: "Which platforms should a new business focus on?", a: "Usually one or two to start. Instagram suits most consumer brands in Bangalore and Shivamogga, LinkedIn suits B2B and founder-led brands, and YouTube suits anything that needs explaining. We pick based on where your customers actually spend time." },
            { q: "How long does organic growth take?", a: "Expect the first three months to be about consistency and learning what resonates. Compounding reach usually follows a steady posting rhythm, which is why we build a system you can sustain." },
        ],
    },

    "seo-services": {
        label:       "SEO & Local SEO",
        icon:        <Search size={26} />,
        cardDesc:    "Get found on Google Search and Maps — keyword research, technical SEO, Google Business Profile and content that ranks in Bangalore, Shivamogga and beyond.",
        headline:    "Get found when customers search.",
        subheadline: "When someone in your area searches for what you sell, you should be on the first page and on the map. We handle technical SEO, local SEO and content, so search becomes a steady, free source of customers.",
        seoTitle:    "SEO Services in Bangalore & Shivamogga — Local SEO for Startups",
        seoDesc:     "SEO services for startups and small businesses in Bangalore and Shivamogga — keyword research, technical SEO, Google Business Profile optimisation, local SEO and content that ranks.",
        keywords:    "SEO services Bangalore, SEO company Shivamogga, local SEO Bangalore, SEO for startups, Google Business Profile optimisation, SEO agency Shimoga",

        problemHeadline: "Why you're not showing up on Google.",
        problems: [
            "No Google Business Profile, or one with wrong hours and no reviews",
            "Pages target nothing, so Google doesn't know what to rank them for",
            "Site not submitted to Search Console, with errors nobody has seen",
            "Thin service pages and no content answering customer questions",
            "Your name, address and phone don't match across directories",
            "Competitors in your area have simply done the basics first",
        ],

        solutionsHeadline: "What we do.",
        solutions: [
            { icon: <Search size={22} />,     title: "Keyword Research",         desc: "What your customers type, with search intent and difficulty, mapped to pages." },
            { icon: <Settings size={22} />,   title: "Technical SEO",            desc: "Speed, indexing, sitemaps, robots.txt, schema markup and Core Web Vitals." },
            { icon: <MapPin size={22} />,     title: "Google Business Profile",  desc: "Categories, services, photos, posts and a review routine for the map pack." },
            { icon: <FileText size={22} />,   title: "On-page Optimisation",     desc: "Titles, headings, internal links and copy that match search intent." },
            { icon: <PenTool size={22} />,    title: "SEO Content & Blogs",      desc: "Articles and location pages that answer real questions and rank." },
            { icon: <Link2 size={22} />,      title: "Local Citations & Links",  desc: "Consistent listings on Indian directories and relevant local links." },
            { icon: <Globe size={22} />,      title: "Bilingual Search",         desc: "Kannada + English keywords and both 'Shimoga' and 'Shivamogga' spellings." },
            { icon: <LineChart size={22} />,  title: "Monthly Reporting",        desc: "Rankings, traffic, calls and enquiries from search, in plain language." },
        ],

        processHeadline: "How SEO works with us.",
        process: [
            { number: "01", title: "Audit",            desc: "Technical audit, Search Console setup, and a look at who ranks today and why." },
            { number: "02", title: "Keyword map",      desc: "Every important keyword assigned to one page, so pages don't compete." },
            { number: "03", title: "Fix the basics",   desc: "Technical fixes, on-page optimisation and Google Business Profile in the first month." },
            { number: "04", title: "Content",          desc: "Service, location and blog content published on a steady schedule." },
            { number: "05", title: "Authority",        desc: "Citations, reviews and relevant links that build trust with Google." },
            { number: "06", title: "Measure",          desc: "Monthly reporting tied to enquiries, not just rankings." },
        ],

        faqs: [
            { q: "How long does SEO take to show results?", a: "Local SEO fixes like Google Business Profile can move within weeks. Ranking new pages for competitive Bangalore keywords typically takes three to six months of consistent work. In Shivamogga, competition is generally lighter, so results often come sooner." },
            { q: "Do you guarantee first-page rankings?", a: "No honest agency can guarantee rankings, because Google controls them. We commit to the work that drives rankings, and we report transparently on traffic, calls and enquiries." },
            { q: "Is SEO different for Shivamogga and Bangalore?", a: "Yes. Bangalore is highly competitive, so we focus on specific neighbourhoods and long-tail keywords. In Shivamogga, a well-optimised Google Business Profile and a few strong pages can win local searches, and we cover both the 'Shimoga' and 'Shivamogga' spellings." },
        ],
    },

    "digital-marketing": {
        label:       "Meta & Google Ads",
        icon:        <Megaphone size={26} />,
        cardDesc:    "Performance marketing on Meta (Instagram + Facebook) and Google Ads, with proper tracking, landing pages and weekly optimisation, so every rupee is accounted for.",
        headline:    "Ads that pay for themselves.",
        subheadline: "Running ads is easy. Running ads that bring profitable customers is a system: the right campaign structure, landing pages, conversion tracking and weekly optimisation. We set it up and run it for startups and new businesses.",
        seoTitle:    "Digital Marketing Agency for Startups — Meta & Google Ads in Bangalore & Shivamogga",
        seoDesc:     "Meta Ads and Google Ads management for startups and new businesses in Bangalore and Shivamogga. Conversion tracking, landing pages, lead generation campaigns and transparent reporting.",
        keywords:    "digital marketing agency Bangalore, digital marketing agency Shivamogga, Google Ads agency Bangalore, Meta ads agency, Facebook ads for small business, Instagram ads Bangalore, performance marketing for startups, lead generation Bangalore",

        problemHeadline: "Why most small-business ad spend is wasted.",
        problems: [
            "Boosting posts and calling it advertising",
            "No conversion tracking, so the algorithm optimises for clicks, not customers",
            "Ads sending people to a homepage instead of a focused landing page",
            "Broad keywords soaking up budget on irrelevant searches",
            "The same creative running for months until it stops working",
            "No one following up on leads quickly enough",
        ],

        solutionsHeadline: "What we run.",
        solutions: [
            { icon: <Instagram size={22} />,         title: "Meta Ads",                desc: "Instagram and Facebook campaigns for leads, WhatsApp chats, sales and app installs." },
            { icon: <Search size={22} />,            title: "Google Search Ads",       desc: "Show up when people search for what you sell, in the areas you serve." },
            { icon: <MapPin size={22} />,            title: "Local & Performance Max", desc: "Google Maps, YouTube and Display reach for local businesses and e-commerce." },
            { icon: <MousePointerClick size={22} />, title: "Landing Pages",           desc: "Dedicated pages per campaign that match the ad and convert the click." },
            { icon: <Target size={22} />,            title: "Conversion Tracking",     desc: "GA4, Google Ads conversions, Meta Pixel and Conversions API set up properly." },
            { icon: <Filter size={22} />,            title: "Lead Funnels",            desc: "Lead forms, WhatsApp flows and CRM handoff, so no enquiry falls through." },
            { icon: <Repeat size={22} />,            title: "Retargeting",             desc: "Bring back visitors who showed interest but didn't enquire." },
            { icon: <TrendingUp size={22} />,        title: "Weekly Optimisation",     desc: "Bids, budgets, keywords, audiences and creatives refreshed every week." },
        ],

        processHeadline: "How we run your campaigns.",
        process: [
            { number: "01", title: "Tracking first", desc: "No campaign goes live until every conversion is tracked and tested." },
            { number: "02", title: "Offer & landing page", desc: "A clear offer and a page built for that specific campaign." },
            { number: "03", title: "Test small",     desc: "Start with a controlled budget to find the audiences and keywords that convert." },
            { number: "04", title: "Creative testing", desc: "Several hooks, formats and angles, and we keep only the winners." },
            { number: "05", title: "Scale what works", desc: "Budget moves to the campaigns with the best cost per lead or sale." },
            { number: "06", title: "Plain reporting", desc: "Spend, leads, cost per lead and what we're changing next, every week." },
        ],

        faqs: [
            { q: "What is a good starting ad budget for a new business?", a: "Enough to collect real data — often a few hundred rupees a day per campaign for a local business, more for competitive Bangalore categories like real estate, healthcare or education. We'll recommend a test budget based on your category and goals before you spend anything." },
            { q: "Should I run Meta Ads or Google Ads first?", a: "Google Ads captures people already searching for what you sell, so it suits services with clear demand. Meta Ads creates demand and works well for visual products, new categories and local awareness. Many startups begin with one, then add the other once tracking proves what converts." },
            { q: "Do you charge a percentage of ad spend?", a: "We quote a clear monthly management fee based on scope. Your ad spend is paid directly to Meta and Google from your own ad accounts, which you own." },
        ],
    },
};

export const serviceList = Object.entries(services).map(([slug, s]) => ({ slug, ...s, href: `/services/${slug}` }));

// Old URLs from the previous positioning — redirected so existing links and rankings aren't lost.
export const legacyServiceRedirects = {
    "custom-software-development": "app-development",
    "business-automation":         "app-development",
    "ai-solutions":                "app-development",
};

export const launchPackage = {
    icon:     <Rocket size={26} />,
    label:    "Startup Launch Package",
    cardDesc: "Everything a new business needs to go live in one plan: website, Google Business Profile, social media framework, SEO foundations and your first ad campaigns.",
    href:     "/startup-launch-package",
};
