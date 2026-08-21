# Comprehensive Fix Guide: Resolving Google Search Console "Discovered – currently not indexed"

> **Target Domain:** [https://www.launchlive.studio](https://www.launchlive.studio)  
> **Purpose:** Step-by-step technical fix implementation to restore full Server-Side Rendering (SSR), eliminate conflicting sitemaps, enable static pre-rendering, and achieve 100% indexation in Google Search Console.  
> **Source Audit:** [`discovery.md`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/discovery.md)

---

## 📑 Table of Contents
1. [Core Architectural Bottlenecks & Solutions](#1-core-architectural-bottlenecks--solutions)
2. [Fix 1: Restore Full SSR HTML (Remove `ssr: false` Layout Wrapper)](#fix-1-restore-full-ssr-html-remove-ssr-false-layout-wrapper)
3. [Fix 2: Add `generateStaticParams()` & Optimize Blog Post Template](#fix-2-add-generatestaticparams--optimize-blog-post-template)
4. [Fix 3: Unify Sitemap Architecture & Delete Conflicting Static Files](#fix-3-unify-sitemap-architecture--delete-conflicting-static-files)
5. [Fix 4: Align `robots.txt` with GEO (Generative Engine Optimization)](#fix-4-align-robotstxt-with-geo-generative-engine-optimization)
6. [Fix 5: Clean Up Title Template Redundancy](#fix-5-clean-up-title-template-redundancy)
7. [Step-by-Step Code Implementation Blueprint](#step-by-step-code-implementation-blueprint)
8. [Local Verification & Automated Testing Commands](#local-verification--automated-testing-commands)
9. [Google Search Console Live Validation & Re-indexing Protocol](#google-search-console-live-validation--re-indexing-protocol)

---

## 1. Core Architectural Bottlenecks & Solutions

| Issue # | Vulnerability | Root Cause | Exact Solution |
| :--- | :--- | :--- | :--- |
| **#1** | **Empty `<body>` during SSR** | `SmoothScroll` imported via `dynamic(..., { ssr: false })` wrapping all page content in [`ClientReveal.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/ClientReveal.tsx) & [`BlogPostClient.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/BlogPostClient.tsx). | Convert `SmoothScroll` to a lightweight client-side effect component that returns `{children}` during SSR without blocking HTML generation. |
| **#2** | **Zero Blog Posts in Static Sitemap** | `next-sitemap` runs in `postbuild`, generating [`public/sitemap-0.xml`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/public/sitemap-0.xml) that overrides dynamic [`app/sitemap.ts`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/sitemap.ts). | Remove `next-sitemap` postbuild script and delete static `public/sitemap*.xml` files to serve dynamic Next.js App Router sitemap with all 31+ URLs. |
| **#3** | **Missing Pre-rendering for Blogs** | [`app/blogs/[slug]/page.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/page.tsx) lacks `generateStaticParams()`. | Export `generateStaticParams()` to pre-render static HTML files at build time for sub-second TTFB and instant crawlability. |
| **#4** | **AI Bots Blocked from Indexing** | [`next-sitemap.config.js`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/next-sitemap.config.js) blocks `GPTBot`. | Remove AI disallow rules to allow ChatGPT Search, Perplexity, and Claude to index and cite blog posts. |
| **#5** | **Double Title Suffix** | `"%s | Launch Live Studio"` in [`app/layout.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/layout.tsx) concatenated with hardcoded titles. | Strip `| Launch Live Studio` suffix from individual page metadata titles. |

---

## Fix 1: Restore Full SSR HTML (Remove `ssr: false` Layout Wrapper)

### Why this is the #1 Fix:
When Googlebot crawls a URL, its initial crawler retrieves raw HTML. Because `SmoothScroll` was imported with `{ ssr: false }`, Next.js sent `<div hidden=""><!--$--><!--/$--></div>` with no text or headings. 

### Implementation:
Make [`components/redesign/SmoothScroll.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/SmoothScroll.tsx) SSR-safe:

```tsx
// components/redesign/SmoothScroll.tsx
'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Only instantiate Lenis in the browser
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
      infinite: false,
      lerp: 0.08,
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Directly return children so server-side HTML rendering is 100% preserved
  return <>{children}</>
}
```

Then in [`components/redesign/ClientReveal.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/ClientReveal.tsx), import `SmoothScroll` directly without `dynamic(..., { ssr: false })`:

```tsx
// components/redesign/ClientReveal.tsx
'use client'

import React from 'react'
import { SmoothScroll } from '@/components/redesign/SmoothScroll'

export default function ClientReveal({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative">
        {children}
      </div>
    </SmoothScroll>
  )
}
```

---

## Fix 2: Add `generateStaticParams()` & Optimize Blog Post Template

### Implementation:
Update [`app/blogs/[slug]/page.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/page.tsx):

```tsx
// app/blogs/[slug]/page.tsx
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/lib/blog-data'
import { BlogPostClient } from './BlogPostClient'
import Script from "next/script"

type Props = {
  params: Promise<{ slug: string }>
}

// 1. Pre-render all blog routes at build time (SSG)
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

// 2. Clean SEO Metadata without duplicate brand suffix
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://www.launchlive.studio${post.image}`

  return {
    title: post.title, // layout.tsx will cleanly append "| Launch Live Studio"
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `https://www.launchlive.studio/blogs/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.launchlive.studio/blogs/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      authors: ["Launch Live Studio"],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)
  
  if (!post) {
    notFound()
  }

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://www.launchlive.studio${post.image}`

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.launchlive.studio/blogs/${slug}`
        },
        "headline": post.title,
        "description": post.description,
        "image": {
          "@type": "ImageObject",
          "url": imageUrl
        },
        "author": {
          "@type": "Organization",
          "name": "Launch Live Studio",
          "url": "https://www.launchlive.studio/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Launch Live Studio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.launchlive.studio/logo.png"
          }
        },
        "datePublished": post.date,
        "dateModified": post.date,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.launchlive.studio/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blogs",
            "item": "https://www.launchlive.studio/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://www.launchlive.studio/blogs/${slug}`
          }
        ]
      }
    ]
  }

  return (
    <>
      <Script
        id={`schema-blog-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostClient post={post} />
    </>
  )
}
```

In [`app/blogs/[slug]/BlogPostClient.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/blogs/%5Bslug%5D/BlogPostClient.tsx), pass `post` as props directly from the Server Component and remove `dynamic(SmoothScroll, { ssr: false })`:

```tsx
// app/blogs/[slug]/BlogPostClient.tsx
"use client"

import React from "react"
import { Navbar } from "@/components/redesign/Navbar"
import { Footer } from "@/components/redesign/Footer"
import { BlogPost, BLOG_POSTS } from "@/lib/blog-data"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { SmoothScroll } from "@/components/redesign/SmoothScroll"

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="pt-40 pb-32">
          <div className="max-w-[1280px] mx-auto px-6">
            {/* Back Button */}
            <div className="mb-12">
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors font-bold uppercase tracking-widest text-xs"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />{" "}
                Browse All Posts
              </Link>
            </div>

            <article className="max-w-4xl mx-auto">
              {/* Header Info */}
              <div className="space-y-6 mb-16">
                <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="bg-accent/10 py-1 px-3 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Clock size={14} /> {post.readTime}
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif leading-[1.1] tracking-tight text-foreground">
                  {post.title}
                </h1>

                <p className="text-xl font-serif italic text-text-muted leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-video bg-surface rounded-[2.5rem] overflow-hidden mb-16 border border-border-subtle group">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>

              {/* Body Content */}
              <div className="space-y-8">
                <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-p:leading-relaxed prose-a:text-accent prose-strong:text-accent max-w-none opacity-90 text-foreground">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, href, children, ...props }) => {
                        if (href?.startsWith("/")) {
                          return (
                            <Link href={href} {...props}>
                              {children}
                            </Link>
                          )
                        }
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        )
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                <div className="pt-12 flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-xs font-bold text-text-muted border border-border-subtle px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-all cursor-default"
                    >
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conversion Path Divider */}
              <div className="my-24 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

              {/* Conversion Section */}
              <div className="bg-surface border border-accent/20 rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl shadow-accent/5">
                <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  Enjoyed this insight <br /> on {post.category}?
                </h2>
                <p className="text-text-muted text-lg md:text-xl max-w-xl mx-auto mb-10 italic font-serif">
                  "At Launch Live Studio, we help brands implement these exact
                  strategies to achieve measurable digital growth."
                </p>
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-accent text-white text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/25"
                >
                  Let's Build Your System &rarr;
                </Link>
                <p className="mt-8 text-xs font-bold tracking-[0.2em] text-text-muted uppercase">
                  FREE 30-MINUTE STRATEGY CONSULTATION
                </p>
              </div>

              {/* Related Posts */}
              <div className="mt-32">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">
                      CONTINUE READING
                    </span>
                    <h3 className="text-4xl font-serif">More Insights.</h3>
                  </div>
                  <Link
                    href="/blogs"
                    className="text-sm font-bold uppercase tracking-widest text-text-muted hover:text-accent transition-colors pb-1 border-b border-border-subtle hover:border-accent"
                  >
                    View all &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BLOG_POSTS.filter((p) => p.slug !== post.slug)
                    .slice(0, 2)
                    .map((otherPost) => (
                      <Link
                        key={otherPost.slug}
                        href={`/blogs/${otherPost.slug}`}
                        className="group p-8 bg-surface border border-border-subtle rounded-3xl hover:border-accent transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5"
                      >
                        <p className="text-accent tracking-widest uppercase text-[10px] mb-3 font-bold">
                          {otherPost.category}
                        </p>
                        <h4 className="text-2xl font-serif group-hover:text-accent transition-colors mb-4">
                          {otherPost.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs font-bold text-text-muted uppercase tracking-widest mt-6">
                          <span>{otherPost.date}</span>
                          <span className="group-hover:text-accent transition-colors">
                            Read &rarr;
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
```

---

## Fix 3: Unify Sitemap Architecture & Delete Conflicting Static Files

### Action Steps:
1. **Remove `postbuild` script in [`package.json`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/package.json):**
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "eslint ."
   }
   ```
2. **Delete static sitemap files in `public/`:**
   - Remove `public/sitemap.xml`
   - Remove `public/sitemap-0.xml`
3. **Verify [`app/sitemap.ts`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/sitemap.ts):**
   Ensure dynamic sitemap serves all 17 static routes + all 14 blog routes at `https://www.launchlive.studio/sitemap.xml`.

---

## Fix 4: Align `robots.txt` with GEO (Generative Engine Optimization)

Update [`app/robots.ts`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/robots.ts):

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.launchlive.studio/sitemap.xml",
  };
}
```
Delete static `public/robots.txt` so App Router dynamically generates `/robots.txt`.

---

## Fix 5: Clean Up Title Template Redundancy

In [`components/redesign/Footer.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/components/redesign/Footer.tsx#L68):
Change Twitter/X link:
- **From:** `https://x.com/launchlivestdio`
- **To:** `https://x.com/launchlivestudio`

In [`app/services/page.tsx`](file:///c:/Users/sachi/OneDrive/Desktop/Launch%20LIve%20Studios/LaunchLiveStudio/app/services/page.tsx#L6):
- **From:** `title: "Digital Agency Services | Web, AI & Automation"`
- **To:** `title: "Digital Agency Services"` (renders as `"Digital Agency Services | Launch Live Studio"`)

---

## Local Verification & Automated Testing Commands

Run these terminal commands to verify the fixes locally:

### 1. Test Server HTML Output for Body Content & Headings
```bash
node -e "fetch('http://localhost:3000/blogs/generative-engine-optimization-geo-ai-search-guide').then(r => r.text()).then(t => { console.log('Length:', t.length, '| Has main tag:', t.includes('<main'), '| Has H1:', t.includes('<h1'), '| Has article:', t.includes('<article')); })"
```
* **Expected Result:** `Has main tag: true | Has H1: true | Has article: true`

### 2. Verify Dynamic Sitemap Contains All Blog URLs
```bash
node -e "fetch('http://localhost:3000/sitemap.xml').then(r => r.text()).then(t => { console.log('Contains blogs in sitemap:', t.includes('/blogs/generative-engine-optimization-geo-ai-search-guide')); })"
```
* **Expected Result:** `Contains blogs in sitemap: true`

### 3. Verify Production Build & Static Page Generation
```bash
npm run build
```
* **Expected Result:** Look for `● /blogs/[slug]` marked as static `(SSG)` with all 14 blog URLs pre-rendered into HTML files.

---

## Google Search Console Live Validation & Re-indexing Protocol

Once deployed to production:
1. **URL Inspection:** Open GSC -> Enter URL (e.g. `https://www.launchlive.studio/blogs/generative-engine-optimization-geo-ai-search-guide`).
2. **Test Live URL:** Click **"Test Live URL"** -> Click **"View Tested Page"** -> Under **"HTML"** tab, confirm full body text and headings are present.
3. **Request Indexing:** Click **"Request Indexing"** on affected URLs.
4. **Resubmit Sitemap:** Go to **Sitemaps** -> Submit `https://www.launchlive.studio/sitemap.xml` -> Ensure Discovered Pages count equals **31+**.
