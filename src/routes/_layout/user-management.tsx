import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import z from 'zod'

//NOTE - Catch lỗi về undefined để khi params lỗi -> xóa luôn
//NOTE - Optional để params có thể có hoặc không
const filterSchema = z.object({
    email: z.string().optional().catch(undefined),
    name: z.string().optional().catch(undefined),
    role: z.enum(['ADMIN', 'VOTER', 'CANDIDATE']).optional().catch(undefined),
    isActive: z.enum(['true', 'false']).optional().catch(undefined),
    page: z.coerce.number().optional().catch(undefined),
    pageSize: z.coerce.number().optional().catch(undefined)
})

export const Route = createFileRoute('/_layout/user-management')({
    component: lazyRouteComponent(() => import('../../components/pages/userManagement')),
    validateSearch: filterSchema
})
