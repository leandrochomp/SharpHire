import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

// Crawlers only read robots.txt at the domain root, so this takes effect once
// the site moves to a custom domain (base '/'). Harmless on the project path.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('sitemap.xml'), site)}\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
