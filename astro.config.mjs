// @ts-check
import { fileURLToPath, URL } from "node:url";
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// Static output — deploy dist/ to Cloudflare Pages without an adapter.
// Add @astrojs/cloudflare when switching to output: 'server'.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://webdevdesign.example.com",
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://webdevdesign.example.com",
      }),
      PUBLIC_DISCORD_INVITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://discord.gg/webdevdesign",
      }),
    },
  },
  output: "static",
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tailwindcss()],
  },
});
