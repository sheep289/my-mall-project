<template>
  <div class="prodetail">
    <!-- 标题 -->
    <TopTitle>
      <h3>商品详情页</h3>
    </TopTitle>
    <!-- 1.轮播图 -->
    <GoodsSwiper :list="goodsSwiper"></GoodsSwiper>
    <!-- 2.商品信息 -->
    <div class="goods-message">
      <!-- 2.1价格 -->
      <div class="goods-price">
        <div class="price">
          <span class="small">券后</span>
          <strong
            ><span class="symbol">￥</span>{{ goodsList.price_min }}</strong
          >
          <del class="small">￥{{ goodsList.price_max }}</del>
        </div>
        <div class="sold-out">已售 {{ goodsList.sales }}+</div>
      </div>
      <!-- 2.2商品标题 -->
      <div class="goods-title">
        {{ goodsList.title }}
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
        <span class="left">商品评价({{ goodsUserList.length }})</span>
        <div class="right">
          <span class="all">查看全部</span>
          <van-icon name="arrow" size="12px" color="#666" class="right-arrow" />
        </div>
      </div>
      <!-- 2.5展示2-4条用户评价 -->
      <div
        class="goods-user-comment"
        v-for="(item, index) in goodsUserList"
        :key="index.id"
      >
        <!-- 头像
        用户的名字 默认是手机号 则需用 * 替换敏感词
         -->
        <div class="user-message">
          <div class="user-img">
            <img src="@/assets/default-avatar.png" alt="head-portrait" />
          </div>
          <div class="user-name">
            <span>{{ item.user }}</span>
            <van-rate
              :value="item.rating"
              color="#ffd21e"
              size="14px"
              class="star"
            />
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="user-content">
          <p>
            {{ item.content }}
          </p>
          <div class="comment-box">
            <div
              class="comment-img"
              v-for="item in item.user_comment_img"
              :key="item.id"
            >
              <img :src="item" alt="comment-img" />
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
      <img :src="goodsList.detail_img" alt="" />
    </div>

    <!-- 3.底部tab栏功能 -->
    <div class="bottom-tab-bar">
      <div class="home-bar" @click="$router.push('/')">
        <img src="@/assets/home.png" alt="home" />
        <span>首页</span>
      </div>
      <div class="cart-bar" @click="$router.push('/cart')">
        <img src="@/assets/cart.png" alt="home" />
        <span>购物车</span>
      </div>
      <div class="add-cart" @click="addFn">加入购物车</div>
      <div class="buy-now" @click="buyFn">立即购买</div>
    </div>

    <!-- 加入购物车的弹层
    问题： 通过父传子，cartCard组件拿到数据后，图片渲染失败，原因：异步数据加载的延迟
   解决： 使用v-if 控制弹层组件的渲染，确保数据加载完成后在显示
     -->
    <BottomPopup
      v-model="showPannel"
      :title="mode === 'add' ? '加入购物车' : '立即购买'"
      v-if="specList.image && specList.image.length > 0"
      :list="specList"
    >
    </BottomPopup>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import GoodsSwiper from '@/components/GoodsSwiper.vue'
import BottomPopup from '@/components/BottomPopup.vue'
import { getGoodsDeatil, getUserComment, getSpecSelector } from '@/api/prodetail'
export default {
  name: 'prodetailIndex',
  components: {
    TopTitle,
    GoodsSwiper,
    BottomPopup
  },
  data () {
    return {
      goodsList: {}, // 商品卡片数据
      goodsSwiper: [], // 存放商品轮播图
      goodsUserList: [], // 存放商品评价
      showPannel: false, // 控制底层显示
      mode: 'add',
      specList: {} // 存放商品规格数据

    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this.getGoodsList()
    this.getUserList()
    this.getSpecList()
  },
  methods: {
    // 获取商品数据
    async getGoodsList () {
      const res = await getGoodsDeatil(this.id)
      this.goodsList = res
      this.goodsSwiper = res.image
    },
    // 获取用户评价数据
    async getUserList () {
      const res = await getUserComment(this.id)
      this.goodsUserList = res
    },
    // 获取商品规格数据
    async getSpecList () {
      const res = await getSpecSelector(this.id)
      this.specList = res[0]
      // console.log(this.specList)
    },

    addFn () {
      this.mode = 'add'
      this.showPannel = true
    },
    buyFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-bottom: 80px;
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
              object-fit: cover;
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
    border-top: 1px solid #eee;
    width: 100%;
    height: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 底部购物栏
  .bottom-tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
    font-size: 14px;
    // padding: 8px 0;
    // justify-content: space-around;
    // text-align: center;
    .home-bar,
    .cart-bar {
      width: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      color: #000;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .add-cart {
      width: 120px;
      border-radius: 20px;
      padding: 10px 0;
      margin: 0 4px;
      background-color: #ffa900;
    }
    .buy-now {
      flex: 2;
      padding: 10px 0;
      border-radius: 20px;
      background-color: #fe5630;
      margin: 0 12px 0 6px;
    }
  }
}
</style>
