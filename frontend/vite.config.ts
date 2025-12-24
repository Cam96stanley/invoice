import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Invoice App",
        short_name: "Invoices",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1e40af",
        icons: [
          {
            src: "",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
