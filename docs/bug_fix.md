# Bug Fixes Log

Record of bugs found and fixed, most recent first. For currently open/unfixed issues, see `bug.md`.

---

## 2026-09-13 (round 3)

### BUG-012 — About-highlights: uneven grid track sizing despite `1fr` units
- **Symptom:** After splitting the stats row into `repeat(4, 1fr) <code-ratio>fr`, the resulting column
  widths were wildly uneven (e.g. 150px/180px/166px/117px/159px) instead of the 4 equal + 1 wider
  layout requested — the "wider last column" wasn't even the widest.
- **Root cause:** CSS Grid's `1fr` track has an implicit automatic minimum size of `auto` (its content's
  min-content width), not `0`. Since each stat card's text has a different natural minimum width, the
  tracks fought over remaining space unevenly instead of dividing proportionally.
- **Fix:** Changed to `repeat(4, minmax(0, 1fr)) minmax(0, <ratio>fr)` — wrapping each track in
  `minmax(0, ...)` forces the automatic minimum to `0`, restoring true proportional `fr` distribution.
- **Files:** `styles/home.css`

### BUG-013 — Same row height achieved, but code box centering cropped both edges on overflow
- **Symptom:** Once the code box was narrower than its content by even a few pixels, `justify-content:
  center` on `.code-visual` centered the overflowing content, cropping text on *both* the left and right
  (e.g. "class SoftwareDev" rendered as "oftwareDev").
- **Fix:** Changed to `justify-content: flex-start` so any residual overflow only crops the right edge
  (recoverable via the existing `overflow-x: auto` scrollbar) instead of the start of every line.
- **Files:** `styles/home.css`

### BUG-014 — `display: block` elements don't reveal internal text wrapping via `getClientRects()`
- **Note to self, not a shipped bug:** while tuning column widths, checked `.highlight-number` for
  wrapping using `element.getClientRects().length` — always returns 1 for a block-level element
  regardless of whether its *text content* wraps internally. Had to add `white-space: nowrap` and
  compare `clientWidth` vs `scrollWidth` instead to get a real signal. Left `white-space: nowrap` in
  place since it also serves as the real fix (guarantees single-line numbers).
- **Files:** `styles/home.css`

### Final tuning — stats row layout
- `.about-highlights`: `grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(0, 2.1fr); align-items:
  stretch;` — 4 equal-width stat cards + 1 wider code card, all in one row, all the same height.
- `.highlight-item`: now `display: flex; flex-direction: column; justify-content: center;` so the
  (now-taller, stretched-to-match-code-height) stat cards center their content vertically instead of
  leaving visible dead space at the bottom.
- `.highlight-number`: `font-size: 1.55rem` (down from `2.5rem` originally) with `white-space: nowrap` —
  sized to fit "99.65%"/"7,000+" on one line at the resulting ~127px column width.
- `.code-line`: `font-size: 0.72rem` (down from `1rem`) so the code snippet fits its ~266px column
  without needing to scroll.
- **Files:** `styles/home.css`

---

## 2026-09-13 (round 2)

### BUG-005 — `images/` tracked as `Images/` in git (case mismatch)
- **Symptom:** Every code reference uses lowercase `images/...`, but git's index had the folder as
  `Images/` (capital I). Windows hid this (case-insensitive filesystem), but Firebase Hosting, GitHub,
  Linux, and macOS (case-sensitive) would 404 every image on a fresh clone or in any CI pipeline.
- **Fix:** `git mv` the folder through a temp name to correct the tracked casing to `images/`.
- **Files:** entire `images/` tree (git metadata only, no file content changed)

### BUG-006 — Certificate image filenames with spaces/`&`/commas
- **Symptom:** `Android_App Development_with_Kotlin.png`, `Data_Science using_Python.jpg`,
  `Cyber_Security_&_Ethical_Hacking.jpeg`, `Web_App_Development Using_Apache,_MySQL_and_PHP.jpeg`,
  `Java_Programming_&_Apache_NetBeans_IDE.png` all had characters that are risky in URLs.
- **Fix:** Renamed to `_`-only filenames and updated all `data-image` references in `home.html`.
- **Files:** `images/*`, `home.html`

### BUG-007 — `images/certificate.jpg` never existed
- **Symptom:** "Arcade Trooper Tier" certificate card's detail view tried to load a file that was never
  added, showing a broken-image icon.
- **Fix:** Added an `onerror` fallback in `scripts/home.js` that swaps in an inline SVG placeholder
  ("Certificate image not yet added") instead of a broken-image icon. The real fix — adding the actual
  file — is still open, see `bug.md` OPEN-006.
- **Files:** `scripts/home.js`

### BUG-008 — Stat numbers clipped in the About section
- **Symptom:** `.about-highlights` used `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))`
  with 5 children (4 stat cards + the code snippet card) sharing a 900px-wide container — only ~154px
  per item. `.highlight-number` at `font-size: 2.5rem` needed more width than that for "99.65%" (154px)
  and "7,000+" (139px), so the text overflowed its own box; the *next* card's opaque background then
  painted over the overflow, making the tail end of each number invisible.
- **Fix:** Changed the grid to a fixed `repeat(4, 1fr)` for the 4 stat cards, gave `.code-visual` its own
  full-width row via `grid-column: 1 / -1` (it naturally wraps since there are only 4 columns), and set
  `align-items: start` so the code card's height no longer stretches the shorter stat cards. Reduced
  `.highlight-number` to `2.1rem` as extra margin.
