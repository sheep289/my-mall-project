<template>
  <div class="layout">
    <!-- 二级路由出口 -->
    <router-view></router-view>

      <!-- 底部导航栏 -->
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/category">分类项</router-link>
      <router-link to="cart">购物车</router-link>
      <router-link to="user">我的</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex'
}
</script>

<style>

</style>
