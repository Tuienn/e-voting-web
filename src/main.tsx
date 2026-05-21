import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/-router.tsx'
import ThemeProvider from './components/providers/ThemeProvider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import TanstackQueryProvider from './components/providers/TanstackQueryProvider.tsx'
import './assets/styles/index.css'

import './i18n'
import NotificationHost from './components/stores/NotificationHost.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <CssBaseline />
            <TanstackQueryProvider>
                <RouterProvider router={router} />
                <NotificationHost />
            </TanstackQueryProvider>
        </ThemeProvider>
    </StrictMode>
)
