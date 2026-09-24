# Security

Repo is **public** (GitHub Pages). Design accordingly.

## Secrets
- No secrets should exist in this repo. The Astro site and crawler use only
  public data.
- If the crawler ever needs credentials, store them as GitHub **encrypted
  secrets** and never print them in CI logs.
- Add a CI check (e.g. `gitleaks`) to block accidental secret commits.

## Static-site attack surface
- All content is build-time Markdown → no XSS via stored content beyond
  Astro's markdown rendering; do **not** enable `dangerouslySetInnerHTML`
  (`set:html`) on job descriptions.
- No forms, no auth, no cookies on the public site. If a contact/apply form is
  added later, use a third-party form endpoint (Formspree etc.) — never
  collect data into the static repo.

## Crawler safety
- Sanitise fetched HTML before parsing (strip scripts); treat all remote HTML
  as untrusted.
- SSRF: crawler fetches only `https://` URLs from an allowlist of job-board
  domains.
- Rate limiting + robots.txt compliance (see `webcrawling.md`).

## Dependencies
- Keep Astro/Tailwind/actions versions pinned; enable Dependabot and
  `npm audit` in CI.
