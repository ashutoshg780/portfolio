# Implementation Notes

Notes on work that has been decided and actually built (as opposed to `new_feature.md`, which is
proposals only). One section per implemented feature/change.

---

## Resume download (2026-09-13)

**Decision:** Add a downloadable resume without introducing a build step or a second page — the site
stays a single-page deployment (`home.html`).

**Implementation:**
- Resume content generated as a static PDF via a one-off Python script (`reportlab`), built from the
  same experience/project/skills data already on the homepage, condensed to a standard 2-page
  ATS-friendly resume format (single column, no graphics, so it parses cleanly through applicant
  tracking systems).
- Saved to `documents/Ashutosh_Gupta_Resume.pdf`, served as a static asset under Firebase Hosting's
  `public: "."` root (see `auth/firebase.json`).
- Two entry points, both `<a href="documents/Ashutosh_Gupta_Resume.pdf" download>`:
  - Hero section CTA row (`home.html`, alongside "View My Work" / "Get In Touch")
  - Navbar (`components/navbar.html`), styled as a pill button (`.nav-resume-btn` in `styles/home.css`)
- No JavaScript required — the `download` attribute handles the file download natively.

**Trade-off accepted:** The PDF is manually regenerated, not derived automatically from
`data/projects.json` at build/deploy time. See `new_feature.md` ("Auto-regenerate resume PDF") for the
alternative that was considered and deferred.

---

## Hardware & Systems section content (2026-09-13)

**Decision:** Replace the two placeholder cards with real content, but keep the page from becoming a
wall of text by using a collapsed/expanded pattern rather than a separate page.

**Implementation:**
- `.hardware-card-wide` makes the Hackintosh card span the full grid width (`grid-column: 1 / -1`) since
  it has meaningfully more content than a standard card.
- Two paragraphs: a short always-visible summary (`.hardware-summary`), and a longer one
  (`.hardware-summary.hardware-more`) that's `display: none` until the card gets an `.expanded` class.
- A plain `<button class="hardware-toggle">` toggles `.expanded` on its parent `.hardware-card` and
  flips its own label between "Read the full build story ↓" / "Show less ↑" — wired up in
  `scripts/home.js` under "Hardware Section — Read More Toggle".
- Second card repurposed from an empty placeholder into "Cross-Platform Dev Setup," summarizing why the
  Hackintosh exists (validating iOS/Desktop/Web targets for KMP/CMP projects) instead of leaving it as
  a "more coming soon" stub.
