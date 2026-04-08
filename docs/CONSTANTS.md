# Constants & Data Guide

This document covers the static data structures and how to manage site content in Launch Live Studio.

## Constants Location

All site-wide constants are defined in the `constants/` directory.

## Current Constants

### Navigation (`constants/nav.ts`)

Defines the site's navigation structure.

```typescript
export const NAV_LINKS = [
  { name: 'Brands', href: '#' },
  { name: 'Creators', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Contact Us', href: '#' },
] as const

export const CTA_LABEL = "Let's Talk"
export const CTA_HREF = '#contact'
```

**Usage in components:**

```tsx
import { NAV_LINKS, CTA_LABEL, CTA_HREF } from "@/constants/nav"

// In JSX
<nav>
  {NAV_LINKS.map((link) => (
    <a key={link.name} href={link.href}>{link.name}</a>
  ))}
  <a href={CTA_HREF}>{CTA_LABEL}</a>
</nav>
```

### Brands/Clients (`constants/brands.ts`)

Client logos for the marquee/brand showcase.

```typescript
export const BRANDS = [
  { name: 'Moj', color: '#FF3D57' },
  { name: 'MX Player', color: '#F37321' },
  { name: 'ALT Balaji', color: '#E4003B' },
  { name: 'My11Circle', color: '#1A1464' },
  { name: 'FanTiger', color: '#FF5A00' },
  { name: 'iQOO', color: '#0D2BE0' },
  { name: 'CoinSwitch', color: '#7B3FE4' },
  { name: 'WOW Skin Science', color: '#00A650' },
  { name: 'ZEE5', color: '#8B5CF6' },
] as const
```

**Usage:**

```tsx
import { BRANDS } from "@/constants/brands"

// In JSX - Marquee component
<div className="flex gap-8">
  {BRANDS.map((brand) => (
    <span key={brand.name} style={{ color: brand.color }}>
      {brand.name}
    </span>
  ))}
</div>
```

## Adding New Constants

### Creating a New Constant File

1. Create `constants/your-data.ts`
2. Define your data with proper types
3. Export as `as const` for type safety

```typescript
// constants/services.ts

export interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export const SERVICES = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Comprehensive digital marketing solutions",
    icon: "rocket",
    features: ["SEO", "PPC", "Social Media"]
  }
] as const satisfies ServiceData[]
```

### Updating Navigation

To add a new page to the navigation:

```typescript
// constants/nav.ts
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },      // New entry
  { name: 'Resources', href: '/resources' },  // New entry
  { name: 'Contact', href: '/contact' },
] as const
```

### Adding New Brands

To add a new client brand:

```typescript
// constants/brands.ts
export const BRANDS = [
  { name: 'Moj', color: '#FF3D57' },
  // Add new brand
  { name: 'NewBrand', color: '#HEXCODE' },
] as const
```

## Page-Specific Data

For page-specific data (not shared across the site), define the data directly in the page component or in a separate file within the page folder.

```typescript
// app/services/page.tsx

const PAGE_DATA = {
  hero: {
    title: "Our Services",
    subtitle: "What we offer"
  },
  services: [
    { title: "Service 1", description: "..." },
    { title: "Service 2", description: "..." }
  ]
} as const

export default function ServicesPage() {
  return (
    // Use PAGE_DATA
  )
}
```

## Data Management Patterns

### For Dynamic Content (CMS)

For content that changes frequently (blog posts, case studies), consider:

1. **JSON files** in `data/` directory
2. **MDX files** for content-heavy pages
3. **Headless CMS** integration (Contentful, Sanity, etc.)

```typescript
// data/testimonials.json
[
  {
    "quote": "Great work!",
    "author": "John Doe",
    "company": "Acme Inc"
  }
]
```

### For Static Content

Keep static data in `constants/` or in the page file itself.

## Best Practices

1. **Use `as const`** - Ensures type safety and immutability
2. **Centralize shared data** - Avoid duplicating data across components
3. **Document data structures** - Add JSDoc comments for complex types
4. **Version control** - Keep data in the repo for small to medium sites
5. **Separate concerns** - Different constant files for different data types

## File Organization

```
constants/
├── nav.ts           # Navigation links & CTAs
├── brands.ts         # Client logos/brand data
├── social.ts         # Social media links (if needed)
└── config.ts         # Site-wide configuration

data/
├── testimonials.json # Testimonial data
├── team.json         # Team member data
└── blog/             # Blog posts (if using file-based)
```

## Type Integration

Combine with types from `types/index.ts`:

```typescript
// constants/team.ts
import type { TeamMember } from "@/types"

export const TEAM: TeamMember[] = [
  { name: "John", role: "CEO", image: "/images/john.jpg" },
  { name: "Jane", role: "CTO", image: "/images/jane.jpg" }
]
```