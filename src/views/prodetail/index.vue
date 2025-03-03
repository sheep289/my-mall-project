<template>
  <div class="prodetail">
    <!-- 标题 -->
    <div class="top-title">
      <TopTitle>
        <h3>商品详情页</h3>
      </TopTitle>
    </div>
    <!-- 1.轮播图 -->
    <div class="swipe">
      <img src="@/assets/product.jpg" alt="swipe" class="swipe-img active" />
      <img src="@/assets/product.jpg" alt="swipe" class="swipe-img" />
      <img src="@/assets/product.jpg" alt="swipe" class="swipe-img" />
      <img src="@/assets/product.jpg" alt="swipe" class="swipe-img" />
      <!-- 图片页码 -->
      <div class="page-num">1 / 4</div>
    </div>
    <!-- 2.商品信息 -->
    <div class="goods-message">
      <!-- 2.1价格 -->
      <div class="goods-price">
        <div class="price">
          <span class="small">券后</span>
          <strong><span class="symbol">￥</span>9999.00</strong>
          <del class="small">￥10000.00></del>
        </div>
        <div class="sold-out">已售 2483+</div>
      </div>
      <!-- 2.2商品标题 -->
      <div class="goods-title">
        三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫
        5G手机 游戏拍照旗舰机s23
      </div>
      <!-- 2.3七天无理由 -->
      <div class="goods-gratuitous">
        <!-- 第一行 后续有功能继续添加 -->
        <div class="back" v-for="item in 2" :key="item">
          <img src="@/assets/select.png" alt="icon" class="gratuitous-icon" />
          <span>7天无理由退货 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;48小时发货</span>
          <van-icon name="arrow" size="12px" color="#666" class="right-arrow" />
        </div>
      </div>
      <!-- 2.4商品评价 -->
      <div class="goods-all-comment">
        <span class="left">商品评价(400+)</span>
        <div class="right">
          <span class="all">查看全部</span>
          <van-icon name="arrow" size="12px" color="#666" class="right-arrow" />
        </div>
      </div>
      <!-- 2.5展示2-4条用户评价 -->
      <div class="goods-user-comment">
        <!-- 头像
        用户的名字 默认是手机号 则需用 * 替换敏感词
         -->
        <div class="user-message">
          <div class="user-img">
            <img src="@/assets/default-avatar.png" alt="head-portrait" />
          </div>
          <div class="user-name">
            <span>匿名玩家</span>
            <van-rate value="3" color="#ffd21e" size="14px" class="star" />
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="user-content">
          <p>
            附件哦啊世界佛教奋斗设计费扫i非机动阿萨法叫哦附件哦啊世界佛教奋斗设计费扫i非机动阿萨法叫哦附件哦啊世界佛教奋斗设计费扫i非机动阿萨法叫哦
          </p>
          <div class="comment-box">
            <div class="comment-img" v-for="item in 6" :key="item">
              <img src="@/assets/product.jpg" alt="comment-img" />
            </div>
          </div>
        </div>
      </div>
      <div class="baby-detail">
        <h5>宝贝详情</h5>
      </div>
    </div>

    <!-- 2.6商品详情  尺寸：宽度100%，高度自适应/建议高度 <= 1200px-->
    <div class="goods-detail-img">
      <img src="@/assets/detail1.jpg" alt="" />
    </div>

    <!-- 3.底部tab栏功能 -->
    <div class="bottom-tab-bar">
      <div class="home-bar">
        <img src="@/assets/home.png" alt="home">
        <span>首页</span>
      </div>
      <div class="cart-bar">
        <img src="@/assets/cart.png" alt="home">
        <span>购物车</span>
      </div>
      <div class="add-cart">加入购物车</div>
      <div class="buy-now">立即购买</div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  name: 'prodetailIndex',
  components: {
    TopTitle
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  .top-title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  .swipe {
    width: 100%;
    height: 375px;
    overflow: hidden;
    position: relative;
    .swipe-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
    }
    .swipe-img.active {
      display: block;
    }
    .page-num {
      width: 15%;
      padding: 4px 0;
      background-color: rgba(168, 166, 166, 0.6);
      border-radius: 50px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0;
      margin: 12px 12px 0 0;
      white-space: nowrap;
    }
  }
  .goods-message {
    display: flex;
    flex-direction: column;
    margin: 8px 12px;
    position: relative;
    .goods-price {
      display: flex;
      justify-content: space-between;
      .price {
        color: #ff5000;
        font-size: 18px;
        strong {
          margin: 0 2px;
          .symbol {
            font-size: 15px;
          }
        }
        .small {
          font-size: 13px;
          font-weight: bold;
        }
      }
      .sold-out {
        color: #666;
      }
    }
    // 标题
    .goods-title {
      width: 100%;
      margin-top: 8px;
      line-height: 1.5em;
      text-align: left;
      display: -webkit-box; //设置元素为弹性盒子
      -webkit-box-orient: vertical; //设置盒子的排列方式
      -webkit-line-clamp: 2; //指定要显示的行数
      overflow: hidden;
    }
    // 七天无理由
    .goods-gratuitous {
      width: 100%;
      color: #666;
      font-size: 12px;
      .back {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d0c7c7;
        padding: 4px 0;
        .gratuitous-icon {
          width: 24px;
          margin-right: 8px;
        }
        .right-arrow {
          position: absolute;
          right: 0;
        }
      }
    }
    // 评价
    .goods-all-comment {
      width: 100%;
      margin: 12px 0;
      font-size: 16px;
      color: rgb(0, 0, 0);
      display: flex;
      justify-content: space-between;
      .left {
        font-weight: bold;
      }
      .right {
        color: #666;
        .all {
          margin-right: 10px;
        }
      }
    }
    // 评论区域
    .goods-user-comment {
      width: 100%;
      padding: 4px 0;
      .user-message {
        font-size: 12px;
        color: rgb(0, 0, 0);
        display: flex;
        align-items: center;
        .user-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .user-name {
          margin-left: 16px;
          .star {
            padding-left: 10px;
          }
        }
      }

      // 评价内容
      .user-content {
        margin: 12px 0;
        p {
          display: -webkit-box; //设置元素为弹性盒子
          -webkit-box-orient: vertical; //设置盒子的排列方式
          -webkit-line-clamp: 2; //指定要显示的行数
          overflow: hidden;
          font-size: 12px;
        }

        // 评论内容
        .comment-box {
          width: 100%;
          display: flex;
          flex-wrap: nowrap; //禁止换行
          overflow: hidden;
          margin: 8px 0;
          gap: 10px;
          .comment-img {
            flex: 0 0 auto; //防止盒子缩放
            width: 80px;
            height: 80px;
            img {
              height: 100%;
              width: 100%;
              overflow: hidden;
            }
          }
        }
      }
    }
    // .goods-detail {
    //   padding: 8px 0;
    //   width: 100%;
    // }
    .baby-detail {
      padding: 8px 0;
      width: 100%;
    }
  }
  // 详情图
  .goods-detail-img {
    margin-top: 8px;
    border-top: 1px solid #d0c7c7;
    width: 100%;
    border: 1px solid #000;
    height: auto;
    img{
      width: 100%;
      height: 100%;
    }

  }

  // 底部购物栏
  .bottom-tab-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color:#fff;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    font-size: 14px;
    // padding: 8px 0;
    // justify-content: space-around;
    // text-align: center;
    .home-bar,.cart-bar{
      width: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      color: #000;
      img{
        width: 24px;
        height: 24px;
      }
    }
    .add-cart{
      width: 120px;
      border-radius: 20px;
      padding: 10px 0;
      margin: 0 4px;
      background-color: #ffa900;
    }
    .buy-now{
      flex: 2;
      padding: 10px 0;
      border-radius: 20px;
      background-color: #fe5630;
      margin:0 12px 0 6px;
    }
  }
}
</style>
