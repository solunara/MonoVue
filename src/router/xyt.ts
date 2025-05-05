import Layout from '@/views/xyt/Layout.vue'
import { GET_XYT_TOKEN } from '@/utils/token';
import type {UserInfoType} from '@/api/xyt/type'
import {useUserStore} from '@/store/xyt/user'

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
                        path: 'suspension',
                        name: 'suspension',
                        component: () => import('@/views/xyt/hospital/Suspension.vue')
                    },
                    {
                        path: 'register2',
                        name: 'register2',
                        component: () => import('@/views/xyt/hospital/RegisterTwo.vue'),
                        beforeEnter(to:any, from:any, next:any){
                            const tokenStr = GET_XYT_TOKEN()
                            if (tokenStr==null || tokenStr==''){
                                next('/xyt/hospital/register?uid='+from.query.uid)
                                useUserStore().loginVisiabe=true
                                return
                            }
                            const userInfoType =  JSON.parse(tokenStr as string) as UserInfoType
                            if (userInfoType == null || userInfoType.name == ''){
                                next('/xyt/hospital/register?uid='+from.query.uid)
                                useUserStore().loginVisiabe=true
                                return
                            }
                            next()
                        }
                    },
                    {
                        path: 'register3',
                        name: 'register3',
                        component: () => import('@/views/xyt/hospital/RegisterThree.vue'),
                        beforeEnter(to:any, from:any, next:any){
                            const tokenStr = GET_XYT_TOKEN()
                            if (tokenStr==null || tokenStr==''){
                                next('/xyt/hospital/register?uid='+from.query.uid+'&deptId='+from.query.deptId)
                                useUserStore().loginVisiabe=true
                                return
                            }
                            const userInfoType =  JSON.parse(tokenStr as string) as UserInfoType
                            if (userInfoType == null || userInfoType.name == ''){
                                next('/xyt/hospital/register?uid='+from.query.uid+'&deptId='+from.query.deptId)
                                useUserStore().loginVisiabe=true
                                return
                            }
                            next()
                        }
                    },
                ]
            },
            {
                path: 'xytuser',
                name: 'xytuser',
                component: () => import('@/views/xyt/user/Index.vue'),
                children: [
                    {
                        path: 'certification',
                        name: 'certification',
                        component: () => import('@/views/xyt/user/Certification.vue')
                    },
                    {
                        path: 'order',
                        name: 'order',
                        component: () => import('@/views/xyt/user/Order.vue')
                    },
                    {
                        path: 'patient',
                        name: 'patient',
                        component: () => import('@/views/xyt/user/Patient.vue')
                    },
                    {
                        path: 'profile',
                        name: 'profile',
                        component: () => import('@/views/xyt/user/Profile.vue')
                    },
                    {
                        path: 'feedback',
                        name: 'feedback',
                        component: () => import('@/views/xyt/user/Feedback.vue')
                    },
                ]
            },
        ]
    },
]