import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入所有的一级路由
import Login from '@/views/login'
import Layout from '@/views/layout'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Search from '@/views/search'
import Prodetail from '@/views/prodetail'
import SearchList from '@/views/search/list.vue'
import Register from '@/views/login/register.vue'

// 二级路由
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/home',
    component: Layout,
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: 'cart', component: Cart },
      { path: 'user', component: User }
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
  { path: '/searchList', component: SearchList }

]

const router = new VueRouter({
  routes
})

export default router
