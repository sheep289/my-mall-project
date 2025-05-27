import { getCategoryList } from '@/api/search'

export default {
  namespaced: true,
  state () {
    return {
      categoryList: []
    }
  },
  mutations: {
    setCategoryList (state, list) {
      state.categoryList = list
    }
  },
  actions: {
    async getCategoryList (context) {
      const { data } = await getCategoryList()
      context.commit('setCategoryList', data)
    }
  },
  getters: {}
}
