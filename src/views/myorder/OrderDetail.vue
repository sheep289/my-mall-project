<template>
  <!-- 订单详情 -->
  <div class="order-detail">
    <div class="header">
      <TopTitle>
        <h3>{{ filterData[0]?.status_text }}</h3>
      </TopTitle>
    </div>

    <div class="main">
      <!-- 订单 -->
      <OrderListItem :item="filterData[0]" :type="'order-detail'" @cancelSuccess="handleCancelSuccess">
        <div class="detail">
          <ul>
            <li>
              <div>应付款</div>
              <div style="color:black;font-size:16px"><small>￥</small>{{ filterData[0]?.[0]?.total_amount
}}</div>
            </li>
            <li>
              <div>订单编号</div>
              <div>sm1174938475847584 | <span @click="copyText">复制</span></div>
            </li>
            <li>
              <div>收货信息</div>
              <div>李志峰，18888888888，湖南省 长沙市 雨花区 长沙环境保护职业技术学院999999999</div>
            </li>
            <li>
              <div>创建时间</div>
              <div>2025-03-06 01:51:34</div>
            </li>
            <li>
              <div>成交时间</div>
              <div>2025-03-06 01:51:34</div>
            </li>
          </ul>
        </div>
      </OrderListItem>
    </div>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import TopTitle from '@/components/TopTitle.vue'
import { mapState } from 'vuex'
export default {
  components: {
    OrderListItem,
    TopTitle
  },
  data () {
    return {
    }
  },
  async created () {
    await this.$store.dispatch('order/getOrderList', 'all')
    await this.test()
  },
  computed: {
    ...mapState('order', ['orderList']),
    orderId () {
      return parseInt(this.$route.query.orderId)
    },
    filterData () {
      const result = this.orderList.filter(
        (item) => item.order_id === this.orderId
      )
      return result
    }

  },
  methods: {
    a () {
      console.log(1)
    },
    test () {
      // const a = this.orderList.map(item => item.order_id)
      // const b = this.orderList.filter(item => item.order_id === 86)
      // console.log(b)
      // console.log(this.orderId)

      console.log(this.filterData)
    },
    handleCancelSuccess () {
      this.$router.push('/myorder?type=all')
    },
    async copyText () {
      const textToCopy = '12839283923829'
      try {
        await navigator.clipboard.writeText(textToCopy)
        this.$toast('复制成功')
      } catch (err) {
        console.error('复制失败', err)
        this.$toast('复制失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order-detail {
  .main {
    margin-top: 60px;
    .detail {
      padding: 10px;
      font-size: 12px;

      ul {
        li {
          padding: 6px 0;
          display: flex;
          justify-content: space-between;
          div:first-child {
            letter-spacing: 2px;
            color: black;
            margin-right: 10px;
            flex: 0 0 80px;
          }
          div:nth-child(2) {
            color: #666;
            text-align: right;
            line-height: 20px;

            span{
              color: black;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
