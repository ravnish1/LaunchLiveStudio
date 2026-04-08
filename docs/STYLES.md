# Styling Guide

This document covers the styling approach and conventions used in Launch Live Studio.

## Tech Stack

- **Tailwind CSS 4** - Utility-first CSS framework
- **CSS Variables** - Theme tokens defined in CSS
- **PostCSS** - CSS processing

## Global Styles (`app/globals.css`)

The main stylesheet defines:

### CSS Custom Properties

```css
:root {
  /* Colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

### Base Styles

- CSS reset and base styles
- Typography defaults
- Animation keyframes
- Utility classes

## Tailwind Configuration

### Using Tailwind

The project uses Tailwind CSS 4 with CSS-first configuration. Most styles are defined directly in CSS using `@theme` directive.

```tsx
// In component
<div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
  Content
</div>
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Content */}
</div>
```

Breakpoints:
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

### Dark Mode

The theme provider enables dark mode support:

```tsx
// Toggle dark mode
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  )
}
```

## Utility Functions

### `cn()` - Class Name Merger

Located in `lib/utils.ts`, combines clsx and tailwind-merge.

```tsx
import { cn } from "@/lib/utils"

// Merges classes intelligently
<div className={cn(
  "base-classes",
  condition && "conditional-class",
  className // Allows override from props
)}>
```

## Color System

### Semantic Colors

| Token | Usage |
|-------|-------|
| `background` | Page background |
| `foreground` | Primary text |
| `primary` | Main brand color |
| `primary-foreground` | Text on primary |
| `secondary` | Secondary elements |
| `muted` | Subdued backgrounds |
| `accent` | Highlighted elements |
| `destructive` | Error/delete actions |
| `border` | Border color |
| `input` | Input backgrounds |
| `ring` | Focus rings |

### Using Colors

```tsx
// Background
<div className="bg-background">...</div>

// Text
<p className="text-foreground">...</p>

// Primary button
<button className="bg-primary text-primary-foreground">...</button>

// Secondary
<div className="bg-secondary">...</div>
```

## Typography

### Font Classes

```tsx
// Headings
<h1 className="text-4xl font-bold tracking-tight">...</h1>
<h2 className="text-3xl font-semibold">...</h2>
<h3 className="text-2xl font-medium">...</h3>

// Body
<p className="text-base">...</p>
<p className="text-sm text-muted-foreground">...</p>
```

### Font Families

Configured in Tailwind. Default sans-serif stack.

## Spacing

### Margin & Padding

```tsx
// Padding
<p className="p-4">...</p>           // All sides
<p className="px-4 py-2">...</p>      // X and Y axis

// Margin
<div className="m-4">...</div>
<div className="mt-4 mb-2">...</div>   // Specific sides
```

### Spacing Scale

`0` → `0.25rem` (4px)
`1` → `0.25rem` (4px)
`2` → `0.5rem` (8px)
`4` → `1rem` (16px)
`6` → `1.5rem` (24px)
`8` → `2rem` (32px)
...

## Layout

### Container

```tsx
// Max-width container with padding
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Grid

```tsx
// Simple grid
<div className="grid grid-cols-3 gap-4">
  {/* 3 columns */}
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Adapts from 1 to 3 columns */}
</div>
```

### Flexbox

```tsx
// Center content
<div className="flex items-center justify-center">
  {/* Content */}
</div>

// Space between
<div className="flex items-center justify-between">
  {/* Content */}
</div>
```

## Animations

### CSS Animations

```css
/* In globals.css */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
```

### Tailwind Animation Classes

```tsx
// Fade in
<div className="animate-in fade-in duration-500">...</div>

// Slide in
<div className="animate-in slide-in-from-bottom-4">...</div>
```

## Best Practices

1. **Use semantic colors** - Prefer `bg-primary` over specific hex codes
2. **Use spacing scale** - Stick to Tailwind's spacing scale
3. **Extract patterns** - Create component classes for repeated styles
4. **Mobile-first** - Write base styles for mobile, add `md:` for larger screens
5. **Dark mode ready** - Use semantic color tokens that adapt to theme

## Adding Custom Styles

### Custom Colors

Add to `app/globals.css`:

```css
@theme {
  --color-brand-500: #hexcode;
  --color-brand-600: #hexcode;
}
```

### Custom Animations

```css
@theme {
  --animate-spin-slow: spin 3s linear infinite;
}
```

## PostCSS Configuration

The `postcss.config.mjs` includes:
- Tailwind CSS
- Autoprefixer

No additional PostCSS plugins should be needed for standard usage.
