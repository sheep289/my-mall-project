<template>
  <div class="order-item">
    <!-- 订单头部 -->
    <div class="order-top" v-show="type ===  'order'">
      <div class="text time">{{ item?.created_at || '' }}</div>
      <div class="text status">{{ item?.status_text || '' }}</div>
    </div>
    <!-- 商品列表 -->
    <div class="goods-item-top" v-for="(orders,index) in item" :key="index" @click="type === 'order' ? $router.replace(`/order/detail?orderId=${orders.order_id}`) : $router.replace(`/prodetail/${orders.goods_id}`)">
      <!-- 图片 -->
      <div class="goods-img">
        <img :src="orders.color_image || orders.goods_coverImg" alt="goods-img" />
      </div>
      <!-- 标题 -->
      <div class="goods-content">
        <div class="goods-title">
          <p>{{ orders.goods_title }}</p>
        </div>

        <!-- 规格 -->
        <div class="goods-specs">{{ orders.value}}</div>
      </div>

      <!-- 价格  -->
      <div class="price_add_count">
        <div class="price">
          <strong><span class="symbol">￥</span>{{ orders.pay_price }}</strong>
        </div>
        <div class="count">x{{ orders.quantity }}</div>
      </div>
    </div>

    <div class="goods-item-foot" v-show="type === 'order'">应付款<small>￥</small>{{ item?.total_amount }}</div>

    <div class="btn" v-if="item?.status !== 'completed'">
      <span v-if="item?.status !== 'paid' && item?.status !== 'shipped'" @click="onDelOrder(item)">删除订单</span>
      <span v-if="item?.status === 'pending' || item?.status === 'cancelled'"  class="active" @click="onBuyNow(item)">立即付款</span>
      <span v-else-if="item?.status === 'shipped' || item?.status === 'paid'"  class="active" @click="onCancelOrder(item)">申请取消</span>
      <span v-else  class="active">确认收货</span>
    </div>

    <!-- 第二个按钮组（当条件为false时显示） -->
    <div class="btn" v-else>
      <span  class="active">待评价</span>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import { updateCancelOrder, deleteOrderServer } from '@/api/userInfo'
export default {
  props: {
    item: {
      type: Array
    },
    type: {
      type: String,
      default: 'order'
    }
  },
  data () {
    return {
      timerId: null
    }
  },
  computed: {
  },
  methods: {
    onCancelOrder (item) {
      try {
        this.$modal.confirm({
          title: '温馨提示',
          message: '你确定要取消该订单吗？',
          confirmButtonColor: '#ee0a24',
          cancelBtnText: '取消',
          confirmBtnText: '确定',
          closerOnClickModal: false
        })
          .then(() => {
            this.handleCancelOrder(item[0].order_id, 'cancel')
          })
          .catch(() => { })
      } catch (err) {
        this.$toast.error('申请失败！')
      }
    },
    onBuyNow (item) {
      // console.log(this.$route)
      if (item[0].mode === 'buyNow') {
        this.$router.push({
          path: '/pay',
          query: {
            mode: item[0].mode,
            goodsId: item[0].goods_id,
            specs: item[0].specValueIds.join(','),
            quantity: item[0].quantity
          }
        })
      } else {
        this.$router.push({
          path: '/pay',
          query: {
            mode: item[0].mode,
            cartIds: item.map(cart => cart.cart_id).join(',')
          }
        })
      }
    },
    async onDelOrder (item) {
      try {
        this.$modal.confirm({
          title: '温馨提示',
          message: '你确定要删除该订单吗？',
          confirmButtonColor: '#ee0a24',
          cancelBtnText: '取消',
          confirmBtnText: '确定',
          closerOnClickModal: false
        })
          .then(() => {
            this.handleCancelOrder(item[0].order_id, 'delete')
          })
          .catch(() => { })
      } catch (err) {
        this.$toast.error('申请失败！')
      }
    },
    async handleCancelOrder (orderId, type) {
      if (type === 'cancel') {
        await updateCancelOrder(orderId)
        this.$toast.success('申请成功！')
      } else {
        await deleteOrderServer(orderId)
        this.$toast.success('删除成功！')
      }

      this.timerId = setTimeout(() => {
        this.$emit('cancelSuccess')
      }, 600)
    }
  },
  destroyed () {
    // 销毁定时器
    clearTimeout(this.timerId)
  }
}
</script>

<style lang="less" scoped>
.order-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 8px 8px 0px 8px;
  .order-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px;
    .time{
      color: #666;
      font-size: 12px;
    }
    .status{
      font-size: 14px;
          color: rgb(255, 80, 0);

    }

  }
  .goods-item-top {
    display: flex;
    padding: 8px;
    .goods-img {
      width: 80px;
      height: 80px;
      // margin: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .goods-content {
      width: 220px;
      padding: 10px 6px;
      .goods-title,
      .goods-specs {
        margin-bottom: 10px;
      }
      .goods-title {
        font-size: 14px;
        color: #000;
        // font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        //   Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        //   sans-serifd;
        display: -webkit-box; //设置元素为弹性盒子
        -webkit-box-orient: vertical; //设置盒子的排列方式
        -webkit-line-clamp: 1; //指定要显示的行数
        overflow: hidden;
      }
      .goods-specs {
        padding: 0 4px;
        font-size: 12px;
        color: #929292;
        width: fit-content;
        background-color: rgba(168, 166, 166, 0.1);
      }
    }
    .price_add_count {
      text-align: right;
      padding: 10px 6px;
      .price {
        font-size: 14px;
        color: #000000;
        margin-bottom: 10px;
        .symbol {
          font-size: 10px;
        }
      }
      .count {
        font-size: 12px;
      }
    }
  }
  .goods-item-foot,
  .btn {
    text-align: right;
    margin-right: 14px;
    font-size: 13px;
  }
  .btn {
    span {
      display: inline-block;
      padding: 4px 8px;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 10px 0 20px 6px;
      border-radius: 4px;
    }
    .active {
      color: rgb(255, 80, 0);
      background-color: rgba(255, 80, 0, 0.1);
    }
  }
}
</style>
