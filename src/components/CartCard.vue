<template>
  <div class="goods-card">
    <div class="goods-img">
      <img :src="detail.detail_images[0]" alt="img" />
    </div>

    <div class="goods-content">
      <!-- <div class="goods-title">fjdlajfldakjfkldasjflasj</div> -->

      <div class="goods-price">
        <small>券后￥</small><span>{{ detail.price_min }}</span><span>|</span
        ><small>优惠前￥{{ detail.price_max }}</small>
      </div>
      <!-- 库存 -->
      <span class="store">库存 {{ detail.stock }}</span>
      <!-- 数量 -->
      <div class="count">
        <Count></Count>
      </div>
    </div>
  </div>
</template>

<script>
import Count from '@/components/Count.vue'
import { mapState } from 'vuex'
export default {
  name: 'CartCardIndex',
  components: {
    Count
  },
  computed: {
    ...mapState('detail', ['detail'])
  },
  methods: {
  }

}
</script>

<style lang="less" scoped>
.goods-card {
  display: flex;
  padding: 8px 0;
  .goods-img {
    margin-right: 8px;
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .goods-content {
    display: flex;
    flex-direction: column;
    .store {
      margin-left: 4px;
    }
    .goods-price {
      display: flex;
      align-items: baseline;
      line-height: 1.5;
      margin: 6px 4px;
      height: 30px;
      color: #ff5000;
      span {
        text-align: end;
        font-size: 20px;
        margin-right: 4px;
      }
    }
    .count {
        margin: 4px;
      transform: scale(0.7);
      transform-origin: top left;
    }
  }
}
</style>
