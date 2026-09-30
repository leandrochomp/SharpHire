# Deployment

Static build (`dist/`) published to **GitHub Pages** by
`.github/workflows/deploy.yml` using the official Pages actions
(`upload-pages-artifact` + `deploy-pages`), not a `gh-pages` branch.

## Workflow

> **Deployment is currently disabled.** The `deploy` job and the Pages artifact
> upload are gated with `if: false`, and the daily `schedule` trigger is
> commented out. CI (check, unit, build, E2E) still runs. To re-enable, restore
> the original `if:` conditions and uncomment `schedule` in `deploy.yml`.

| Trigger | Runs | Deploys |
| --- | --- | --- |
| Pull request | check, unit, build, E2E | no |
| Push to `main` | check, unit, build, E2E | no (disabled) |
| ~~Daily 14:00 UTC (00:00 AEST)~~ | disabled | disabled |
| Manual (`workflow_dispatch`) | same | no (disabled) |

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
