import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/election-management')({
    component: lazyRouteComponent(() => import('../../components/pages/electionManagement'))
})
