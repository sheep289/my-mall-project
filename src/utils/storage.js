// 存储到本地
const USERINFO_KEY = 'my_mall_userinfo'
const SEARCHHISTORY_KEY = 'search_history'

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

// 存储搜索历史记录
export const getHistoryList = () => {
  const result = localStorage.getItem(SEARCHHISTORY_KEY)
  return result ? JSON.parse(result) : []
}

export const setHistoryList = (arr) => {
  localStorage.setItem(SEARCHHISTORY_KEY, JSON.stringify(arr))
}
