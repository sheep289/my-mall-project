import request from '@/utils/request'

export const getSearchList = ({ limit, keyword, categoryId }) => {
  return request.get(`/api/search?keyword=${keyword}&limit=${limit}&categoryId=${categoryId}`)
}
