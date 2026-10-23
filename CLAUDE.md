# Portfolio — CLAUDE.md

Static HTML/CSS/JS single-page portfolio, deployed via Firebase Hosting
(project `developerashutoshgupta`, remote `github.com/ashutoshg780/portfolio.git`).

## Working style — token efficiency

- Work token-efficiently. Do not rebuild, re-test, or re-verify more than once per change.
- Don't repeatedly restart the local preview server, re-run the same browser check, or
  re-read files that were already read earlier in the session unless something changed.
- Prefer direct source-reading/editing over live-browser verification for small/simple
  CSS or copy changes. Only spin up the preview server for changes that genuinely need
  visual/interactive confirmation, and verify once, not iteratively.
- Keep responses and commit messages concise.

## Known open items (see docs/bug.md for full list)

- OPEN-008: `images/blog/*.jpg` (8 files) are missing — needs real image files, not something to fix in code.
- OPEN-009: `project.html`, `blog.html`, `blog_post.html`, `404.html` are orphaned (unlinked from nav since site went single-page). Fate undecided — don't remove without asking.
