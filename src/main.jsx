import { StrictMode } from "react";

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>
);
