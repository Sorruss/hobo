import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import VueCookies from 'vue3-cookies'
import Vue3ProgressBar from '@aacassandra/vue3-progressbar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>,
    $cookies: VueCookies,
    $Progress: Vue3ProgressBar
  }
}