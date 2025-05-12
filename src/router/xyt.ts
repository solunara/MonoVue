import Layout from '@/views/xyt/Layout.vue'
import { GET_XYT_TOKEN } from '@/utils/token';
import type {UserInfoType} from '@/api/xyt/type'
import {useUserStore} from '@/store/xyt/user'

export const routes_xyt = [
    {
        path: '/xyt',
        redirect: '/xyt/xythome',
        meta: {title: '首页'},
        component: Layout,
        children: [
            {
                path: 'xythome',
                name: 'xythome',
                meta: {title: '首页'},
                component: () => import('@/views/xyt/home/Home.vue')
            },
            {
                path: 'hospital',
                name: 'hospital',
                meta: {title: '医院详情'},
                redirect: '/xyt/hospital/detail',
                component: () => import('@/views/xyt/hospital/Index.vue'),
                children: [
                    {
                        path: 'register',
                        name: 'register',
                        meta: {title: '预约挂号'},
                        component: () => import('@/views/xyt/hospital/Register.vue')
                    },
                    {
                        path: 'detail',
                        name: 'detail',
                        meta: {title: '医院详情'},
                        component: () => import('@/views/xyt/hospital/Detail.vue')
                    },
                    {
                        path: 'notice',
                        name: 'notice',
                        meta: {title: '预约须知'},
                        component: () => import('@/views/xyt/hospital/Notice.vue')
                    },
                    {
                        path: 'suspension',
                        name: 'suspension',
                        meta: {title: '停诊信息'},
                        component: () => import('@/views/xyt/hospital/Suspension.vue')
                    },
                    {
                        path: 'register2',
                        name: 'register2',
                        meta: {title: '预约挂号'},
                        component: () => import('@/views/xyt/hospital/RegisterTwo.vue'),
                    },
                    {
                        path: 'register3',
                        name: 'register3',
                        meta: {title: '预约挂号'},
                        component: () => import('@/views/xyt/hospital/RegisterThree.vue'),
                    },
                ]
            },
            {
                path: 'xytuser',
                name: 'xytuser',
                meta: {title: '实名认证'},
                redirect: '/xyt/xytuser/certification',
                component: () => import('@/views/xyt/user/Index.vue'),
                children: [
                    {
                        path: 'certification',
                        name: 'certification',
                        meta: {title: '实名认证'},
                        component: () => import('@/views/xyt/user/Certification.vue')
                    },
                    {
                        path: 'order',
                        name: 'order',
                        meta: {title: '挂号订单'},
                        component: () => import('@/views/xyt/user/Order.vue')
                    },
                    {
                        path: 'patient',
                        name: 'patient',
                        meta: {title: '就诊人管理'},
                        component: () => import('@/views/xyt/user/Patient.vue')
                    },
                    {
                        path: 'profile',
                        name: 'profile',
                        meta: {title: '账号信息'},
                        component: () => import('@/views/xyt/user/Profile.vue')
                    },
                    {
                        path: 'feedback',
                        name: 'feedback',
                        meta: {title: '意见反馈'},
                        component: () => import('@/views/xyt/user/Feedback.vue')
                    },
                ]
            },
        ]
    },
]