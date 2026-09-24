# AGENTS.md — Tech Headhunter Agency (AU)

Guidance for AI coding agents working in this repository.

## Project Overview

Astro **static site** for a tech headhunter/recruitment agency targeting the
**Australian market**. Job advertisements are authored as **Markdown files** in
`src/content/jobs/` with typed frontmatter. The site is deployed to
**GitHub Pages** via **GitHub Actions**. Styling uses **Tailwind CSS**.

Primary goals:

1. Recruiters/crawlers publish job ads as Markdown — no CMS, no database.
2. Candidates filter jobs **client-side** (location, work type) with zero backend.
3. Fast, accessible, SEO-friendly static pages that cost nothing to host.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro (static output, `output: 'static'`) |
| Styling | Tailwind CSS (via `@astrojs/tailwind`) |
| Content | Astro Content Collections (Zod-validated frontmatter) |
| Filtering | Client-side vanilla JS / Astro islands |
| Hosting | GitHub Pages (Actions artifact deploy, no `gh-pages` branch) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |

## Project Structure

```javascript
├── .github/workflows/deploy.yml   # Build + deploy to GitHub Pages
├── src/
│   ├── content/
│   │   ├── config.ts              # Job collection schema (Zod)
│   │   └── jobs/                  # One .md file per job ad
│   ├── components/                # Astro components (JobCard, FilterBar, ...)
│   ├── layouts/                   # BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro            # Job list + client-side filters
│   │   └── jobs/[...slug].astro   # Job detail pages
│   ├── docs/                      # Detailed docs (see sections below)
│   └── styles/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Job Frontmatter Schema (canonical)

```yaml
---
title: "Senior Frontend Engineer"
company: "Acme Pty Ltd"
location: "Sydney, NSW"          # Australian locations; "Remote" allowed
salaryAUD: 150000                # number, base salary in AUD (no $ or commas)
workType: "hybrid"               # remote | hybrid | onsite
techStack: ["TypeScript", "React", "Node.js"]
closingDate: 2026-10-31          # YYYY-MM-DD
---
```

Rules:

- `salaryAUD` is an integer; render as `$150,000 AUD` via a formatter.
- `workType` is an **enum** — never free text.
- `closingDate` must be a future date at build time; expired jobs are filtered out.
- Body of the Markdown file = the full job description (rendered on detail page).

## Core Conventions

- **Static only.** No server runtime, no API routes in the Astro site. All data
  comes from content collections at build time.
- **One job = one file.** Filename is the slug: `senior-frontend-engineer-acme.md`.
- **AU conventions.** Dollar figures in AUD, dates DD/MM/YYYY when displayed
  to users, locations are Australian suburbs/cities/states.
- **No client framework** unless a filter interaction genuinely requires an
  island (default: vanilla JS in a `<script>` tag).
- Any change to frontmatter schema must update `src/content/config.ts` AND
  `src/docs/content-jobs.md`.

## Detailed Docs

### Frontend

Reference `src/docs/frontend.md`

### Backend & Data Pipeline

Reference `src/docs/backend.md`

### Web Crawling

Reference `src/docs/webcrawling.md`

### API Documentation

Reference `src/docs/api-documentation.md`

### Security

Reference `src/docs/security.md`

### Testing

Reference `src/docs/testing.md`

### Deployment

Reference `src/docs/deployment.md`

### Content & Job Ads

Reference `src/docs/content-jobs.md`

### Git & GitHub

Reference `src/docs/github.md`

- Commit style: Conventional Commits — `type(scope): imperative summary`.
  Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `build`.
  Example: `feat(content): add salary range validation to job schema`
- Subject line: <= 72 chars, lowercase, no trailing period.
- One logical change per commit; include tests in the same commit.
- Never commit secrets or build artifacts (`dist/`, `.astro/`).
- Always commit locally first, then push. Never `--force` to `main`.
- Keep the `Co-Authored-By` trailer as the last line of the commit body.
- PR body must explain *what* changed and *why* — never just the commit list.
- Run `npm run build` before committing; it must pass.
- All work on feature branches — never commit directly to `main`.
- Branch naming: `type/short-description`, include issue number when one exists
  (`feat/12-job-schema-salary`).
- One branch per logical unit of work: cut from latest `main`, push, PR, merge, delete.
- Use `gh` for all GitHub operations — no new GitHub-related dependencies.
- PRs must pass CI and link the issue they close (`Closes #12`).

## Agent Working Rules

1. Read the relevant `src/docs/*.md` file before modifying that layer.
2. Keep `AGENTS.md` short — details live in the referenced docs.
3. Ask before adding new npm dependencies.
4. Validate all job frontmatter against the Zod schema before committing.
5. Run `npm run build` before opening a PR; the build must pass with zero
   content-collection errors.
6. Never commit secrets, API keys; the repo is public (GitHub Pages).

## Token Discipline
- Ponytail is active. Prefer stdlib and native features over new dependencies. 
- Caveman is active. If reading large logs or diffs, summarize before acting.
