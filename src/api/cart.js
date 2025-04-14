import store from '@/store'
import request from '@/utils/request'
// 1. 添加到购物车
export const setAddCart = (goodsId, specValueIds, quantity) => {
  return request.post('/my/cart/add', {
    goodsId,
    specValueIds,
    quantity
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}
// 获取购物车列表数据
export const getCartList = () => {
  return request.get('/my/cart/list', {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 更新购物车商品数量
export const setUpdateCount = (cartId, quantity) => {
  return request.post('/my/cart/update', {
    cartId,
    quantity
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 删除购物车商品
export const deleteCartList = (cartIds) => {
  return request.post('/my/cart/clear', {
    cartIds
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}
