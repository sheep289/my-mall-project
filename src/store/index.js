import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import detail from './modules/detail'

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
    detail
  }
})
