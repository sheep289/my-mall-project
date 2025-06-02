<template>
  <div class="my-container">
    <TopTitle>
      <h3>商品详情页</h3>
    </TopTitle>
    <!-- 顶部信息栏 -->
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar">
          <img
            :src="userData.avatar || defaultAvatar"
            alt="用户头像"
          />
        </div>
        <div class="info">
          <h2 class="username" v-if="token">
            {{ userData.nickname || userData.mobile }}
          </h2>
          <h2 class="username" @click="$router.push('/login')" v-else>
            立即登录
          </h2>
          <!-- <p class="vip-level">黄金会员</p> -->
        </div>
      </div>
    </div>

    <!-- 账户资产 -->
    <div class="assets-card">
      <div class="asset-item">
        <div class="asset-value" v-if="token">¥ {{ userData.balance }}</div>
        <div class="asset-value" v-else>0.00</div>
        <div class="asset-label">账户余额</div>
      </div>
      <div class="asset-item">
        <div class="asset-value" v-if="token">3 张</div>
        <div class="asset-value" v-else>无</div>
        <div class="asset-label">优惠券</div>
      </div>
    </div>

    <!-- 我的订单 -->
    <div class="order-card">
      <div class="card-header">
        <h3>我的订单</h3>
        <div class="view-all" @click="$router.push('/myorder?type=all')">
          查看全部 <van-icon name="arrow" class="iconfont" />
        </div>
      </div>
      <div class="order-status">
        <div class="status-item" v-for="item in filterData" :key="item.id" @click="$router.push(`/myorder?type=${item.type}`)">
          <van-icon :name="item.state_icon
" class="iconfont" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 我的服务 -->
    <div class="service-card">
      <div class="card-header">
        <h3>我的服务</h3>
      </div>
      <div class="service-grid">
        <div class="service-item" @click="$router.push('/address')">
          <van-icon name="location" class="iconfont" />
          <span>收货地址</span>
        </div>
        <div class="service-item">
          <van-icon name="service" class="iconfont" />
          <span>客服中心</span>
        </div>
        <div class="service-item">
          <van-icon name="coupon" class="iconfont" />
          <span>优惠券</span>
        </div>
        <div class="service-item">
          <van-icon name="question" class="iconfont" />
          <span>我的帮助</span>
        </div>
        <div class="service-item" @click="$router.push('/addgoods')">
         <van-icon name="bag" class="iconfont" />
          <span>添加商品</span>
        </div>
        <div class="service-item">
          <van-icon name="setting" class="iconfont" />
          <span>设置</span>
        </div>
      </div>
    </div>
    <!-- 退出登录 -->
    <div class="logout-btn" v-show="token" >
      <button @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import { mapState } from 'vuex'
export default {
  name: 'myUser',
  components: { TopTitle },
  data () {
    return {
      defaultAvatar: require('@/assets/default-avatar.png')
    }
  },
  async created () {
    await this.$store.dispatch('user/getUserIndex')
    if (this.token) {
      // 发起请求
      await this.$store.dispatch('user/getUserData')
    }
  },
  computed: {
    ...mapState('user', ['userData', 'userIndexData']),
    token () {
      return this.$store.getters.getToken
    },
    filterData () {
      // 过滤掉all,并且限制循环次数为5次
      return this.userIndexData?.types?.filter(item => item.type !== 'all')?.slice(0, 5) || []
    }
  },
  methods: {
    handleLogout () {
      this.$modal.confirm({
        title: '温馨提示',
        message: '你确定要退出登录吗？',
        confirmButtonColor: '#ee0a24',
        cancelBtnText: '取消',
        confirmBtnText: '确定',
        closerOnClickModal: false
      })
        .then(() => {
          this.$store.dispatch('user/logout')

          this.$emit('input', false) // 关闭底层弹框
        })
        .catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
// 定义变量
@theme-color: #ff5000; // 主色调
@secondary-color: #000000; // 辅助色
@bg-color: #f8f9fa; // 背景色
@text-color: #2d3436; // 主要文字
@border-color: #dfe6e9; // 边框色

.my-container {
  background: @bg-color;
  min-height: 100vh;
  padding-bottom: 20px;

  // 顶部信息栏
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    background: linear-gradient(
      307deg,
      @theme-color,
      lighten(@theme-color, 10%)
    );
    color: white;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
        border: 2px solid rgba(255, 255, 255, 0.3);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .username {
        margin: 0 0 5px 0;
        font-size: 20px;
      }

      .vip-level {
        margin: 0;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 10px;
        display: inline-block;
      }
    }

    .header-settings {
      font-size: 22px;
      padding: 10px;
    }
  }

  // 资产卡片
  .assets-card {
    display: flex;
    margin: 15px;
    background: white;
    border-radius: 12px;
    padding: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .asset-item {
      flex: 1;
      text-align: center;
      position: relative;

      &:first-child {
        border-right: 1px solid @border-color;
      }

      .asset-value {
        font-size: 20px;
        color: @text-color;
        margin-bottom: 5px;
        font-weight: 500;
      }

      .asset-label {
        font-size: 12px;
        color: #666;
      }
    }
  }

  // 订单卡片
  .order-card {
    margin: 15px;
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      h3 {
        margin: 0;
        font-size: 16px;
      }

      .view-all {
        color: #666;
        font-size: 13px;
        display: flex;
        align-items: center;

        .iconfont {
          margin-left: 5px;
          font-size: 12px;
        }
      }
    }

    .order-status {
      display: flex;
      justify-content: space-around;

      .status-item {
        text-align: center;
        padding: 0 10px;

        .iconfont {
          font-size: 24px;
          color: @secondary-color;
          margin-bottom: 8px;
          display: block;
        }

        span {
          font-size: 12px;
          color: @text-color;
        }
      }
    }
  }

  // 服务卡片
  .service-card {
    margin: 15px;
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .card-header {
      margin-bottom: 15px;

      h3 {
        margin: 0;
        font-size: 16px;
      }
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px 0;

      .service-item {
        text-align: center;
        padding: 10px;

        .iconfont {
          font-size: 24px;
          color: @theme-color;
          margin-bottom: 8px;
          display: block;
        }

        span {
          font-size: 12px;
          color: @text-color;
        }
      }
    }
  }
  .logout-btn {
    margin: 30px 15px;

    button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 25px;
      background: @theme-color;
      color: white;
      font-size: 16px;
    }
  }
}
</style>
