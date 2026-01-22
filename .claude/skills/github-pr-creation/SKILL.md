---
name: github-pr-creation
description: Use when creating a pull request on GitHub, when asked to "create a PR", "open a PR", "submit changes for review", or when finishing work on a feature branch
---

# GitHub PR Creation

## Overview

Create a pull request, wait for checks, merge, and verify the main branch pipeline passes.

**Core principle:** Analyze commits between branch and base, synthesize into clear PR description, create PR with `gh`, then shepherd it through to completion on the main branch.

## Process

### Step 1: Determine Base Branch

```bash
# Check configured base or use default
git config branch.$(git branch --show-current).gh-merge-base 2>/dev/null || \
  git remote show origin | grep 'HEAD branch' | awk '{print $NF}'
```

### Step 2: Analyze Commits

```bash
# Get commits unique to this branch
git log <base>..HEAD --oneline

# Get detailed commit messages for summary
git log <base>..HEAD --pretty=format:"%s%n%n%b"

# See overall diff stats
git diff <base>..HEAD --stat
```

### Step 3: Synthesize Summary

From the commits, create:
- **Title:** Concise description of the overall change (not just first commit)
- **Summary:** 2-4 bullets covering what changed and why
- **Test plan:** Only include if there are manual verification steps; omit if CI covers everything

### Step 4: Push and Create PR

```bash
# Push branch if needed
git push -u origin $(git branch --show-current)

# Create PR
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
<synthesized bullets from commits>

EOF
)"
```

### Step 5: Wait for PR Checks

```bash
# Watch PR checks until they complete
gh pr checks --watch

# Or check status without watching
gh pr checks
```

Wait for all checks to pass before proceeding. If checks fail, investigate and fix before continuing.

### Step 6: Offer to Merge

Once all checks are green, ask the user if they want to merge the PR.

```bash
# Merge the PR (after user confirms)
gh pr merge --merge
```

### Step 7: Wait for Main Branch Pipeline

After merging, wait for the pipeline on the default branch (e.g., master) to complete.

```bash
# Get the merge commit SHA on the default branch
git fetch origin
DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | awk '{print $NF}')

# Watch the workflow runs for the default branch
gh run list --branch "$DEFAULT_BRANCH" --limit 1
gh run watch
```

This completes the PR lifecycle: creation → checks pass → merge → main branch pipeline passes.

## Quick Reference

| Step | Command | Purpose |
|------|---------|---------|
| Find base | `git config branch.<branch>.gh-merge-base` | Configured merge target |
| List commits | `git log <base>..HEAD --oneline` | What's being merged |
| Commit details | `git log <base>..HEAD` | Full messages for summary |
| Diff stats | `git diff <base>..HEAD --stat` | Files changed |
| Create PR | `gh pr create --title "..." --body "..."` | Submit for review |
| Wait for checks | `gh pr checks --watch` | Ensure CI passes |
| Merge PR | `gh pr merge --merge` | Merge after user confirms |
| Watch main pipeline | `gh run watch` | Ensure main branch CI passes |

## Common Mistakes

**Using first commit as title**
- Problem: First commit may not represent the whole change
- Fix: Synthesize a title that covers all commits

**Copy-pasting commit messages verbatim**
- Problem: Individual commits lack cohesion as a PR description
- Fix: Summarize the overall change, referencing key commits

**Forgetting to push first**
- Problem: `gh pr create` fails if branch not on remote
- Fix: Always `git push -u origin <branch>` before creating PR

**Adding unnecessary test plan**
- Problem: Stating "CI runs tests" is obvious and adds noise
- Fix: Only include a test plan section if there are manual verification steps required

## Example

Branch with 3 commits:
```
f4febfd Add Claude Code configuration
14bcced Update supporting files for Node.js 24
6c69e22 Update package.json for Node.js 24
```

**Synthesized PR:**
```
Title: Upgrade to Node.js 24

## Summary
- Update package.json to require Node.js >=24
- Update tsconfig to extend @tsconfig/node24
- Add Claude Code configuration for development
```
