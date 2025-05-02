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

// 获取支付类型与余额
export const getPayModeData = () => {
  return request.get('/my/pay/mode', {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/my/checkout/submit', {
    mode,
    ...obj
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}
