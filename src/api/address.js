import request from '@/utils/request'
import store from '@/store'
// 获取省市区
export const getRegionProvince = () => {
  return request.get('/my/region/province', {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

export const getRegionCity = (regionId) => {
  return request.get(`/my/region/city/${regionId}`, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

export const getRegionCounty = (regionId) => {
  return request.get(`/my/region/county/${regionId}`, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 1.获取收获地址列表
export const getAddressList = () => {
  return request.get('/my/address/list', {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 2.添加收获地址
export const setAddAddress = (form) => {
  return request.post('/my/add/address', {
    form
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 3.删除收货地址
export const clearAddress = (addressId) => {
  return request.post('/my/clear/address', {
    addressId
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 4.更新收获地址
export const updateAddress = (addressId, form) => {
  return request.post('/my/update/address', {
    addressId,
    form
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}

// 5. 设置默认地址
export const setDefaultAddress = (addressId) => {
  return request.post('/my/default/address', {
    addressId
  }, {
    headers: {
      Authorization: store.getters.getToken
    }
  })
}
