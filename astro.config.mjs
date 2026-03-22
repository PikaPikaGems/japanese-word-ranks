import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

const base = process.env.GITHUB_PAGES ? "/japanese-word-ranks" : "";

export default defineConfig({
  site: "https://pikapikagems.github.io",
  base,
  integrations: [
    AstroPWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Japanese Word Rank Lookup",
        short_name: "JP Word Rank",
        description:
          "See how often a Japanese word appears in everyday conversations, Netflix, YouTube, Wikipedia, and more.",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: `${base}/`,
        icons: [
          {
            src: `${base}/favicon/android-chrome-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${base}/favicon/android-chrome-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Precache app shell assets (CSS/JS/icons only — NOT HTML pages)
        globPatterns: ["**/*.{css,js,ico,png,svg,woff,woff2}"],
        navigateFallback: null,
        runtimeCaching: [
          {
            // Cache-first for all /api/* JSON data files
            urlPattern: /\/api\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "api-json-cache",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
