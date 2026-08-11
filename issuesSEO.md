# SEO Indexing Audit Report

Based on the Google Search Console (GSC) Page Indexing guidelines, I have reviewed your Next.js application codebase. Below are the potential indexing issues and risks I found, categorized by the specific errors they can trigger in GSC.

---

## 1. Issue: URLs Not Found in Sitemap
**GSC Error Risk:** Discovered - currently not indexed / Not found (404)

### The Problem
You are using the `next-sitemap` package (configured in `next-sitemap.config.js`) to generate your `public/sitemap.xml` and `public/sitemap-0.xml`. 

By default, `next-sitemap` only scans the static files in your `app/` directory (like `page.tsx`, `services/page.tsx`, etc.). It **does not** automatically know about your dynamic pages (e.g., `[slug]/page.tsx` for blogs and services) unless explicitly told via an `additionalPaths` function.

Because of this, your dynamic blogs and service pages won't be in the generated sitemap when you build your project. Google may eventually find them via internal links, but lacking a sitemap entry significantly slows down crawling and discovery.

### Recommendation
Update `next-sitemap.config.js` to dynamically fetch the slugs from `lib/blog-data.ts` and `lib/services-data.ts` and inject them into the sitemap, OR migrate to Next.js App Router's native `app/sitemap.ts` which handles dynamic generation much more easily.

---

## 2. Issue: Missing Canonical Tags
**GSC Error Risk:** Duplicate without user-selected canonical / Alternate page with proper canonical tag

### The Problem
Search engines use canonical tags to understand which version of a URL is the "master" version (e.g., ignoring tracking parameters like `?ref=twitter`).

I checked your pages and found that while most of your pages (like `/services`, `/work`, and the dynamic blogs) correctly define `alternates: { canonical: ... }` in their `metadata` object, the **FAQ page (`app/faq/page.tsx`) is missing a canonical tag.**

### Recommendation
Add the following to the `metadata` export in `app/faq/page.tsx`:
```typescript
alternates: { canonical: "https://www.launchlive.studio/faq" }
```

---

## 3. Issue: Blocking AI Crawlers in robots.txt
**GSC Error Risk:** Indexed, though blocked by robots.txt / URL blocked by robots.txt

### The Problem
Your `next-sitemap.config.js` and `public/robots.txt` explicitly disallow `Google-Extended` and `GPTBot`. 

While this prevents AI companies from scraping your data for training, blocking `Google-Extended` also prevents your site from being cited as a source in **Google AI Overviews** (the AI summaries at the top of Google Search) and Google Gemini. 

If your goal is to maximize organic reach and visibility, blocking Google's AI crawler might harm your "Generative Engine Optimization" (GEO) efforts.

### Recommendation
Consider removing the `Disallow` rule for `Google-Extended` in `next-sitemap.config.js` if you want your agency to be recommended by Google's AI search features.

---

## 4. Expected Behavior: Redirects
**GSC Status:** Page with redirect

### The Setup
In your `next.config.mjs`, you have a permanent redirect (301) configured from `/resources` to `/blogs`. 

### Impact
When Google crawls `/resources`, it will successfully follow the 301 redirect to `/blogs`. In GSC, `/resources` will appear under the **"Page with redirect"** status in the "Not indexed" category. 

**This is entirely normal and working as intended.** You do not need to "fix" this, as it is the correct SEO practice for renamed or consolidated pages. There are no redirect loops or chains present.
