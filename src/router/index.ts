import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes_xyt } from './xyt'
import Nprogress from 'nprogress'
import  'nprogress/nprogress.css'
import { APP_CONFIG } from '@/config/app'
import { useUserStore } from '@/store/xyt/user'

const pinia = createPinia()
const userStore = useUserStore(pinia)

let whiteList = <string[]>[
    '/home',
    '/xyt/xythome',
    '/xyt/hospital',
    '/xyt/hospital/detail',
    '/xyt/hospital/notice',
    '/xyt/hospital/register',
    '/xyt/hospital/suspension',
]

Nprogress.configure({ showSpinner: false })

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

router.beforeEach(
    (to: any, from: any, next: any)=>{
        Nprogress.start()
        if (userStore.userInfo?.token){
        }else{
            if(!whiteList.includes(to.path)){
                userStore.loginVisiabe=true;
                next('/xyt/xythome')
            }
        }
        if (to.path.startsWith('/xyt')) {
            document.title = APP_CONFIG.APP_TITLE_XYT_PREFIX+to.meta.title
        }
        next()
    }
);

router.afterEach(
    (to: any, from: any, next: any)=>{
        Nprogress.done()
    }
);

export {router, pinia};
