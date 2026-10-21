// Server entry used only at build time (scripts/build.mjs) to prerender marketing routes to static HTML.
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Writable } from "node:stream";
import App from "./App";
import { serviceList } from "./data/services";
import { locationList } from "./data/locations";
import { posts } from "./data/posts";
import { courseList } from "./data/courses";
import { shivamoggaServiceList } from "./data/shivamogga";
export { buildLlmsTxt, buildLlmsFullTxt } from "./lib/llms";

// Bump when the static pages' content changes meaningfully — feeds <lastmod> in the sitemap.
const PAGES_UPDATED = "2026-10-21";

export const routes = [
    { path: "/",                        priority: "1.0", changefreq: "weekly",  lastmod: PAGES_UPDATED },
    { path: "/startup-launch-package",  priority: "0.9", changefreq: "monthly", lastmod: PAGES_UPDATED },
    { path: "/about",                   priority: "0.7", changefreq: "monthly", lastmod: PAGES_UPDATED },
    { path: "/work",                    priority: "0.8", changefreq: "monthly", lastmod: PAGES_UPDATED },
    ...serviceList.map(s  => ({ path: s.href, priority: "0.9", changefreq: "monthly", lastmod: PAGES_UPDATED })),
    ...locationList.map(l => ({ path: l.href, priority: "0.9", changefreq: "monthly", lastmod: PAGES_UPDATED })),
    ...shivamoggaServiceList.map(s => ({ path: s.href, priority: "0.9", changefreq: "monthly", lastmod: PAGES_UPDATED })),
    { path: "/courses",                 priority: "0.8", changefreq: "monthly", lastmod: PAGES_UPDATED },
    ...courseList.map(c => ({ path: c.href, priority: "0.9", changefreq: "monthly", lastmod: PAGES_UPDATED })),
    { path: "/blog",                    priority: "0.8", changefreq: "weekly",  lastmod: posts[0]?.date || PAGES_UPDATED },
    ...posts.map(p => ({ path: `/blog/${p.slug}`, priority: "0.7", changefreq: "yearly", lastmod: p.updated || p.date })),
    { path: "/privacy-policy",          priority: "0.2", changefreq: "yearly",  lastmod: PAGES_UPDATED },
    { path: "/terms",                   priority: "0.2", changefreq: "yearly",  lastmod: PAGES_UPDATED },
    // Rendered but kept out of the sitemap (noindex pages)
    { path: "/thank-you",               sitemap: false },
    { path: "/courses/thank-you",       sitemap: false },
    { path: "/404",                     sitemap: false },
];

export function render(url, basename = "/") {
    const helmetContext = {};
    return new Promise((resolve, reject) => {
        let html = "";
        const sink = new Writable({
            write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
        });
        sink.on("finish", () => resolve({ html, helmet: helmetContext.helmet }));

        const { pipe } = renderToPipeableStream(
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url} basename={basename === "/" ? undefined : basename.replace(/\/$/, "")}>
                    <App />
                </StaticRouter>
            </HelmetProvider>,
            {
                onAllReady() { pipe(sink); },   // wait for everything, crawlers get the complete page
                onShellError: reject,
                onError: reject,
            },
        );
    });
}
