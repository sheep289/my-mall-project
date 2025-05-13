import { getUserInfo, setUserInfo } from '@/utils/storage'
import { getUserData, getUserIndexData } from '@/api/userInfo'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证信息
      userInfo: getUserInfo(),
      // 用户数据
      userData: {},
      // 用户界面的功能信息
      userIndexData: {}
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setUserInfo(obj)
    },
    setUserData (state, obj) {
      state.userData = obj
    },
    setUserIndexData (state, obj) {
      state.userIndexData = obj
    }
  },
  actions: {
    async getUserData (context) {
      const { data } = await getUserData()
      context.commit('setUserData', data)
    },
    async getUserIndex (context) {
      const { data } = await getUserIndexData()
      context.commit('setUserIndexData', data)
    }
  },
  getters: {}
}
