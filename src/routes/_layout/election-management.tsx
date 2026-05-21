import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

// const electionManagementSearchSchema = z.object({
//     name: z.string().catch(''),
//     status: z.union([z.enum(['PENDING', 'ACTIVE', 'CLOSED', 'COMPLETED']), z.literal('')]).catch(''),
//     startDate: z.string().catch(''),
//     endDate: z.string().catch(''),
//     page: z.coerce.number().catch(0),
//     pageSize: z.coerce.number().catch(10)
// })

export const Route = createFileRoute('/_layout/election-management')({
    // validateSearch: electionManagementSearchSchema,
    component: lazyRouteComponent(() => import('../../components/pages/electionManagement'))
})
