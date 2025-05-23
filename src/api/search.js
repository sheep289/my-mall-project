import request from '@/utils/request'
// 获取搜索列表
export const getSearchList = ({ limit, keyword, categoryId }) => {
  return request.get(`/api/search?keyword=${keyword}&limit=${limit}&categoryId=${categoryId}`)
}

// 获取分类
export const getCategoryList = () => request.get('/api/category')
