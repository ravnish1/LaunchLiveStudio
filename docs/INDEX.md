# Documentation Index

Welcome to the Launch Live Studio documentation. This index helps you navigate through all available guides.

## Quick Links

- **[README](../README.md)** - Project overview, installation, and quick start
- **[COMPONENTS.md](./COMPONENTS.md)** - Component architecture and usage
- **[STYLES.md](./STYLES.md)** - Styling guide and Tailwind CSS
- **[TYPES.md](./TYPES.md)** - TypeScript type definitions
- **[ANIMATIONS.md](./ANIMATIONS.md)** - Animation libraries and patterns
- **[CONSTANTS.md](./CONSTANTS.md)** - Data management and constants

## Getting Started

New to the project? Start here:

1. Read the [README](../README.md)
2. Review the [Tech Stack](#tech-stack) below
3. Follow the [Installation Guide](../README.md#getting-started)

## Tech Stack Overview

| Technology | Purpose | Documentation |
|------------|---------|----------------|
| Next.js 16 | Framework | [nextjs.org](https://nextjs.org/docs) |
| React 19 | UI Library | [react.dev](https://react.dev) |
| TypeScript | Type Safety | [typescriptlang.org](https://www.typescriptlang.org/docs) |
| Tailwind CSS | Styling | [tailwindcss.com](https://tailwindcss.com/docs) |
| Framer Motion | Animations | [framer.com/motion](https://www.framer.com/motion/docs) |
| GSAP | Complex Animations | [greensock.com](https://greensock.com/docs) |
| Radix UI | UI Primitives | [radix-ui.com](https://www.radix-ui.com/docs/primitives) |

## Common Tasks

### Adding a New Page

See [README: Adding New Pages](../README.md#adding-new-pages)

### Customizing Styles

See [STYLES.md](./STYLES.md)

### Adding Animations

See [ANIMATIONS.md](./ANIMATIONS.md)

### Adding New Components

See [COMPONENTS.md](./COMPONENTS.md)

### Managing Site Data

See [CONSTANTS.md](./CONSTANTS.md)

### Working with Types

See [TYPES.md](./TYPES.md)

## Project Structure

```
launch-live-studio/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── common/           # Shared components
│   └── ui/               # UI components
├── constants/            # Site constants
├── docs/                 # Documentation
│   ├── COMPONENTS.md
│   ├── STYLES.md
│   ├── TYPES.md
│   ├── ANIMATIONS.md
│   └── CONSTANTS.md
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
├── public/                # Static assets
└── types/                 # TypeScript types
```

## Contributing

1. Follow the code style in existing files
2. Use TypeScript for all new code
3. Add JSDoc comments for complex functions
4. Update documentation when adding features

## Getting Help

- Check existing issues in the repository
- Review documentation files
- Examine existing components for patterns
