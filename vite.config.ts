import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Day-Flow-Organizer/",
  build: { chunkSizeWarningLimit: 1600 },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
