<template>
  <div class="home">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 搜索 -->
      <div class="search">
        <van-icon name="search" class="icon" />
        <input
          type="text"
          class="inp"
          placeholder="请搜索你要找的商品"
          @click="$router.push('/search')"
        />
      </div>
      <!-- 轮播图 -->
      <Swiper :items="bannerList"></Swiper>
      <!-- 导航栏 -->
      <div class="nav-bar">
        <div class="nav-list" v-for="(item, index) in navbarList" :key="index" @click="$router.push('/category')">
          <div class="icon-img">
            <img :src="item.icon_url" alt="icon" />
          </div>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- 商品卡片 -->
      <div class="youlike">
        <p>—— 猜你喜欢 ——</p>
      </div>
      <!-- 商品列表 -->
      <div class="goods-item">
        <GoodsItem
          v-for="item in goodsList"
          :key="item.id"
          :item="item"
        ></GoodsItem>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import Swiper from '@/components/Swiper.vue'
import { getBannerData, getGoodsList, getNavData } from '@/api/home'
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
      navbarList: [],
      goodsList: [],
      activeIndex: 0,
      isLoading: false // 控制下拉刷新状态
    }
  },
  async created () {
    this.initData()
  },
  methods: {
    // 初始化数据
    async initData () {
      await Promise.all([
        this.bannerData(),
        this.navData(),
        this.goodsData()
      ])
    },
    // 下拉刷新回调
    async onRefresh () {
      try {
        await this.initData()
        this.$toast('刷新成功')
      } catch (error) {
        console.error('刷新失败:', error)
        this.$toast('刷新失败')
      } finally {
        this.isLoading = false
      }
    },
    async bannerData () {
      const res = await getBannerData()
      this.bannerList = res.data_url
    },
    async navData () {
      const res = await getNavData()
      this.navbarList = res.data
    },
    async goodsData () {
      const res = await getGoodsList()
      this.goodsList = res.data
    }
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
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar { display: none; } // Chrome

    .nav-list {
      min-width: 60px;
      margin: 6px 6px 6px 0;
      font-size: 13px;
      color: #666;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon-img {
        width: 32px;
        height: 32px;
        margin-bottom: 2px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      span {
        text-align: center;
        display: inline-block;
        min-width: 32px;
        line-height: 1.2;
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
    gap: 8px;
    padding: 0 4px;
  }
}
</style>
