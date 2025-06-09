import Vue from 'vue'
import VueRouter from 'vue-router'

// 二级路由
import Layout from '@/views/layout'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'
Vue.use(VueRouter)
// 导入所有的一级路由
const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Search = () => import('@/views/search')
const Prodetail = () => import('@/views/prodetail')
const SearchList = () => import('@/views/search/list.vue')
const Register = () => import('@/views/login/register.vue')
const Address = () => import('@/views/address')
const CreateAddress = () => import('@/views/address/createAddress.vue')
const Update = () => import('@/views/address/update.vue')
const AddGoods = () => import('@/views/addGoods')
const OrderDetail = () => import('@/views/myorder/OrderDetail.vue')

const router = new VueRouter({
  routes: [
    {
      path: '/',
      // 重定向
      redirect: '/home',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    { path: '/register', component: Register },
    { path: '/myorder', component: Myorder },
    {
      path: '/pay',
      component: Pay,
      meta: {
        disableBack: true,
        isCheckout: true
      }
    },
    { path: '/search', component: Search },
    // 问题：如何确认是哪个商品的详情
    // 解决：动态路由传参 确认将来是哪个商品，路由携带参数传参
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/searchList', component: SearchList },
    {
      path: '/address',
      component: Address,
      meta: { isAddress: true, allowTransition: true }
    },
    { path: '/create', component: CreateAddress, meta: { isAddress: true } },
    { path: '/update', component: Update, meta: { isAddress: true } },
    { path: '/addGoods', component: AddGoods },
    { path: '/order/detail', component: OrderDetail }
  ]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (from.path === '/pay' && to.path === '/address') {
    next()
    return
  }
  // console.log(`Navigating from ${from.path} to ${to.path}`) // 调试用

  // 1. 允许地址系统内的合法跳转
  const isAddressSystemToAddressSystem =
    (from.path === '/address' && (to.path === '/create' || to.path === '/update')) ||
    (from.path === '/create' && to.path === '/address') ||
    (from.path === '/update' && to.path === '/address')

  if (isAddressSystemToAddressSystem) {
    next()
    return
  }

  // 2. 阻止循环跳转
  const isSamePageNavigation = to.path === from.path
  const isAddressLoop = to.path === '/address' && from.path === '/address'

  if (isSamePageNavigation || isAddressLoop) {
    next('/home')
    return
  }

  const authUrl = ['/pay', '/myorder', '/address', '/create', '/update']
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.getToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
