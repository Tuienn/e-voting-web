import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import AuthPage from '../components/pages/auth'

const authSearchSchema = z.object({
    mode: z.enum(['login', 'register']).optional().default('login')
})

export const Route = createFileRoute('/auth')({
    validateSearch: authSearchSchema,
    component: AuthPage
})
