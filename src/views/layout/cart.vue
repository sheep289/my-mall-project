<template>
  <div class="cart">
    <!-- 1.头部标题与搜索框 -->
    <div class="cart-top">
      <h3>购物车</h3>
      <span>({{ cartList.length }})</span>
      <!-- 搜索 -->
      <div class="cart-top-search">
        <van-icon name="search" class="icon" />
        <input
          type="text"
          class="inp"
          placeholder="搜索你要找的商品"
          @click="$router.push('/search')"
          value="手机"
        />
      </div>
      <div class="cart-top-manage" @click="isEdit = !isEdit">管理</div>
    </div>

    <!-- 2.主体区域 -->
    <div class="container">
      <!-- 购物车卡片 -->
      <div class="cart-item" v-for="(item, index) in cartList" :key="index">
        <!-- 复选框 -->
        <div class="goods-checked">
          <input
            type="checkbox"
            class="checkBox"
            v-model="item.isChecked"
          />
        </div>

        <!-- 商品图片 -->
        <div class="goods-img">
          <img :src="item.color_image || item.goods_coverImg" alt="cart-img" />
        </div>

        <!-- 商品内容 -->
        <div class="goods-content">
          <div class="goods-title">
            <p>
              {{ item.goods_title }}
            </p>
          </div>
          <div class="goods-specs">
            {{ item.color_name }} ; {{ item.memory_name }}
          </div>
          <div class="price">
            <!-- <span class="small">券后</span> -->
            <strong><span class="symbol">￥</span>{{ item.price }}</strong>
            <!-- <del class="small">￥10000.00></del> -->
          </div>
        </div>
        <!-- 商品数量 -->
        <div class="goods-count">
          <div class="count" v-if="countIsEdit" @click="handleCount">×{{ item.quantity }}</div>
          <div class="change-count" v-else>
            <button>-</button>
            <input type="text" value="10" />
            <button>+</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算 -->
    <div class="goPay-box">
      <div class="all-checked">
        <input type="checkbox" v-model="isAllSelect" />
        全选
      </div>
      <div class="all-price">合计：￥<span>{{ selTotalPrice }}</span></div>
      <div class="goPay-btn" v-if="isEdit" :class="{active: getSelCartCount === 0}">结算({{ getSelCartCount }})</div>
      <div class="delete-btn" v-else :class="{active: getSelCartCount === 0}">删除</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'myCart',
  data () {
    return {
      isEdit: true,
      countIsEdit: true
    }
  },
  created () {
    // 判断是否有token权证，有token权证才渲染购物车
    if (this.$store.getters.getToken) {
      this.$store.dispatch('cart/getCartListAction')
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['getSelCartCount', 'selTotalPrice']),
    isAllSelect: {
      get () {
        return this.cartList.every(item => item.isChecked)
      },
      set (newVal) {
        this.$store.commit('cart/toggleCheck', newVal)
      }
    }
  },
  methods: {
    handleCount () {
      this.countIsEdit = !this.countIsEdit
    }
  }

}
</script>

<style lang="less" scoped>
.cart {
  .cart-top {
    border-bottom: 1px solid #e0dbdb;
    width: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    background-color: #fff;
    font-family: "微软雅黑";
    letter-spacing: 0.2rem;
    padding-left: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 16px;
    }
    span {
      font-size: 10px;
    }
    .cart-top-search {
      flex: 5;
      display: flex;
      background-color: #ffffff;
      border-radius: 25px;
      overflow: hidden;
      align-items: center;
      margin-right: 42px;
      border: 1px solid #aca9a9;
      transform: scale(0.68); //将此盒子缩小
      transform-origin: center; //指定缩放的基点
      .icon {
        padding: 10px 0;
        margin-left: 20px;
      }
      .inp {
        width: 100%;
        flex: 1;
        background-color: #ffffff;
        border: none;
        margin-left: 10px;
      }
    }
    .cart-top-manage {
      padding-right: 12px;
      font-size: 12px;
      position: absolute;
      right: 0;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    margin: 50px 0 100px 0;
    .cart-item {
      width: 100%;
      padding: 12px;
      display: flex;
      justify-content: space-around;
      background-color: #fff;
      text-align: left;
      margin-bottom: 12px;
      .goods-checked {
        display: flex;
        align-items: center;
        .checkBox {
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
      }
      .goods-img {
        width: 80px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
      .goods-content {
        width: 220px;
        padding: 6px;
        .goods-title,
        .goods-specs,
        .price {
          margin-bottom: 10px;
        }
        .goods-title {
          font-size: 14px;
          color: #000;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serifd;
          display: -webkit-box; //设置元素为弹性盒子
          -webkit-box-orient: vertical; //设置盒子的排列方式
          -webkit-line-clamp: 1; //指定要显示的行数
          overflow: hidden;
        }
        .goods-specs {
          padding: 0 4px;
          font-size: 12px;
          color: #929292;
          width: fit-content;
          background-color: rgba(168, 166, 166, 0.1);
        }
        .price {
          font-size: 16px;
          color: #ff5000;
          .symbol {
            font-size: 12px;
          }
        }
      }
      .goods-count {
        padding: 6px 0;
        width: fit-content;
        font-size: 12px;
        text-align: center;
        .count {
          padding: 4px;

          color: #000;
          background-color: rgba(168, 166, 166, 0.1);
          width: fit-content;
        }
        .change-count {
          display: flex;
          height: 20px;
          gap: 2px;
          button {
            width: 20px;
            height: 100%;
            border: none;
            background-color: rgba(168, 166, 166, 0.1);
          }
          input {
            width: 30px;
            text-align: center;
            border: none;
            background-color: rgba(168, 166, 166, 0.1);
          }
        }
      }
    }
  }
  .goPay-box {
    padding: 0 12px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e0dbdb;
    position: fixed;
    z-index: 8;
    bottom: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .all-checked {
      flex: 1;
    }
    .all-price {
      font-size: 14px;
      span {
        color: #ff5000;
        font-size: 18px;
        margin-right: 12px;
      }
    }
    .goPay-btn,.delete-btn {
      width: 30%;
      height: 36px;
      line-height: 36px;
      background-color: #fa2f21;
      border-radius: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      // padding: 8px 22px;
      &.active{
        background-color: #ff9779;
      }
    }
  }
}
</style>
