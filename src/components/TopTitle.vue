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
export default {}
</script>

<style lang="less" scoped>
.top-title {
  margin-bottom: 50px;
  .navBar {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    border-bottom: 1px solid #f5f5f5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    .go {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      padding: 10px;
      font-size: 18px;
      color: #666;
      cursor: pointer;
    }

    .title {
      max-width: calc(100% - 100px); // 防止内容溢出
      padding: 0 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        line-height: 1.5;
      }
    }
  }
}
</style>
