import { createApp } from 'vue'
import '@/style/reset.scss'
import '@/style/pageSwitch.scss'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus,{
    locale: zhCn
})

app.mount('#app')
