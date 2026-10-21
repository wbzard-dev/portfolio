// Renders 1200×630 branded images (Open Graph previews + blog covers) with headless Chrome.
// Usage: node scripts/generate-og-images.mjs            (only missing images)
//        node scripts/generate-og-images.mjs --force    (regenerate everything)
// Set CHROME_PATH if Chrome/Edge isn't in a standard location.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import yaml from "js-yaml";

const root  = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const force = process.argv.includes("--force");

const chromeCandidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
].filter(Boolean);
const chrome = chromeCandidates.find(p => fs.existsSync(p));
if (!chrome) { console.error("Chrome/Edge not found — set CHROME_PATH."); process.exit(1); }

const logo = pathToFileURL(path.join(root, "public/images/final-logo.png")).href;

const images = [
    { out: "og/default.png",                label: "Bangalore · Shivamogga", title: "Websites, apps, SEO & ads for startups." },
    { out: "og/startup-launch-package.png", label: "Startup Launch Package", title: "Your new business, launched online in one plan." },
    { out: "og/website-development.png",    label: "Website Development",    title: "A website that brings you customers." },
    { out: "og/app-development.png",        label: "App & MVP Development",  title: "Ship your MVP. Learn from real users." },
    { out: "og/social-media-marketing.png", label: "Social Media Framework", title: "Organic growth, built as a system." },
    { out: "og/seo-services.png",           label: "SEO & Local SEO",        title: "Get found when customers search." },
    { out: "og/digital-marketing.png",      label: "Meta & Google Ads",      title: "Ads that pay for themselves." },
    { out: "og/bangalore.png",              label: "Bangalore · Bengaluru",  title: "Launch your Bangalore startup properly." },
    { out: "og/shivamogga.png",             label: "Shivamogga · Shimoga",   title: "Take your Shivamogga business online." },
    { out: "og/mern-stack-course-shivamogga.png", label: "Live Online · ₹5,000", title: "MERN Stack Course for Shivamogga students." },
    { out: "og/devops-course-shivamogga.png",     label: "Live Online · ₹5,000", title: "DevOps Course for Shivamogga students." },
    { out: "og/courses.png",                      label: "Courses · Shivamogga",  title: "Developer courses: MERN Stack & DevOps." },
];

for (const file of fs.readdirSync(path.join(root, "data")).filter(f => f.endsWith(".yaml"))) {
    const post = yaml.load(fs.readFileSync(path.join(root, "data", file), "utf8"));
    if (!post.coverImage?.startsWith("/images/blog/")) continue;   // external covers are left alone
    images.push({ out: post.coverImage.replace("/images/", ""), label: post.category || "Guide", title: post.title });
}

const escape = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = ({ label, title }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@500;700&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0F0F0F; color: #fff; font-family: Inter, Arial, sans-serif;
         background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 36px 36px; }
  .wrap { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; }
  .label { font-size: 22px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #93B4F8; }
  .title { margin-top: auto; font-family: Anton, Impact, sans-serif; font-size: ${title.length > 60 ? 70 : title.length > 40 ? 84 : 100}px; line-height: 1.04; max-width: 1000px; }
  .bar { width: 96px; height: 6px; background: #2563EB; border-radius: 3px; margin: 36px 0 28px; }
  .foot { display: flex; align-items: center; justify-content: space-between; font-size: 22px; color: rgba(255,255,255,0.55); font-weight: 500; }
  .foot img { height: 64px; filter: brightness(0) invert(1); }
</style></head><body><div class="wrap">
  <div class="label">${escape(label)}</div>
  <div class="title">${escape(title)}</div>
  <div class="bar"></div>
  <div class="foot"><span>wbzard.com · Bangalore &amp; Shivamogga</span><img src="${logo}" alt=""></div>
</div></body></html>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "og-"));
let made = 0;
for (const img of images) {
    const dest = path.join(root, "public/images", img.out);
    if (!force && fs.existsSync(dest)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const page = path.join(tmp, "page.html");
    fs.writeFileSync(page, html(img));
    execFileSync(chrome, [
        "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
        `--user-data-dir=${path.join(tmp, "profile")}`,
        "--allow-file-access-from-files", "--virtual-time-budget=4000",
        "--window-size=1200,630", `--screenshot=${dest}`, pathToFileURL(page).href,
    ], { stdio: "ignore" });
    made++;
    console.log("✓", img.out);
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${made} image(s) generated.`);
