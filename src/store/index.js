import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import detail from './modules/detail'
import cart from './modules/cart'
import address from './modules/address'
import goods from './modules/goods'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    getToken (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    detail,
    cart,
    address,
    goods,
    order
  }
})
