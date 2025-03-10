<template>
  <!-- 规格选择组件 -->
  <div class="spec-selector">
    <h5>颜色&nbsp; (4)</h5>
    <div class="goods-color box">
      <div class="color-item active" v-for="item in 5" :key="item">
        <div class="color-img">
          <img src="@/assets/2-1.png" alt="" />
        </div>
        <span>卡其色</span>
      </div>
    </div>
    <h5>尺码</h5>
    <div class="size-box box">
      <div class="size active" v-for="item in 7" :key="item" >M</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.spec-selector {
  padding: 8px 0;
  .box {
    padding: 8px 0;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
  }
  .goods-color {
    .color-item {
      background-color: #eee;
      width: 30%;
      height: 30px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 4px;
      .color-img {
        padding: 2px 0;
        width: 45%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .color-item.active {
      color: #ff5000;
      border: 1px solid #ff5000;
    }
  }
  .size-box {
    .size {
      text-align: center;
      width: 14%;
      height: 8%;
      padding: 4px 0;
      margin-bottom: 8px;
      background-color: #eee;
    }
    .size.active {
      color: #ff5000;
      border: 1px solid #ff5000;
    }
  }
}
</style>
