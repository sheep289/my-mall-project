<template>
  <div class="search-list">
    <!-- 顶部导航标题 -->
    <TopTitle></TopTitle>
    <!-- 搜索框 -->
    <div class="top">
      <!-- 搜索 -->
      <div class="search">
        <van-icon name="search" class="icon" />
        <input
          type="text"
          class="inp"
          placeholder="搜索你要找的商品"
          @click="$router.replace(`/search?keyword=${query.keyword}`)"
          :value="query.keyword"
        />
      </div>
      <!-- 筛选 -->
      <van-icon name="apps-o" class="icon-filter" />
    </div>
    <!-- 商品筛选 -->
    <div class="goods-filter-box">
      <span
        class="goods-filter"
        @click="handleUtlisSort(item,index)"
        v-for="(item, index) in utilsData"
        :key="index"
        :class="{active:activeIndex === index}"
        >{{ item.name }}</span>
    </div>
    <!-- 商品卡片项 -->
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
import TopTitle from '@/components/TopTitle.vue'
import { getSearchList } from '@/api/search'
export default {
  name: 'searchListIndex',
  components: {
    GoodsItem,
    TopTitle
  },
  data () {
    return {
      goodsList: [],
      activeIndex: 0,
      editSort: true,
      utilsData: [
        { id: 1, name: '综合', type: 'composite' },
        { id: 2, name: '销量', type: 'sales' },
        { id: 3, name: '价格', type: 'price' },
        { id: 4, name: '品牌', type: 'brand' }
      ]
    }
  },
  created () {
    this.getGoodsList()
  },
  computed: {
    query () {
      return this.$route.query
    }
  },
  methods: {
    async getGoodsList () {
      const { data } = await getSearchList({
        limit: this.query.limit || '',
        keyword: this.query.keyword || '',
        categoryId: this.query.categoryId || ''
      })
      this.goodsList = data
    },
    handleUtlisSort (item, index) {
      this.activeIndex = index
      if (item.name === '销量') {
        this.goodsList.sort((a, b) => b.sales - a.sales)
      } else if (item.name === '价格') {
        // this.goodsList.sort((a, b) => a.price_min - b.price_min)
        if (this.activeIndex === index) {
          this.editSort = !this.editSort
        }
        if (this.editSort) {
          this.goodsList.sort((a, b) => b.price_min - a.price_min)
        } else {
          this.goodsList.sort((a, b) => a.price_min - b.price_min)
        }
      } else {
        this.getGoodsList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  .top {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    .search {
      display: flex;
      background-color: #f1f1f2;
      border-radius: 25px;
      margin: 16px 14px 12px 16px;
      overflow: hidden;
      align-items: center;
      height: 34px;
      font-size: 13px;
      color: #666;
      flex: 1;
      border: 1px solid #aca9a9;
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
    .icon-filter {
      font-size: 24px;
      margin-right: 12px;
    }
  }
  .goods-filter-box {
    padding: 12px 0;
    display: flex;
    text-align: center;
    border-bottom: 1px solid #d0c7c7;
    font-size: 14px;
      margin-bottom: 8px;

    .goods-filter {
      flex: 1;
    }
    .goods-filter.active {
      color: red;
    }
  }
  .goods-item {
    display: flex;
    flex-wrap: wrap;
    gap: 8px; // 关键：用gap替代margin控制间距
    padding: 0 4px;
  }
}
</style>
