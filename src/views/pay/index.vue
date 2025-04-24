<template>
  <div class="pay">
    <!-- 头部标题 -->
    <div>
      <TopTitle>
        <h3>订单结算台</h3>
      </TopTitle>
    </div>

    <div class="container">
      <!-- 收货货地址 -->
      <div class="shipping-address box" @click="addAddress">
        <div class="address-icon">
          <img src="@/assets/address.png" alt="address" />
        </div>
        <!-- 收货信息 -->
        <div class="address-message">
          <span>{{ address.delivery_name }} {{ address.delivery_phone}}</span>
          <span>{{ address.joinDetail }}</span>
        </div>
        <van-icon name="arrow" size="16px" color="#666" />
      </div>

      <!-- 商品卡片 -->
      <div
        class="goods-item box"
        v-for="(item, index) in orderList"
        :key="index"
      >
        <!-- 头部区域 -->
        <div class="goods-item-top">
          <div class="goods-img">
            <img
              :src="item.color_image || item.goods_coverImg"
              alt="goods-img"
            />
          </div>
          <div class="goods-content">
            <div class="goods-title">
              <p>
                {{ item.goods_title }}
              </p>
            </div>

            <!-- 规格 -->
            <div class="goods-specs">
              {{ item.color_name }} ; {{ item.memory_name }}
            </div>

            <!-- 价格  -->
            <div class="price_add_count">
              <div class="price">
                <strong><span class="symbol">￥</span>{{ item.price }}</strong>
              </div>
              <!-- <div class="price-max">
                <small>￥{{ item.price }}</small>
              </div> -->
              <!-- 数量 -->
              <div class="count">
                <Count v-model="item.quantity"></Count>
              </div>
            </div>
          </div>
        </div>

        <!-- 服务选型 -->
        <div class="serve-options">
          <div class="dispatching info-box">
            <span>配送：</span>
            <span>快递包邮</span>
          </div>
          <div class="remark info-box">
            <span>留言：</span>
            <div class="remark-text">
              akdsfjalfjladf000000000000000000000jal
            </div>
            <van-icon name="arrow" size="10px" color="#666" />
          </div>
        </div>
      </div>

      <!-- 信息区域 -->
      <div class="pay-info box">
        <h3>价格明细</h3>
        <div class="total-price-box info-box">
          <h4>商品总价 <small class="total-quantity">共 5 将宝贝</small></h4>
          <div class="total-price">
            <span><small>￥</small>9999.00</span>
          </div>
        </div>
        <div class="total-min info-box">
          <h4>共减</h4>
          <span><small>-￥</small>10.00</span>
        </div>
        <div class="coupon info-box">
          <span>优惠券：</span>
          <span v-if="true">无优惠券使用</span>
          <span v-else style="color: #ff5000"><small>-￥</small>25.00</span>
        </div>
        <div class="give-money info-box">
          <span>配送费用：</span>
          <span><small>-￥</small>10.00</span>
        </div>
        <div class="total-price-box info-box">
          <h4>合计</h4>
          <div class="total-price">
            <span style="font-size: 8px">￥</span>9999.00
          </div>
        </div>
      </div>

      <div class="pay-method box">
        <div class="pay-method-box">支付方式</div>
        <!-- 余额支付 -->
        <div class="pay-method-box">
          <div class="money-icon">
            <img src="@/assets/money.png" alt="money" />
          </div>
          <span>余额支付：（可用余额￥666666.00 元）</span>
          <div class="select">
            <input type="checkbox" />
          </div>
        </div>

        <!-- 支付宝支付方式(样式直接使用 pay-method-box) -->
      </div>
    </div>

    <div class="bottom-bar">
      <div class="payment">实付款：<span>￥9999.00</span></div>
      <div class="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import Count from '@/components/Count.vue'
