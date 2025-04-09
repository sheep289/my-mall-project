import request from '@/utils/request'
// 获取轮播图数据
export const getBannerData = () => {
  return request.get('/page/home/banners')
}

// 获取导航栏数据
export const getNavData = () => {
  return request.get('/page/home/nav')
}
// 获取猜你喜欢的商品数据
export const getGoodsList = () => {
  return request.get('/page/home/goodsList')
}
