# Pending Tasks

Outstanding work, roughly in priority order. Move items here from `new_feature.md` once they're
approved for implementation, and into `implementation.md` once work starts.

## High priority
- [ ] Verify Firebase Security Rules actually restrict `contact_forms`, `blog_posts`, and any other
      writable collections to authenticated/authorized writes — the client-side `postcode` in
      `auth/credentials.js` is not a substitute for this (see `bug.md` OPEN-001).
- [ ] Replace the Firebase-hosted resume link check: confirm `documents/Ashutosh_Gupta_Resume.pdf`
      deploys correctly under Firebase Hosting's `public: "."` root config and is reachable at
      `/documents/Ashutosh_Gupta_Resume.pdf` in production.

## Medium priority
- [ ] Rewrite `README.md` to match the actual current file structure (see `bug.md` OPEN-003).
- [ ] Rewrite `readme/DEPLOYMENT.md` for Firebase Hosting instead of GitHub Pages.
- [ ] Remove or relocate `test.kt` and `test copy.kt` from the repo root (see `bug.md` OPEN-002).
- [ ] Keep `documents/Ashutosh_Gupta_Resume.pdf` in sync whenever Experience/Projects content on
      `home.html` changes — it's currently a static, manually-regenerated file, not derived from
      `data/*.json` at build time.

## Lower priority / nice-to-have
- [ ] Consider a lightweight automated check (even a simple script) that flags broken relative
      `<script src>` / `<link href>` paths across all HTML pages, so path bugs like the one fixed in
      `docs/bug_fix.md` BUG-001 get caught before deploy.
- [ ] Add basic meta Open Graph tags for link previews (LinkedIn/WhatsApp/Twitter) if not already
      present on `home.html`.
