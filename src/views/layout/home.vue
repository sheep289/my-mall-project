<template>
  <div class="home">
    <!-- 搜索 -->
    <div class="search">
      <van-icon name="search" class="icon" />
      <input
        type="text"
        class="inp"
        :placeholder="searchList.placeholder"
        @click="$router.push('/search')"
      />
    </div>
    <!-- 轮播图 -->
    <Swiper :items="bannerList"></Swiper>
    <!-- 导航栏 -->
    <div class="nav-bar">
      <div class="nav-list" v-for="(item, index) in navbarList" :key="index">
        <div class="icon-img">
          <img :src="item.icon_url" alt="icon" />
        </div>
        <span>{{ item.text }}</span>
      </div>
    </div>
    <!-- 商品卡片 -->
    <div class="youlike">
      <p>—— 猜你喜欢 ——</p>
    </div>
    <!--  -->
    <div class="goods-item">
      <GoodsItem
        v-for="item in goodsList"
        :key="item.id"
        :item="item"
      ></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import Swiper from '@/components/Swiper.vue'
import { getHomData } from '@/api/home'
export default {
  name: 'myHome',
  components: {
    GoodsItem,
    Swiper
  },
  data () {
    return {
      searchList: '',
      bannerList: [],
      navbarList: '',
      goodsList: '',
      activeIndex: 0
    }
  },
  async created () {
    const res = await getHomData()
    this.searchList = res.items[0]
    this.bannerList = res.items[1].data_url
    this.navbarList = res.items[2].data
    this.goodsList = res.items[3].goods_data
    // console.log(this.bannerList)
  }

}
</script>

<style lang="less" scoped>
.home {
  overflow-y: auto;
  padding-bottom: 80px;
  // 搜索
  .search {
    display: flex;
    align-items: center;
    background-color: #f1f1f2;
    border-radius: 25px;
    margin: 16px 14px;
    padding: 0 14px;
    gap: 8px;

    .icon {
      font-size: 18px;
      color: #666;
      flex-shrink: 0; //防止图标被压缩
    }

    .inp {
      flex: 1;
      min-height: 44px; //优化触摸区域
      padding: 8px 0;
      border: 0;
      background: transparent; //继承父级背景
      font-size: 14px;
      outline: none;

      // 移除点击高亮
      -webkit-tap-highlight-color: transparent;

      // 统一placeholder样式
      &::placeholder {
        color: #999;
        font-weight: 300;
      }
    }
  }
  // 导航栏
  .nav-bar {
    width: 100%;
    margin: 12px 0;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .nav-list {
      width: 75px;
      margin: 8px;
      font-size: 14px;
      color: #666;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon-img {
        width: 40px;
        height: 40px;
        margin-bottom: 4px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      span {
        text-align: center;
        display: inline-block;
        min-width: 40px;
        line-height: 1.3;
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
  .goods-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
