// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Static output — deploy dist/ to Cloudflare Pages without an adapter.
// Add @astrojs/cloudflare when switching to output: 'server'.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
