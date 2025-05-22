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
      <div class="cart-top-manage" @click="isEdit = !isEdit" v-show="cartList.length > 0">
        {{ isEdit ? "管理" : "退出管理" }}
      </div>
    </div>

    <div v-if="cartList.length > 0 && getToken">
      <!-- 2.购物车主体区域 -->
      <div class="container">
        <!-- 购物车卡片 -->
        <div class="cart-item" v-for="(item, index) in cartList" :key="index">
          <!-- 复选框 -->
          <div class="goods-checked">
            <input type="checkbox" class="checkBox" v-model="item.isChecked" />
          </div>

          <!-- 商品图片 -->
          <div class="goods-img">
            <img
              :src="item.color_image || item.goods_coverImg"
              alt="cart-img"
            />
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
            <div class="price_add_count">
              <div class="price">
                <!-- <span class="small">券后</span> -->
                <strong><span class="symbol">￥</span>{{ item.price }}</strong>
                <!-- <del class="small">￥10000.00></del> -->
              </div>
              <!-- 商品数量 -->
              <div class="count">
                <Count
                  :value="item.quantity"
                  @input="(value) => changeCount(value, item.cart_id)"
                ></Count>
              </div>
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
        <div class="all-price" v-show="isEdit">
          合计：￥<span>{{ selTotalPrice }}</span>
        </div>
        <div
          class="goPay-btn"
          v-if="isEdit"
          :class="{ active: getSelCartCount === 0 }"
          @click="goPay"
        >
          结算({{ getSelCartCount }})
        </div>
        <div
          class="delete-btn"
          v-else
          :class="{ active: getSelCartCount === 0 }"
          @click="clearHandle"
        >
          删除
        </div>
      </div>
    </div>

    <!-- 购物车为空或者没有登录 -->
    <div class="cart-null" v-else>
      <img src="@/assets/cart_null.png" alt="" />
      <div class="text">你的购物车是空的，快去逛逛吧</div>
      <div class="btn" @click="$router.push('/home')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Count from '@/components/Count.vue'
export default {
  name: 'myCart',
  components: {
    Count
  },
  data () {
    return {
      isEdit: true
    }
  },
  created () {
    // 判断是否有token权证，有token权证才渲染购物车
    if (this.getToken) {
      this.$store.dispatch('cart/getCartListAction')
    }
  },
  computed: {
    getToken () {
      return this.$store.getters.getToken
    },
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['filterSelCart', 'getSelCartCount', 'selTotalPrice']),
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
    changeCount (value, cartId) {
      this.$store.dispatch('cart/updateCountAction', { cartId, value })
    },
    clearHandle () {
      // 如果选择的商品小于等于0则退出
      if (this.filterSelCart.length <= 0) return
      this.$modal.confirm({
        message: `你确定将这${this.filterSelCart.length}件商品删除`,
        confirmButtonColor: '#ee0a24',
        cancelBtnText: '我再想想',
        confirmBtnText: '删除'
      })
        .then(() => {
          const cartIds = this.filterSelCart.map(item => item.cart_id)
          this.$store.dispatch('cart/clearCartListAction', cartIds)
          this.isEdit = true
        })
        .catch(() => { })
    },
    goPay () {
      if (this.filterSelCart.length > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            // 路由传不能传递数组，url参数只能传递字符串
            cartIds: this.filterSelCart.map(item => item.cart_id).join(',')
          }
        })
      }
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
        .goods-specs {
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

        .price_add_count {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            font-size: 16px;
            color: #ff5000;
            .symbol {
              font-size: 12px;
            }
          }
          .count {
            transform: scale(0.6); //将此盒子缩小
            transform-origin: right; //指定缩放的基点
          }
        }
      }
    }
  }

  // 空购物车
  .cart-null {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;
    img {
      width: 100px;
    }
    .text {
      color: #666666;
      font-size: 16px;
      padding: 24px 0;
    }
    .btn {
      width: 124px;
      height: 38px;
      line-height: 38px;
      border-radius: 20px;
      background-color: #fa2c20;
      text-align: center;
      color: #fff;
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
      input{
        width: 14px;
        height: 14px;
        margin-right: 4px;
      }
    }
    .all-price {
      font-size: 14px;
      span {
        color: #ff5000;
        font-size: 18px;
        margin-right: 12px;
      }
    }
    .goPay-btn,
    .delete-btn {
      width: 30%;
      height: 36px;
      line-height: 36px;
      background-color: #fa2f21;
      border-radius: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      // padding: 8px 22px;
      &.active {
        background-color: #ff9779;
      }
    }
  }
}
</style>
