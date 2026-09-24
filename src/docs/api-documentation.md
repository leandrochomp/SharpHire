# API Documentation

The site itself exposes **no runtime API** (static hosting on GitHub Pages).
This document covers the two "API surfaces" that exist.

## 1. Content Collection API (build-time)

Defined in `src/content/config.ts`. Consumers use Astro's loader:

```ts
import { getCollection } from 'astro:content';
const jobs = await getCollection('jobs', ({ data }) =>
  new Date(data.closingDate) >= new Date()
);
```

### Job schema
| Field        | Type                    | Required | Notes |
|--------------|-------------------------|----------|-------|
| `title`      | `string`                | yes      | job title |
| `company`    | `string`                | yes      | employer name |
| `location`   | `string`                | yes      | `"City, STATE"` or `"Remote"` |
| `salaryAUD`  | `number` (int ≥ 0)      | yes      | base salary, AUD |
| `workType`   | `enum: remote/hybrid/onsite` | yes | normalised |
| `techStack`  | `string[]`              | yes      | may be empty |
| `closingDate`| `Date` (`YYYY-MM-DD`)   | yes      | must be future |

## 2. Crawler internal interfaces

### `scripts/lib/frontmatter.mjs`
- `buildFrontmatter(job: JobInput): string` — returns YAML + body Markdown.
- `validateJob(job: JobInput): JobInput` — throws on schema violations.

### `scripts/sources/*.mjs`
Each adapter exports:
```ts
{
  name: string,
  fetchListings(): Promise<RawListing[]>,
  fetchDetail(url: string): Promise<RawJob>
}
```

## Static search (optional, future)
If Pagefind is added, search runs entirely in the browser against a prebuilt
index — still no runtime API.
