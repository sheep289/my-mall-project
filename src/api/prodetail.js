import request from '@/utils/request'
// 获取商品详情数据
export const getGoodsDeatil = (goodsId) => {
  return request.get('/api/goods/detail', {
    params: {
      goodsId
    }
  })
}
// 获取商品用户评论数据
export const getUserComment = (goodsId) => {
  return request.get('/api/goods/comment', {
    params: {
      goodsId
    }
  })
}
