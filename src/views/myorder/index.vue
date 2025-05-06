<template>
  <div class="myOrder">
    <div class="order-nav-container">
      <TopTitle>
        <h3>我的订单</h3>
      </TopTitle>
      <div class="nav-scroll">
        <div class="nav-tabs">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            :class="['tab-item', { active: activeIndex === index }]"
            @click="switchTab(index)"
          >
            <span class="tab-text">{{ tab.name }}</span>
            <span v-if="tab.count" class="count-badge">{{ tab.count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  components: { TopTitle },
  data () {
    return {
      activeIndex: 0,
      tabs: [
        { name: '全部', count: 0 },
        { name: '待付款', count: 0 },
        { name: '待发货', count: 0 },
        { name: '待收货', count: 0 },
        { name: '退款/售后', count: 0 },
        { name: '待评价', count: 0 }
      ]
    }
  },
  methods: {
    switchTab (index) {
      this.activeIndex = index
      // 这里可以添加页面内容切换逻辑
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
</style>
