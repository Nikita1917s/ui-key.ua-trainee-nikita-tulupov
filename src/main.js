import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'es6-promise/auto';
import store from './store/store';
import Amplify from 'aws-amplify';
import constants from "./modules/constants";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: constants.corgnito.REGION,
    userPoolId: constants.corgnito.USER_POOL_ID,
    userPoolWebClientId: constants.corgnito.APP_CLIENT_ID
  }
});

//BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/scss/vendors/bootstrap-vue/_custom.scss';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
