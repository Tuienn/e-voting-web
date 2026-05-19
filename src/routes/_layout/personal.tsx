import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/personal')({
    component: lazyRouteComponent(() => import('../../components/pages/personal'))
})
