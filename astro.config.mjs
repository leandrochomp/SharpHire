// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Project site: https://leandrochomp.github.io/SharpHire/
// For a custom domain, set `site` to it, `base` to '/', and add public/CNAME.
export default defineConfig({
  output: 'static',
  site: 'https://leandrochomp.github.io',
  base: '/SharpHire',
  vite: {
    plugins: [tailwindcss()],
  },
});
