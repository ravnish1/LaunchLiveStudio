# Custom Cursor Refinement Approach

## Objective
Refine the custom cursor across the entire application so that:
1. The default pointer/cursor does NOT show anywhere on the screen when hovering.
2. The custom cursor scales up when positioned over interactive elements (buttons, links, inputs, and elements with interactive roles).
3. The custom cursor implements a color behavior that provides good contrast when hovering over varied backgrounds (such as the primary orange color or others) using `mix-blend-mode: difference`.

## Execution Plan & Completed Steps

### 1. Hide the Default Pointer System-Wide
To ensure the default cursor pointer does not appear when the user hovers over an interactive element or regular text, we modified `app/globals.css`.
- **Change:** Appended `cursor: none !important;` to all elements `* {}`. We explicitly removed the restriction of `@media (pointer: fine)` to ensure aggressive hiding.
- **Reason:** Previous implementations that used the media query were occasionally overridden by touch-pad + touch-screen combinations on Windows machines, which kept showing the hand pointer. Making it aggressive bypasses that edge case.

### 2. Implement the `mix-blend-difference` Color Behavior ONLY on Hover
- **Change:** In `components/redesign/CustomCursor.tsx`, we made the class string dynamic. By default, it stays as the brand's solid orange dot (`bg-accent`). When hovering, it applies `mix-blend-difference`, keeping its `bg-accent` base. We also strictly removed CSS transitions (`transition-all`) to prevent lagging conflicts with Framer Motion's internal loop.
- **Reason:** Framer Motion handles positional updates manually; adding `transition-all` broke the 60fps tracking speed. Visually, combining the orange `bg-accent` with `mix-blend-difference` on hover means that over an orange button, the cursor resolves to pure black, and text beneath it neatly inverses. This keeps the cursor perfectly legible and branded without requiring awkward borders or white background overrides.

### 3. Improve Scale Response and Interaction Detection
- **Change:** We expanded the `handleHoverStart` detection hook that governs the `isHovered` state. The cursor scales up when `isHovered` becomes true.
- **Reason:** Originally, it only recognized direct parent `A` or `BUTTON` tags. By extending logic to evaluate roles (`role="button"`, `"link"`, `"checkbox"`, `"menuitem"`), standard inputs (`INPUT`, `TEXTAREA`, `SELECT`), and querying parents properly (`target.closest('input')`), the hover state now correctly acknowledges when the user intends to interact with practically any UI component in the app.
