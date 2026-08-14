# Index ASAP — LaunchLive Studio Indexing Action Plan

> Based on analysis of your GSC error ("Discovered – currently not indexed") and your Next.js codebase at `launchlive.studio`.

---

## CRITICAL: No Sitemap Found

**This is likely your #1 reason pages are not being indexed.**

Google found your URLs but can't prioritize them because there is no `sitemap.xml` submitted in Search Console. Your codebase has **no `sitemap.ts` or `sitemap.xml`** in the `/app` directory.

### Fix: Create `/app/sitemap.ts`

```ts
import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `https://www.launchlive.studio/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.launchlive.studio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.launchlive.studio/blogs',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.launchlive.studio/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.launchlive.studio/work',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.launchlive.studio/book-a-call',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.launchlive.studio/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.launchlive.studio/testimonials',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...blogUrls,
  ]
}
```

After deploying, go to **Google Search Console → Sitemaps** and submit:
`https://www.launchlive.studio/sitemap.xml`

---

## CRITICAL: No `robots.txt` Found

There is no `robots.ts` file, which means Googlebot has no explicit guidance on what to crawl or where to find the sitemap.

### Fix: Create `/app/robots.ts`

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://www.launchlive.studio/sitemap.xml',
  }
}
```

---

## HIGH PRIORITY: Fix Internal Linking

Google uses internal links to discover and prioritize pages. Weak internal linking is a core reason pages stay in "Discovered" limbo.

### Checklist:
- [ ] **Homepage → `/blogs`**: Add a "Read Our Latest Insights" section or button on the homepage pointing to `/blogs`.
- [ ] **Homepage → `/services`**: Confirm the link uses Next.js `<Link>` not a bare `<a>` tag.
- [ ] **Blog posts → Related blog posts**: In `BlogPostClient.tsx`, add a "Related Articles" section at the bottom linking to 2–3 other posts from `BLOG_POSTS`.
- [ ] **Blog posts → Service pages**: Each blog post CTA should link to a relevant `/services/[slug]` page, not just `/book-a-call`.
- [ ] **Footer**: Verify the Footer component links to all main routes — `/blogs`, `/services`, `/work`, `/faq`, `/testimonials`.

---

## HIGH PRIORITY: Fix Blog Post OG Image

In `app/blogs/[slug]/page.tsx` (line 30), the Open Graph image for **all** blog posts is hardcoded to the generic `/og-preview.jpg`. This is a bug — every post looks the same to crawlers.

```ts
// CURRENT (wrong — same image for every blog post)
images: [{ url: "/og-preview.jpg", width: 1200, height: 630, alt: post.title }]

// FIX — use the post's own image
images: [{ url: post.image, width: 1200, height: 630, alt: post.title }]
```

Google uses OG images to understand individual page content. Unique images per post improve both crawl priority and click-through rates from search results.

---

## MEDIUM PRIORITY: Content Quality Standards

Google deprioritizes thin content. Every blog post should meet these minimums:

| Metric | Minimum Target |
|--------|----------------|
| Word count | 800+ words |
| H2 headings | At least 4 |
| Internal links | At least 2 links to other pages on the site |
| External links | At least 1 authoritative outbound link |
| Images | At least 1 with a descriptive `alt` attribute |

**Current blog post audit:**
- `trezor-breach-third-party-supply-chain-security` — Good structure, has FAQ, has backlinks
- `gen-z-finance-sports-betting-instead-of-stocks` — Long-form, detailed, good
- `nvidia-ai-factory-compute-investable-asset-class` — Has a summary table, good
- `ios-development-in-2026-myths-reality-and-your-path` — Longest post, excellent
- `custom-software-vs-shopify-which-is-right-for-your-business` — Review word count and internal links

---

## MEDIUM PRIORITY: Page Speed (Core Web Vitals)

Google uses Core Web Vitals as a ranking AND indexing signal. Your site already uses Vercel Analytics and SpeedInsights which is great. Also check:

- [ ] All images use `next/image` with a proper `sizes` attribute
- [ ] No large unoptimized images above the fold on blog posts
- [ ] Fonts load via `next/font` (already done in `layout.tsx`)

Run a PageSpeed Insights test on `https://www.launchlive.studio/` and aim for **90+ on mobile**.

---

## MANUAL ACTIONS — Do These Today (5 minutes)

1. **Request Indexing for the Homepage:**
   - Open Google Search Console
   - Paste `https://www.launchlive.studio/` into the URL Inspection bar at the top
   - Click **"Request Indexing"**

2. **Repeat for each key page:**
   - `https://www.launchlive.studio/blogs`
   - `https://www.launchlive.studio/services`
   - `https://www.launchlive.studio/book-a-call`
   - `https://www.launchlive.studio/blogs/trezor-breach-third-party-supply-chain-security`

3. **Submit Sitemap after deploying `sitemap.ts`:**
   - GSC → Sitemaps → New sitemap → Enter `sitemap.xml` → Submit

---

## Summary Priority Order

| # | Action | Impact | Time |
|---|--------|--------|------|
| 1 | Create `app/sitemap.ts` & submit in GSC | Critical | 10 min |
| 2 | Create `app/robots.ts` | Critical | 5 min |
| 3 | Request indexing manually in GSC | High | 5 min |
| 4 | Fix blog OG image bug (line 30 in slug/page.tsx) | High | 5 min |
| 5 | Add "Related Articles" links to each blog post | High | 30 min |
| 6 | Add `/blogs` link to Homepage | High | 10 min |
| 7 | Audit Footer contains links to all routes | Medium | 10 min |
| 8 | Run PageSpeed Insights & fix issues | Medium | Varies |
