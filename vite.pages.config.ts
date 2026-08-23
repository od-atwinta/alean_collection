import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "pages-src",
  base: "/alean_collection/",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../pages-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("pages-src/index.html", import.meta.url)),
        aleanClubSophia: fileURLToPath(new URL("pages-src/hotels/alean-club-sophia/index.html", import.meta.url)),
        aleanFamilyDoville: fileURLToPath(new URL("pages-src/hotels/alean-family-doville/index.html", import.meta.url)),
      },
    },
  },
});