import { getChekoutOrderData } from '@/api/pay'
import { mapState } from 'vuex'
export default {
  components: {
    TopTitle,
    Count
  },
  data () {
    return {
      orderList: [],
      address: {}
    }
  },
  async created () {
    await this.$store.dispatch('address/getAddressListAcion')
    this.getOrderLIst()
    this.getDefaultAddress()
  },
  computed: {
    ...mapState('address', ['addressList']),
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      // 从字符串转回数组
      const cartIdsArray = this.$route.query.cartIds ? this.$route.query.cartIds.split(',').map(Number) : []
      return cartIdsArray
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    specs () {
      return this.$route.query.specs ? JSON.parse(this.$route.query.specs) : {}
    },
    quantity () {
      return this.$route.query.quantity
    }
  },
  methods: {
    async getOrderLIst () {
      try {
        if (this.mode === 'cart') {
          const { data } = await getChekoutOrderData(this.mode, { cartIds: this.cartIds })
          this.orderList = data
        }
        if (this.mode === 'buyNow') {
          const { data } = await getChekoutOrderData(this.mode, {
            goodsId: this.goodsId,
            specValueIds: this.specs,
            quantity: this.quantity
          })
          this.orderList = data
        }
      } catch (error) {
        console.log('请求失败', error)
      }
    },
    // 跳转到收获地址列表
    addAddress () {
      this.$router.push({
        path: '/address',
        query: {
          url: this.$router.currentRoute.fullPath,
          addressId: this.address.user_address_id
        }
      })
    },
    getDefaultAddress () {
      // // 获取addressId
      const addId = parseInt(this.$route.query.addressId)

      //  1.判断addId是否存在，如果不存在，说明用户没有选择其它地址（而是默认地址渲染）
      // 2.如果存在，说明用户选择了新的地址（重address页面跳转过来的），则需要根据携带的addressId查询对应的数据进行渲染

      if (!addId) {
        // 1获取收获地址里的默认地址
        const findData1 = this.addressList.find(item => item.is_default) || this.addressList[0]
        this.address = findData1
      } else {
        // 2.重新选择的地址
        const findData2 = this.addressList.find(item => item.user_address_id === addId)
        this.address = findData2
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pay {
  overflow-y: auto;
  padding-bottom: 80px;
  small {
    font-size: 10px;
  }
  .box {
    background-color: #fff;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    border-radius: 10px;
  }
  .container {
    margin: 50px 8px 12px 8px;
    display: flex;
    flex-direction: column;
    // 收货地址
    .shipping-address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 8px 16px 0;
      .address-icon {
        width: 20px;
        height: 20px;
        margin-left: 8px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .address-message {
        font-size: 14px;
        color: #666;
        width: 210px;
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 0 20px 0 16px;
        line-height: 1.5;
      /*  :nth-child(2) {
          white-space: nowrap; //禁止换行
          text-overflow: ellipsis; //使用省略号表示溢出
          overflow: hidden;
        } */
      }
    }
    // 公共属性
    .info-box {
      padding: 10px 0;
      font-size: 12px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 12px;
    }
    .goods-item {
      display: flex;
      flex-direction: column;
      .goods-item-top {
        display: flex;
        .goods-img {
          width: 80px;
          height: 80px;
          margin: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
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
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serifd;
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
                font-size: 10px;
              }
            }
            .price-max {
              color: #666;
              font-size: 12px;
              margin-left: 12px;
            }
            .count {
              transform: scale(0.6); //将此盒子缩小
              transform-origin: right; //指定缩放的基点
            }
          }
        }
      }
      .serve-options {
        .remark {
          position: relative;
          .remark-text {
            width: 120px;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            right: 10px;
          }
        }
      }
    }
    .pay-info {
      h4 {
        font-size: 14px;
      }
      h3 {
        font-size: 16px;
        padding: 10px 0;
        margin: 0 12px;
      }
      .give-money {
        border-bottom: 1px solid #d0c7c7;
      }
      .give-money {
        :nth-child(2) {
          color: #ff5000;
          font-size: 14px;
        }
      }
      .total-price-box {
        .total-quantity {
          color: #666;
          font-weight: normal;
          font-size: 10px;
        }
        .total-price {
          font-weight: bold;
          font-size: 16px;
        }
      }
      .total-min {
        span {
          color: #ff5000;
          font-size: 14px;
        }
      }
    }
    .pay-method {
      height: auto;
      .pay-method-box {
        padding: 10px 0;
        margin: 0 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        span {
          flex: 2;
        }
        // border: 1px solid #000;
        .money-icon {
          width: 24px;
          height: 24px;
          margin-right: 6px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  .bottom-bar {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #d0c7c7;
    z-index: 888;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    .payment {
      margin-left: 12px;
      span {
        color: #ff5000;
      }
    }
    .submit {
      height: 90%;
      width: 32%;
      background: linear-gradient(to bottom right, #fa2a1f, #fe5630);
      color: #fff;
      line-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
