import Layout from '@/views/xyt/Layout.vue'

export const routes_xyt = [
    {
        path: '/xyt',
        redirect: '/xyt/xythome',
        component: Layout,
        children: [
            {
                path: 'xythome',
                name: 'xythome',
                component: () => import('@/views/xyt/home/Home.vue')
            },
            {
                path: 'hospital',
                name: 'hospital',
                component: () => import('@/views/xyt/hospital/Index.vue'),
                children: [
                    {
                        path: 'register',
                        name: 'register',
                        component: () => import('@/views/xyt/hospital/Register.vue')
                    },
                    {
                        path: 'detail',
                        name: 'detail',
                        component: () => import('@/views/xyt/hospital/Detail.vue')
                    },
                    {
                        path: 'notice',
                        name: 'notice',
                        component: () => import('@/views/xyt/hospital/Notice.vue')
                    },
                    {
                        path: 'search',
                        name: 'search',
                        component: () => import('@/views/xyt/hospital/Search.vue')
                    },
                    {
                        path: 'suspension',
                        name: 'suspension',
                        component: () => import('@/views/xyt/hospital/Suspension.vue')
                    },
                ]
            },
        ]
    },
]