import { createRouter, createWebHashHistory } from 'vue-router'
import { routesP1 } from './p1'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            meta: {title: '首页'},
            component: () => import('@/views/home/Index.vue'),
        },
        {
            path: '/index',
            redirect: '/',
        },
        {
            path: '/home',
            redirect: '/',
        },
        ...routesP1,
    ]
})

export default router
