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
- Optional: Playwright smoke test — homepage loads, filter narrows card count.

## CI gates (pull requests)
1. `npm run check` (Astro + TS)
2. `npm run test`
3. `npm run build`
4. No future-dated validation errors: sample job files use dates > build date.

## Manual checklist for content PRs
- [ ] Frontmatter matches schema
- [ ] Salary renders as `$X AUD`
- [ ] Closing date renders as `DD/MM/YYYY`
- [ ] Job appears under the right filter options
