# Release Notes

## Unreleased — Content refresh, resume download, bug fixes (2026-09-13)

**Summary:** Portfolio content updated to reflect current role/experience/projects, resume download
added, and several real functional bugs fixed (broken Firebase config path on most pages, a duplicate
Firebase init call that silently broke the contact form, and two CSS issues). Site remains a single-page
deployment (`home.html`) — no new pages were introduced.

**What's new:**
- Downloadable resume (PDF) linked from both the hero section and the navbar.
- Hardware & Systems section now has real content (Hackintosh/OpenCore build) instead of placeholders.
- Fuller list of Digital Dream Systems client projects reflected in both the Experience timeline and the
  Projects grid.

**What's fixed:**
- Contact form on the homepage now actually works — it was previously broken by a duplicate Firebase
  initialization call plus a wrong script path on 4 of 5 pages.
- Dark mode focus ring on the contact form now uses the correct theme color.
- A code-snippet visual in the About section no longer risks overflowing its container on small screens.

**Known limitations carried forward:** see `docs/bug.md` for currently open issues (stale README/
deployment docs, stray root-level `.kt` files, no automated test coverage).
