import { getOrderList } from '@/api/userInfo'

export default {
  namespaced: true,
  state () {
    return {
      orderList: []
    }
  },
  mutations: {
    setOrderList (state, list) {
      state.orderList = list
    }
  },
  actions: {
    async getOrderList (context, type) {
      const { data } = await getOrderList(type)
      // 处理回来的数据
      data.forEach((item) => {
        item.created_at = item[0]?.created_at
        item.total_amount = item[0]?.total_amount
        item.status = item[0]?.status
        item.status_text = item[0]?.status_text
        item.order_id = item[0]?.order_id
        item.forEach(specs => {
          specs.value = specs?.value.join(' / ')
        })
      })
      context.commit('setOrderList', data)
    }
  },
  getters: {}
}
