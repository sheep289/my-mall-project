<template>
  <transition name="slide-up">
    <div class="modal" v-show="value">
      <!-- 遮罩层 -->
      <div class="overlay" @click="close"></div>
      <!-- 弹层-内容区域 -->
      <div class="popup-content">
        <div class="popup-header">
          <slot name="header">
            <h3>{{ title }}</h3>
            <div class="close-img" @click="close">
              <img src="@/assets/close.png" alt="" />
            </div>
          </slot>
        </div>

        <div class="popup-body">
          <!-- 商品卡片 -->
          <!-- 规格选择 -->
          <SpecSelector ref="childRef"></SpecSelector>
        </div>
        <div class="popup-bottom">
          <div class="btn" v-if="title === '加入购物车'" @click="addCart">
            {{ title }}
          </div>
          <div
            class="btn"
            v-else
            :class="{ buy_now: title === '立即购买' }"
            @click="buyNow"
          >
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { setAddCart } from '@/api/cart'
import SpecSelector from '@/components/SpecSelector.vue'
import loginConfirm from '@/mixins/loginConfirm.js'
export default {
  mixins: [loginConfirm],
  components: {
    SpecSelector
  },
  data () {
    return {
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  computed: {
    goodsId () {
      return this.$store.state.detail.detail.id
    },
    specParam () {
      return this.$refs.childRef.getChildData()
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    async addCart () {
      try {
        if (this.handleConfirm()) return
        // 发起添加到购物车而请求
        const { data } = await setAddCart(this.goodsId, this.specParam.selectSpecsIds, this.specParam.count)
        this.$store.commit('detail/getCartTotal', data.cart_total)
        this.$toast('加入购物车成功')
        this.$emit('input', false)
      } catch (error) {
        console.log(error.message)
      }
    },
    buyNow () {
      // 判断是否有token权证
      if (this.handleConfirm()) return
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          specs: JSON.stringify(this.specParam.selectSpecsIds),
          quantity: this.specParam.count
        }

      })
    }
  },
  //   记录
  watch: {
    value (newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  // 在组件销毁时，无论当前弹框是否可见（即value是否为true），都强制恢复body滚动。确保组件销魂时而watch未监听到，导致body的overflow没有被虫子
  beforeDestroy () {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
  }
  .popup-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    padding: 16px;
    max-height: 80%;
    overflow-y: auto; //内容超过80% ，则显示滚动条，确保可以看到所有内容
    .popup-header {
      // text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
      .close-img {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .popup-body {
      width: 100%;
      margin-bottom: 28px; //控制body与固定的bottom的距离
    }
    .popup-bottom {
      width: 100%;
      text-align: center;
      color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 12px;
      .btn {
        padding: 10px;
        border-radius: 5px;
        background-color: #ff9402;
        &.buy_now {
          background-color: #fe5630;
        }
      }
    }
  }
}
// 入场离场动画
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s;
}
.slide-up-enter,
.slide-up-leave-top {
  transform: translateY(100%);
}
</style>
