# Deployment

Static build (`dist/`) published to **GitHub Pages** by
`.github/workflows/deploy.yml` using the official Pages actions
(`upload-pages-artifact` + `deploy-pages`), not a `gh-pages` branch.

## Workflow

| Trigger | Runs | Deploys |
| --- | --- | --- |
| Pull request | check, unit, build, E2E | no |
| Push to `main` | check, unit, build, E2E | yes |
| Daily 14:00 UTC (00:00 AEST) | same | yes — expired jobs drop off |
| Manual (`workflow_dispatch`) | same | only from `main` |

The daily rebuild matters: `closingDate` is checked at **build time**, so without
it an expired job stays live until the next commit.

## One-time repo setup

Settings → Pages → Source: **GitHub Actions**. Or:

```sh
gh api -X POST repos/{owner}/{repo}/pages -f build_type=workflow
```

## URLs / base path

`astro.config.mjs` sets `site: https://leandrochomp.github.io` and
`base: '/SharpHire'`. Build internal links with `withBase()` (`src/lib/url.ts`),
never a hard-coded `/`. For a custom domain: set `site` to it, `base` to `'/'`,
and add `public/CNAME`.
