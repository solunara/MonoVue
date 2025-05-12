import { createRouter, createWebHashHistory } from 'vue-router'
import { routes_xyt } from './xyt'
import Nprogress from 'nprogress'
import  'nprogress/nprogress.css'
import { APP_CONFIG } from '@/config/app'

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

export default router;
