<template>
  <div class="pay">
    <div class="top-title">
      <TopTitle>
        <h3>订单结算台</h3>
      </TopTitle>
    </div>

    <div class="container">
      <!-- 收货货地址 -->
      <div class="shipping-address box">
        <div class="address-icon">
          <img src="@/assets/address.png" alt="address" />
        </div>
        <!-- 收货信息 -->
        <div class="address-message">
          <span>王宝强18578983746</span>
          <span>湖南省长沙市长沙环境保护职业技术学院</span>
        </div>
        <van-icon name="arrow" size="16px" color="#666" />
      </div>

      <!-- 商品卡片 -->
      <div class="goods-item box">
        <!-- 头部区域 -->
        <div class="goods-item-top">
          <div class="goods-img">
            <img src="@/assets/categood.png" alt="goods-img" />
          </div>
          <div class="goods-name">
            <p>
              三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景
              悠雾紫 5G手机 游戏拍照旗舰机s23
            </p>
            <div class="price-info">
              <p>x1</p>
              <span>￥9999.00</span>
            </div>
          </div>
        </div>

        <!-- 信息区域 -->
        <div class="pay-info">
          <div class="total-price">共 3 件 合计：<span>￥9999.00</span></div>
          <div class="coupon info-box">
            <span>优惠券：</span>
            <span>无优惠券使用</span>
          </div>
          <div class="give-money info-box">
            <span>配送费用：</span>
            <span>+￥10.00</span>
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
      <div class="payment">
        实付款：<span>￥9999.00</span>
      </div>
      <div class="submit">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  components: {
    TopTitle
  }
}
</script>

<style lang="less" scoped>
.pay {
  .box {
    background-color: #fff;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    border-radius: 10px;
  }
  .top-title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
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
        :nth-child(2) {
          white-space: nowrap; //禁止换行
          text-overflow: ellipsis; //使用省略号表示溢出
          overflow: hidden;
        }
      }
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
            object-fit: cover;
          }
        }
        .goods-name {
          width: 68%;
          font-size: 14px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          margin-top: 10px;
          P {
            display: -webkit-box; //设置元素为弹性盒子
            -webkit-box-orient: vertical; //设置盒子的排列方式
            -webkit-line-clamp: 2; //指定要显示的行数
            overflow: hidden;
            margin-bottom: 10px;
          }
          .price-info {
            display: flex;
            justify-content: space-between;
            span {
              color: #ff5000;
            }
          }
        }
      }

      .pay-info {
        height: 100px;
        font-size: 14px;
        .info-box {
          padding: 10px 0;
          font-size: 14px;
          color: #333;
          display: flex;
          justify-content: space-between;
          margin: 0 12px;
        }
        .total-price {
          text-align: right;
          margin-right: 12px;
          span {
            color: #ff5000;
          }
        }
        .give-money {
          :nth-child(2) {
            color: #ff5000;
          }
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
  .bottom-bar{
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
    .payment{
      margin-left: 12px;
      span{
        color: #ff5000;
      }
    }
    .submit{
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
