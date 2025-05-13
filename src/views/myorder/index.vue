<template>
  <div class="myOrder">
    <div class="order-nav-container">
      <TopTitle>
        <h3>我的订单</h3>
      </TopTitle>
      <div class="nav-scroll">
        <div class="nav-tabs">
          <div
            v-for="(tab, index) in userIndexData.types"
            :key="index"
            :class="['tab-item', { active: activeIndex === index }]"
            @click="switchTab(tab.type, index)"
          >
            <span class="tab-text">{{ tab.name }}</span>
            <span v-if="tab.count" class="count-badge">{{ tab.count }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="orderList.length > 0">
      <OrderList
        v-for="(item, index) in orderList"
        :key="index"
        :item="item"
      ></OrderList>
    </div>
    <div v-else class="empty-goods">
      <img src="@/assets/empty.png" alt="" />
      <p>暂无商品信息</p>
      <span @click="$router.push('/')">去逛逛!</span>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import OrderList from '@/components/OrderListItem.vue'
import { getOrderList } from '@/api/userInfo'
import { mapState } from 'vuex'
export default {
  components: { TopTitle, OrderList },
  data () {
    return {
      activeIndex: 0,
      orderList: [],
      currentTabType: null, // 记录当前请求类型，防止相同标签重复请求
      isRequesting: false // 状态锁防止快速切换不同标签时的连续请求
    }
  },
  async created () {
    await this.$store.dispatch('user/getUserIndex')
    // 初始化加载
    if (this.userIndexData.types?.length) {
      const typesIndex = this.userIndexData.types.findIndex(
        (item) => item.type === this.$route.query.type || 'all'
      )
      const initialTab = this.userIndexData.types[typesIndex]
      this.activeIndex = typesIndex
      this.currentTabType = initialTab.type
      this.getData(initialTab.type)
    }
  },
  computed: {
    ...mapState('user', ['userIndexData']),
    getQueryType () {
      return this.$route.query.type
    }
  },
  methods: {
    async switchTab (tab, index) {
      // 拦截重复点击相同标签
      if (this.activeIndex === index && this.currentTabType === tab.type) {
        return
      }
      // 防止连续点击不同标签时的重复请求
      if (this.isRequesting) return

      try {
        this.isRequesting = true
        this.activeIndex = index
        this.currentTabType = tab.type
        await this.getData(tab)
      } finally {
        this.isRequesting = false
      }
    },

    async getData (type) {
      const { data } = await getOrderList(type)
      this.orderList = data
      // 处理回来的数据
      data.forEach((item) => {
        item.created_at = item[0]?.created_at
        item.total_amount = item[0]?.total_amount
        item.status = item[0]?.status
        item.status_text = item[0]?.status_text
      })
    }
  }
}
</script>

<style lang="less" scoped>
@theme-color: #ff6b6b; // 主色调
@border-color: #eee; // 边框色
@active-text: #333; // 激活文字
@default-text: #666; // 默认文字

.order-nav-container {
  position: relative;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .nav-scroll {
    overflow-x: auto;
    // -webkit-overflow-scrolling: touch;

    .nav-tabs {
      display: flex;
      min-width: 100%;
      padding: 0 15px;
      height: 48px;

      .tab-item {
        position: relative;
        flex-shrink: 0;
        padding: 0 15px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: @default-text;
        transition: all 0.3s;
        &.active {
          color: @theme-color;
          font-weight: 500;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 2px;
            background: @theme-color;
          }
        }

        .tab-text {
          white-space: nowrap;
        }

        .count-badge {
          margin-left: 4px;
          padding: 0 5px;
          min-width: 16px;
          height: 16px;
          background: #ff4141;
          border-radius: 8px;
          color: white;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
        }
      }
    }
  }
}
.empty-goods{
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
  p{
    margin-bottom: 4px;
  }
  img{
    max-width: 160px;
    margin-bottom: 10px;

  }
  span{
    color: #666;
    font-size: 14px;
  }

}
</style>
