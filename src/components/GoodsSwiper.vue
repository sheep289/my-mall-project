<template>
  <div class="swipe-container"
       @touchstart="handleTouchStart"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd">
    <div class="swipe-wrapper">
      <img
        v-for="(item, index) in list"
        :key="index"
        :src="item"
        alt="swipe"
        class="swipe-img"
        :class="{ active: activeIndex === index }"
      />
    </div>
    <!-- 图片页码 -->
    <div class="page-num">{{ activeIndex + 1 }} / {{ list.length }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 0,
      timerId: null,
      touchStartX: 0,
      touchMoveX: 0,
      isDragging: false
    }
  },
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  mounted () {
    this.startAutoPlay()
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  },
  methods: {
    next () {
      this.activeIndex = (this.activeIndex + 1) % this.list.length
    },
    prev () {
      this.activeIndex = (this.activeIndex - 1 + this.list.length) % this.list.length
    },
    startAutoPlay () {
      this.timerId = setInterval(() => {
        this.next()
      }, 3000)
    },
    stopAutoPlay () {
      clearInterval(this.timerId)
    },
    handleTouchStart (e) {
      this.stopAutoPlay()
      this.touchStartX = e.touches[0].clientX
      this.isDragging = true
    },
    handleTouchMove (e) {
      if (!this.isDragging) return
      this.touchMoveX = e.touches[0].clientX - this.touchStartX
    },
    handleTouchEnd () {
      this.isDragging = false

      // 滑动距离超过50px才切换
      if (Math.abs(this.touchMoveX) > 50) {
        this.touchMoveX > 0 ? this.prev() : this.next()
      }

      this.touchMoveX = 0
      this.startAutoPlay()
    }
  }
}
</script>

<style lang="less" scoped>
.swipe-container {
  margin-top: 55px;
  width: 100%;
  height: 375px;
  position: relative;
  overflow: hidden;
  touch-action: pan-y;

  .swipe-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.5s ease;

    &.active {
      opacity: 1;
    }
  }

  .page-num {
    width: 15%;
    padding: 4px 0;
    background-color: rgba(168, 166, 166, 0.1);
    border-radius: 50px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    margin: 12px 6px 0 0;
    white-space: nowrap;
    z-index: 10;
  }
}
</style>s