- **Files:** `styles/home.css`

### BUG-009 — Hardware section: one full-width card + one narrow card looked broken
- **Symptom:** `.hardware-card-wide` forced the Hackintosh card to span the full grid width
  (`grid-column: 1 / -1`), leaving the second card ("Cross-Platform Dev Setup") alone on the next row
  at its normal narrow width with a large empty gap beside it.
- **Fix:** Removed the `hardware-card-wide` class and its CSS rule — both cards now sit as equal-width
  siblings in the existing `auto-fit minmax(320px, 1fr)` grid.
- **Files:** `home.html`, `styles/home.css`

### BUG-011 — Featured Projects tilt animation missing entirely (not a CSS bug — a lost feature)
- **Symptom:** User reported the animation that used to make Featured Project cards "move" (hilta tha)
  was gone, and showed a screenshot of a skewed/trapezoid-shaped card — which looked like a rendering
  bug but was actually a real 3D tilt effect caught mid-motion.
- **Root cause:** Compared the live deployed site (`https://ashutosh.tgbagupta.com/`, running the older
  pre-refactor single-file `script.js`) against this repo's current `scripts/home.js`. The live
  `script.js` has a "Project Card Tilt Effect" — a `mousemove` handler on `.project-card` that computes
  `rotateX`/`rotateY` from cursor position and applies
  `perspective(1000px) rotateX(...) rotateY(...) scale(1.02)`. This never existed in `scripts/home.js` —
  it was simply never carried over when the site was restructured into the current multi-page/
  multi-script architecture (see `git log` — the "MVC restructure" commit predates this).
- **Fix:** Ported the exact tilt effect (mousemove + mouseleave handlers) into `scripts/home.js` for
  `.project-card` elements on the homepage. Verified live: hovering now produces the same 3D tilt as
  the deployed site.
- **Note:** `project.html`'s standalone Projects page (`scripts/project.js`) also renders `.project-card`
  elements and does **not** have this effect either — not fixed here since it wasn't what was reported,
  but flagged in `bug.md` for consistency.
- **Files:** `scripts/home.js`

### BUG-010 — Scroll-reveal permanently blocks `:hover` transform on cards
- **Symptom:** The `IntersectionObserver`-based fade-in (`scripts/home.js`) sets
  `element.style.transform = 'translateY(0)'` as an **inline** style and never removes it. Inline styles
  always outrank stylesheet rules regardless of `:hover`, so once a `.project-card` (or
  `.skill-category` / `.timeline-item` / `.certificate-card` / `.hardware-card`) faded in, its CSS
  `:hover { transform: translateY(-8px); }` lift animation could never apply again — hover had no
  visible effect. This was a pre-existing bug (confirmed present in the last git commit before this
  session), not something introduced by earlier fixes in this session.
- **Fix:** After the reveal transition finishes (listened for via `transitionend`), clear the inline
  `transform`/`transition` properties so the element falls back to normal CSS cascade and `:hover`
  rules work again.
- **Files:** `scripts/home.js`

### BUG-001 — Firebase config path broken on 4 of 5 pages
- **Symptom:** Any page except `blog_post.html` (home, 404, blog, project) referenced
  `<script src="credentials.js">`, but the file actually lives at `auth/credentials.js`. The browser
  404'd on that request, so `firebaseConfig` was never defined.
- **Impact:** Any Firebase call on those pages (e.g. the homepage contact form) would throw
  `ReferenceError: firebaseConfig is not defined` at runtime.
- **Fix:** Updated the `<script>` src on all four pages to `auth/credentials.js`.
- **Files:** `home.html`, `404.html`, `blog.html`, `project.html`

### BUG-002 — Duplicate `firebase.initializeApp()` call
- **Symptom:** `auth/credentials.js` calls `firebase.initializeApp(firebaseConfig)` once (loaded on every
  page). `scripts/home.js` called it again on the homepage.
- **Impact:** Firebase throws `FirebaseError: Firebase: Firebase App named '[DEFAULT]' already exists
  (app/duplicate-app)`. Since this happens before `firebase.firestore()` runs, `db` never gets
  initialized, and the contact form's submit handler fails on every attempt.
- **Fix:** Removed the redundant `initializeApp` call from `scripts/home.js`; it now just reuses the
  app already initialized in `auth/credentials.js`.
- **Files:** `scripts/home.js`

### BUG-003 — Hardcoded focus-ring color ignores dark theme
- **Symptom:** `.form-group input:focus` / `textarea:focus` used a literal
  `box-shadow: 0 0 0 4px rgba(103, 80, 164, 0.1)`, which is the *light-theme* accent color baked in.
- **Impact:** In dark mode (`--accent-primary` becomes `#d0bcff`), the focus ring stayed the light
  theme's purple instead of matching the active theme.
- **Fix:** Replaced with `color-mix(in srgb, var(--accent-primary) 15%, transparent)` so it tracks
  the active theme's accent color.
- **Files:** `styles/home.css`

### BUG-004 — Code snippet block can overflow on narrow screens
- **Symptom:** `.code-line` elements inside `.code-visual` use `white-space: nowrap`, but the parent
  had no `overflow-x` handling and lives inside an `auto-fit minmax(150px, 1fr)` grid.
- **Impact:** On viewports at or near 480px, long lines (e.g. `val web = "Angular + NestJS"`) could
  overflow the card's bounds instead of wrapping or scrolling.
- **Fix:** Added `max-width: 100%; overflow-x: auto;` to `.code-visual`.
- **Files:** `styles/home.css`
