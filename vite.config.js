import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "~bootstrap-icons": path.resolve(
        __dirname,
        "node_modules/bootstrap-icons"
      ),
      "~src": path.resolve(__dirname, "src"),
    },
  },
});
