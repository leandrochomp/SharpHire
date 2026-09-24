import type { APIRoute } from 'astro';
import { getOpenJobs } from '../lib/jobs';
import { withBase } from '../lib/url';

// Hand-rolled instead of @astrojs/sitemap: two route types, no dependency.
export const GET: APIRoute = async ({ site }) => {
  const jobs = await getOpenJobs();
  const paths = ['/', ...jobs.map((job) => `jobs/${job.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(withBase(p), site)}</loc></url>`).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
