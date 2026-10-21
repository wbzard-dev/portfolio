// Blog posts live as YAML in /data — the filename (minus .yaml) is the URL slug.
// Loaded eagerly so post content is present in the prerendered HTML that search engines read.
const modules = import.meta.glob("../../data/*.yaml", { eager: true });

export const posts = Object.entries(modules)
    .map(([path, mod]) => ({ ...(mod.default || mod), slug: path.split("/").pop().replace(".yaml", "") }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPost = (slug) => posts.find(p => p.slug === slug);

export const formatDate = (date, month = "short") =>
    new Date(date).toLocaleDateString("en-IN", { year: "numeric", month, day: "numeric", timeZone: "Asia/Kolkata" });

// Local covers ("/images/...") need the build base path; remote URLs pass through.
export const coverSrc = (post) =>
    post.coverImage?.startsWith("/") ? `${import.meta.env.BASE_URL}${post.coverImage.slice(1)}` : post.coverImage;
