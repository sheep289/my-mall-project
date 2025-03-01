<template>
  <div class="top-title">
    <div class="navBar">
      <van-icon name="arrow-left" class="go" @click="$router.go(-1)" />
      <div class="title">
            <slot><h3>商品列表</h3></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top-title {
  .navBar {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .go {
      position: absolute;
      left: 12px;
      font-size: 16px;
    }
  }
}
</style>
