import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import z from 'zod'

//NOTE - Catch lỗi về undefined để khi params lỗi -> xóa luôn
//NOTE - Optional để params có thể có hoặc không
const electionManagementSearchSchema = z.object({
    name: z.string().optional().catch(undefined),
    status: z.enum(['PENDING', 'ACTIVE', 'CLOSED', 'COMPLETED']).optional().catch(undefined),
    startDate: z.string().optional().catch(undefined),
    endDate: z.string().optional().catch(undefined),
    page: z.coerce.number().optional().catch(undefined),
    pageSize: z.coerce.number().optional().catch(undefined)
})

export const Route = createFileRoute('/_layout/election-management/')({
    validateSearch: electionManagementSearchSchema,
    component: lazyRouteComponent(() => import('../../../components/pages/electionManagement'))
})
