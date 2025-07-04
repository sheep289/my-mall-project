<template>
  <div class="card_specs_select">
    <!-- 规格商品信息-商品卡片 -->
    <div class="goods-card">
      <div class="goods-img">
        <img
  :src="
    (goodsImg.color_image_url[activeIndex['1']] || '') ||
    (detail.detail_images && detail.detail_images[0])
  "
  alt="img"
/>
      </div>

      <div class="goods-content">
        <div class="goods-content">
          <!-- 修改价格显示 -->
          <div class="goods-price">
            <small>券后￥</small><span>{{ selectedPriceAndStock.price }}</span
            ><span>|</span
            ><small>优惠前￥{{ selectedPriceAndStock.price }}</small>
          </div>
          <!-- 修改库存显示 -->
          <span class="store">库存 {{ selectedPriceAndStock.stock }}</span>
        </div>
        <!-- 数量 -->
        <div class="count">
          <Count v-model="count"></Count>
        </div>
      </div>
    </div>

    <!-- 规格选择 -->
    <div class="spec-selector">
      <div v-for="(item, specIndex) in specs" :key="specIndex">
        <h5>
          {{ item.name }}&nbsp;
          <span v-if="item.values.length > 3">({{ item.values.length }})</span>
        </h5>
        <div class="spec-box">
          <div
            class="spec-item"
            @click="addActive(item.specs_id, index)"
            v-for="(value, index) in item.values"
            :key="index"
            :class="{
              active: activeIndex[item.specs_id] === index,
              'has-image': item.color_image_url,
            }"
          >
            <!-- 图片容器（仅在存在values_img时显示） -->
            <div class="image-box" v-if="item.values_img">
              <img :src="item.values_img[index]" alt="规格图片" />
            </div>
            <!-- 文字描述 -->
            <div class="text-box">
              <p>{{ value.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Count from '@/components/Count.vue'

export default {
  components: {
    Count
  },
  data () {
    return {
      activeIndex: {}, // 使用对象存储激活状态，键为规格名称
      count: 1 // 购买商品数量

    }
  },
  created () {
    // 添加数据验证
    this.$nextTick(() => {
      if (!this.specs || this.specs.length === 0) {
        console.warn('规格数据未加载完成')
        return
      }

      this.specs.forEach(item => {
        if (!Object.prototype.hasOwnProperty.call(this.activeIndex, item.specs_id)) {
          this.$set(this.activeIndex, item.specs_id, 0)
        }
      })
    })
  },
  computed: {
    ...mapState('detail', ['specs', 'detail']),
    // 商品图片
    goodsImg () {
      if (!this.specs || this.specs.length === 0) return { color_image_url: [] }

      const firstSpec = this.specs[0]
      return {
        color_image_url: firstSpec.color_image_url || [],
        values: firstSpec.values || []
      }
    },
    // 动态计算商品价格与库存
    selectedPriceAndStock () {
    // 默认值处理
      const defaultData = {
        price: this.detail?.price_min || 0,
        stock: this.detail?.stock || 0
      }

      // 如果有选中的规格，则使用规格的价格和库存
      if (this.specs.length > 0) {
        for (const spec of this.specs) {
          const selectedIndex = this.activeIndex[spec.specs_id] || 0
          if (spec.values[selectedIndex]) {
            defaultData.price = spec.values[selectedIndex].price
            defaultData.stock = spec.values[selectedIndex].stock
          }
        }
      }

      return defaultData
    },
    // 获取选中的规格id(后端接收数据为：[选项1的id, 选项2的id, ...])
    selectSpecsIds () {
      const results = []

      this.specs.forEach((spec) => {
        const selectedIndex = this.activeIndex[spec.specs_id]
        const selectedValue = spec.values[selectedIndex]
        if (selectedValue) {
          results.push(selectedValue.id)
        } else {
          results.push(null)
        }
      })

      return results
    }
  },
  methods: {
    addActive (specsId, index) {
      this.$set(this.activeIndex, specsId, index)
    },
    // selectSpecsIds,coutn传给父组件 父组件通过$refs调用此方法
    getChildData () {
      return { selectSpecsIds: this.selectSpecsIds, count: this.count }
    }
  },
  watch: {
    // 监听数据变化重新初始化
    specs: {
      handler (newVal) {
        newVal.forEach(item => {
          if (!(item.specs_id in this.activeIndex)) {
            this.$set(this.activeIndex, item.specs_id, 0)
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.card_specs_select {
  .goods-card {
    display: flex;
    padding: 8px 0;
    .goods-img {
      margin-right: 8px;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
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
  .spec-selector {
    padding: 8px 0;
    .spec-box {
      padding: 8px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .spec-item {
        background: #f5f5f5;
        border-radius: 4px;
        padding: 6px;
        cursor: pointer;
        transition: all 0.2s;
        min-width: 120px;
        min-height: 40px; // 添加最小高度保证垂直居中效果
        display: flex;
        align-items: center;
        justify-content: center;

        // 带图片时的特殊样式
        &.has-image {
          justify-content: flex-start;
          .image-box {
            width: 40px;
            height: 40px;
            margin-right: 8px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        &.active {
          border: 1px solid #ff5000;
          color: #ff5000;
          background: #fff9f6;
        }

        .text-box {
          font-size: 12px;
          white-space: nowrap;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
