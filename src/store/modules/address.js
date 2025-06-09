import { getAddressList, clearAddress, setDefaultAddress } from '@/api/address'
import Vue from 'vue'

export default {
  namespaced: true,
  state () {
    return {
      addressList: []
    }
  },
  mutations: {
    setAddressList (state, arr) {
      state.addressList = arr
    },
    updateIsDefault (state, index) {
      state.addressList.forEach((item, i) => {
        // 通过Vue.set确保响应式更新
        Vue.set(item, 'is_default', i === index)
      })
    }
  },
  actions: {
    async getAddressListAcion (context) {
      const { data } = await getAddressList()
      // 由于返回的地址是分开的，与实际需求不符，需要 拼接地址 再将/移除
      data.forEach(item => {
        item.joinDetail = item.delivery_address.replace(/\//g, ' ') + ' ' + item.detail_address
        item.is_default = item.is_default !== 0
      })
      context.commit('setAddressList', data)
    },
    async clearAddressAction (context, id) {
      await clearAddress(id)
      context.dispatch('getAddressListAcion')
    },

    async setDefaultAddressAction (context, addressId) {
      await setDefaultAddress(addressId)
    }
  },
  getters: {
    getselectAddss (state) {
      return state.addressList.find(item => item.is_default)
    }
  }
}
