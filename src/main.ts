import { createApp } from 'vue'
import '@/style/reset.scss'
import App from '@/App.vue'
import router from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
