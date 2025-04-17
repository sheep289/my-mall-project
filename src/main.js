import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/common.less'
import '@/utils/vant-ui'

import Modal from '@/utils/modal'
import loadingDirective from './utils/loading'
Vue.directive('loading', loadingDirective)
Vue.use(Modal)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
