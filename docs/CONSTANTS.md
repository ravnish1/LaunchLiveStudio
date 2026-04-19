# Project Structure & Data Guide (2026 Redesign)

This document provides the most up-to-date guide for managing site content and structure in the current Launch Live Studio redesign.

## Content Management

### Blogs & Insights (`lib/blog-data.ts`)

The site now uses a centralized dynamic blog system. To add or edit blog posts, update the `BLOG_POSTS` array in this file.

**Structure:**
```typescript
{
  slug: string;        // URL identifier (e.g., 'ai-automation')
  title: string;       // Large display title
  category: string;    // Topic badge
  date: string;        // Publication date
  readTime: string;    // Display duration
  description: string; // Serif-italic intro text
  content: string[];   // Array of paragraphs for the body
  tags: string[];      // Search tags at the bottom
}
```

### Services & Marquee (`components/redesign/Marquee.tsx`)

The rolling services pipeline data is managed directly within the `Marquee` component to ensure tight integration with the Framer Motion velocity system.

- **Location:** `const services = [...]` inside `Marquee.tsx`
- **Fields:** `name`, `icon` (Lucide), `status`, and `isBrand` (special styling for studio logo).

### Projects & Portfolio (`components/redesign/OurWork.tsx`)

Completed projects and the "Our Work" section are defined in the `projects` constant within this component.

- **Note:** Always mention **"Custom Shopify Storefront"** for Raptile Studio projects to maintain branding consistency.

### Navigation (`components/redesign/Navbar.tsx`)

Main navigation links are managed within the `Navbar` component.

- **Note:** Renamed from "Resources" to "Blogs" in 2026 to improve SEO and user intent clarity.

---

## Technical Constants

### Routing & SEO (`next.config.mjs`)

Strategic redirects are handled at the server level to preserve authority.
- **Legacy Redirects:** `/resources` -> `/blogs` (Permanent 301)

### Visual System (`app/globals.css`)

The design tokens (colors, glassmorphism, shadows) are defined as CSS variables at the root level.
- **Accents:** Use `text-accent` for the signature orange highlighting.
- **Typography:** 
  - Titles: `font-serif` (Playfair Display)
  - Copy: `font-sans` (Inter)
  - Professional Flair: `font-serif italic text-text-muted` for intro blurbs.

---

## Best Practices

1. **Avoid Hardcoded Borders:** Use `shadow-sm` or `border-border-subtle` instead of solid black borders to maintain the floating aesthetic.
2. **SEO First:** When adding a new section, ensure every `<Link>` points to a descriptive, unique URL.
3. **Responsiveness:** Always test changes in Safari/Chrome mobile view via browser tools to ensure animations don't lag on 120Hz displays.