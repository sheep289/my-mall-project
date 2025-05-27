<template>
  <div class="category-container">
    <!-- 左侧分类导航 -->
    <div class="category-nav">
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{active: activeIndex === index}"
          @click="changeCategory(item,index)"
        >
          {{item.name}}
        </li>
      </ul>
    </div>

    <!-- 右侧商品展示 -->
    <div class="category-content">
      <div class="banner">
        <img :src="categoryBaner" alt="分类banner">
      </div>

      <div class="sub-categories" v-if="currentCategory?.children">
        <div
          class="sub-item"
          v-for="(sub, subIndex) in currentCategory.children"
          :key="subIndex"
          @click="onGoCategory(sub)"
        >
          <img :src="sub.image" alt="">
          <span>{{sub.name}}</span>
        </div>
      </div>

      <div class="product-list">
        <div class="section-title">
          <span>{{currentCategory?.name}}热销</span>
          <span class="more">查看更多 ></span>
        </div>

        <div class="products">
          <div
            class="product-item"
            v-for="(product, pIndex) in products"
            :key="pIndex"
            @click="$router.push(`/prodetail/${product.id}`)"
          >
            <img :src="product.goods_cover_image" alt="">
            <div class="info">
              <div class="name">{{product.goods_title}}</div>
              <div class="price">¥{{product.price_min}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductsList } from '@/api/search'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeIndex: 0,
      // categoryList: [],
      products: []
    }
  },
  async created () {
    // const { data } = await getCategoryList()
    // this.categoryList = data
    await this.$store.dispatch('goods/getCategoryList')
    await this.getProductsData('手机')
  },
  computed: {
    ...mapState('goods', ['categoryList']),
    currentCategory () {
      return this.categoryList[this.activeIndex]
    },
    categoryBaner () {
      const result = `http://127.0.0.1/goods_img/Snipaste_2025-05-23_18-37-${this.activeIndex}.png`
      return result
    }
  },
  methods: {
    async  changeCategory (item, index) {
      this.activeIndex = index
      this.getProductsData(item.name)
    },
    async getProductsData (type) {
      const { data } = await getProductsList(type)
      this.products = data
    },
    onGoCategory (sub) {
      this.$router.push(`/searchList?categoryId=${sub.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.category-container {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .category-nav {
    width: 25%;
    height: 100%;
    overflow-y: auto;
    background-color: #f5f5f5;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 15px 10px;
        text-align: center;
        font-size: 14px;
        color: #666;
        border-left: 3px solid transparent;

        &.active {
          color: #ff6700;
          background-color: #fff;
          border-left-color: #ff6700;
          font-weight: bold;
        }
      }
    }
  }

  .category-content {
    width: 75%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;

    .banner {
      width: 100%;
      margin-bottom: 10px;

      img {
        width: 100%;
        border-radius: 8px;
      }
    }

    .sub-categories {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;

      .sub-item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;

        img {
          width: 40px;
          height: 40px;
          margin-bottom: 5px;
        }

        span {
          font-size: 12px;
          color: #666;
        }
      }
    }

    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;

      span {
        font-size: 16px;
        font-weight: bold;

        &.more {
          font-size: 12px;
          color: #999;
          font-weight: normal;
        }
      }
    }

    .products {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .product-item {
        width: 48%;
        margin-bottom: 15px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }

        .info {
          padding: 8px;

          .name {
            font-size: 13px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
          }

          .price {
            font-size: 14px;
            color: #ff6700;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
