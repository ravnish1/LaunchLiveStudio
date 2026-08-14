# Indexing Implementation Plan — LaunchLive Studio (Updated)

> Step-by-step implementation plan derived from [indexAsap.md](./indexAsap.md).
> Updated after verifying GSC already has a sitemap submitted (17 pages, Status: Success).

---

## Root Cause Analysis

The sitemap exists at `public/sitemap.xml` and `public/sitemap-0.xml` — but it's a **static hardcoded file** with two critical issues:

1. **No blog post URLs.** The sitemap contains 17 static pages but **zero** `/blogs/[slug]` entries. Google has discovered your blog pages through internal links but has no sitemap signal to prioritize crawling them.
2. **Stale timestamps.** All `lastmod` dates are frozen at `2026-08-11`. Google sees no freshness signal, so it deprioritizes re-crawling.
3. **Flat priority.** Every single page has `priority: 0.7`. The homepage should be `1.0`, blog listing `0.9`, etc. — differentiated priority helps Google allocate crawl budget.

**The fix:** Replace the static XML files with a dynamic `app/sitemap.ts` that auto-includes all blog posts and uses correct priorities.

---

## Phase 1: Fix the Sitemap (Critical)

### Task 1.1 — Replace static sitemap with dynamic `app/sitemap.ts`

**Delete:** `public/sitemap.xml` and `public/sitemap-0.xml`
**Create:** `app/sitemap.ts` (NEW)
**Time:** 10 minutes

**What to do:**
- Delete the two static XML files from `/public/`.
- Create `app/sitemap.ts` using Next.js's built-in `MetadataRoute.Sitemap` convention.
- Import `BLOG_POSTS` from `@/lib/blog-data` so every blog post URL is automatically included whenever a new post is added.
- Include all 17 existing static routes plus all blog post URLs.
- Set differentiated priorities: homepage `1.0`, `/blogs` and `/book-a-call` at `0.9`, service/blog pages at `0.8`, utility pages at `0.5`.

**Verify:** Run `npm run build`, then check `http://localhost:3000/sitemap.xml` — it should now list all blog posts alongside static pages.

---

### Task 1.2 — Create `app/robots.ts`

**File:** `app/robots.ts` (NEW)
**Time:** 5 minutes

No `robots.txt` exists currently. The homepage's metadata has a `robots` field (in `page.tsx` line 40-51), but there's no site-wide `robots.txt` file pointing Google to the sitemap.

**What to do:**
- Create `app/robots.ts` using Next.js `MetadataRoute.Robots`.
- Allow all crawlers on `/`.
- Disallow `/api/`.
- Point to `https://www.launchlive.studio/sitemap.xml`.

**Verify:** After build, confirm `http://localhost:3000/robots.txt` renders correctly.

---

### Task 1.3 — Deploy & Re-submit Sitemap

**Time:** 5 minutes (manual)
1. Deploy to Vercel.
2. In GSC, delete the old `/sitemap.xml` submission.
3. Re-submit `sitemap.xml` — Google will now pick up the blog post URLs.

---

## Phase 2: Fix OG Metadata (High Priority)

### Task 2.1 — Fix Blog Post OG Image Bug

**File:** `app/blogs/[slug]/page.tsx` — lines 30 and 44
**Time:** 5 minutes

**What to do:**
- Line 30: Change `url: "/og-preview.jpg"` → `url: post.image`
- Line 44: Change `images: ["/og-preview.jpg"]` → `images: [post.image]`

This ensures Google and social platforms see a unique image per blog post instead of the same generic preview.

**Verify:** View page source on any blog post and confirm the `og:image` meta tag shows the post-specific image.

---

## Phase 3: Strengthen Internal Linking (High Priority)

### Task 3.1 — Add "Latest Blogs" Section to Homepage

**File:** `app/page.tsx` — around line 134
**Time:** 15 minutes

**What to do:**
- Create a section that renders the 3 most recent `BLOG_POSTS` entries as cards.
- Place it between `<FeaturedProduct />` and `<Testimonials />`.
- Each card links to `/blogs/[slug]`.
- Add a "View All Insights →" link to `/blogs`.

**Why:** The homepage is the most authoritative page. Links FROM it carry the strongest crawl signal. Currently no blog content appears on the homepage body — only in the Navbar and Footer.

**Verify:** Confirm blog cards render on the homepage with working links.

---

### Task 3.2 — Audit Internal Links in Blog Content

**File:** `lib/blog-data.ts` — each post's `content` field
**Time:** 15 minutes

**What to do:**
- Ensure every blog post has at least 2 internal links (to `/services/[slug]`, `/book-a-call`, or other blog posts).
- Ensure every post has at least 1 external authoritative link.
- Focus on: `gen-z-finance-sports-betting-instead-of-stocks` and `custom-software-vs-shopify-which-is-right-for-your-business`.

**Verify:** Read each post on the live site and click every link.

---

## Phase 4: Content Quality (Medium Priority)

### Task 4.1 — Review Thin Posts

**File:** `lib/blog-data.ts`
**Time:** 10 minutes

**What to do:**
- Check `custom-software-vs-shopify-which-is-right-for-your-business` meets 800+ words and has 4+ H2 headings.
- If thin, expand with additional sections or a comparison table.

---

### Task 4.2 — Run PageSpeed Insights Audit

**Time:** 10 minutes (manual)
1. Test `https://www.launchlive.studio/` on https://pagespeed.web.dev/
2. Aim for 90+ mobile score.
3. Check for large unoptimized images and CLS issues.

---

## Phase 5: Manual GSC Actions (After Deploying Phases 1–3)

### Task 5.1 — Request Indexing for All Pages

**Time:** 10 minutes (manual)

Use URL Inspection tool in GSC and click "Request Indexing" for:
- `https://www.launchlive.studio/`
- `https://www.launchlive.studio/blogs`
- `https://www.launchlive.studio/services`
- `https://www.launchlive.studio/book-a-call`
- `https://www.launchlive.studio/blogs/trezor-breach-third-party-supply-chain-security`
- `https://www.launchlive.studio/blogs/gen-z-finance-sports-betting-instead-of-stocks`
- `https://www.launchlive.studio/blogs/nvidia-ai-factory-compute-investable-asset-class`
- `https://www.launchlive.studio/blogs/ios-development-in-2026-myths-reality-and-your-path`

---

## Execution Checklist

| # | Task | Phase | Status |
|---|------|-------|--------|
| 1.1 | Replace static sitemap with dynamic `app/sitemap.ts` | Phase 1 | [x] Completed |
| 1.2 | Create `app/robots.ts` | Phase 1 | [x] Completed |
| 1.3 | Deploy & re-submit sitemap in GSC | Phase 1 | [ ] Pending Deploy |
| 2.1 | Fix blog OG image in `[slug]/page.tsx` | Phase 2 | [x] Completed |
| 3.1 | Add "Latest Blogs" section to homepage | Phase 3 | [x] Completed |
| 3.2 | Audit & add internal links to blog posts | Phase 3 | [x] Completed |
| 4.1 | Review thin blog post content | Phase 4 | [x] Completed |
| 4.2 | Run PageSpeed Insights audit | Phase 4 | [ ] Next Step |
| 5.1 | Request indexing in GSC for all key pages | Phase 5 | [ ] Next Step |
