import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

// const filterSchema = z.object({
//     email: z.string().catch(''),
//     name: z.string().catch(''),
//     role: z.enum(['admin', 'voter', 'candidate']).catch('voter'),
//     isActive: z.enum(['true', 'false']).catch('true')
// })

export const Route = createFileRoute('/_layout/user-management')({
    component: lazyRouteComponent(() => import('../../components/pages/userManagement'))
    // validateSearch: filterSchema
})
