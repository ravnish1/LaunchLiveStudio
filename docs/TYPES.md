# TypeScript Types Guide

This document covers the type definitions and patterns used in Launch Live Studio.

## Type Definitions Location

All shared types are defined in `types/index.ts`.

## Core Types

### Navigation

```typescript
export interface NavLink {
  name: string      // Display label
  href: string      // URL path
}
```

### Brand/Client

```typescript
export interface Brand {
  name: string      // Brand name
  url?: string      // Website URL (optional)
  fallbackUrl?: string  // Fallback image URL
}
```

### Team Member

```typescript
export interface TeamMember {
  name: string      // Member name
  role: string      // Job title
  image?: string    // Profile photo URL
}
```

### Testimonial

```typescript
export interface Testimonial {
  quote: string     // Testimonial text
  author: string    // Author name
  company?: string  // Company name
  avatar?: string   // Author photo
}
```

### Service

```typescript
export interface Service {
  title: string     // Service name
  description: string  // Service details
  icon?: string     // Icon identifier
}
```

### Process Step

```typescript
export interface ProcessStep {
  number: string     // Step identifier (e.g., "01")
  title: string     // Step name
  description: string  // Step details
}
```

### Statistics

```typescript
export interface Stat {
  value: string     // Numeric value
  label: string     // Label text
  suffix?: string   // Suffix (e.g., "+", "%")
}
```

## Usage Examples

### Defining Navigation

```typescript
import type { NavLink } from "@/types"

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
]
```

### Creating Brand Data

```typescript
import type { Brand } from "@/types"

const clients: Brand[] = [
  { name: "Acme Corp", url: "https://acme.com" },
  { name: "Brand X" },
]
```

### Form Types with Zod

```typescript
import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

## Extending Types

### Adding New Types

Add new interfaces to `types/index.ts`:

```typescript
// types/index.ts

// Event
export interface Event {
  id: string
  title: string
  date: Date
  location: string
  description?: string
  image?: string
}

// Blog Post
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: TeamMember
  publishedAt: Date
  tags: string[]
}
```

### Generic Types

```typescript
// API Response wrapper
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Pagination
export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
```

## Component Props Types

### Basic Props

```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}
```

### With Refs

```typescript
import { forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("styles", error && "border-red-500", className)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
```

### Context Types

```typescript
// Theme context example
export interface ThemeProviderProps {
  children: React.ReactNode
  attribute: "class" | "data-theme"
  defaultTheme?: string
  enableSystem?: boolean
}
```

## Best Practices

1. **Use `type` for unions** - `type Status = "pending" | "active" | "done"`
2. **Use `interface` for objects** - Better extensibility
3. **Export types** - Make types available for import
4. **Document complex types** - Add JSDoc comments
5. **Use utility types** - `Partial`, `Required`, `Pick`, `Omit`

## Utility Types in Use

### Partial

```typescript
interface User {
  name: string
  email: string
}

type PartialUser = Partial<User>
// { name?: string, email?: string }
```

### Pick

```typescript
type UserPreview = Pick<User, "name">
// { name: string }
```

## Type Checking

Run TypeScript checks:

```bash
# In package.json scripts
npm run build  # Includes type checking

# Or separately
npx tsc --noEmit
```

## Configuration

TypeScript is configured in `tsconfig.json`. Key settings:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

The `@/` alias is configured to point to the project root for clean imports.
