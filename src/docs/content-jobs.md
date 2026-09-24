# Content & Job Ads

## Authoring jobs
- One Markdown file per job in `src/content/jobs/`.
- Filename: lowercase, hyphenated slug — `<title>-<company>.md`.
- Frontmatter per the canonical schema in `AGENTS.md`; body = job description.

## Style guide
- Australian English spelling throughout.
- Salary always in AUD, quoted annually unless stated in the body.
- Locations: prefer `"City, STATE"` (e.g. `"Melbourne, VIC"`); remote roles use
  `"Remote"`. Hybrid roles state the city the office is in.
- Dates in frontmatter are ISO (`YYYY-MM-DD`); displayed dates are `DD/MM/YYYY`.
- Closing date: typically 2–6 weeks from posting. Expired jobs are excluded
  automatically at build time.

## SEO
- Detail page `<title>`: `{title} — {company} | {Site Name}`.
- Description: first 155 chars of the body.
- OG/Twitter cards on detail pages; `sitemap-index.xml` via `@astrojs/sitemap`.

## Sample file
See `src/content/jobs/_example-senior-frontend-engineer.md` (leading underscore
keeps it out of builds — used for docs/CI fixture).
