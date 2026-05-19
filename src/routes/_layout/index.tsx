import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
    component: lazyRouteComponent(() => import('../../components/pages/home'))
})
