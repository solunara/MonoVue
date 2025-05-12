import { createApp } from 'vue'
import App from '@/App.vue'
import {router, pinia} from '@/router/index.ts'
import ElementPlus from 'element-plus'
import '@/style/reset.scss'
import '@/style/pageSwitch.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(pinia)
app.use(ElementPlus,{
    locale: zhCn
})
app.use(router)

app.mount('#app')
