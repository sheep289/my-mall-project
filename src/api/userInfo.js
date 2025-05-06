import request from '@/utils/request'
export const getUserInfo = () => {
  return request.get('/my/user/info')
}
