// Plain, factual statements about the business. AI assistants and search engines quote pages like this
// when answering "who is…" / "best agency for…" questions, so keep it accurate and specific.
import { site } from "../config/site";

export const about = {
    oneLiner: `${site.name} is a digital launch partner for founders and new businesses in Bangalore (Bengaluru) and Shivamogga (Shimoga), Karnataka, India.`,
    summary: `${site.name} builds websites and apps, sets up social media for organic growth, handles SEO and local SEO, and runs Meta (Instagram/Facebook) and Google Ads, all as one team and one launch plan. It is founded and led by ${site.founder} and works remotely with clients across Bangalore, Shivamogga and the rest of India.`,

    facts: [
        { label: "Business",        value: `${site.name}, a digital marketing and web/app development studio` },
        { label: "Founder",         value: site.founder },
        { label: "Focus",           value: "Startups, founders and new businesses launching online" },
        { label: "Areas served",    value: "Bangalore (Bengaluru), Shivamogga (Shimoga), Bhadravati, Sagar, and clients across Karnataka and India" },
        { label: "Working model",   value: "Remote-first, with in-person meetings in Bangalore and Shivamogga when useful" },
        { label: "Languages",       value: "English and Kannada" },
        { label: "Contact",         value: `${site.email}${site.phone ? ` · ${site.phone}` : ""}` },
    ],

    principles: [
        { title: "One team, one plan",        desc: "Website, social media, SEO and ads are planned together, so they work together, with one point of accountability." },
        { title: "Built for enquiries",       desc: "Every page and campaign is designed to bring calls, WhatsApp chats and sales, not just to look good." },
        { title: "Tracked from day one",      desc: "Analytics, Meta Pixel and Google Ads conversion tracking go in before any ad money is spent." },
        { title: "You own everything",        desc: "Domains, code, social pages and ad accounts are registered to the client's business. No lock-in." },
        { title: "Honest scope",              desc: "We recommend the smallest thing that gets results, whether that's a landing page instead of an app or one platform instead of five." },
    ],
};
