// Blog posts live as YAML in /data — the filename (minus .yaml) is the URL slug.
// Written by hand or via Decap CMS (/admin). Loaded eagerly so post content is present in the
// prerendered HTML that search engines read.
const modules = import.meta.glob("../../data/*.yaml", { eager: true });

const DEFAULT_COVER = "/images/og/default.png";

// YAML parses unquoted dates (as Decap writes them) into Date objects; keep them as YYYY-MM-DD strings
// so sorting, display, schema and the sitemap all see the same thing.
const toDateString = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d ? String(d) : undefined);

const normalise = (raw, slug) => ({
    ...raw,
    slug,
    date:       toDateString(raw.date),
    updated:    toDateString(raw.updated),
    author:     raw.author || "Vivek",
    content:    raw.content || "",
    takeaways:  (raw.takeaways || []).filter(Boolean),
    locations:  raw.locations || [],
    coverImage: raw.coverImage || DEFAULT_COVER,
});

export const posts = Object.entries(modules)
    .map(([path, mod]) => normalise(mod.default || mod, path.split("/").pop().replace(".yaml", "")))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPost = (slug) => posts.find(p => p.slug === slug);

export const formatDate = (date, month = "short") =>
    new Date(date).toLocaleDateString("en-IN", { year: "numeric", month, day: "numeric", timeZone: "Asia/Kolkata" });

// Local covers ("/images/...") need the build base path; remote URLs pass through.
export const coverSrc = (post) =>
    post.coverImage?.startsWith("/") ? `${import.meta.env.BASE_URL}${post.coverImage.slice(1)}` : post.coverImage;
