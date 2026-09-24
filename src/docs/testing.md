# Testing

## Build-time validation (primary)

- The **content collection Zod schema is the first line of defence**: any
  invalid job file fails `astro build` or `astro check`.
- `npm run build` must pass in CI on every PR.

## Unit tests — `scripts/`

The crawler logic (salary parsing, location normalisation, frontmatter
building) is pure functions and testable:

- Framework: **Vitest** (`npm run test`).
- Required cases: salary ranges (`$120k–$140k` → `130000`), "Remote Australia",
  work-type keyword mapping, malformed listings rejected.

## Frontend tests

- Minimal by design (static site). Filter logic extracted to a pure module
  (`src/lib/filterJobs.ts`) with Vitest coverage: filter by location, by
  workType, combined, and empty-result state.
- Playwright E2E (`@playwright/test`, `e2e/*.e2e.ts`, `npm run test:e2e`)
  against the built site: all jobs listed, filter by work type / location,
  empty state + clear, card → detail page. Run `npm run build` first; the
  config starts `npm run preview` (or reuses one on :4321 locally).
  Assertions read `data-location`/`data-work-type` from the page rather than
  hard-coding counts, so adding or expiring jobs doesn't break them.
- `.e2e.ts` (not `.spec.ts`) keeps these out of Vitest's default glob.
- Agent sessions (`AI_AGENT` set): `astro preview` detaches into the
  background, so stop it afterwards with `npx astro preview stop`.

## Browser automation (development-time)

- Skill reference: https://www.skills.sh/microsoft/playwright-cli/playwright-cli
  (`microsoft/playwright-cli` — 40+ commands for navigation, interaction,
  snapshots, screenshots, network inspection).
- Use the skill for **agent-driven verification** while vibecoding: open the
  preview server, navigate the job list, apply filters via real clicks, and
  capture snapshots/screenshots as evidence in PRs.
- The CLI drives a real browser session (`playwright-cli open` -> `goto` ->
  `click <ref>`), so it validates the actual built output — not just source.
- Rules:
- Browser sessions are ephemeral — never rely on persistent state between
  runs; always start from `playwright-cli open`.
- Target `npm run preview` (built `dist/`), not `astro dev`, so tests
  reflect production output.
- Snapshots/screenshots are debugging evidence; do not commit them unless a
  PR specifically needs visual proof.
- This complements CI: `astro check`, Vitest and `@playwright/test` run in
  GitHub Actions; the playwright-cli skill is for interactive verification
  during development, not the CI pipeline.

## CI gates (pull requests)

1. `npm run check` (Astro + TS)
2. `npm run test`
3. `npm run build`
4. `npm run test:e2e` (Chromium)
5. No future-dated validation errors: sample job files use dates > build date.

## Manual checklist for content PRs

- [ ] Frontmatter matches schema
- [ ] Salary renders as `$X AUD`
- [ ] Closing date renders as `DD/MM/YYYY`
- [ ] Job appears under the right filter options