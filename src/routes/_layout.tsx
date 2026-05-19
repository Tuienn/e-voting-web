import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import MainLayout from '../components/common/layout/MainLayout'
import AuthService from '../services/bff/auth.service'
import { useAuthStore } from '../stores/auth/auth.store'

export const Route = createFileRoute('/_layout')({
    component: LayoutComponent,
    beforeLoad: async () => {
        try {
            const data = await AuthService.getCurrentUser()
            useAuthStore.getState().setUser({
                id: data.data.id,
                email: data.data.email
            })
            return data.data
        } catch {
            useAuthStore.getState().clearUser()
            throw redirect({ to: '/auth' })
        }
    }
})

function LayoutComponent() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}
