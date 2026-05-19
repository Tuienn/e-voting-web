---
trigger: glob
globs: *.tsx
---

# Material UI (MUI) Guidelines

This project uses **Material UI (MUI)** as the primary UI library. Follow these guidelines for consistent implementation.

## Core Rules

### Import Convention

**CRITICAL:** Always use deep imports to specific modules, never import from the root package.

```typescript
// ❌ DON'T
import { Button, Box, Typography } from '@mui/material'

// ✅ DO
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
```

This follows the project's `autoImportSpecifierExcludeRegexes: ["^@mui/[^/]+$"]` configuration.

### Layout Components

**Use MUI components instead of HTML tags:**

```typescript
// ❌ DON'T
<div style={{ padding: '16px' }}>
    <div style={{ display: 'flex', gap: '8px' }}>
        {/* content */}
    </div>
</div>

// ✅ DO
<Box p={2}>
    <Stack spacing={1}>
        {/* content */}
    </Stack>
</Box>
```

**Key principles:**

- Replace `<div>` with `<Box>` or `<Stack>`
- Use MUI System Props (e.g., `p={2}`, `m={1}`) instead of inline styles
- Prefer `<Stack>` for flexbox layouts over `<Box display="flex">`
- Prioritize MUI components over raw HTML tags

## Available Components

### 🔹 SURFACES

- **Accordion** - Expandable/collapsible content sections
- **App Bar** - Top navigation bar
- **Card** - Independent content container
- **Paper** - Surface with elevation

### 🔹 NAVIGATION

- **Bottom Navigation** - Primary navigation at bottom (mobile-first)
- **Breadcrumbs** - Hierarchical path display
- **Drawer** - Side menu that slides from edge
- **Link** - Internal navigation or external links
- **Menu** - Action list triggered from button
- **Pagination** - Navigate between data pages
- **Speed Dial** - Quick action floating button
- **Stepper** - Step-by-step progress indicator
- **Tabs** - Switch between content groups

### 🔹 LAYOUT

- **Box** - Versatile wrapper, replaces `<div>`
- **Container** - Content width limiter
- **Grid** - 2D grid layout system
- **Stack** - 1D layout (row/column) with automatic spacing
- **Image List** - Display list of images

### 🔹 INPUTS

- **Autocomplete** - Input with search suggestions
- **Button** - Action trigger
- **Button Group** - Related buttons grouped together
- **Checkbox** - Multiple value selection
- **FAB (Floating Action Button)** - Prominent floating action button
- **Radio Group** - Single value selection
- **Rating** - Star rating input
- **Select** - Dropdown value picker
- **Slider** - Drag to select value
- **Switch** - Toggle on/off state
- **Text Field** - Versatile text input
- **Toggle Button** - On/off state button

### 🔹 DATA DISPLAY

- **Avatar** - User profile image
- **Badge** - Status/count label overlay
- **Chip** - Tag or label display
- **Divider** - Visual separator line
- **Icons** - SVG icon set
- **List** - Vertical list display
- **Table** - Tabular data display
- **Tooltip** - Hover hint
- **Typography** - Text display and formatting

### 🔹 UTILS

- **useMediaQuery** - Hook for breakpoint/media query checks

## Component Usage Patterns

### Text Field (Preferred Input)

`TextField` is extremely versatile. Use it instead of:

- `Input`
- `InputBase`
- `OutlinedInput`
- `FilledInput`
- `StandardInput`
- `Textarea` (use `TextField` with `multiline` prop)

```typescript
// Single-line input
<TextField label="Username" />

// Multi-line input
<TextField label="Description" multiline rows={4} />
```

### Layout with Stack

```typescript
// Vertical stack with spacing
<Stack spacing={2}>
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
</Stack>

// Horizontal stack with spacing
<Stack direction="row" spacing={1}>
    <Chip label="Tag 1" />
    <Chip label="Tag 2" />
</Stack>
```

### System Props

Use MUI's system props for styling:

```typescript
<Box
    p={2}           // padding: theme.spacing(2)
    m={1}           // margin: theme.spacing(1)
    bgcolor="primary.main"
    borderRadius={2}
    display="flex"
    alignItems="center"
>
    {/* content */}
</Box>
```

### The `sx` Prop

The `sx` prop is MUI's most powerful styling solution. It provides a superset of CSS with access to theme values.

**When to use `sx` vs System Props:**

- **System Props:** Simple, single values (e.g., `p={2}`, `m={1}`)
- **`sx` Prop:** Complex styles, responsive design, pseudo-classes, theme access

#### Basic Usage

```typescript
<Box sx={{ p: 2, m: 1, bgcolor: 'primary.main' }}>
    {/* Equivalent to p={2} m={1} bgcolor="primary.main" */}
</Box>
```

#### Theme Access

All theme values are accessible via `sx`:

