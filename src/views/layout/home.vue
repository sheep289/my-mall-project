<template>
  <div class="home">
    <!-- 搜索 -->
    <div class="search">
      <van-icon name="search" class="icon" />
      <input type="text" class="inp" placeholder="搜索你要找的商品" @click="$router.push('/search')" />
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
      <img src="@/assets/banner1.jpg" alt="banner" class="swipe-img" />
      <img src="@/assets/banner2.jpg" alt="banner" class="swipe-img active" />
      <img src="@/assets/banner3.jpg" alt="banner" class="swipe-img" />
      <!-- 小圆点容器 -->
      <div class="cursor-box">
        <span class="cursor"></span>
        <span class="cursor"></span>
        <span class="cursor"></span>
        <span class="cursor"></span>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="nav-bar">
      <div class="nav-list" v-for="item in 8" :key="item">
        <div class="icon-img">
          <img src="@/assets/nav1.png" alt="icon" />
        </div>
        <span>新品首发</span>
      </div>
    </div>
    <!-- 商品卡片 -->
    <div class="youlike">
      <p>—— 猜你喜欢 ——</p>
    </div>
    <!--  -->
    <div class="goods-item">
      <GoodsItem v-for="item in 9" :key="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'myHome',
  components: {
    GoodsItem
  }

}
</script>

<style lang="less" scoped>
.home {
  // 搜索
  .search {
    display: flex;
    background-color: #f1f1f2;
    border-radius: 25px;
    margin: 16px 14px 12px 14px;
    overflow: hidden;
    align-items: center;
    .icon {
      padding: 10px 0;
      margin-left: 20px;
    }
    .inp {
      width: 100%;
      flex: 1;
      background-color: #f1f1f1;
      border: none;
      margin-left: 10px;
    }
  }
  // 轮播图
  .swipe {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
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
  // 导航栏
  .nav-bar {
    width: 100%;
    height: auto;
    margin: 12px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    background-color: #fff;
    .nav-list {
      width: 75px;
      height: 100px;
      margin: 8px;
      font-size: 14px;
      font-weight: 400;
      color: #666;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-start;
      .icon-img {
        width: 48px;
        height: 48px;
        margin-bottom: 4px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .youlike {
    margin: 12px 0;
    display: flex;
    justify-content: center;
    p {
      font-size: 14px;
      color: #666;
      font-weight: 400;
    }
  }
  .goods-item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
