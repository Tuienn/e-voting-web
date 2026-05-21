import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import z from 'zod'

const electionDetailSearchSchema = z.object({
    tab: z.coerce.number().min(0).max(2).catch(0), // Danh sách tab có 3 phần: 0 - Basic Info, 1 - Danh sách vote, 2 - Tally
    voterId: z.string().optional().catch(undefined),
    startDate: z.string().optional().catch(undefined),
    endDate: z.string().optional().catch(undefined),
    page: z.coerce.number().optional().catch(undefined),
    pageSize: z.coerce.number().optional().catch(undefined)
})

export const Route = createFileRoute('/_layout/election-management/$electionId')({
    component: lazyRouteComponent(() => import('../../../components/pages/electionManagement/$electionId')),
    validateSearch: electionDetailSearchSchema
})
