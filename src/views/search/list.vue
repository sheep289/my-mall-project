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
          @click="$router.replace('/search')"
          :value="query.keyword"
        />
      </div>
      <!-- 筛选 -->
      <van-icon name="apps-o" class="icon-filter" />
    </div>
    <!-- 商品筛选 -->
    <div class="goods-filter-box">
      <span class="goods-filter active">综合</span>
      <span class="goods-filter">销量</span>
      <span class="goods-filter">价格</span>
      <span class="goods-filter">品牌</span>
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
      goodsList: []
    }
  },
  async created () {
    const { data } = await getSearchList({ limit: this.query.limit || '', keyword: this.query.keyword || '', categoryId: this.query.categoryId || '' })
    this.goodsList = data
    console.log(this.goodsList)
  },
  computed: {
    query () {
      return this.$route.query
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  .top {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    .search {
      display: flex;
      background-color: #f1f1f2;
      border-radius: 25px;
      margin: 16px 14px 12px 16px;
      overflow: hidden;
      align-items: center;
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
      font-size: 30px;
      margin-right: 12px;
    }
  }
  .goods-filter-box {
    padding: 20px 0;
    display: flex;
    text-align: center;
    border-bottom: 1px solid #d0c7c7;
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
  }
}
</style>
