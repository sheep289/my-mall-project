import { getCartList, setUpdateCount, deleteCartList } from '@/api/cart'
import { Toast } from 'vant'
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
    },
    updateCount (state, { cartId, value }) {
      const goods = state.cartList.find(item => item.cart_id === cartId)
      goods.quantity = value
    }
  },
  actions: {
    async getCartListAction (context) {
      const { data } = await getCartList()
      // 给每一项添加一个 isChecked 状态 （标记当前商品是否选中 ）
      data.forEach(item => {
        item.isChecked = false
        item.value = item.value.join(' / ')
      })
      context.commit('setCartList', data)
    },
    async updateCountAction (context, { cartId, value }) {
      // 1.更新cartlist中的quantity数量，2.在发起请i去更新数据库数据
      context.commit('updateCount', { cartId, value })

      // 2.更新后台数据
      await setUpdateCount(cartId, value)
    },
    async clearCartListAction (context, cartIds) {
      await deleteCartList(cartIds)
      Toast.success('删除成功')
      // 再次调用请求商品数据的接口 重新更新渲染商品列表
      context.dispatch('getCartListAction')
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
