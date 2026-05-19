---
name: mui-mcp
description: Implement Material UI (MUI) components following project-specific rules with optional documentation fetching for complex components. Use when implementing MUI components in React/TypeScript, especially for complex components (Table, Autocomplete, Stepper, Data Grid, Menu, Dialog, Tabs, Select with advanced features), or when user explicitly requests MUI documentation. Always uses deep imports, System Props, and MUI layout components (Box/Stack) per project standards.
---

# MUI MCP

Implement Material UI components following project rules with optional MUI documentation fetching via MCP server.

## Workflow

### 1. Component Complexity Assessment

When user requests a MUI component, assess its complexity:

**Always read [complex-components.md](references/complex-components.md) first** to check if the component is complex.

**High Complexity** (Table, Autocomplete, Stepper, Menu, Data Grid, Date/Time Picker):

- Ask user: "This component is complex. Should I fetch MUI docs to ensure accuracy?"
- If confirmed → proceed to Step 2
- If declined → proceed to Step 3

**Medium/Low Complexity** (Button, TextField, Card, Stack, etc.):

- Skip docs fetching unless user explicitly requests
- Proceed directly to Step 3

**User explicitly requests docs**:

- User says "fetch docs", "check documentation", "use MUI docs"
- Always fetch docs regardless of complexity

### 2. Fetch MUI Documentation (if needed)

When docs fetching is confirmed:

1. **Read MCP tools available**: Check `C:\Users\NC\.cursor\projects\d-Code-e-notarization-web-frontend\mcps\cursor-browser-extension\tools\` for available MUI MCP tools

2. **Call useMuiDocs**: Fetch docs for the specific component

    ```typescript
    // Example: For Table component
    CallMcpTool('cursor-browser-extension', 'useMuiDocs', {
        package: '@mui/material/Table'
    })
    ```

3. **Call fetchDocs if needed**: If additional docs URLs are present in returned content

    ```typescript
    CallMcpTool('cursor-browser-extension', 'fetchDocs', {
        url: 'https://mui.com/material-ui/...'
    })
    ```

4. **Repeat**: Continue fetching until all relevant docs are loaded

### 3. Implement Component

**Always read [project-rules.md](references/project-rules.md) first** before implementing.

Follow these mandatory rules:

#### Deep Imports (CRITICAL)

```typescript
// ✅ DO
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

// ❌ DON'T
import { Button, Box, Stack } from '@mui/material'
```

#### Use MUI Components

```typescript
// ✅ DO - Use Box/Stack
<Box p={2}>
    <Stack spacing={1}>
        <Button>Action</Button>
    </Stack>
</Box>

// ❌ DON'T - Use HTML tags
<div style={{ padding: '16px' }}>
    <div style={{ display: 'flex', gap: '8px' }}>
        <button>Action</button>
    </div>
</div>
```

#### System Props

```typescript
// ✅ DO - Use System Props
<Box p={2} m={1} bgcolor="primary.main" borderRadius={2}>

// ❌ DON'T - Use inline styles
<div style={{ padding: '16px', margin: '8px' }}>
```

#### TextField for Inputs

```typescript
// ✅ DO
<TextField label="Username" />
<TextField label="Description" multiline rows={4} />

// ❌ DON'T
<Input />
<textarea />
```

### 4. Combine Docs + Rules

When implementing with fetched docs:

1. Use MUI docs for component-specific props, patterns, examples
2. Apply project rules for imports, layout, styling
3. Ensure deep imports for all MUI components
4. Use Box/Stack for layout instead of div
5. Use System Props instead of inline styles

## Examples

### Example 1: Simple Component (No docs needed)

**User**: "Create a login form with MUI"

**Action**:

- Assess: Button, TextField, Stack = Low complexity
- Skip docs fetching
- Implement with project rules

```typescript
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const LoginForm: React.FC = () => {
    return (
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
    )
}
```

### Example 2: Complex Component (Ask first)

**User**: "Create a data table with sorting and pagination"

**Action**:

1. Assess: Table = High complexity
2. Ask: "Table is complex. Should I fetch MUI docs to ensure accuracy?"
3. If yes → fetch docs → implement
4. If no → implement with best practices

### Example 3: User Requests Docs

**User**: "Create an Autocomplete, fetch the docs to be sure"

**Action**:

1. User explicitly requested docs
2. Fetch MUI Autocomplete docs via MCP
3. Implement with docs + project rules

## Quick Reference

**When to ask about docs:**

- Table, Autocomplete, Stepper, Menu, Data Grid
- Date/Time Picker, Dialog, Tabs, Select (advanced)
- Transfer List, TreeView

**When to skip docs:**

- Button, TextField, Typography
- Box, Stack, Container, Card, Paper
- Checkbox, Switch, Radio
- Avatar, Badge, Chip, Tooltip

**Always apply:**

- Deep imports: `import Button from '@mui/material/Button'`
- Box/Stack for layout (not div)
- System Props for styling (not inline styles)
- TextField for inputs (not Input/textarea)
