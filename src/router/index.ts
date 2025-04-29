import { createRouter, createWebHashHistory } from 'vue-router'
import { routes_xyt } from './xyt'

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
        ...routes_xyt,
    ]
})

export default router
