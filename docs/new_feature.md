# New Feature Proposals (Planning Only)

This file is for **discussion and planning only** — nothing here should be treated as implemented or
approved until it's moved into `pending_task.md` (approved, not yet built) and then `implementation.md`
(actively being built). Do not build straight from this file.

---

## Proposed: Dark-mode-aware Open Graph preview image
- **Idea:** Generate/serve a static preview image for link unfurling (LinkedIn, WhatsApp, X) so shared
  links show a branded card instead of a blank preview.
- **Status:** Not discussed with stakeholder yet.

## Proposed: Auto-regenerate resume PDF from `data/*.json`
- **Idea:** Instead of a manually maintained `documents/Ashutosh_Gupta_Resume.pdf`, generate it from the
  same `data/projects.json` / experience data driving the homepage, so the two can't drift out of sync.
- **Status:** Deferred — would require a build step (this is currently a purely static, no-build-tool
  site by design, per `README.md`'s original intent). Worth reconsidering only if content starts
  changing frequently enough that manual sync becomes a real burden.

## Proposed: Simple link/path integrity check
- **Idea:** A small script (Node or Python, run manually or via a pre-commit hook) that scans all
  `.html` files for `<script src>` / `<link href>` / `<img src>` values and verifies the referenced file
  exists relative to the project root — would have caught the `credentials.js` path bug in
  `docs/bug_fix.md` (BUG-001) before it shipped.
- **Status:** Proposed, not scoped.

## Proposed: Dark mode toggle persistence across pages
- **Idea:** Confirm `localStorage` theme preference (already implemented in `scripts/script.js`) is
  consistently applied on first paint (before CSS renders) on every page, to avoid a light-mode flash
  when a dark-mode user navigates in.
- **Status:** Needs verification — not confirmed broken, just not explicitly tested (see `tests/test.md`).
