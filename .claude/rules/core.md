---
trigger: always_on
---

# E-Notarization Web Frontend - Core Directives

**Mission:** Develop the web-frontend for the E-Notarization platform following these core directives to ensure consistency, efficiency, and code quality.

## Tech Stack & Libraries

These are the mandatory technologies. Use only these:

- **Routing:** TanStack Router (File-based routing)
- **State Management:** Zustand (**DO NOT** use Context API for state)
- **API/Async State:** TanStack Query
- **UI Library:** Material UI (MUI)
- **Language:** TypeScript
- **I18n:** i18next (`useTranslation` hook)

## Project Directory Structure

```text
src/
├── assets/                 # Static resources (images, fonts, global css)
├── components/             # UI Components
│   ├── common/             # Reusable components, categorized by purpose
│   │   ├── layout/         # Layout components (Header, Sidebar)
│   │   └── mui/            # Wrapper/Custom MUI components
│   ├── pages/              # Page-specific components (separate UI logic)
│   ├── providers/          # React Context Providers (Theme, Query)
│   └── store/              # UI Components directly connected to Store
├── constants/              # Constants, static config (enum, API config)
├── i18n/                   # Internationalization config (default: 'en')
├── hooks/                  # Custom hook
├── lib/                    # Core utility libraries
│   ├── handleCrypto.ts     # Encryption handling
│   ├── handleStorage.ts    # Storage handling (localStorage/sessionStorage)
│   ├── utils.ts            # General utilities
│   ├── format.ts           # Data formatting for API or functions
│   └── validator.ts        # Input validation with zod
├── routes/                 # Page definitions & routing (TanStack Router)
│   ├── __root.tsx          # Root layout
│   ├── _layout.tsx         # Shared layout for child routes
│   ├── _layout/            # Routes using shared layout
│   │   ├── index.tsx       # Home page (/)
│   │   └── personal.tsx    # Personal page (/personal)
│   ├── login.tsx           # Login page (no shared layout)
│   └── router.tsx          # Router component
├── services/               # API logic & Backend communication
│   └── gin/                # Services for Gin backend
│       └── auth.service.ts # API logic written as class + static functions
├── stores/                 # Global state management (Zustand)
│   ├── auth/               # Auth Login/User state
│   ├── notification/       # Toast/Notification state
│   └── token/              # Token management
|── types/                  # TypeScript type definitions
└── routeTree.gen.ts        # Auto-generated. DO NOT manually edit
```

## Coding Conventions

### General Rules

- **Function Style:** **MANDATORY** use Arrow Functions for all components and functions
- **Component Props:** Use interface for props definition with `React.FC<Props>` typing and use in code is object `props.`
- **Type Naming Convention:**
    - Types/interfaces in `src/types/` folder **MUST** be prefixed with `I` (e.g., `IUser`, `INavbarItem`)
    - Component Props interfaces do NOT need `I` prefix (just `Props`)
- **Comments:** Minimize. Code must be self-documenting
- **Console:** Console logs must NOT contain emojis
- **State Management:**
    - Only use Zustand for global state
    - **ABSOLUTELY FORBIDDEN** to use React Context Provider for state management
- **Storage Handling:**
    - **MANDATORY** use utilities from `src/lib/handleStorage.ts` for all storage operations
    - **ABSOLUTELY FORBIDDEN** to use `localStorage` or `sessionStorage` directly
    - Use `saveDataStorage()`, `getDataStorage()`, and `removeDataStorage()` functions
    - Benefits: Centralized error handling, automatic JSON parsing/stringification, consistent API

### API & Data Fetching (TanStack Query)

**Naming Convention:**

- **Query:** `useQuery` + `[Purpose]` (e.g., `useQueryUserProfile`), use `isPending` instead of `isLoading`
- **Mutation:** `useMutation` + `[Purpose]` (e.g., `useMutationLogin`)

**Implementation:**

- API call logic (fetcher) must be separated in `services/` directory
- `useQuery` **MUST** define `queryKey` as explicit array
- To access query state from other components: Use `useQueryClient` and `queryKey`

### Examples

#### ❌ DON'T

```typescript
// Using React Context for state
const MyContext = React.createContext()

// Regular function declaration
function MyComponent() {}

// Props without interface
const MyComponent = ({ title, count }) => {}

// Types without I prefix in types folder
// src/types/common.ts
export interface User {
    // Missing I prefix
    name: string
}

// Importing from root package
import { Button, Box } from '@mui/material'

// Direct localStorage usage
const token = localStorage.getItem('token')
localStorage.setItem('user', JSON.stringify(user))
sessionStorage.setItem('temp', data)
```

#### ✅ DO

```typescript
// Using Zustand for state
const useMyStore = create((set) => ({ ... }))

// Arrow function component with Props interface
interface Props {
    title: string
    count: number
}

const MyComponent: React.FC<Props> = (props) => {
    return <div>{props.title}: {props.count}</div>
}

// Types with I prefix in types folder
// src/types/common.ts
export interface IUser {
    name: string
    email: string
}

export interface INavbarItem {
    label: string
    icon: React.ReactNode
    hrefTo: string
}

// Deep imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// Correct storage handling
import { getDataStorage, saveDataStorage, removeDataStorage } from '../lib/handleStorage'

const token = getDataStorage('token')
saveDataStorage('user', user) // Automatically stringifies objects
saveDataStorage('temp', data, 'session') // For sessionStorage
removeDataStorage('old-key')
```

## Creating New Routes

### Route with MainLayout

To create a new route (e.g., `/settings`) using shared `MainLayout`:

1. **Create route file**: `src/routes/_layout/settings.tsx`
2. **Create page component**: `src/components/pages/settings/index.tsx`
3. **Update Route Tree**: Run `npm gen:routes` to auto-update `routeTree.gen.ts`

### Route without MainLayout

To create a new route (e.g., `/register`) without `MainLayout`:

1. **Create route file**: `src/routes/register.tsx`
2. **Create page component**: `src/components/pages/register/index.tsx`
3. **Update Route Tree**: Run `npm gen:routes`

## Checklist

- [ ] Use arrow functions exclusively
- [ ] Use `interface Props` with `React.FC<Props>` for components
- [ ] Prefix types/interfaces in `types/` folder with `I`
- [ ] Use Zustand for state, never Context API
- [ ] Use handleStorage utilities for all storage operations (never direct localStorage/sessionStorage)
- [ ] Use TanStack Query for API calls
- [ ] Follow naming conventions (useQuery*/useMutation*)
- [ ] Place files in correct directory structure
- [ ] Run `npm gen:routes` after creating new routes
- [ ] Keep code self-documenting, minimize comments
