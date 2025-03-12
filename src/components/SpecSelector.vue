<template>
  <div class="spec-selector">
    <div v-for="(item, specIndex) in data" :key="specIndex">
      <h5>
        {{ item.name }}&nbsp;
        <span v-if="item.values.length > 3">({{ item.values.length }})</span>
      </h5>
      <div class="spec-box">
        <div
          class="spec-item"
          @click="addActive(item.name, index)"
          v-for="(value, index) in item.values"
          :key="index"
          :class="{
            active: activeIndices[item.name] === index,
            'has-image': item.values_img
          }"
        >
          <!-- 图片容器（仅在存在values_img时显示） -->
          <div class="image-box" v-if="item.values_img">
            <img :src="item.values_img[index]" alt="规格图片">
          </div>
          <!-- 文字描述 -->
          <div class="text-box">
            <p>{{ value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeIndices: {} // 使用对象存储激活状态，键为规格名称
    }
  },
  created () {
    // 初始化每个规格的默认选中状态（第一个选项）
    this.activeIndices = this.data.reduce((acc, item) => {
      this.$set(acc, item.name, 0)
      return acc
    }, {})
  },
  methods: {
    addActive (specName, index) {
      // 使用Vue响应式方法更新状态
      this.$set(this.activeIndices, specName, index)
      console.log(this.activeIndices)
    }
  },
  watch: {
    // 监听数据变化重新初始化（适用于异步数据）
    data: {
      handler (newVal) {
        newVal.forEach(item => {
          if (!(item.name in this.activeIndices)) {
            this.$set(this.activeIndices, item.name, 0)
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
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
      min-height: 40px;  // 添加最小高度保证垂直居中效果
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
</style>
