import Vue from 'vue'
import App from './principal.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// import IdleVue from "idle-vue";

import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false
import Vidle from 'v-idle'
Vue.use(Vidle);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
