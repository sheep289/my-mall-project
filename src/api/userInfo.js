// 用户信息
import request from '@/utils/request'
export const getUserData = () => {
  return request.get('/my/user/info')
}

// 用户界面信息
export const getUserIndexData = () => request.get('/api/user/index')

// 获取用户订单商品
export const getOrderList = (type) => {
  return request.get('/my/order/list', {
    params: {
      type
    }
  })
}

// 取消订单
export const updateCancelOrder = (orderId) => request.post('/my/order/cancel', { orderId })

// 删除订单
export const deleteOrderServer = (orderId) => request.post('/my/order/delete', { orderId })
