import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/user-management')({
    component: lazyRouteComponent(() => import('../../components/pages/userManagement'))
})
