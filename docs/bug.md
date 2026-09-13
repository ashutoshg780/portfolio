# Known / Open Bugs

Issues that are known but not yet fixed. Move an entry to `bug_fix.md` once it's resolved.

---

### OPEN-001 — Weak "confirmation code" gate on blog publishing
- **Where:** `auth/credentials.js` — `blog_post.postcode = 121212`
- **Description:** A hardcoded 6-digit code, visible to anyone who views source, is used as a
  confirmation step before publishing a blog post. It's not a real access-control mechanism since it
  ships in plaintext client-side JS.
- **Risk:** Low (this appears to be a "did you mean to publish" guard, not the actual auth boundary —
  publishing presumably still requires being signed in via Firebase Auth) but worth confirming, and
  worth not treating this code as a secret.
- **Suggested fix:** Confirm real write access to Firestore/Storage is enforced by Firebase Security
  Rules requiring authentication, independent of this code. If so, this can stay as a UX safeguard; if
  not, it needs to move server-side.

### OPEN-002 — Stray non-project files at repo root
- **Where:** `test.kt`, `test copy.kt`
- **Description:** `test.kt` contains a project-structure note (not real Kotlin), and `test copy.kt`
  is an unrelated LeetCode solution (`findMedianSortedArrays`). Neither belongs in this web project.
- **Suggested fix:** Delete both, or move the structure note's content into this `docs/` folder if it's
  still useful as reference.

### OPEN-003 — README.md and readme/DEPLOYMENT.md are stale
- **Where:** `README.md`, `readme/DEPLOYMENT.md`
- **Description:** `README.md` documents an older generic template structure (`projects.html`,
  root-level `styles.css`/`script.js`, an `assets/` folder) that no longer matches the real file layout.
  `DEPLOYMENT.md` documents deploying to GitHub Pages, but the project is actually configured for
  Firebase Hosting (`.firebaserc`, `auth/firebase.json`).
- **Suggested fix:** Rewrite both to describe the current structure and the actual Firebase Hosting
  deploy flow (`firebase deploy`).

### OPEN-005 — `images/Advanced.gif` and `images/Premium+.gif` are corrupted (solid color, no badge art)
- **Where:** `images/Advanced.gif`, `images/Premium+.gif` (Google Cloud Arcade certificate detail images)
- **Description:** Both files load successfully (no 404, valid image, correct dimensions ~940×788) but
  contain nothing but a solid dark-navy rectangle — no visible badge/certificate artwork. Confirmed by
  reading the raw file content directly, not a display bug. `images/CCC_Certificate.png` and
  `images/Data_Science_using_Python.jpg` were checked for comparison and are fine (real certificate
  images render correctly).
- **Risk:** Cosmetic but visible — clicking "Advanced Milestone" or "Premium+ Milestone" in Certificates
  shows a blank dark box instead of the actual badge.
- **Suggested fix:** Re-export/re-save these two GIFs from the original Google Cloud Arcade source (the
  files as committed are not fixable in code — this is bad source data, not a CSS/JS bug).

### OPEN-006 — `images/certificate.jpg` still does not exist
- **Where:** `home.html` — "Arcade Trooper Tier" card, `data-image="images/certificate.jpg"`
- **Description:** No file at this path was ever provided. `scripts/home.js` now shows a graceful
  "Certificate image not yet added" placeholder instead of a broken-image icon (see `bug_fix.md`), but
  the real fix is still to add the actual certificate scan/screenshot at that path.

### OPEN-007 — `project.html` missing the same tilt effect as `home.html`
- **Where:** `scripts/project.js`, `project.html`
- **Description:** The mouse-tracking 3D tilt effect restored on Featured Projects (`scripts/home.js`,
  see `bug_fix.md` BUG-011) also exists on the live deployed site for the standalone Projects page, but
  `scripts/project.js` doesn't have it either. Not fixed yet since it wasn't reported.
- **Suggested fix:** Port the same `mousemove`/`mouseleave` handler into `scripts/project.js`.

### OPEN-004 — No automated tests exist
- **Where:** project-wide
- **Description:** This is a plain HTML/CSS/JS site with no test runner, no CI, and no automated
  checks (link validation, accessibility, visual regression). See `tests/test.md` for the manual test
  plan currently in place instead.
