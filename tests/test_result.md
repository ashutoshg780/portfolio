# Test Results

Log actual test runs here against the plan in `test.md`. One entry per test pass.

---

## 2026-09-13 — Post-fix verification (manual code review only)

**Scope:** Verified the specific fixes made this session by reading the changed files; this was a code
-level check, not a full browser test pass (see "Not yet verified" below).

| Test ref | Result | Notes |
|----------|--------|-------|
| Path fix: `credentials.js` → `auth/credentials.js` | ✅ Verified in source | Confirmed via grep across `home.html`, `404.html`, `blog.html`, `project.html`, `blog_post.html` — all 5 now point to the same correct path |
| Duplicate `initializeApp()` removed | ✅ Verified in source | `scripts/home.js` no longer calls `firebase.initializeApp`; relies on the one call in `auth/credentials.js` |
| Resume PDF generation | ✅ Verified | Generated via `reportlab`, confirmed 2 pages via `pypdf.PdfReader` (`len(reader.pages) == 2`) |
| Resume links present | ✅ Verified in source | Hero CTA and navbar both link to `documents/Ashutosh_Gupta_Resume.pdf` with the `download` attribute |
| `.code-visual` overflow fix | ✅ Verified in source | `max-width: 100%; overflow-x: auto;` added |
| Focus-ring dark mode fix | ✅ Verified in source | `color-mix(in srgb, var(--accent-primary) 15%, transparent)` replaces the hardcoded RGBA |
| Hardware section content | ✅ Verified in source | Placeholder text replaced; toggle JS wired up in `scripts/home.js` |

### Not yet verified (needs a real browser pass)
The following from `test.md` require actually opening the site in a browser and were **not** run this
session — they should be run before the next deploy:
- F3 (theme toggle), F4 (smooth scroll), F5 (mobile nav), F6/F7 (actual PDF download + open),
  F8/F9 (contact form live submission to Firestore), F10 (certificate detail view),
  F11 (hardware toggle interaction), F12/F13 (scroll animations)
- All of Section 2 (cross-browser), Section 3 (responsive breakpoints), Section 4 (dark mode visual
  pass), Section 5 (accessibility), Section 6 (performance/asset 404 check), Section 7 (Firebase deploy)

**Recommendation:** Run `firebase serve` (or open `home.html` directly) and step through `test.md`
Sections 1–6 before the next production deploy, since this session's checks were static-analysis only.
