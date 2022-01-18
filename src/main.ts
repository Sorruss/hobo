import { createApp, h } from 'vue'
import App from '@/App.vue'

import router from '@/router'
import store from '@/store'
import VueCookies from 'vue3-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import uiComponents from '@/components/UI/index'


const app  = createApp({
  render: () => h(App)
})

// Register UI components.
uiComponents.forEach((uiComp: any) => app.component(uiComp.name, uiComp))

const globalCookiesConfig = {
  expireTimes: '1m',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
}
app.use(ElementPlus).use(store).use(router).use(VueCookies, globalCookiesConfig).mount('#app')