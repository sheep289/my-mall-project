<template>
  <!-- 商品卡片
    问题：此商品卡片复用性极高，后续很多地方都要用到此卡片，
    解决：将此功能创建为组件，提高复用性，简介代码
   -->
  <div class="goods-item">
    <!-- 图片 -->
    <div class="goods-img">
      <img src="@/assets/product.jpg" alt="goods_img" />
    </div>
    <div class="goods-text">
      <h3>
        三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫
        5G手机 游戏拍照旗舰机s23
      </h3>
      <p>
        <span class="price-sing" v-if="true">券后</span>
        <strong class="price">￥9999<span class="price-sing">.00</span></strong>
        <span class="sales">销量200万+</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItemIndex'

}
</script>

<style lang="less" scoped>
.goods-item {
  display: flex;
  flex-direction: column; //y轴排列
  justify-content: center;
  width: 168px;
  height: 240px;
  overflow: hidden;
  border-radius: 5px;
  margin: 8px;
  background-color: #fff;
  .goods-img {
    width: 168px;
    height: 168px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .goods-text {
    white-space: nowrap; //禁止换行
    font-size: 14px;
    text-overflow: ellipsis; //使用省略号表示溢出
    margin: 10px 0 10px 6px;
    h3 {
      margin-bottom: 8px;
    }
    .price-sing {
      font-size: 12px;
      color: red;
    }
    .price {
      font-size: 16px;
      color: red;
      margin-right: 4px;
    }
    .sales {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
