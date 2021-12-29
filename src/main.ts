import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import uiComponents from '@/components/UI/index'


const app = createApp(App)

// Register UI components.
uiComponents.forEach((uiComp: any) => app.component(uiComp.name, uiComp))

app.use(ElementPlus).use(store).use(router).mount('#app')