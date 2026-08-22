import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yaml from "@rollup/plugin-yaml";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), yaml()],
    base: "/portfolio/",
    server: {
        proxy: {
            "/api": "http://localhost:5000",
        },
    },
});
