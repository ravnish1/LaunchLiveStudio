# Website Sitemap (SEO Optimized)

Based on a comprehensive review of the project's routing and data files, the current `sitemap-0.xml` is missing several critical pages, particularly the dynamic service and blog pages, as well as the FAQ page. 

To comply with SEO norms (ensuring all crawlable and indexable pages are discoverable by search engines), the sitemap should include the following complete list of URLs. 

## 1. Core Pages
These are the primary static pages of the website.
- **Home:** `https://www.launchlive.studio/`
- **Services:** `https://www.launchlive.studio/services`
- **Work/Portfolio:** `https://www.launchlive.studio/work`
- **Testimonials:** `https://www.launchlive.studio/testimonials`
- **Blog (Archive):** `https://www.launchlive.studio/blogs`
- **FAQ:** `https://www.launchlive.studio/faq`
- **Book A Call:** `https://www.launchlive.studio/book-a-call`

## 2. Service Pages (Dynamic)
Each individual service offering should have its own entry in the sitemap to rank for specific service keywords (e.g., "Web Development", "SEO Consulting").
- **Websites:** `https://www.launchlive.studio/services/websites`
- **Systems:** `https://www.launchlive.studio/services/systems`
- **Branding:** `https://www.launchlive.studio/services/branding`
- **SEO:** `https://www.launchlive.studio/services/seo`
- **AI Tools:** `https://www.launchlive.studio/services/ai-tools`
- **Automation:** `https://www.launchlive.studio/services/automation`
- **Design:** `https://www.launchlive.studio/services/design`
- **Consulting:** `https://www.launchlive.studio/services/consulting`

## 3. Blog Posts (Dynamic)
Content marketing is a primary driver of organic traffic. Every published blog post must be in the sitemap.
- **iOS Development in 2026:** `https://www.launchlive.studio/blogs/ios-development-in-2026-myths-reality-and-your-path`
- **Custom Software vs Shopify:** `https://www.launchlive.studio/blogs/custom-software-vs-shopify-which-is-right-for-your-business`
- **Improve Online Presence:** `https://www.launchlive.studio/blogs/improve-online-presence-reach-broader-audience`
- **The Future of AI Automation:** `https://www.launchlive.studio/blogs/the-future-of-ai-automation`
- **Scaling with Next.js:** `https://www.launchlive.studio/blogs/scaling-with-nextjs-app-router`
- **Building Premium Brands:** `https://www.launchlive.studio/blogs/building-premium-brands`

## 4. Legal / Utility Pages
These are required for compliance and trust, though typically have lower SEO priority.
- **Privacy Policy:** `https://www.launchlive.studio/privacy`
- **Terms of Service:** `https://www.launchlive.studio/terms`

---

## Recommended SEO Action Plan

Currently, the site uses a static XML sitemap (`public/sitemap-0.xml`), which means new blog posts and services won't be automatically discovered by Google. 

**Next Steps:**
Since you are using Next.js App Router, I highly recommend replacing the static `public/sitemap.xml` and `public/sitemap-0.xml` files with a dynamic `app/sitemap.ts` file. 

A dynamic `sitemap.ts` will automatically pull the slugs from your `blog-data.ts` and `services-data.ts` files, ensuring your sitemap is *always* 100% up-to-date and compliant with SEO norms whenever you add new content. Let me know if you would like me to implement this for you!
