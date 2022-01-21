import { createApp, h } from 'vue'
import App from '@/App.vue'

import router from '@/router'
import store from '@/store'
import VueCookies from 'vue3-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vue3ProgressBar from '@aacassandra/vue3-progressbar'

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

const Vue3ProgressBarOptions = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'left',
  inverse: false,
}

app.use(Vue3ProgressBar, Vue3ProgressBarOptions)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(VueCookies, globalCookiesConfig)
  .mount('#app')