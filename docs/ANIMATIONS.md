# Animations Guide

This document covers the animation libraries and patterns used in Launch Live Studio.

## Animation Libraries

| Library | Purpose | Use Case |
|---------|---------|----------|
| Framer Motion | React animations | Component transitions, scroll-triggered |
| GSAP | Timeline animations | Complex sequences, scroll effects |
| CSS | Simple animations | Hover states, basic keyframes |
| Custom Hooks | Specialized effects | Text scramble, reveal |

## Framer Motion

### Installation

Already included in dependencies:
```json
"framer-motion": "^12.38.0"
```

### Basic Usage

```tsx
import { motion } from "framer-motion"

export function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

### Common Animations

#### Fade In

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
/>
```

#### Slide In

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>
```

#### Scale

```tsx
<motion.div
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.3 }}
/>
```

### Scroll Animations

```tsx
import { useInView } from "framer-motion"

function AnimatedSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      Content
    </motion.div>
  )
}
```

### Variants

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function List({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li variants={itemVariants} key={item.id}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

## GSAP (GreenSock)

### Installation

Already included:
```json
"gsap": "^3.14.2"
```

### Basic Usage

```tsx
import { useRef, useEffect } from "react"
import gsap from "gsap"

function GsapAnimation() {
  const elementRef = useRef(null)

  useEffect(() => {
    gsap.to(elementRef.current, {
      x: 100,
      duration: 1,
      ease: "power2.out"
    })
  }, [])

  return <div ref={elementRef}>Animate me</div>
}
```

### Timeline

```tsx
function TimelineAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from(".box-1", { opacity: 0, duration: 0.5 })
        .from(".box-2", { opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".box-3", { opacity: 0, duration: 0.5 }, "-=0.3")
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <div className="box-1">Box 1</div>
      <div className="box-2">Box 2</div>
      <div className="box-3">Box 3</div>
    </div>
  )
}
```

### ScrollTrigger

```tsx
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function ScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-me", {
        scrollTrigger: {
          trigger: ".animate-me",
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        },
        y: 100,
        opacity: 0
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return <div className="animate-me">Scroll to see animation</div>
}
```

## Custom Hooks

### useScrambleText

Text scramble/reveal animation effect.

```tsx
import { useScrambleText } from "@/hooks/use-scramble-text"

function HeroTitle() {
  const displayText = useScrambleText({
    text: "Launch Live Studio",
    speed: 0.5,
    seed: 42
  })

  return <h1>{displayText}</h1>
}
```

### useMobile

Detect mobile viewport.

```tsx
import { useMobile } from "@/hooks/use-mobile"

function Component() {
  const isMobile = useMobile()

  return <div>{isMobile ? "Mobile" : "Desktop"}</div>
}
```

### useToast

Toast notifications (wraps Radix UI toast).

```tsx
import { useToast } from "@/hooks/use-toast"

function Demo() {
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: "Success",
      description: "Operation completed"
    })
  }

  return <button onClick={handleClick}>Show Toast</button>
}
```

## CSS Animations

### Keyframes

Defined in `app/globals.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Tailwind Animation Classes

```tsx
// Basic
<div className="animate-pulse">...</div>
<div className="animate-spin">...</div>
<div className="animate-bounce">...</div>

// Using animate-in (tailwind-animate-css)
<div className="animate-in fade-in slide-in-from-bottom-4">
  Content
</div>
```

## Lenis Smooth Scroll

### Installation

Included: `"lenis": "^1.3.20"`

### Setup

```tsx
// In a component or layout
import Lenis from "lenis"

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return () => lenis.destroy()
}, [])
```

## Performance Tips

1. **Use `will-change`** - For elements that will animate
2. **Prefer transform/opacity** - These are GPU-accelerated
3. **Clean up animations** - Always clean up in useEffect return
4. **Use `gsap.context()`** - Proper cleanup in React
5. **Consider reduced motion** - Respect user preferences

```tsx
// Respect reduced motion
import { motion } from "framer-motion"

<motion.div
  initial={false}
  transition={{ duration: 0.3 }}
>
  {/* Animation */}
</motion.div>
```

## Animation Checklist

- [ ] Add cleanup in useEffect
- [ ] Test on mobile
- [ ] Test reduced motion preference
- [ ] Check performance with DevTools
- [ ] Ensure accessibility
