import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

createApp(App).mount('#app')
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
