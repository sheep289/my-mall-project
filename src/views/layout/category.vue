<template>
  <div class="category-container">
    <!-- 左侧分类导航 -->
    <div class="category-nav">
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{active: activeIndex === index}"
          @click="changeCategory(index)"
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
        >
          <img :src="sub.image" alt="">
          <span>{{sub.name}}</span>
        </div>
      </div>

      <!-- <div class="product-list">
        <div class="section-title">
          <span>{{currentCategory.name}}热销</span>
          <span class="more">查看更多 ></span>
        </div>

        <div class="products">
          <div
            class="product-item"
            v-for="(product, pIndex) in currentCategory.products"
            :key="pIndex"
          >
            <img :src="product.image" alt="">
            <div class="info">
              <div class="name">{{product.name}}</div>
              <div class="price">¥{{product.price}}</div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/search'
export default {
  data () {
    return {
      activeIndex: 0,
      categories: [
        {
          name: '手机',
          subCategories: [
            { name: '华为', icon: 'https://via.placeholder.com/40' },
            { name: '苹果', icon: 'https://via.placeholder.com/40' },
            { name: '小米', icon: 'https://via.placeholder.com/40' },
            { name: 'OPPO', icon: 'https://via.placeholder.com/40' },
            { name: 'vivo', icon: 'https://via.placeholder.com/40' },
            { name: '荣耀', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: 'iPhone 14 Pro Max', price: 8999, image: 'https://via.placeholder.com/100' },
            { name: '华为Mate 50 Pro', price: 6999, image: 'https://via.placeholder.com/100' },
            { name: '小米13 Ultra', price: 5999, image: 'https://via.placeholder.com/100' }
          ]
        },
        {
          name: '电脑',
          subCategories: [
            { name: '笔记本', icon: 'https://via.placeholder.com/40' },
            { name: '台式机', icon: 'https://via.placeholder.com/40' },
            { name: '平板', icon: 'https://via.placeholder.com/40' },
            { name: '一体机', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: 'MacBook Pro 14', price: 14999, image: 'https://via.placeholder.com/100' },
            { name: '联想小新Pro16', price: 5999, image: 'https://via.placeholder.com/100' },
            { name: '华为MateBook X Pro', price: 8999, image: 'https://via.placeholder.com/100' }
          ]
        },
        {
          name: '家电',
          subCategories: [
            { name: '电视', icon: 'https://via.placeholder.com/40' },
            { name: '空调', icon: 'https://via.placeholder.com/40' },
            { name: '冰箱', icon: 'https://via.placeholder.com/40' },
            { name: '洗衣机', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: '索尼75英寸4K电视', price: 9999, image: 'https://via.placeholder.com/100' },
            { name: '格力空调', price: 2999, image: 'https://via.placeholder.com/100' },
            { name: '海尔冰箱', price: 3999, image: 'https://via.placeholder.com/100' }
          ]
        },
        {
          name: '数码',
          subCategories: [
            { name: '相机', icon: 'https://via.placeholder.com/40' },
            { name: '耳机', icon: 'https://via.placeholder.com/40' },
            { name: '智能手表', icon: 'https://via.placeholder.com/40' },
            { name: '电子书', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: '索尼微单相机', price: 12999, image: 'https://via.placeholder.com/100' },
            { name: 'AirPods Pro 2', price: 1899, image: 'https://via.placeholder.com/100' },
            { name: 'Apple Watch S8', price: 2999, image: 'https://via.placeholder.com/100' }
          ]
        },
        {
          name: '家居',
          subCategories: [
            { name: '灯具', icon: 'https://via.placeholder.com/40' },
            { name: '家具', icon: 'https://via.placeholder.com/40' },
            { name: '家纺', icon: 'https://via.placeholder.com/40' },
            { name: '厨具', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: '智能台灯', price: 299, image: 'https://via.placeholder.com/100' },
            { name: '懒人沙发', price: 599, image: 'https://via.placeholder.com/100' },
            { name: '不粘锅套装', price: 399, image: 'https://via.placeholder.com/100' }
          ]
        },
        {
          name: '食品',
          subCategories: [
            { name: '零食', icon: 'https://via.placeholder.com/40' },
            { name: '生鲜', icon: 'https://via.placeholder.com/40' },
            { name: '酒水', icon: 'https://via.placeholder.com/40' },
            { name: '粮油', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: '三只松鼠大礼包', price: 99, image: 'https://via.placeholder.com/100' },
            { name: '进口牛排', price: 199, image: 'https://via.placeholder.com/100' },
            { name: '五粮液', price: 1299, image: 'https://via.placeholder.com/100' }
          ]
        },
        {
          name: '美妆',
          subCategories: [
            { name: '护肤', icon: 'https://via.placeholder.com/40' },
            { name: '彩妆', icon: 'https://via.placeholder.com/40' },
            { name: '香水', icon: 'https://via.placeholder.com/40' },
            { name: '个护', icon: 'https://via.placeholder.com/40' }
          ],
          products: [
            { name: 'SK-II神仙水', price: 999, image: 'https://via.placeholder.com/100' },
            { name: '雅诗兰黛小棕瓶', price: 699, image: 'https://via.placeholder.com/100' },
            { name: '迪奥香水', price: 599, image: 'https://via.placeholder.com/100' }
          ]
        }
      ],
      categoryList: []
    }
  },
  async created () {
    const { data } = await getCategoryList()
    this.categoryList = data
  },
  computed: {
    currentCategory () {
      return this.categoryList[this.activeIndex]
    },
    categoryBaner () {
      const result = `http://127.0.0.1/goods_img/Snipaste_2025-05-23_18-37-${this.activeIndex}.png`
      return result
    }
  },
  methods: {
    changeCategory (index) {
      this.activeIndex = index
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
