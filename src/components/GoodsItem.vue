<template>
  <!-- 商品卡片
    问题：此商品卡片复用性极高，后续很多地方都要用到此卡片，
    解决：将此功能创建为组件，提高复用性，简介代码
   -->
  <div class="goods-item" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <!-- 图片 -->
    <div class="goods-img">
      <img :src="item.goods_cover_image" alt="goods_img" />
    </div>
    <div class="goods-text">
      <h3>
       {{ item.title }}
      </h3>
      <p>
        <span class="price-sing" v-if="true">券后</span>
        <strong class="price">￥{{ item.price_min }}<span class="price-sing">.00</span></strong>
        <span class="sales">销量{{ item.sales }}+</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItemIndex',
  props: {
    item: {
      type: Object
    }
  }

}
</script>

<style lang="less" scoped>
.goods-item {
   width: calc(50% - 4px); // 核心修正：强制宽度计算
  flex: none !important; // 禁用flex扩展
  margin: 0;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease; // 添加点击反馈动画

  &:active {
    transform: scale(0.98); // 点击时的缩放反馈
  }

  .goods-img {
    position: relative;
    width: 100%;
    padding-top: 100%; // 保持1:1宽高比

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .goods-text {
    padding: 8px;

    h3 {
      font-size: 13px;
      line-height: 1.4;
      color: #333;
      margin: 0 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 限制标题显示两行
      -webkit-box-orient: vertical;
    }

    p {
      display: flex;
      align-items: center;
      margin: 0;
    }

    .price-sing {
      font-size: 10px;
      color: #ff0400;
      margin-right: 2px;
    }

    .price {
      font-size: 16px;
      color: #e02d29;
      font-weight: 700;

      span {
        font-size: 12px;
      }
    }

    .sales {
      flex: 1;
      text-align: right;
      font-size: 10px;
      color: #999;
    }
  }
}
</style>
