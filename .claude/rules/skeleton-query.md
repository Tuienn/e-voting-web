---
trigger: glob
globs: *.tsx
---

# TanStack Query Loading & Error States

When using `useQuery` or `useMutation` from TanStack Query, follow these patterns for loading and error states.

**Exception:** This rule does NOT apply to Table components - tables should use their own loading patterns.

## Required Imports

```typescript
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
```

## Pattern: Loading State with Skeleton

Use `Skeleton` components that match your actual content structure.

**IMPORTANT:** Always use `isPending` instead of `isLoading` for checking loading state in TanStack Query.

### ❌ DON'T

```typescript
// Using isLoading (deprecated pattern)
if (query.isLoading) {
    return <CircularProgress />
}

// Using CircularProgress
if (query.isPending) {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
            <CircularProgress />
        </Box>
    )
}

// Generic skeleton without structure
if (query.isPending) {
    return <Skeleton variant='rectangular' width='100%' height={200} />
}
```

### ✅ DO

```typescript
// Skeleton matching actual content layout with isPending
if (queryUserProfile.isPending) {
    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={1}>
                <Skeleton width='40%' height={40} />
                <Skeleton width='60%' height={40} />
                <Skeleton width='70%' height={40} />
            </Stack>
        </Paper>
    )
}
```

## Pattern: Error State with Alert

Use `Alert` component with i18n translation for error messages.

### ❌ DON'T

```typescript
// Plain Typography
if (query.isError) {
    return <Typography color='error'>Error loading data</Typography>
}

// Hardcoded error message
if (query.isError) {
    return <Alert severity='error'>Failed to load</Alert>
}
```

### ✅ DO

```typescript
// Alert with i18n translation
if (queryUserProfile.isError) {
    return (
        <Alert severity='error'>{t('error.loadFailed')}</Alert>
    )
}
```

## Complete Example

```typescript
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import AuthService from '../../../services/gin/auth.service'
import Paper from '@mui/material/Paper'

const PersonalPage: React.FC = () => {
    const { t } = useTranslation('personal')

    const queryUserProfile = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => AuthService.getUserProfile(),
        retry: 1
    })

    if (queryUserProfile.isPending) {
        return (
            <Paper sx={{ p: 2 }}>
                <Stack spacing={1}>
                    <Skeleton width='40%' height={40} />
                    <Skeleton width='60%' height={40} />
                    <Skeleton width='70%' height={40} />
                </Stack>
            </Paper>
        )
    }

    if (queryUserProfile.isError) {
        return (
            <Alert severity='error'>
                {t('error.loadFailed')}
            </Alert>
        )
    }

    const user = queryUserProfile.data

    return (
        <Box p={3}>
            <Card>
                <Box p={2}>
                    <Stack spacing={2}>
                        <Typography variant='h5' fontWeight='bold'>
                            {t('title')}
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant='body1'>
                                <strong>{t('fields.name')}:</strong> {user?.name}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>{t('fields.email')}:</strong> {user?.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
}

export default PersonalPage

```

## Skeleton Variants

Choose the appropriate `variant` based on content type:

- `variant='text'` - For text content (default)
- `variant='circular'` - For avatars, profile images
- `variant='rectangular'` - For images, cards
- `variant='rounded'` - For rounded images, buttons

## Alert Severity Options

- `severity='error'` - For load failures (most common)
- `severity='warning'` - For partial failures
- `severity='info'` - For informational states
- `severity='success'` - For success states (rare in queries)

## isPending vs isLoading

**Always use `isPending`** for checking loading state:

- `isPending`: True when query has no data yet (initial load or after invalidation)
- `isLoading`: Deprecated pattern, use `isPending` instead

```typescript
// ✅ CORRECT
if (query.isPending) { ... }

// ❌ WRONG
if (query.isLoading) { ... }
```

## Checklist

- [ ] Use `isPending` for loading state (not `isLoading`)
- [ ] Use `Skeleton` for loading UI (not `CircularProgress`)
- [ ] Skeleton layout matches actual content structure
- [ ] Use `Alert` for error state (not plain `Typography`)
- [ ] Error messages use i18n with `t()` function
- [ ] Consistent padding with actual content (usually `p={3}`)
- [ ] Deep imports for all MUI components
- [ ] Early return pattern: pending → error → success
