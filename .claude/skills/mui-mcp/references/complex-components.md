# Complex MUI Components

Components that typically benefit from fetching official MUI documentation.

## When to Fetch Docs

Consider fetching docs for these components due to their complexity, extensive APIs, or specific usage patterns:

### High Complexity (Always fetch docs when user confirms)

1. **Table / Data Grid** - Complex props, sorting, filtering, pagination
2. **Autocomplete** - Many configuration options, async loading, custom rendering
3. **Stepper** - Multi-step forms, validation, custom connectors
4. **Menu / Popper** - Positioning, nested menus, custom anchors
5. **Date Picker / Time Picker** - Localization, format, validation (MUI X)
6. **Data Grid** - Advanced features, column config, row selection (MUI X)

### Medium Complexity (Fetch docs if needed)

7. **Drawer** - Variants (temporary, persistent, permanent), responsive behavior
8. **Dialog / Modal** - Transitions, fullScreen, custom actions
9. **Accordion** - Controlled vs uncontrolled, custom expand icons
10. **Tabs** - Variants, scrollable, custom indicators
11. **Select** - Multiple selection, custom rendering, groups
12. **Rating** - Custom icons, precision, read-only
13. **Slider** - Range slider, marks, custom thumb
14. **Transfer List** - Custom rendering, filtering
15. **TreeView** - Nested structure, expansion, icons (MUI X)

### Low Complexity (Usually don't need docs)

- Button, TextField, Typography, Box, Stack, Container
- Card, Paper, Divider
- Checkbox, Switch, Radio
- Avatar, Badge, Chip, Tooltip
- List (simple)

## MUI MCP Server Tools

The project has access to the `mui-mcp` server with these tools:

1. **useMuiDocs** - Fetch docs for specific MUI package/component
2. **fetchDocs** - Fetch additional docs using URLs from returned content

## Workflow with MCP

When docs are needed:

1. Ask user: "This component is complex. Should I fetch MUI docs to ensure accuracy?"
2. If confirmed, call `useMuiDocs` with the relevant package (e.g., "@mui/material/Table")
3. If additional docs needed, use `fetchDocs` with URLs from step 2
4. Use fetched content + project rules to implement component
