---
name: git-commit-all
description: This skill should be used when the user asks to "commit all changes", "craft commits from diff", "split into commits", "commit and push", "make logical commits", or wants to intelligently split their working changes into a series of well-organized git commits.
---

# Git Commit All

Analyze the current git diff and craft a series of logical, well-organized commits.

## Process

### Step 1: Analyze Changes

Run these commands in parallel to understand the current state:

```bash
git status --short
git diff HEAD
```

For untracked directories, explore their contents:

```bash
find <untracked-dir> -type f
```

### Step 2: Switch Branch

**Important**: If currently on the default branch (main/master), create and switch to a new branch before committing:

```bash
git branch --show-current
git remote show origin | grep 'HEAD branch'
```

If on the default branch:
1. Create a kebab-case branch name that describes the changes (e.g., `add-user-authentication`, `fix-login-bug`, `update-dependencies`)
2. Switch to the new branch before making any commits:

```bash
git checkout -b <kebab-case-branch-name>
```

### Step 3: Commit

**Group changes logically** based on:

- **Feature/functionality**: Group related changes together
- **File type**: Keep related files together (e.g., skill SKILL.md + scripts/)
- **Dependencies**: If B depends on A, commit A first
- **Scope**: One logical change per commit

Common groupings:
- New feature/skill: All files for that feature in one commit
- Config changes: Related config files together
- Documentation updates: Docs that describe the same thing
- Dependency updates: Package files (requirements.txt, package.json)
- Refactoring: Related refactoring changes

**Execute each commit** in order using double quotes for the message:

```bash
git add <files> && git commit -m "Subject line

Body text here.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

**Quoting rules:**
- Use double quotes around the entire message (handles apostrophes naturally)
- If the message contains a literal double quote, escape it with backslash: `\"`
- Do NOT use HEREDOC (`cat <<'EOF'`) - it fails on apostrophes in the text

Use TodoWrite to track progress through commits.

### Step 4: Push

After all commits succeed, push to the remote:

```bash
git push origin <branch>
```

## Commit Message Guidelines

- **Subject line**: Imperative mood, 50 chars max, no period
  - Good: "Add user authentication", "Fix login bug", "Update dependencies"
  - Bad: "Added auth", "Fixes bug", "Updates"
- **Body**: Explain what and why, not how (the code shows how)
- **Co-author**: Always include the Claude co-author line

## Example Session

User: "commit all my changes"

1. **Analyze**: Found 3 modified files, 1 new directory
2. **Switch Branch**: On main, create `update-api-and-caching` branch
3. **Commit**: Create commits in order
   - Commit 1: Update API endpoint (src/api.ts)
   - Commit 2: Add caching layer (src/cache.ts, src/cache.test.ts)
   - Commit 3: Update documentation (README.md)
4. **Push**: Push all to origin

## Required Permissions

For unattended operation, add these patterns to `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ]
  }
}
```

Without these, Claude will prompt for permission on each git command.

## Notes

- Never commit generated/build output (node_modules, dist/, build/) unless explicitly requested
- Skip committing secrets (.env, credentials, API keys)
- If unsure about a file, ask the user
- Use `git add <specific-files>` not `git add .` for precise control
