import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  integrations: [],
  vite: {
    server: {
      proxy: {
        "/v": {
          target: "http://localhost:8080/v",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/v/, ""),
        },
      },
    },
  },
});
