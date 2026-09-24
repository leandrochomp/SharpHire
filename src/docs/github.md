# Git & GitHub workflow

## Branching
- Sync and cut a branch before any change:
  ```sh
  git switch main
  git pull
  git switch -c <type>/<short-description>
  ```
- Branch from latest `main` only; if `main` moves before merging:
  ```sh
  git fetch origin
  git rebase origin/main
  ```
- One branch per issue/change. Delete after merge (squash-merge does this
  automatically on GitHub).

## Committing
- Stage and commit locally:
  ```sh
  git add -p          # review hunks before staging
  git commit          # message per Conventional Commits (see AGENTS.md)
  ```
- Amending is fine until pushed; after pushing, fix with a new commit or in
  PR review.

## Pushing & PRs
- Push and open the PR with an explicit title and body:
  ```sh
  git push -u origin <branch>
  gh pr create --title "feat(content): add salary range validation" --body "<body>"
  ```
- PR body template:
  ```markdown
  ## Summary
  2-4 sentences: what changed and why.

  ## Changes
  - Bullet list of notable changes, one per logical unit.

  ## Testing
  How it was verified (npm run test, npm run build, manual checks).
  ```
- Never open a PR with a body that is only the commit list or the co-author
  trailer.
- Merge with squash to keep `main` history clean:
  ```sh
  gh pr merge --squash
  ```

## Misc
- `gh auth status` to verify auth; `gh issue list` / `gh issue view` for issue
  work.
- Never paste tokens; `gh` handles auth.