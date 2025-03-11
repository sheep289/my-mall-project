<template>
  <!-- 规格选择组件 -->
  <div class="spec-selector">
    <div v-for="item in data" :key="item.id">
      <h5>
        {{ item.name }}&nbsp;
        <span v-if="item.values.length > 3">({{ item.values.length }})</span>
      </h5>
      <div class="spec-box">
        <div
          class="spec-item"
          @click="addActive(index)"
          v-for="(list, index) in item.values"
          :key="index"
          :class="{active: activeIndex === index}"
        >
          <div class="image-box" v-if="item.values_img">
            <img :src="item.values_img[index]" alt="" />
          </div>
          <div class="text-box">
            <p>{{ list }}</p>
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
      default: () => { }
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    addActive (index) {
      this.activeIndex = index
    }
  }

}
</script>

<style lang="less" scoped>
.spec-selector {
  padding: 8px 0;
  .spec-box {
    padding: 8px 0;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    .spec-item {
      background-color: #eee;
      width: 36%;
      height: 30px;
      margin: 4px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 4px;
      padding: 2px 0;
      .image-box {
        width: 35%;
        height: 100%;
        flex: 0 0 auto; /* 图片盒子不伸缩 */
        margin-right: 2px; /* 图片和文字之间的间距 */
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .text-box {
        flex: 1 1 auto; /* 文字盒子伸缩 */
        text-align: center; /* 文字居中 */
        font-size: 12px;
        font-weight: 400;
        padding: 0 6px;
      }
    }
    .spec-item.active {
      color: #ff5000;
      border: 1px solid #ff5000;
    }
    /* 当图片不存在时，调整容器的宽度 */
    .spec-item:not(:has(.image-box)) {
      width: fit-content; /* 宽度适应内容 */
    }
  }
}
</style>
