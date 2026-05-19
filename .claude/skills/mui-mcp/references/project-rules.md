# MUI Project Rules

These are the mandatory MUI implementation rules for this project.

## Critical Rules

### 1. Deep Imports (MANDATORY)

Always use deep imports to specific modules, never import from root package:

```typescript
// ❌ DON'T
import { Button, Box, Typography } from '@mui/material'

// ✅ DO
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
```

### 2. Use MUI Components Over HTML Tags

Replace HTML elements with MUI equivalents:

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
- Use MUI System Props (`p={2}`, `m={1}`) instead of inline styles
- Prefer `<Stack>` for flexbox layouts over `<Box display="flex">`
- Prioritize MUI components over raw HTML tags

### 3. TextField is Preferred Input

Use `TextField` instead of `Input`, `InputBase`, `OutlinedInput`, `FilledInput`, `StandardInput`, or `Textarea`:

```typescript
// Single-line input
<TextField label="Username" />

// Multi-line input
<TextField label="Description" multiline rows={4} />
```

### 4. System Props for Styling

Use MUI's system props:

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

## Available Components

### Layout

- **Box** - Versatile wrapper (replaces `<div>`)
- **Container** - Content width limiter
- **Grid** - 2D grid layout system
- **Stack** - 1D layout (row/column) with automatic spacing
- **Image List** - Display list of images

### Surfaces

- **Accordion** - Expandable/collapsible sections
- **App Bar** - Top navigation bar
- **Card** - Content container
- **Paper** - Surface with elevation

### Navigation

- **Bottom Navigation** - Primary navigation at bottom
- **Breadcrumbs** - Hierarchical path display
- **Drawer** - Side menu
- **Link** - Navigation links
- **Menu** - Action list from button
- **Pagination** - Navigate data pages
- **Speed Dial** - Quick action button
- **Stepper** - Step-by-step progress
- **Tabs** - Switch between content groups

### Inputs

- **Autocomplete** - Input with suggestions
- **Button** - Action trigger
- **Button Group** - Related buttons
- **Checkbox** - Multiple selection
- **FAB** - Floating Action Button
- **Radio Group** - Single selection
- **Rating** - Star rating
- **Select** - Dropdown picker
- **Slider** - Drag to select
- **Switch** - Toggle on/off
- **Text Field** - Text input (preferred)
- **Toggle Button** - On/off button

### Data Display

- **Avatar** - User profile image
- **Badge** - Status/count overlay
- **Chip** - Tag or label
- **Divider** - Visual separator
- **Icons** - SVG icon set
- **List** - Vertical list
- **Table** - Tabular data
- **Tooltip** - Hover hint
- **Typography** - Text display

### Utils

- **useMediaQuery** - Breakpoint/media query hook

## Example Patterns

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

## Custom Wrappers

Place custom MUI component wrappers in `src/components/common/mui/`:

```typescript
// src/components/common/mui/CustomDrawer.tsx
import Drawer from '@mui/material/Drawer'

export const CustomDrawer = () => {
    // Custom implementation
}
```
