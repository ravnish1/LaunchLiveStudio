# SEO Metadata Strategy & Open Graph Directory

This document contains the highly optimized Next.js metadata objects for every page of the website, generated following the **SEO: Universal SEO Analysis** workflow.

---

## 1. Home Page (`/`)
**Page Type:** Homepage / Agency Portal
**Intent:** Brand awareness and high-level conversion.

```typescript
export const metadata: Metadata = {
  title: "launchlive.studio",
  description: "We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
  keywords: ["digital agency", "ai automation", "high performance websites", "startup software", "outcome driven agency"],
  alternates: { canonical: "https://www.launchlive.studio/" },
  openGraph: {
    title: "launchlive.studio",
    description: "We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
    url: "https://www.launchlive.studio/",
    siteName: "Launch Live Studio",
    images: [{ url: "https://launchlive.studio/logo.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "launchlive.studio",
    description: "We build high-value websites, AI systems, and automations that cut costs and compound growth for your business.",
    images: ["https://launchlive.studio/logo.png"],
  },
};
```
**OG Image Concept:** A sleek, high-contrast visual featuring the brand's serif typography over a dark, glassmorphic UI elements background.
**Structured Data:** `Organization` schema with logo, social links, and service areas.

---

## 2. Services (`/services`)
**Page Type:** Service Showcase
**Intent:** Detailed capability overview.

```typescript
export const metadata: Metadata = {
  title: "Digital Agency Services | Web, AI & Automation",
  description: "From custom web development to LLM-powered AI systems. Explore our range of premium services designed to scale your business and outpace competition.",
  keywords: ["website development", "ai system creation", "marketing automation", "ui/ux design", "technical seo"],
  alternates: { canonical: "https://www.launchlive.studio/services" },
  openGraph: {
    title: "Expert Digital Services for Modern Brands",
    description: "Scalable tech stacks and strategic design tailored for founders who demand excellence. See what we can build for you.",
    url: "https://www.launchlive.studio/services",
    images: [{ url: "https://launchlive.studio/logo.png" }],
  },
};
```
**OG Image Concept:** An abstract grid layout showing icons of the core services (Code, AI, Design) in the brand's accent orange color.
**Structured Data:** `Service` schema listing individual offerings.

---

## 3. Work / Portfolio (`/work`)
**Page Type:** Case Studies
**Intent:** Social proof and industry-specific validation.

```typescript
export const metadata: Metadata = {
  title: "Case Studies & Portfolio | Launch Live Studio",
  description: "Explore our selected works. See how we delivered high-performance Shopify stores, AI-driven SaaS, and premium brand identities for leading startups.",
  keywords: ["shopify development portfolio", "saas dashboard design", "fintech ai solutions", "ecommerce case studies"],
  alternates: { canonical: "https://www.launchlive.studio/work" },
  openGraph: {
    title: "Launch Live Studio Portfolio | Real Results for Real Brands",
    description: "Check out our latest projects: From streetwear e-commerce to AI agriculture intelligence platforms.",
    url: "https://www.launchlive.studio/work",
    images: [{ url: "https://launchlive.studio/logo.png" }],
  },
};
```
**OG Image Concept:** A collage of featured project thumbnails (Raptile Studio, TerraFlow, Vaultly) with bold "WORK" typography.

---

## 4. Blogs (`/blogs`)
**Page Type:** Knowledge Base
**Intent:** Educational authority and topical SEO.

```typescript
export const metadata: Metadata = {
  title: "Insights & Tech Growth Guides | Launch Live Studio",
  description: "Expert guides on AI automation, Next.js performance, and premium branding. Stay ahead of the curve with our latest digital strategies.",
  keywords: ["ai insights", "next.js performance guides", "digital growth strategy", "branding trends 2026"],
  alternates: { canonical: "https://www.launchlive.studio/blogs" },
  openGraph: {
    title: "Digital Growth & AI Strategy Guides",
    description: "Curated insights to help you master the modern tech landscape. Read our latest articles.",
    url: "https://www.launchlive.studio/blogs",
    images: [{ url: "https://launchlive.studio/logo.png" }],
  },
};
```
**OG Image Concept:** A clean, editorial-style graphic featuring an open book or digital reader with the "Insights" heading.

---

## 5. Book a Call (`/book-a-call`)
**Page Type:** Conversion Page
**Intent:** High-intent lead capture.

```typescript
export const metadata: Metadata = {
  title: "Book a Strategy Consultation | Launch Live Studio",
  description: "Ready to launch your next big project? Schedule a free consultation with our experts to discuss your digital strategy, AI, or development needs.",
  keywords: ["hire digital agency", "strategy consultation", "start digital project", "launch live studio contact"],
  alternates: { canonical: "https://www.launchlive.studio/book-a-call" },
  openGraph: {
    title: "Schedule Your Free Digital Strategy Session",
    description: "Let's build something exceptional together. Book a call with the Launch Live Studio team today.",
    url: "https://www.launchlive.studio/book-a-call",
    images: [{ url: "https://launchlive.studio/logo.png" }],
  },
};
```
**OG Image Concept:** A minimalist calendar or meeting invitation visual with a strong call-to-action: "LET'S TALK."

---

## 6. Testimonials (`/testimonials`)
**Page Type:** Social Proof
**Intent:** Trust building and risk reduction.

```typescript
export const metadata: Metadata = {
  title: "Client Success Stories | Trust & Testimonials",
  description: "Read how founders and teams have transformed their businesses with Launch Live Studio. Honest feedback on our web and AI services.",
  keywords: ["agency testimonials", "client reviews", "launch live studio feedback"],
  alternates: { canonical: "https://www.launchlive.studio/testimonials" },
  openGraph: {
    title: "What Our Partners Say About Launch Live Studio",
    description: "Discover why founders trust us to build their most critical digital infrastructure.",
    url: "https://www.launchlive.studio/testimonials",
    images: [{ url: "https://launchlive.studio/logo.png" }],
  },
};
```
**OG Image Concept:** A series of five-star icons and a "Client Success" badge overlaying a professional, clean UI.

---

## 7. Dynamic Blog Post (`/blogs/[slug]`)
**Page Type:** Article
**Intent:** Long-tail SEO targeting specific technical/design topics.

```typescript
// Dynamically generated per post
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: `${post.title} | Launch Live Studio`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `https://www.launchlive.studio/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image }],
      type: "article",
      authors: ["Launch Live Studio"],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}
```
**OG Image Concept:** High-quality imagery relevant to the specific topic (e.g., Code for engineering, abstract gradients for design, robot icons for AI).
**Structured Data:** `BlogPosting` schema.
