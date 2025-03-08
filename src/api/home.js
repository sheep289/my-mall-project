import request from '@/utils/request'
export const getHomData = () => {
  return request.get('http://localhost:3000/pageData')
}
