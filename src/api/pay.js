import request from '@/utils/request'
import store from '@/store'
// 获取订单结算数据

export const getChekoutOrderData = (mode, obj) => {
  return request.get('/my/checkout/order', {
    params: {
      mode,
      ...obj
    },
    headers: {
      Authorization: store.getters.getToken
    }
  })
}
