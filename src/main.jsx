import { StrictMode } from "react";

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

const app = (
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>
);

// Marketing pages are prerendered at build time (scripts/build.mjs). Hydrate only when the
// static HTML was rendered for this exact URL — fallback shells (404.html, app-shell.html) get a fresh render.
const root = document.getElementById("root");
const normalise = (p) => p.replace(/\/+$/, "") || "/";
const prerenderedFor = root.dataset.prerenderedPath;
const currentPath = normalise(window.location.pathname.slice(import.meta.env.BASE_URL.length - 1));

if (root.hasChildNodes() && prerenderedFor && normalise(prerenderedFor) === currentPath) {
    hydrateRoot(root, app);
} else {
    root.innerHTML = "";
    createRoot(root).render(app);
}
