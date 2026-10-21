// Site-relative asset paths ("/images/...") need the build base path (e.g. /portfolio/ on GitHub Pages).
export const asset = (p) => (p && p.startsWith("/") ? `${import.meta.env.BASE_URL}${p.slice(1)}` : p);
