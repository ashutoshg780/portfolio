# Changelog

All notable changes to this project are logged here, newest first.

## 2026-09-13

### Fixed
- `home.html`, `404.html`, `blog.html`, `project.html` were loading `credentials.js` from a path that
  doesn't exist (`/credentials.js`) instead of the real location (`auth/credentials.js`) — `firebaseConfig`
  was undefined on every one of those pages except `blog_post.html`.
- `scripts/home.js` called `firebase.initializeApp(firebaseConfig)` a second time (it's already
  initialized in `auth/credentials.js`), which throws `Firebase: Firebase App named '[DEFAULT]' already
  exists` and silently broke the homepage contact form.
- Contact form focus ring on inputs/textarea used a hardcoded `rgba(103, 80, 164, 0.1)` instead of the
  theme's `--accent-primary` variable, so the focus color didn't adapt in dark mode.
- `.code-visual` block in the About section used `white-space: nowrap` code lines with no overflow
  handling, which could overflow its grid cell horizontally on narrow (≤480px) viewports.

### Added
- "Download Resume" button in the hero CTA row and a "Resume" link in the navbar, both pointing to
  `documents/Ashutosh_Gupta_Resume.pdf`.
- Generated `documents/Ashutosh_Gupta_Resume.pdf` — a 2-page, ATS-friendly resume built from the current
  site content (experience, projects, skills, education, certifications).
- Filled in the previously-placeholder Hardware & Systems section with the real Hackintosh/OpenCore
  build write-up, with a "Read the full build story" expand/collapse toggle so the page stays scannable.
- Added a second Hardware card ("Cross-Platform Dev Setup") describing the Windows + Hackintosh dev
  workflow used to validate KMP/CMP builds across all real targets.
- Added missing project cards (EduTracker ERP, St. Francis School Website, MIT College Website, DDS
  Marketing Site) to the "Client & ERP Projects" grid so it matches the full list of DDS client sites
  mentioned in the Experience section.
- `docs/` and `tests/` folders (this file included) for tracking ongoing work.

### Changed
- Digital Dream Systems experience bullet now lists all 8 maintained client sites (previously only
  named 4 of them), matching the corrected, complete project list.

## Prior history
No changelog was kept before this date — see `git log` for the commit history.
