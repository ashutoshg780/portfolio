# Test Plan

This project has no automated test suite (see `docs/bug.md` OPEN-004) — it's a static HTML/CSS/JS site.
This file is the manual test plan covering every check that should be run before each deploy. Record
actual results in `test_result.md`, not here.

## 1. Functional tests

| # | Test | Steps | Expected |
|---|------|-------|----------|
| F1 | Homepage loads | Open `home.html` | Navbar, hero, all sections render; no console errors |
| F2 | Redirect shim | Open `index.html` | Auto-redirects to `home.html` within ~1s; manual link works if it doesn't |
| F3 | Theme toggle | Click the sun/moon button | Theme flips light↔dark instantly; persists on reload (localStorage) |
| F4 | Nav smooth scroll | Click each navbar link | Page scrolls smoothly to the matching section, offset for fixed navbar |
| F5 | Mobile nav toggle | Resize to ≤768px, click hamburger | Menu slides open/closed; closes after clicking a link |
| F6 | Resume download (hero) | Click "Download Resume" in hero | `Ashutosh_Gupta_Resume.pdf` downloads, opens as a valid 2-page PDF |
| F7 | Resume download (navbar) | Click "Resume ⬇" in navbar | Same file downloads correctly |
| F8 | Contact form submit | Fill all fields, click Send | Button shows "Sending…" → "Message Sent! ✓"; no console errors; new doc appears in Firestore `contact_forms` |
| F9 | Contact form validation | Submit with empty required fields | Native HTML5 validation blocks submit |
| F10 | Certificate detail view | Click a certificate card | Detail panel opens with matching image/title/issuer; close button returns to grid |
| F11 | Hardware "read more" toggle | Click "Read the full build story" | Extended Hackintosh text expands; button label flips; click again to collapse |
| F12 | Skill bars animate | Scroll to Skills section | Progress bars animate from 0 to their target width on first view only |
| F13 | Scroll-reveal animations | Scroll through the page | Project/skill/timeline/certificate/hardware cards fade+slide in once, not repeatedly |
| F14 | Back-to-top button | Scroll down 300px+ | Button fades in; click scrolls smoothly to top |
| F15 | External links | Click Play Store / GitHub / LinkedIn links | Open in new tab (`target="_blank"`), correct destination, `rel="noopener noreferrer"` present |

## 2. Cross-browser tests
Run F1–F15 on:
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Safari (desktop or iOS, if available)
- [ ] Chrome (Android)
- [ ] Safari (iOS)

## 3. Responsive / viewport tests
Check layout at each breakpoint (no horizontal scroll, no overlapping text, images scale correctly):
- [ ] 1440px (large desktop)
- [ ] 1024px (small desktop / large tablet)
- [ ] 768px (tablet — nav switches to hamburger)
- [ ] 480px (large phone)
- [ ] 360px (small phone)

Pay particular attention to:
- Hero section (`.hero-content` collapses to single column ≤968px)
- `.code-visual` code block inside About (previously an overflow risk — see `docs/bug_fix.md` BUG-004)
- Certificates grid/detail split view collapsing to stacked layout
- Projects grid collapsing from 3 → 2 → 1 columns

## 4. Theme (light/dark) tests
- [ ] All sections re-check in dark mode: text contrast readable, no hardcoded colors bleeding through
      (previously an issue with the contact form focus ring — see `docs/bug_fix.md` BUG-003)
- [ ] Theme persists across a full page reload and across navigating to another page (e.g. `blog.html`)

## 5. Accessibility (manual pass)
- [ ] Tab through the entire page with keyboard only — every interactive element reachable, visible
      focus outline (`*:focus-visible` in `styles/styles.css`)
- [ ] All images have meaningful `alt` text
- [ ] Color contrast of body text vs. background meets WCAG AA in both themes
- [ ] Form inputs have associated labels or clear placeholders announced by screen readers

## 6. Performance / asset checks
- [ ] No broken image links (check Network tab for 404s)
- [ ] No broken script/stylesheet links (check Network tab / Console for 404s — this is exactly the
      class of bug found in `docs/bug_fix.md` BUG-001)
- [ ] Total page weight reasonable (images not egregiously oversized for their display size)
- [ ] No console errors or warnings on any page load

## 7. Deployment sanity check (Firebase Hosting)
- [ ] `firebase deploy` completes without error
- [ ] Deployed URL serves `home.html` correctly, including `documents/Ashutosh_Gupta_Resume.pdf`
- [ ] `auth/credentials.js` and `auth/firebase.json` are NOT excluded by Firebase Hosting's `ignore`
      rules (check `auth/firebase.json`'s `hosting.ignore` list)
