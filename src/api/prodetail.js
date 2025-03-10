import request from '@/utils/request'
// 获取商品详情数据
export const getGoodsDeatil = (id) => {
  return request.get(`http://localhost:3000/goodsList/${id}`)
}
// 获取商品用户评论数据
export const getUserComment = (goodsId) => {
  return request.get('http://localhost:3000/commentsList', {
    params: {
      goodsId
    }
  })
}
