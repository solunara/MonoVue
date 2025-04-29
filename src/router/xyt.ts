export const routes_xyt = [
    {
        path: '/xyt',
        redirect: '/xyt/home',
        children: [
            {
                path: '/xyt/home',
                name: 'xytHome',
                component: () => import('@/views/xyt/Home.vue')
            },
        ]
    },
]