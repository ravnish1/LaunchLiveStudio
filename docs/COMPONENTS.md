# Components Guide

This document covers the component architecture and how to work with components in Launch Live Studio.

## Component Structure

### Common Components (`components/common/`)

Shared components used across multiple pages.

| Component | Description | Props |
|-----------|-------------|-------|
| `AnimatedSection` | Scroll-triggered reveal animations | `children`, `className`, `direction`, `delay` |
| `ScrollParallax` | Parallax scrolling effect | `children`, `speed`, `className` |
| `StatCounter` | Animated number counter | `value`, `label`, `suffix`, `duration` |
| `ThemeProvider` | Dark/light mode context | `children`, `attribute`, `defaultTheme` |
| `WhatsAppFloat` | Fixed WhatsApp contact button | `phoneNumber`, `className` |

### UI Components (`components/ui/`)

Atomic UI components built on Radix UI primitives (shadcn/ui).

#### Basic Elements
- `Button` - Primary action button with variants
- `Badge` - Small label/tag
- `Avatar` - User/profile image
- `Skeleton` - Loading placeholder

#### Layout
- `Card` - Content container
- `Separator` - Visual divider
- `AspectRatio` - Maintain element proportions

#### Forms
- `Input` - Text input field
- `Textarea` - Multi-line input
- `Label` - Form field label
- `Checkbox`, `RadioGroup`, `Switch` - Selection controls
- `Select`, `Command` - Dropdown selections

#### Overlays
- `Dialog` - Modal window
- `Drawer` - Slide-in panel (Vaul)
- `Popover`, `HoverCard` - Floating content
- `Tooltip` - Hover information

#### Navigation
- `NavigationMenu` - Navigation bar
- `Tabs` - Tabbed interface
- `Breadcrumb` - Navigation trail
- `Pagination` - Page navigation

#### Feedback
- `Toast`, `Sonner` - Notification toasts
- `Alert`, `AlertDialog` - Warning/dialog boxes
- `Progress`, `Slider` - Progress indicators
- `Spinner` - Loading indicator

#### Data Display
- `Table` - Tabular data
- `Calendar` - Date picker
- `Chart` - Data visualization (Recharts)

## Using Components

### Basic Usage

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click Me</Button>
      </CardContent>
    </Card>
  )
}
```

### Using with Forms

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email()
})

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register("email")} type="email" />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## Creating New Components

### Adding a Simple Component

1. Create file in `components/common/` or `components/ui/`
2. Use `cn()` utility for class merging

```tsx
// components/common/custom-component.tsx
import { cn } from "@/lib/utils"

interface CustomComponentProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
}

export function CustomComponent({
  children,
  className,
  variant = "default"
}: CustomComponentProps) {
  return (
    <div className={cn(
      "base-styles",
      variant === "outline" && "border-2",
      className
    )}>
      {children}
    </div>
  )
}
```

### Extending shadcn/ui Components

shadcn/ui components are designed to be customized. Copy from `components/ui/` and modify:

```tsx
// After copying button.tsx to components/custom/button-custom.tsx
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        custom: "bg-gradient-to-r from-pink-500 to-violet-500", // Custom variant
      },
    },
  }
)
```

## Component Patterns

### Responsive Props

```tsx
interface ResponsiveProps {
  // Mobile-first approach
  children?: React.ReactNode
}

export function ResponsiveComponent({ children }: ResponsiveProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}
```

### Forwarding Refs

```tsx
import { forwardRef } from "react"

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("styles", className)}
        {...props}
      />
    )
  }
)
CustomInput.displayName = "CustomInput"
```

### Compound Components

```tsx
// compound-component.tsx
export function Card({ children, className }) {
  return <div className={cn("card-styles", className)}>{children}</div>
}

Card.Header = function CardHeader({ children, className }) {
  return <div className={cn("card-header", className)}>{children}</div>
}

Card.Title = function CardTitle({ children, className }) {
  return <h3 className={cn("card-title", className)}>{children}</h3>
}

Card.Content = function CardContent({ children, className }) {
  return <div className={cn("card-content", className)}>{children}</div>
}
```

## Best Practices

1. **Use `cn()` utility** - Always use `lib/utils.ts` cn() for conditional classes
2. **Type all props** - Define explicit TypeScript interfaces
3. **Forward refs** - Enable parent components to access DOM nodes
4. **Extract variants** - Use class-variance-authority for component variants
5. **Keep components small** - Single responsibility principle
6. **Document props** - JSDoc for complex components

## Performance Tips

- Use `React.memo()` for expensive components
- Lazy load components with `next/dynamic`
- Use CSS animations over JS when possible
