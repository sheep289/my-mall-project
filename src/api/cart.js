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
