# Backend & Data Pipeline

There is **no runtime backend**. "Backend" here means the build-time data
pipeline that turns Markdown job ads into the static site.

## Pipeline
1. **Ingest** — Markdown files land in `src/content/jobs/` (via PR from a
   recruiter, or the crawler — see `webcrawling.md`).
2. **Validate** — `src/content/config.ts` (Astro content collections + Zod)
   rejects invalid frontmatter at build time; build fails loudly.
3. **Enrich (optional)** — remark/rehype plugins: slugify headings, add anchor
   links, TOC.
4. **Render** — Astro builds static HTML at `dist/`.
5. **Deploy** — GitHub Actions pushes `dist/` to GitHub Pages (see
   `deployment.md`).

## `src/content/config.ts`
Defines the `jobs` collection schema. Source of truth for frontmatter fields.
Any schema change requires a matching update in `content-jobs.md` and a
regenerated sample job file.

## Expired jobs
Jobs past `closingDate` are excluded at build time (filter in `getStaticPaths`
and on the index page). They remain in the repo as history.

## Future backend option
If search across many jobs (>1k) is ever needed, consider Pagefind (static
search index) before introducing any server.
