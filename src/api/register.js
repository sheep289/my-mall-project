import request from '@/utils/request'
// 注册请求
export const setRegister = (username, password, nickname) => {
  return request.post('/api/register', {
    username,
    password,
    nickname
  })
}

// 登录请求
export const setLogin = (username, password) => {
  return request.post('/api/login', {
    username,
    password
  })
}
