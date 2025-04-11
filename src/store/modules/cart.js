import { getCartList } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, arr) {
      state.cartList = arr
    },
    toggleCheck (state, bl) {
      state.cartList.forEach(item => {
        item.isChecked = bl
      })
    }
  },
  actions: {
    async getCartListAction (context) {
      const { data } = await getCartList()
      // 给每一项添加一个 isChecked 状态 （标记当前商品是否选中 ）
      data.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data)
    }
  },
  getters: {
    /*
      过滤商品是否选中(利用filter 筛选出选中的商品项 返回一个数组 ，后续的价格计算以及商品计算都是根据此计算属性来进行遍历)
      获取选中商品的总数量
      获取选中的总价格 返回结果是ture或者false其中之一
    */
    filterSelCart (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    getSelCartCount (state, getters) {
      return getters.filterSelCart.reduce((sum, item) => sum + item.quantity, 0)
    },
    selTotalPrice (state, getters) {
      return getters.filterSelCart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    }
  }
}
