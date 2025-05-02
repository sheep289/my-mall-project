/*
    // 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axios 实例
*/
import axios from 'axios'
import { Toast } from 'vant'
import { moverInfo } from '@/utils/storage'
import router from '@/router'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://localhost',
  timeout: 5000
})

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  // 每次请求前自动添加token
  const token = store.getters.getToken
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  const res = response.data
  if (res.status !== 0) {
    Toast(res.message)

    // token过期处理
    if (res.status === 401) {
      moverInfo() // 清除本地存储
      router.push({
        path: '/login',
        query: {
          url: router.currentRoute.fullPath // 跳转到登录页面，带原路由参数一遍登录后重定向
        }
      })
    }
    // 抛出异常
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
