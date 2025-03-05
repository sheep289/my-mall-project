<template>
  <div class="cart">
    <!-- 1.头部标题与搜索框 -->
    <div class="cart-top">
      <h3>购物车</h3>
      <span>(7)</span>
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
      <div class="cart-top-manage">管理</div>
    </div>

    <!-- 2.主体区域 -->
    <div class="container">
      <!-- 购物车卡片 -->
      <div class="cart-item" v-for="item in 2" :key="item">
        <!-- 复选框 -->
        <div class="goods-checked">
          <input type="checkbox" class="checkBox" />
        </div>

        <!-- 商品图片 -->
        <div class="goods-img">
          <img src="@/assets/categood.png" alt="cart-img" />
        </div>

        <!-- 商品内容 -->
        <div class="goods-content">
          <div class="goods-title">
            <p>
              三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景
              悠雾紫 5G手机 游戏拍照旗舰机s23
            </p>
          </div>
          <div class="price">
            <!-- <span class="small">券后</span> -->
            <strong><span class="symbol">￥</span>9999.00</strong>
            <!-- <del class="small">￥10000.00></del> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算 -->
    <div class="goPay-box">
        <div class="all-checked">
          <input type="checkbox">
          全选
        </div>
        <div class="all-price">
          合计：￥<span>88888.00</span>
        </div>
        <div class="goPay-btn">
            结算(9)
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myCart'

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
    margin-top: 50px;
    .cart-item {
      width: 100%;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      text-align: left;
      align-items: center;
      margin-bottom: 12px;      .goods-checked {
        .checkBox {
        }
      }
      .goods-img {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .goods-content {
        display: flex;
        flex-wrap: wrap;
        width: 220px;
        .goods-title {
          font-size: 14px;
          color: #000;
          line-height: 1.5em;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serifd;
          display: -webkit-box; //设置元素为弹性盒子
          -webkit-box-orient: vertical; //设置盒子的排列方式
          -webkit-line-clamp: 2; //指定要显示的行数
          overflow: hidden;
          margin-bottom: 20px;
        }
        .price {
          font-size: 16px;
          color: #ff5000;
          .symbol {
            font-size: 12px;
          }
        }
      }
    }
  }
  .goPay-box{
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

    .all-checked{
      flex: 1;
    }
    .all-price{
      font-size: 14px;
      span{
        color: #ff5000;
        font-size: 18px;
        margin-right: 12px;
      }
    }
    .goPay-btn{
      width: 30%;
      height: 36px;
      line-height: 36px;
      background-color: #fa2f21;
      border-radius: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      // padding: 8px 22px;

    }

  }
}
</style>