```typescript
<Button sx={{
    color: 'primary.main',           // theme.palette.primary.main
    bgcolor: 'secondary.light',       // theme.palette.secondary.light
    borderRadius: 2,                  // theme.shape.borderRadius * 2
    p: 3,                             // theme.spacing(3)
    fontWeight: 'bold',               // theme.typography.fontWeightBold
}}>
    Styled Button
</Button>
```

#### Responsive Design

Use breakpoint objects for responsive styles:

```typescript
<Box sx={{
    width: { xs: '100%', sm: '50%', md: '33%' },
    p: { xs: 1, sm: 2, md: 3 },
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' }
}}>
    Responsive Box
</Box>

// Breakpoints: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
```

#### Pseudo-Classes & Nested Selectors

```typescript
<Button sx={{
    '&:hover': {
        bgcolor: 'primary.dark',
        transform: 'scale(1.05)'
    },
    '&:active': {
        transform: 'scale(0.95)'
    },
    '&.Mui-disabled': {
        opacity: 0.5
    }
}}>
    Interactive Button
</Button>
```

#### Conditional Styling

```typescript
<Box sx={{
    bgcolor: isActive ? 'success.main' : 'grey.300',
    color: isActive ? 'white' : 'text.secondary',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1
}}>
    Conditional Style
</Box>
```

#### Advanced Patterns

```typescript
// Combine with theme callback for complex logic
<Box sx={(theme) => ({
    bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
})}>
    Theme-aware Box
</Box>

// Array syntax for style composition
<Button sx={[
    { p: 2, borderRadius: 2 },
    isActive && { bgcolor: 'primary.main', color: 'white' },
    isDisabled && { opacity: 0.5, pointerEvents: 'none' }
]}>
    Composed Styles
</Button>
```

#### Common `sx` Patterns

```typescript
// Card with hover effect
<Card sx={{
    transition: 'all 0.3s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
    }
}}>
    {/* content */}
</Card>

// Truncate text
<Typography sx={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 200
}}>
    Long text that will be truncated...
</Typography>

// Centered content
<Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
}}>
    Centered Content
</Box>

// Sticky header
<AppBar sx={{
    position: 'sticky',
    top: 0,
    zIndex: (theme) => theme.zIndex.appBar,
    bgcolor: 'background.paper'
}}>
    {/* navbar */}
</AppBar>
```

#### ❌ DON'T

```typescript
// Don't use inline styles
<Box style={{ padding: '16px', backgroundColor: '#1976d2' }}>
    {/* Wrong */}
</Box>

// Don't mix sx with style prop
<Box sx={{ p: 2 }} style={{ margin: '8px' }}>
    {/* Inconsistent */}
</Box>

// Don't use CSS-in-JS libraries (styled-components, emotion)
const StyledBox = styled.div`
    padding: 16px;
` // Wrong approach for this project
```

#### ✅ DO

```typescript
// Use sx for all styling
<Box sx={{ p: 2, bgcolor: 'primary.main' }}>
    {/* Correct */}
</Box>

// Use theme values instead of hardcoded colors
<Button sx={{ bgcolor: 'primary.main' }}>
    {/* Correct - theme-aware */}
</Button>

// Combine system props with sx for complex cases
<Box p={2} sx={{ '&:hover': { bgcolor: 'grey.100' } }}>
    {/* Acceptable combination */}
</Box>
```

## Custom Wrappers

Place custom MUI component wrappers in `src/components/common/mui/`:

```typescript
// src/components/common/mui/CustomDrawer.tsx
import Drawer from '@mui/material/Drawer'

export const CustomDrawer = () => {
    // Custom implementation
}
```

## Examples

### Form Layout

```typescript
<Box component="form" p={3}>
    <Stack spacing={3}>
        <Typography variant="h4">Login</Typography>
        <TextField label="Username" fullWidth />
        <TextField label="Password" type="password" fullWidth />
        <Button variant="contained" type="submit" fullWidth>
            Sign In
        </Button>
    </Stack>
</Box>
```

### Card with Content

```typescript
<Card>
    <Box p={2}>
        <Stack spacing={2}>
            <Typography variant="h6">Card Title</Typography>
            <Divider />
            <Typography variant="body2">Card content goes here</Typography>
            <Box display="flex" justifyContent="flex-end">
                <Button size="small">Action</Button>
            </Box>
        </Stack>
    </Box>
</Card>
```

## Checklist

- [ ] Use deep imports (`@mui/material/Button`)
- [ ] Replace `<div>` with `<Box>` or `<Stack>`
- [ ] Use System Props for simple styling
- [ ] Use `sx` prop for complex styles, responsive design, and pseudo-classes
- [ ] Never use inline `style` prop or CSS-in-JS libraries
- [ ] Access theme values via `sx` (e.g., `'primary.main'`, not `'#1976d2'`)
- [ ] Prefer `<Stack>` for flex layouts
- [ ] Use `TextField` for all text inputs
- [ ] Avoid deprecated or unlisted components
