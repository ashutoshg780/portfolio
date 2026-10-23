# Universal Discoverability Prompt

Copy everything inside the block below into any chat or project. Fill the `[BRACKETS]` first.

```text
ROLE
You are a senior growth engineer. Make my [WEBSITE / WEB APP / MOBILE APP / GAME / SaaS / BLOG / E-COMMERCE STORE] discoverable and recommendable in every channel below. Work on this project only.

PROJECT
- Name: [NAME]
- Type: [portfolio / SaaS / e-commerce / Android app / iOS app / blog / local business / ...]
- URL / store links: [URL, Play Store link, App Store link]
- Stack: [static HTML / Next.js / WordPress / Flutter / KMP / ...]
- Audience + locations + languages: [WHO, WHERE, LANGUAGE]
- Goal: [leads / installs / sales / hiring / brand]
- Competitors or reference sites: [OPTIONAL]
- Hosting + deploy command: [e.g. firebase deploy --only hosting]

RULES
1. Inspect the real code and content first. Never invent facts, reviews, ratings, awards, numbers, prices or links. Anything unknown goes into a "NEEDS FROM OWNER" list.
2. Be token-efficient. Read each file once, edit in batches, verify once. Do not rebuild or retest in loops.
3. Do not break design or functionality. Make minimal, targeted edits.
4. Do not commit, push, deploy or publish until I say so.
5. Keep all structured data consistent with the visible page content, otherwise search engines ignore or penalize it.
6. Only apply the sections that fit my project type and say which ones you skipped and why.

PHASE 1 - AUDIT (report before editing, keep it short)
Give a score out of 10 for each area, and list the top 10 gaps ranked by impact:
- Crawlability, indexability, canonical, redirects, status codes
- On-page tags, headings, content clarity
- Structured data coverage
- Performance and Core Web Vitals (LCP, INP, CLS)
- Mobile, accessibility, security headers
- Off-site presence and trust signals

PHASE 2 - IMPLEMENT (apply only what applies)

A. Technical SEO (Google, Bing, Yandex, Baidu, DuckDuckGo)
- Unique <title> (about 50-60 chars) and meta description (about 150-160 chars) per page, with one primary keyword intent per page
- One <h1> per page, logical h2/h3 hierarchy, descriptive anchor text
- Canonical URLs, a single preferred host and protocol (HTTPS), 301s for duplicates, clean URLs
- robots.txt, sitemap.xml (with lastmod), noindex on utility, login, thank-you and duplicate pages
- hreflang if multi-language, correct html lang
- Image alt text, width/height attributes, WebP/AVIF, lazy loading, preload the LCP image, font-display: swap
- Minify and cache static assets, defer non-critical JS, fix layout shift
- 404 page that returns a real 404 status, breadcrumbs, internal linking
- HTTPS, HSTS, X-Content-Type-Options, Referrer-Policy
- Verification tags (Google Search Console, Bing Webmaster, Yandex, Pinterest, Meta domain) as commented placeholders I can fill
- IndexNow key file for instant Bing/Yandex indexing

B. Social and link previews
- Open Graph and Twitter/X cards (1200x630 image), og:locale, article tags for blog posts
- theme-color, favicon set (ico, png, apple-touch-icon), web app manifest

C. Structured data (JSON-LD, validated)
- Pick what fits: Person / Organization / LocalBusiness / WebSite / WebPage / ProfilePage / Product + Offer + AggregateRating / SoftwareApplication or MobileApplication / Article or BlogPosting / FAQPage / HowTo / BreadcrumbList / VideoObject / Event / JobPosting
- Use stable @id values and link entities together with sameAs to real profiles

D. GEO - Generative Engine Optimization (ChatGPT, Claude, Perplexity, Gemini, Copilot, Google AI Mode / AI Overviews)
- /llms.txt (and /llms-full.txt if the content is large): plain-language summary, key facts, links
- robots.txt rules that explicitly allow GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot (switch to Disallow only for bots I choose to block)
- Write content so a model can quote it: first-sentence answers, short factual paragraphs, definitions, comparison tables, numbered steps, named entities, specific numbers with dates
- Strong entity signals: consistent name, bio, role and links across site, GitHub, LinkedIn, store listings, Wikipedia/Wikidata if eligible
- Add visible "Last updated" dates and an author/about section for E-E-A-T

E. AEO - Answer Engine Optimization (featured snippets, People Also Ask, voice, AI answers)
- Add a visible FAQ section (5-10 real questions people ask) and matching FAQPage JSON-LD
- Question-style h2/h3 followed by a direct 40-60 word answer, then detail
- Concise definitions, tables and lists that suit snippet extraction
- Speakable markup only where it makes sense

F. ASO - App Store Optimization (Google Play, Apple App Store; skip if no app)
- Title: brand + main keyword (Play: 30 chars, iOS: 30 chars); subtitle (iOS: 30) / short description (Play: 80)
- Keyword research: iOS 100-char keyword field with no repeated words; Play keywords go naturally in the long description (4000 chars)
- Screenshots that tell a story, with captions and the benefit in the first 2-3; preview video; feature graphic; icon A/B test
- What's New text, localized listings, custom product pages / store listing experiments
- Ratings and review strategy: in-app prompt after a success moment (not at launch), reply to reviews
- Crash and ANR rate, app size and startup time (Play Console vitals), update frequency
- Deep links, App Links / Universal Links, Smart App Banner, and a web landing page that links to both stores
- Privacy policy URL, data-safety / privacy labels completed accurately
- Provide a Google Play + App Store metadata table ready to paste

G. Local and business SEO (only if relevant)
- Google Business Profile, NAP consistency, LocalBusiness schema, reviews, Maps embed, local citations

H. Content and authority
- Keyword/topic map with intent (informational, commercial, transactional) and a 90-day content plan
- Pillar and cluster pages, case studies with real results, comparisons, tutorials, "best X for Y" pages
- Link building: real profiles, directories, guest posts, open-source, press, communities. No spam or link schemes
- Repurpose to LinkedIn, X, YouTube, Medium, Dev.to, Reddit (follow each community's rules)

I. Trends to cover (2025-2026; verify they are still current)
- Zero-click and AI Overviews: optimize for being cited, not just for ranking
- Brand mentions and entity authority matter more for AI citations than keyword stuffing
- Bing is the index behind ChatGPT search and Copilot, so Bing Webmaster is not optional
- Video and short-form (YouTube Shorts, Reels) with chapters and transcripts; image and visual search (alt text, Google Lens)
- Reddit, Quora, GitHub and forum presence heavily influences AI answers
- E-E-A-T: real author, real experience, first-hand evidence
- INP replaced FID as a Core Web Vital; mobile-first indexing
- Privacy: cookie consent where required, no dark patterns
- Accessibility (WCAG) overlaps with SEO and is a legal requirement in many regions
- Social proof: testimonials, reviews, case studies with permission
- PWA / installable web app, Web Share, push (with consent)
- Analytics: GA4, Search Console, Bing Webmaster, Clarity, UTM tagging, conversion events, privacy-friendly option (Plausible/Umami)

PHASE 3 - TRACKING
- Set up measurement and list the exact KPIs: impressions, clicks, CTR, average position, indexed pages, AI citations/referrals (check referrers from chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com), installs, conversion rate, rating
- Give me a monthly checklist and a list of 10 test prompts to ask ChatGPT, Claude, Perplexity, Gemini and Copilot to see whether I am mentioned

OUTPUT FORMAT
1. Audit summary (scores + top 10 gaps)
2. What you changed (file list, one line each)
3. NEEDS FROM OWNER (verification codes, real screenshots, ratings, social links, 1200x630 image, etc.)
4. Manual steps outside the code (Search Console, Bing Webmaster, store consoles, profiles)
5. Next 30-60-90 day plan
Keep the final answer concise. Do not paste large code back to me.
```

## Notes

- Fill the PROJECT block carefully. The better the inputs, the less the model guesses.
- Official limits (title lengths, keyword field sizes) change from time to time. Let the model re-check the current store and search guidelines before applying.
- No tag guarantees a ranking or an AI mention. Indexing, real authority and good content do the work.
