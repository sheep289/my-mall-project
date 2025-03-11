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
      <GoodsItem v-for="item in goodsList" :key="item.id" :item="item"></GoodsItem>
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
      margin: 8px;
      font-size: 14px;
      font-weight: 400;
      color: #666;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-start;
      .icon-img {
        width: 40px;
        height: 40px;
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
  .goods-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
