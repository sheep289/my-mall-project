import { getGoodsDeatil } from '@/api/prodetail'
export default {
  namespaced: true,
  state () {
    return {
      detail: {},
      specs: [],
      cartTotal: 0 // 获取购物车商品总数量
    }
  },
  mutations: {
    setDetailList (state, obj) {
      state.detail = obj
      state.specs = obj.specs
    },
    getCartTotal (state, count) {
      state.cartTotal = count
    }
  },
  actions: {
    async getGoodsListAction (context, goodsId) {
      const { data } = await getGoodsDeatil(goodsId)
      context.commit('setDetailList', data)
    }
  },
  getters: {}
}
