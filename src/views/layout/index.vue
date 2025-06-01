<template>
  <div class="layout">
    <!-- 二级路由出口 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <div class="bottom-nav">
      <router-link to="/home"
        ><van-icon name="wap-home-o" size="18" /><br />首页</router-link
      >
      <router-link to="/category">
        <van-icon name="ellipsis" size="18" /><br />分类项</router-link
      >
      <router-link to="cart"
        ><van-icon name="shopping-cart-o" size="18" /><br />购物车</router-link
      >
      <router-link to="user"
        ><van-icon name="user-o" size="18" /><br />我的</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style lang="less" scoped>
.layout {
  position: relative;
  .bottom-nav {
    display: flex;
    z-index: 100;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 50px;
    background-color: #fff;
    text-align: center;
    align-items: center;
    a {
      color: black;
      font-size: 12px;
      flex: 1;
    }
    .router-link-active {
      color: red;
    }
  }
}
</style>
