// 存储到本地
const USERINFO_KEY = 'my_mall_userinfo'

// 获取个人信息
export const getUserInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(USERINFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}
// 设置个人信息
export const setUserInfo = (obj) => {
  localStorage.setItem(USERINFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const moverInfo = () => {
  localStorage.removeItem(USERINFO_KEY)
}
