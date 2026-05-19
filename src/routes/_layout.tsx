import { createFileRoute, Outlet } from '@tanstack/react-router'
import MainLayout from '../components/common/layout/MainLayout'

export const Route = createFileRoute('/_layout')({
    component: LayoutComponent
})

function LayoutComponent() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}
