<template>
  <div class="address">
    <!-- 头部 -->
    <div>
      <TopTitle>
        <h3>收货地址</h3>
      </TopTitle>
    </div>
    <!-- 内容 -->
    <div class="container">
      <div
        class="address-item"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="address-message" :class="{ active: activeIndex === index }">
          <div @click="selectAddress(item, index)">
            <div class="user-info">
              <span>{{ item.delivery_name }}</span>
              <span>{{ item.delivery_phone }}</span>
              <span class="default" v-if="item.is_default">默认</span>
            </div>
            <div class="user-address">{{ item.joinDetail }}</div>
          </div>
          <div class="edit-address-box">
            <div
              class="address-default"
              @click="setDefaultAddress(index, item.user_address_id)"
            >
              <input type="checkbox" :checked="item.is_default" />
              <div :class="{ red: item.is_default }">
                {{ item.is_default ? "已默认" : "设为默认" }}
              </div>
            </div>
            <div class="handle-address">
              <div
                class="delete-address"
                @click="clearHandle(item.user_address_id)"
              >
                删除
              </div>
              <div
                class="change-address"
                @click="updateHandle(item.user_address_id)"
              >
                修改
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 添加新地址 -->
    <div class="address-bottom">
      <div class="bottom-text" @click="addAddress">
        <p>添加地址</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TopTitle from '@/components/TopTitle.vue'
export default {
  components: { TopTitle },
  name: 'editAddress',
  data () {
    return {
      activeIndex: '',
      timerId: null
    }
  },
  async created () {
    if (this.$store.getters.getToken) {
      // 获取收货地址列表
      await this.$store.dispatch('address/getAddressListAcion')
    }
    this.getAddressIndex()
  },
  computed: {
    ...mapState('address', ['addressList']),
    ...mapGetters('address', [''])
    // 接收pay订单页面查询传参
  },
  methods: {
    addAddress () {
      this.$router.push('/create')
    },
    clearHandle (id) {
      if (!id) return
      this.$modal.confirm({
        message: '你确定删除该地址',
        confirmButtonColor: '#ee0a24',
        cancelBtnText: '我再想想',
        confirmBtnText: '删除'
      })
        .then(() => {
          this.$store.dispatch('address/clearAddressAction', id)
        })
        .catch(() => { })
    },
    updateHandle (addressId) {
      this.$router.push({
        path: '/update',
        query: { addressId }
      })
    },
    setDefaultAddress (index, addressId) {
      this.addressList.forEach((item, i) => {
        // 通过Vue.set确保响应式更新
        this.$set(item, 'is_default', i === index)
      })
      // 更改后台数据
      this.$store.dispatch('address/setDefaultAddressAction', addressId)
    },
    selectAddress (item, index) {
      const source = this.$route.query.source

      // 如果路由参数不存在，说明不是重其它页面跳转过来的，则无触发该方法，不要做高亮以跳转
      if (!source) return
      this.activeIndex = index
      if (!this.timerId) {
        this.timerId = setTimeout(() => {
          this.$router.replace({
            path: source,
            query: {
              ...this.$route.query,
              addressId: item.user_address_id
            }
          })
          this.timerId = null
        }, 300)
      }
    },
    getAddressIndex () {
      // 获取pay支付页面跳转时携带的 地址id
      const getAddressId = parseInt(this.$route.query.addressId)
      // 利用findIndex查找地址对应的索引号 未查询到则是 -1
      const index = this.addressList.findIndex(item => item.user_address_id === getAddressId)
      this.activeIndex = index
    }
  },
  destroyed () {
    // 销毁定时器
    clearTimeout(this.timerId)
  }
}
</script>

<style lang="less" scoped>
.address {
  overflow-y: auto;
  padding-bottom: 80px;
  .container {
    display: flex;
    flex-direction: column;
    margin: 54px 0 100px 0;
    .address-item {
      font-size: 14px;
      color: #000000;
      width: auto;
      display: flex;
      flex-direction: column;
      margin: 4px 8px;
      .address-message {
        background-color: #fff;
        box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 10px;
        &.active {
          border: 1.4px solid rgba(241, 0, 0, 0.5);
          // border: 2px solid #f44336;
        }

        .user-info {
          margin-bottom: 6px;
          display: flex;
          align-items: flex-end;
          // position: relative;

          span {
            font-size: 14px;
            font-weight: bold;
            margin-right: 10px;
          }
          .default {
            position: relative;
            top: -2px;
            right: 2px;
            color: rgba(255, 0, 0, 0.5);
            font-size: 8px;
            border: 1px solid rgba(255, 0, 0, 0.5);
            padding: 1px;
          }
        }
        .edit-address-box {
          height: 20px;
          color: #666;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14px;

          .red {
            color: #f44336;
          }
          .address-default input[type="checkbox"] {
            display: none;
          }

          .address-default div:before {
            content: "⬜";
            margin-right: 5px;
          }

          .address-default input:checked + div:before {
            content: "✓";
            color: #f44336;
            font-weight: bold;
          }

          .handle-address {
            display: flex;
            gap: 10px;
            .delete-address,
            .change-address {
              background-color: #f6f6f6;
              color: #1a1a1a;
              padding: 4px 8px;
            }
          }
        }
      }
    }
  }
  .address-bottom {
    background-color: white;
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    padding: 10px 20px;
    .bottom-text {
      background-color: red;
      border-radius: 25px;
      text-align: center;
      align-items: center;
      p {
        padding: 10px;
        color: white;
      }
    }
  }
}
</style>
