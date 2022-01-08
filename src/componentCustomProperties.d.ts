import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import VueCookies from 'vue3-cookies'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>,
    $cookies: VueCookies
  }
}