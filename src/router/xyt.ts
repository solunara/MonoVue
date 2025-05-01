import Layout from '@/views/xyt/Layout.vue'

export const routes_xyt = [
    {
        path: '/xyt',
        redirect: '/xyt/home',
        component: Layout,
        children: [
            {
                path: '/xyt/home',
                name: 'xytHome',
                component: () => import('@/views/xyt/home/Home.vue')
            },
            {
                path: '/xyt/hospital',
                name: 'hospital',
                component: () => import('@/views/xyt/hospital/Hospital.vue')
            },
        ]
    },
]