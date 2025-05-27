import request from '@/utils/request'

export const submitGoodsServer = (data) => {
  return request.post('/my/add/goods', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
