# Web Crawling

Optional ingestion source: a crawler that produces Markdown job files in
`src/content/jobs/`.

## Principles
- The crawler is a **separate tool/script**, not part of the Astro site build.
- It **writes Markdown files only** — output must pass the same Zod schema as
  hand-written ads.
- Target: public Australian job boards / company career pages where terms allow.

## Script location & flow
```
scripts/crawl.mjs        # entry point (Node, no heavy deps)
scripts/sources/*.mjs    # one adapter per source site
scripts/lib/frontmatter.mjs  # builds + validates YAML frontmatter
```
Flow: fetch listing → parse detail → map to schema → dedupe by
`(company, title)` → write `src/content/jobs/<slug>.md` → open PR (or commit to
a `crawler/` branch).

## Mapping to schema
| Source field        | Schema field  | Notes |
|---------------------|---------------|-------|
| job title           | `title`       | verbatim |
| employer            | `company`     | normalise "Pty Ltd" |
| location string     | `location`    | map to "City, STATE"; remote → `"Remote"` |
| advertised salary   | `salaryAUD`   | parse ranges → take midpoint; omit if unparseable |
| work arrangement    | `workType`    | keyword match: remote/hybrid/onsite |
| tech keywords       | `techStack`   | match against a curated tech list |
| closing/apply-by    | `closingDate` | default: 30 days from crawl date if absent |

## Politeness & legality
- Rate limit (≥2s between requests), cache raw HTML for re-parsing.
- Verify each source's terms of service before crawling.
- Human review required before crawler PRs merge.

## API Documentation
The crawler's internal interfaces are documented in `src/docs/api-documentation.md`.
