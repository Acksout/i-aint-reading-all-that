import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        rollupOptions: {
            input: {
                main: "index.html",
                background: "src/background.js",
                content: "src/content.js",
                popup: "popup.html",
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
    },
});