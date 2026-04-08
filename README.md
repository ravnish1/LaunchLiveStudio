# Launch Live Studio

A modern, high-performance agency website built with Next.js 16, React 19, and Tailwind CSS. Launch Live Studio is a full-service digital agency specializing in brand strategy, digital marketing, and creative solutions.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI) |
| Animations | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/) |
| Smooth Scroll | [Lenis](https://lenis.studio/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |

## Project Structure

```
launch-live-studio/
├── app/                      # Next.js App Router pages
│   ├── book-a-call/          # Book a call page
│   ├── resources/            # Resources/Blog page
│   ├── services/             # Services page
│   ├── testimonials/         # Testimonials page
│   ├── work/                 # Portfolio/Work page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── common/               # Shared/common components
│   │   ├── animated-section.tsx
│   │   ├── scroll-parallax.tsx
│   │   ├── stat-counter.tsx
│   │   ├── theme-provider.tsx
│   │   └── whatsapp-float.tsx
│   └── ui/                   # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── ...               # 50+ UI components
├── constants/                # Static data/config
│   ├── brands.ts             # Client logos
│   └── nav.ts                # Navigation links
├── hooks/                    # Custom React hooks
│   ├── use-mobile.ts         # Mobile detection
│   ├── use-scramble-text.ts  # Text scramble animation
│   └── use-toast.ts          # Toast notifications
├── lib/                      # Utility functions
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
├── public/                   # Static assets
│   ├── images/
│   └── icons/
├── types/                    # TypeScript type definitions
│   └── index.ts              # Shared interfaces
├── constants/                # Site-wide constants
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (Recommended: 20.x LTS)
- pnpm 8+ (Recommended) or npm 9+ or yarn 1.22+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd launch-live-studio

# Install dependencies (using pnpm recommended)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality |

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Next.js Config (`next.config.mjs`)

Key configurations in `next.config.mjs`:

- `devIndicators: false` - Hides dev build indicator
- `typescript.ignoreBuildErrors` - Ignores TypeScript errors in build (dev only)
- `images.unoptimized` - Disables Next.js image optimization

### Tailwind CSS

Tailwind CSS 4 is configured with CSS-first approach. Custom utilities and theme variables are defined in `app/globals.css`.

## Customization

### Adding New Pages

1. Create a new folder in `app/` (e.g., `app/about/`)
2. Add `page.tsx` for the page content
3. Optionally add `layout.tsx` for page-specific layout

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>
}
```

### Adding New Brands/Clients

Edit `constants/brands.ts`:

```ts
export const BRANDS = [
  { name: 'BrandName', color: '#HEXCODE' },
  // Add more brands...
] as const
```

### Modifying Navigation

Edit `constants/nav.ts`:

```ts
export const NAV_LINKS = [
  { name: 'Page Name', href: '/path' },
  // Add more links...
] as const
```

### Adding Custom Types

Extend `types/index.ts` with new interfaces:

```ts
export interface YourNewType {
  field1: string
  field2: number
}
```

### Creating New Components

For reusable components:

1. **Common components** (`components/common/`): Shared UI elements used across pages
2. **UI components** (`components/ui/`): Atomic UI elements (buttons, cards, etc.)

Use existing shadcn/ui components as reference:

```tsx
import { cn } from "@/lib/utils"

export function YourComponent({ className }: { className?: string }) {
  return (
    <div className={cn("base-styles", className)}>
      {/* Component content */}
    </div>
  )
}
```

### Adding Animations

The project uses multiple animation libraries:

- **Framer Motion**: Component enter/exit animations, scroll-triggered animations
- **GSAP**: Complex timeline animations
- **Custom hooks**: `use-scramble-text` for text reveal effects

```tsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

For static hosting (S3, GitHub Pages, etc.):

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  // ...other config
}
```

## Performance Considerations

- Images are currently unoptimized - consider enabling Next.js Image Optimization for production
- Large animation libraries (GSAP, Framer Motion) are loaded on client only
- Consider code splitting for routes with heavy animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Private - All rights reserved

## Support

For questions or issues, contact the development team.
