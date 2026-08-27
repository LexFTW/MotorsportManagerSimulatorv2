import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@models": path.resolve(import.meta.dirname, "./src/models"),
      "@features": path.resolve(import.meta.dirname, "./src/features"),
      "@shared": path.resolve(import.meta.dirname, "./src/shared"),
      "@app": path.resolve(import.meta.dirname, "./src/app"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@widgets": path.resolve(import.meta.dirname, "./src/widgets"),
    },
  },
});