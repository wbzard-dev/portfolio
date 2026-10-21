// Builds /llms.txt (index) and /llms-full.txt (full text) at build time — https://llmstxt.org
// Plain Markdown that AI assistants can read without running JavaScript. Generated from the same
// data as the pages, so it never drifts out of date.
import { site } from "../config/site";
import { about } from "../data/about";
import { serviceList, launchPackage } from "../data/services";
import { locationList } from "../data/locations";
import { posts } from "../data/posts";
import { homeFaqs } from "../data/faqs";
import { works } from "../data/work";
import { courseList } from "../data/courses";
import { shivamoggaServiceList } from "../data/shivamogga";

const url = (path) => `${site.url}${path === "/" ? "/" : path}`;
// Blog Markdown uses site-relative links; make them absolute for readers outside the site.
const absolutise = (md) => md.replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${url(p)})`);
const faqBlock = (faqs) => faqs.map(f => `**Q: ${f.q}**\n\nA: ${f.a}`).join("\n\n");

const header = () => [
    `# ${site.name}`,
    "",
    `> ${about.oneLiner} ${about.summary}`,
    "",
    ...about.facts.map(f => `- **${f.label}:** ${f.value}`),
    `- **Website:** ${site.url}`,
    site.whatsapp ? `- **WhatsApp:** https://wa.me/${site.whatsapp}` : null,
    `- **Get a free launch plan:** ${url(site.formPath)}`,
].filter(l => l !== null);

export function buildLlmsTxt() {
    return [
        ...header(),
        "",
        "## Services",
        "",
        ...serviceList.map(s => `- [${s.label}](${url(s.href)}): ${s.cardDesc}`),
        `- [${launchPackage.label}](${url(launchPackage.href)}): ${launchPackage.cardDesc}`,
        "",
        "## Locations",
        "",
        ...locationList.map(l => `- [${l.city} (${l.altName})](${url(l.href)}): ${l.seoDesc}`),
        ...shivamoggaServiceList.map(s => `- [${s.label} in Shivamogga](${url(s.href)}): ${s.seoDesc}`),
        "",
        "## Courses (live online)",
        "",
        ...courseList.map(c => `- [${c.short} Course — ₹${c.fee.toLocaleString("en-IN")}, ${c.duration}](${url(c.href)}): ${c.seoDesc}`),
        "",
        "## Guides",
        "",
        ...posts.map(p => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`),
        "",
        "## Company",
        "",
        `- [About ${site.name}](${url("/about")}): who we are, how we work, founder and areas served`,
        `- [Our work](${url("/work")}): case studies and results, e.g. ₹0 → ₹2L+ revenue in 3 weeks for a Shivamogga home-services business`,
        `- [Full site content for LLMs](${url("/llms-full.txt")}): every service, location, FAQ and guide in one file`,
        "",
        "## Optional",
        "",
        `- [Privacy Policy](${url("/privacy-policy")})`,
        `- [Terms of Service](${url("/terms")})`,
        "",
    ].join("\n");
}

export function buildLlmsFullTxt() {
    const sections = [
        header().join("\n"),

        `## How we work\n\n${about.principles.map(p => `- **${p.title}:** ${p.desc}`).join("\n")}`,

        `## Client work\n\nFull case studies: ${url("/work")}\n\n${works
            .map(w => `- **${w.title}** (${w.role}, ${w.sector})${w.href ? ` — ${w.href}` : ""}${w.instagram ? ` — ${w.instagram}` : ""}: ${w.desc}${w.results?.length ? ` Results: ${w.results.map(r => `${r.value} ${r.label}`).join("; ")}.` : ""}`).join("\n")}`,

        ...serviceList.map(s => [
            `## Service: ${s.label}`,
            `Page: ${url(s.href)}`,
            `${s.headline} ${s.subheadline}`,
            `### What's included\n\n${s.solutions.map(x => `- **${x.title}:** ${x.desc}`).join("\n")}`,
            `### ${s.processHeadline}\n\n${s.process.map(x => `${Number(x.number)}. **${x.title}:** ${x.desc}`).join("\n")}`,
            `### FAQ\n\n${faqBlock(s.faqs)}`,
        ].join("\n\n")),

        `## ${launchPackage.label}\n\nPage: ${url(launchPackage.href)}\n\n${launchPackage.cardDesc}`,

        ...locationList.map(l => [
            `## ${l.city} (${l.altName})`,
            `Page: ${url(l.href)}`,
            `${l.headline} ${l.subheadline}`,
            `### ${l.contextHeadline}\n\n${l.context.map(c => `- **${c.title}:** ${c.desc}`).join("\n")}`,
            `### ${l.whoHeadline}\n\n${l.who.map(w => `- ${w}`).join("\n")}`,
            `Areas served: ${l.areas.join(", ")}.`,
            `### FAQ\n\n${faqBlock(l.faqs)}`,
        ].join("\n\n")),

        ...shivamoggaServiceList.map(s => [
            `## ${s.label} in Shivamogga (Shimoga)`,
            `Page: ${url(s.href)}`,
            s.intro,
            `### ${s.whyTitle}\n\n${s.why.map(w => `- **${w.title}:** ${w.desc}`).join("\n")}`,
            `### ${s.includesTitle}\n\n${s.includes.map(i => `- ${i}`).join("\n")}`,
            `### ${s.costTitle}\n\n${s.cost}`,
            `### FAQ\n\n${faqBlock(s.faqs)}`,
        ].join("\n\n")),

        ...courseList.map(c => [
            `## Course: ${c.name}`,
            `Page: ${url(c.href)}`,
            `- **Fee:** ₹${c.fee.toLocaleString("en-IN")}\n- **Duration:** ${c.duration} (${c.workload})\n- **Format:** ${c.format}\n- **Projects:** ${c.projects}\n- **Level:** ${c.level}`,
            c.subheadline,
            `### Syllabus\n\n${c.curriculum.map((m, i) => `${i + 1}. **${m.title}:** ${m.topics.join("; ")}`).join("\n")}`,
            `### Outcomes\n\n${c.outcomes.map(o => `- ${o}`).join("\n")}`,
            `### FAQ\n\n${faqBlock(c.faqs)}`,
        ].join("\n\n")),

        `## Frequently asked questions\n\n${faqBlock(homeFaqs)}`,

        ...posts.map(p => [
            `## Guide: ${p.title}`,
            `URL: ${url(`/blog/${p.slug}`)} · Published ${p.date}${p.updated ? ` · Updated ${p.updated}` : ""} · By ${p.author}`,
            p.takeaways?.length ? `**Key takeaways**\n\n${p.takeaways.map(t => `- ${t}`).join("\n")}` : null,
            absolutise(p.content.trim()),
        ].filter(Boolean).join("\n\n")),
    ];
    return sections.join("\n\n---\n\n") + "\n";
}
