import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/project-atlas-school/",
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/src/content/")) return "curriculum";
          if (id.includes("/node_modules/")) return "vendor";
        },
      },
    },
  },
});
