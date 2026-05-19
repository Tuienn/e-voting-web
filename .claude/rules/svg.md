---
trigger: glob
globs: *.tsx
---

# SVG Usage with vite-plugin-svgr

This project uses `vite-plugin-svgr` to handle SVG files with two import methods depending on use case.

## Directory Structure

SVG files are organized by purpose:

```
src/assets/svg/
├─ illustrations/   # Large decorative SVGs (404, empty state, hero images)
│   └─ 404.svg
└─ icons/           # Small UI icons (navigation, actions, status)
    ├─ logo.svg
    ├─ home.svg
    ├─ user.svg
    └─ loading.svg
```

## Import Methods

### Method 1: As React Component (Recommended for Icons)

**When to use:**

- UI icons that need dynamic styling (color, size)
- SVGs that need theme-aware colors
- Interactive icons with hover/active states
- Icons that need to scale with font-size

**Syntax:**

```typescript
import IconName from '@/assets/svg/icons/icon.svg?react'
```

**Usage:**

```typescript
import Logo from '../../../assets/svg/icons/logo.svg?react'

// Use as React component with props
<Logo width={25} />
<Logo width={30} height={30} fill="currentColor" />
```

**Key benefits:**

- Can pass props like `width`, `height`, `fill`, `stroke`
- Inherits text color via `currentColor`
- Can be styled with CSS/MUI `sx` prop
- Better for theme integration

### Method 2: As Image URL (Recommended for Illustrations)

**When to use:**

- Large decorative illustrations (404, empty states, hero)
- Static images that don't need dynamic styling
- SVGs with complex gradients/filters
- Performance-critical cases (smaller bundle size)

**Syntax:**

```typescript
import imageName from '@/assets/svg/illustrations/image.svg'
```

**Usage:**

```typescript
import NotFoundSvg from '../../../assets/svg/illustrations/404.svg'

// Use as img src
<img src={NotFoundSvg} alt='404 not found' width={200} loading='lazy' />
```

**Key benefits:**

- Lighter bundle (not inlined as React component)
- Better caching (separate asset file)
- Simpler for static illustrations
- Native lazy loading support

## Configuration

### vite.config.ts

```typescript
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        svgr({
            svgrOptions: {
                icon: true, // Scale with font-size
                dimensions: false // Remove hardcoded width/height
            }
        })
    ]
})
```

### TypeScript Declaration (src/types/svg.d.ts)

```typescript
declare module '*.svg?react' {
    import * as React from 'react'
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    export default ReactComponent
}
```

## Examples

### ❌ DON'T

```typescript
// Wrong: Using ?react for large illustrations
import NotFoundSvg from '../../../assets/svg/illustrations/404.svg?react'
<NotFoundSvg /> // Bloats bundle unnecessarily

// Wrong: Using URL import for UI icons
import Logo from '../../../assets/svg/icons/logo.svg'
<img src={Logo} /> // Can't style dynamically

// Wrong: Inline SVG code in component
const MyIcon = () => (
  <svg width="24" height="24">...</svg>
) // Not reusable, hard to maintain
```

### ✅ DO

```typescript
// Good: React component for UI icon (can be styled)
import Logo from '../../../assets/svg/icons/logo.svg?react'
<Logo width={25} />

// Good: URL import for large illustration (lighter)
import NotFoundSvg from '../../../assets/svg/illustrations/404.svg'
<img src={NotFoundSvg} alt='404 not found' width={200} loading='lazy' />

// Good: Using with MUI theme colors
import HomeIcon from '../../../assets/svg/icons/home.svg?react'
<HomeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
```

## Quick Decision Guide

**Use `?react` (React Component) when:**

- Icon size < 10KB
- Need dynamic colors/styles
- Need theme integration
- Interactive states (hover, active)

**Use URL import (Image) when:**

- Illustration/image > 10KB
- Static, decorative purpose
- Complex SVG (gradients, filters)
- Performance matters

## Common Patterns

### Icon with MUI Button

```typescript
import DownloadIcon from '../../../assets/svg/icons/download.svg?react'

<Button startIcon={<DownloadIcon />}>
  Download
</Button>
```

### Theme-Aware Icon

```typescript
import MenuIcon from '../../../assets/svg/icons/menu.svg?react'

<MenuIcon sx={{
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
  fontSize: 20
}} />
```

### Lazy-Loaded Illustration

```typescript
import HeroSvg from '../../../assets/svg/illustrations/hero.svg'

<img
  src={HeroSvg}
  alt='Hero illustration'
  width={400}
  loading='lazy'
/>
```
