# Google Search Console Audit: "Discovered – currently not indexed"

> **Status:** Diagnosed & Documented  
> **Target Domain:** [https://www.launchlive.studio](https://www.launchlive.studio)  
> **Affected Scope:** Blog posts (`/blogs/[slug]`), service subpages, and dynamic routes.

---

## 1. Executive Summary & Root Cause Analysis

In Google Search Console (GSC), **"Discovered – currently not indexed"** means Google has encountered the URL (via sitemap, internal links, or external referrals) and added it to its crawling queue, but has **not yet crawled or indexed the page**.

Through our comprehensive technical SEO audit of the LaunchLive Studio codebase, we uncovered **4 critical architectural reasons** why Googlebot delays or deprioritizes crawling these pages:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                   HOW GOOGLEBOT CURRENTLY SEES YOUR PAGES                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Googlebot discovers URL: https://www.launchlive.studio/blogs/[slug]           │
│                                    │                                             │
│                                    ▼                                             │
│ 2. Googlebot fetches raw initial Server HTML                                     │
│    ❌ Issue: ClientReveal / SmoothScroll with { ssr: false } renders EMPTY body! │
│    HTML received: <body ...><div hidden=""><!--$--><!--/$--></div>               │
│                                    │                                             │
│                                    ▼                                             │
│ 3. Googlebot classifies page as "Thin / Empty Shell"                             │
│    Google postpones expensive headless JavaScript rendering stage                │
│                                    │                                             │
│                                    ▼                                             │
│ 4. Result in GSC: "Discovered – currently not indexed" (or Crawled not indexed)  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Specific Codebase Vulnerabilities Identified

### 🚨 Root Cause 1: Empty Initial HTML from `{ ssr: false }` in `SmoothScroll` / `ClientReveal`
* **Vulnerability:** In [`components/redesign/ClientReveal.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/ClientReveal.tsx) and [`app/blogs/[slug]/BlogPostClient.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/BlogPostClient.tsx), `SmoothScroll` is dynamically imported with `{ ssr: false }` wrapping all `{children}`.
* **Impact:** In Next.js App Router, dynamic imports with `ssr: false` tell the server to completely skip rendering children during Server-Side Rendering (SSR).
* **Direct Evidence:** Running an HTTP fetch against `/blogs/[slug]` confirmed that the initial HTML body is literally empty (`<div hidden=""><!--$--><!--/$--></div>`) with `0` heading tags and `0` body paragraphs sent to Googlebot before JavaScript execution.

### ⚠️ Root Cause 2: Conflicting Sitemaps (`next-sitemap` vs `app/sitemap.ts`)
* **Vulnerability:** Next.js uses dynamic [`app/sitemap.ts`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/sitemap.ts) (which correctly maps all blog posts), BUT [`package.json`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/package.json) runs `"postbuild": "next-sitemap"`, creating static files [`public/sitemap.xml`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/public/sitemap.xml) and [`public/sitemap-0.xml`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/public/sitemap-0.xml).
* **Impact:** Static files in `public/` override App Router endpoints on CDNs/Vercel. In `public/sitemap-0.xml`:
  1. **Zero blog post URLs** are included.
  2. Non-webpage assets (`/robots.txt` and `/sitemap.xml`) are erroneously listed as indexable URLs.
  3. Google Search Console reads the static sitemap, misses all blog URLs, and treats newly discovered internal links with lower crawl priority.

### ⚠️ Root Cause 3: Missing `generateStaticParams()` on Blog Dynamic Route
* **Vulnerability:** [`app/blogs/[slug]/page.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/page.tsx) does not export `generateStaticParams()`.
* **Impact:** Next.js serves blog pages via on-demand dynamic server execution rather than pre-generating static HTML files at build time, increasing First Byte Latency (TTFB) and crawl overhead for search bots.

### ℹ️ Root Cause 4: AI Crawler Disallowal Conflict in `robots.txt`
* **Vulnerability:** [`next-sitemap.config.js`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/next-sitemap.config.js) generates a `robots.txt` rule with `User-agent: GPTBot Disallow: /`.
* **Impact:** This directly blocks OpenAI / ChatGPT search bots from retrieving LaunchLive Studio content, directly conflicting with the published GEO (Generative Engine Optimization) strategy.

---

## 3. Prioritized Remediation Blueprint

| Priority | Fix Target | File(s) | Action Required |
| :--- | :--- | :--- | :--- |
| **P0 (Critical)** | **Restore Full SSR Body HTML** | [`components/redesign/SmoothScroll.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/SmoothScroll.tsx)<br>[`components/redesign/ClientReveal.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/ClientReveal.tsx)<br>[`app/blogs/[slug]/BlogPostClient.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/BlogPostClient.tsx) | Remove `{ ssr: false }` wrapping page content. Allow `SmoothScroll` to mount purely as a client-side layout effect without withholding children from server-rendered HTML. |
| **P1 (High)** | **Consolidate Sitemap Architecture** | [`package.json`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/package.json)<br>[`public/sitemap.xml`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/public/sitemap.xml)<br>[`public/sitemap-0.xml`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/public/sitemap-0.xml) | Remove conflicting static sitemaps in `public/` and remove `postbuild: next-sitemap` so the dynamic [`app/sitemap.ts`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/sitemap.ts) is served with all 14+ blog URLs. |
| **P1 (High)** | **Add `generateStaticParams`** | [`app/blogs/[slug]/page.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/page.tsx) | Export `generateStaticParams()` mapping `BLOG_POSTS.map(p => ({ slug: p.slug }))` to produce pre-rendered, instant static HTML for all blog posts. |
| **P2 (Medium)** | **Align Robots.txt with GEO** | [`next-sitemap.config.js`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/next-sitemap.config.js)<br>[`app/robots.ts`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/robots.ts) | Allow AI bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`) to crawl and cite blog content. |
| **P2 (Medium)** | **Strengthen Internal Link Equity** | [`components/redesign/HomeBlogs.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/HomeBlogs.tsx)<br>[`components/redesign/Footer.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/Footer.tsx) | Ensure newly published blog posts are linked from high-traffic pages (Homepage and Related Posts grid) with descriptive semantic anchor text. |

---

## 4. Google Search Console Verification Checklist

Once the code changes are deployed:
1. **Inspect Affected URL in GSC:** Open Google Search Console -> **URL Inspection** -> Enter the blog URL -> Click **"Test Live URL"**.
2. **Verify Rendered HTML:** In the Live Test view, click **"View Tested Page"** -> **"HTML"** tab. Verify that the `<h1>`, `<article>`, and full paragraph content appear in the HTML tab (not just an empty `<body>` shell).
3. **Request Indexing:** Click **"Request Indexing"** to trigger immediate re-crawl.
4. **Resubmit Sitemap:** Go to **Sitemaps** in GSC -> Submit `https://www.launchlive.studio/sitemap.xml` -> Ensure the submitted count matches all 31+ URLs (17 static + 14 blog posts).
