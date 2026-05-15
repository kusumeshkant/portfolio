# Git Workflow

## Branch Structure

```
main       — Production-stable. Cloudflare deploys this to kusumeshkant.dqstore.in.
develop    — Integration branch. All feature work lands here first.
feature/*  — Short-lived branches for isolated work.
```

## Day-to-Day Workflow

### Starting a new feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/hero-redesign
```

### Committing work

```bash
git add src/components/sections/Hero.jsx
git commit -m "feat: improve hero section role rotator animation"
```

### Commit message convention

| Prefix | Use for |
|---|---|
| `feat:` | New feature or visible change |
| `fix:` | Bug fix |
| `perf:` | Performance improvement |
| `seo:` | Metadata, robots.txt, sitemap changes |
| `refactor:` | Code restructure, no behaviour change |
| `style:` | Visual/CSS-only changes |
| `docs:` | Documentation updates |
| `chore:` | Dependency bumps, config changes |

### Merging feature → develop

```bash
git checkout develop
git merge feature/hero-redesign
git push origin develop
# GitHub Actions runs build validation + deploys preview
```

### Promoting develop → main (production release)

Only do this when develop is stable and tested in the preview URL.

```bash
git checkout main
git merge develop
git push origin main
# GitHub Actions builds and deploys to kusumeshkant.dqstore.in
```

### Cleanup after merge

```bash
git branch -d feature/hero-redesign
git push origin --delete feature/hero-redesign
```

## Rules

- **Never** push directly to `main` with untested code.
- **Always** test changes in the preview URL before promoting to main.
- **Each feature branch** should have one clear purpose.
- **Commit often** — small commits are easier to revert.

## Rollback

If production breaks after a merge:

```bash
# Option 1: Revert the merge commit
git checkout main
git revert -m 1 <merge-commit-sha>
git push origin main

# Option 2: Roll back to the last known-good commit
git checkout main
git log --oneline   # find the good commit SHA
git revert <bad-sha>
git push origin main
```

Never use `git reset --hard` on a branch that's already pushed to origin.
