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
      <OrderListItem
        :item="filterData[0]"
        :type="'order-detail'"
        @cancelSuccess="handleCancelSuccess"
      >
        <div class="detail">
          <ul>
            <li>
              <div>应付款</div>
              <div style="color: black; font-size: 16px">
                <small>￥</small>{{ filterData[0]?.[0]?.total_amount }}
              </div>
            </li>
            <li>
              <div>订单编号</div>
              <div>
                {{ orderInfo.order_no}} | <span @click="copyText">复制</span>
              </div>
            </li>
            <li>
              <div>收货信息</div>
              <div>
                {{orderInfo.address}}
              </div>
            </li>
            <li>
              <div>创建时间</div>
              <div>{{ orderInfo.created_at}}</div>
            </li>
            <li>
              <div>成交时间</div>
              <div>{{ orderInfo.created_at}}</div>
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
import { getOrderInfo } from '@/api/pay'
export default {
  components: {
    OrderListItem,
    TopTitle
  },
  data () {
    return {
      orderInfo: {}
    }
  },
  async created () {
    await this.$store.dispatch('order/getOrderList', 'all')
    await this.getOrderInfoData()
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
    async getOrderInfoData () {
      const { data } = await getOrderInfo(this.orderId)
      this.orderInfo = data
      this.orderInfo.address = this.orderInfo.address.replace(/\s+/g, ',')
    },
    handleCancelSuccess () {
      this.$router.replace('/myorder?type=all')
    },
    async copyText () {
      try {
        await navigator.clipboard.writeText(this.orderInfo.order_no)
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

            span {
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
