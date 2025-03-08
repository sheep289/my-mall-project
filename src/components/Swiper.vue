<template>
  <div class="swipe">
    <!-- <img
      v-for="(item, index) in bannerList"
      :key="index"
      :src="item.url"
      alt="banner"
      class="swipe-img"
      :class="{ active: activeIndex === index }"
    /> -->
    <div class="swiper-slide" v-for="(item, index) in items" :key="index">
      <img
        :src="items[index]"
        alt=""
        class="swipe-img"
        :class="{ active: activeIndex === index }"
      />
    </div>
    <!-- 小圆点容器 -->
    <div class="cursor-box">
      <span class="cursor" v-for="(item,index) in items" :key="index" :class="{ active: activeIndex === index}"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiperIndex',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      o: this.list,
      activeIndex: 0,
      timerId: null
    }
  },
  //   模版渲染之后 自动轮播
  mounted () {
    this.startAutoPlay()
  },
  //   销毁定时器
  beforeDestroy () {
    clearInterval(this.list)
  },
  methods: {
    next () {
      this.activeIndex = this.activeIndex >= this.items.length - 1 ? 0 : this.activeIndex + 1
    },
    // 自动播放
    startAutoPlay () {
      this.timerId = setInterval(() => {
        this.next()
      }, 3000)
      console.log(0)
    }
  }
}
</script>

<style lang="less" scoped>
.swipe {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  .swiper-slide {
    .swipe-img {
      width: 100%;
      height: 100%;
      object-fit: cover; //保持比例填满容器且不被裁剪
      // display: block; // 移除图片下方空白间隙
      display: none;
    }
    .swipe-img.active {
      display: block;
    }
  }
  .cursor-box {
    position: absolute;
    bottom: 10px;
    left: 50%; //水平居中
    transform: translateX(-50%); // 精确居中
    display: flex;
    gap: 8px; //小圆点之间的距离
    .cursor {
      width: 6px;
      height: 6px;
      background-color: rgba(225, 225, 255, 0.5);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s; //颜色过度效果
    }
    .cursor.active {
      background-color: rgba(225, 225, 255, 1);
    }
  }
}
</style>
