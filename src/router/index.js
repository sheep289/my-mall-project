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
    { path: '/pay', component: Pay },
    { path: '/search', component: Search },
    // 问题：如何确认是哪个商品的详情
    // 解决：动态路由传参 确认将来是哪个商品，路由携带参数传参
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/searchList', component: SearchList },
    {
      path: '/address',
      component: Address
    },
    { path: '/create', component: CreateAddress },
    { path: '/update', component: Update },
    { path: '/addGoods', component: AddGoods },
    { path: '/order/detail', component: OrderDetail }
  ]
})

const authUrl = ['/pay', '/myorder', '/address', '/create', '/update']
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // to.path是要去的页面路径
  // 判断to.path路径否在authUrl中出现 非权限页面直接放行
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  // 需要权限的路径，被拦截下来需要判断是否又token权证
  const token = store.getters.getToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
