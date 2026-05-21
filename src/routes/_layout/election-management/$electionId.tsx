import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/election-management/$electionId')({
    component: lazyRouteComponent(() => import('../../../components/pages/electionManagement/$electionId'))
})
