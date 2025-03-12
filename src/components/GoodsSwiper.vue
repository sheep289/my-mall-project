<template>
  <div class="swipe">
    <img
      v-for="(item, index) in list"
      :key="index"
      :src="item"
      alt="swipe"
      class="swipe-img"
      :class="{ active: activeIndex === index }"
    />
    <!-- 图片页码 -->
    <div class="page-num">{{ activeIndex + 1 }} / {{ list.length }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0,
      timerId: null
    }
  },
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  //   模版渲染之后 自动轮播
  mounted () {
    this.startAutoPlay()
  },
  //   销毁定时器
  beforeDestroy () {
    clearInterval(this.timerId)
  },
  methods: {
    next () {
      this.activeIndex = this.activeIndex >= this.list.length - 1 ? 0 : this.activeIndex + 1
    },
    startAutoPlay () {
      this.timerId = setInterval(() => {
        this.next()
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>
.swipe {
  margin-top: 55px;
  width: 100%;
  height: 375px;
  overflow: hidden;
  position: relative;
  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: none;
  }
  .swipe-img.active {
    display: block;
  }
  .page-num {
    width: 15%;
    padding: 4px 0;
    background-color: rgba(168, 166, 166, 0.1);
    border-radius: 50px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0px;
    margin: 12px 6px 0 0;
    white-space: nowrap;
  }
}
</style>
