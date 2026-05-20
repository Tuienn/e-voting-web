import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import AuthPage from '../components/pages/auth'
import { useAuthStore } from '../stores/auth/auth.store'
import AuthService from '../services/bff/auth.service'

const authSearchSchema = z.object({
    mode: z.enum(['login', 'register']).catch('login')
})

export const Route = createFileRoute('/auth')({
    validateSearch: authSearchSchema,
    component: AuthPage,
    beforeLoad: async () => {
        //NOTE - Nếu đã có user rồi thì không cho vào trang auth nữa, redirect về trang chủ luôn
        // nếu chưa có thì gọi API để lấy thông tin user, nếu có thì set vào auth store, nếu không có thì vẫn ở trang auth
        const user = useAuthStore.getState().user

        if (user) {
            throw redirect({ to: '/' })
        }

        try {
            const data = await AuthService.getCurrentUser()
            useAuthStore.getState().setUser({
                id: data.data.id,
                email: data.data.email
            })
        } catch {
            //NOTE - Không làm gì cả, chỉ cần không có user là được, nếu có lỗi thì coi như không có user, vẫn ở trang auth
        }
    }
})
