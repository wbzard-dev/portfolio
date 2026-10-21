// Production build: client bundle → SSR bundle → prerender every marketing route to static HTML,
// then write sitemap.xml from the same route list.
//   node scripts/build.mjs                  (www.wbzard.com, base "/")
//   node scripts/build.mjs --base=/portfolio/   (GitHub Pages project site)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import { site } from "../src/config/site.js";

const SITE_URL = site.url;   // single source of truth for canonical URLs
const root   = process.cwd();
const base   = (process.argv.find(a => a.startsWith("--base="))?.split("=")[1]) || "/";
const dist   = path.join(root, "dist");
const ssrOut = path.join(root, "dist-ssr");

console.log(`\n▸ Client build (base ${base})`);
await build({ base, logLevel: "warn" });

console.log("▸ SSR build");
await build({
    base,
    logLevel: "warn",
    build: { ssr: "src/entry-server.jsx", outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
    // CommonJS packages whose named exports Node can't resolve — let Vite bundle them instead.
    ssr: { noExternal: ["react-helmet-async"] },
});

const { render, routes } = await import(pathToFileURL(path.join(ssrOut, "entry-server.js")).href);

// Untouched template — served for client-only routes (side projects) via host rewrites.
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
fs.writeFileSync(path.join(dist, "app-shell.html"), template);

// Helmet supplies these per page; drop the generic fallbacks so tags aren't duplicated.
const baseHead = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta name="(description|keywords|robots)"[^>]*>\s*/g, "");

const writePage = (file, html) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
};

console.log("▸ Prerendering");
for (const route of routes) {
    const { html, helmet } = await render(route.path, base);
    const head = ["title", "meta", "link", "script"].map(k => helmet[k].toString()).join("\n    ");
    const page = baseHead
        .replace("<html lang=\"en\">", `<html ${helmet.htmlAttributes.toString() || 'lang="en"'}>`)
        .replace("</head>", `    ${head}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root" data-prerendered-path="${route.path}">${html}</div>`);

    if (route.path === "/")         writePage(path.join(dist, "index.html"), page);
    else if (route.path === "/404") writePage(path.join(dist, "404.html"), page);
    else {
        // Both forms so /blog and /blog/ resolve on Netlify, Cloudflare Pages and GitHub Pages alike.
        writePage(path.join(dist, route.path, "index.html"), page);
        writePage(path.join(dist, `${route.path}.html`), page);
    }
    console.log("  ✓", route.path);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.filter(r => r.sitemap !== false).map(r => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap);   // keep the committed copy in sync
fs.rmSync(ssrOut, { recursive: true, force: true });

console.log(`▸ sitemap.xml: ${routes.filter(r => r.sitemap !== false).length} URLs\n✓ Build complete\n`);
