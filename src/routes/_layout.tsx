import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import MainLayout from '../components/ui/layout/MainLayout'
import { useAuthStore } from '../stores/auth/auth.store'
import AuthService from '../services/bff/auth.service'

export const Route = createFileRoute('/_layout')({
    component: LayoutComponent,
    beforeLoad: async () => {
        //NOTE - Lấy user từ sessionStorage,
        // nếu không có thì gọi API để lấy thông tin user, nếu có thì set vào auth store, nếu không có thì redirect về trang auth
        const user = useAuthStore.getState().user

        if (!user) {
            try {
                const data = await AuthService.getCurrentUser()
                useAuthStore.getState().setUser({
                    id: data.data.id,
                    email: data.data.email
                })
            } catch {
                throw redirect({
                    to: '/auth',
                    search: {
                        mode: 'login'
                    }
                })
            }
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
