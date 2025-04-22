<template>
  <div class="create-address">
    <!-- 标题 -->
    <TopTitle>
      <h3>新增收货地址</h3>
    </TopTitle>

    <!-- 容器 -->
    <div class="container">
      <!-- 表单区域 -->
      <form class="create-form" @submit.prevent="subimtHandle">
        <div class="form-item">
          <span class="msg-titile">姓名</span>
          <input
            type="text"
            v-model="formData.name"
            @blur="validateField('name')"
            placeholder="请输入收货人姓名"
            class="input-field"
          />
          <!-- 错误提示 -->
          <div v-if="errors.name" class="error-tip">{{ errors.name }}</div>
        </div>
        <div class="form-item">
          <span class="msg-titile">电话</span>
          <input
            type="tel"
            v-model="formData.tel"
            @blur="validateField('tel')"
            placeholder="请输入收货人手机号"
            class="input-field"
          />
          <div v-if="errors.tel" class="error-tip">{{ errors.tel }}</div>
        </div>
        <div class="form-item">
          <span class="msg-titile">地区</span>
          <input
            type="text"
            v-model="formData.fieldValue"
            @blur="validateField('fieldValue')"
            placeholder="请选择省/市/区"
            class="input-field"
            @click="goCascader"
          />
          <div v-if="!formData.fieldValue" class="error-tip">
            {{ errors.fieldValue }}
          </div>

          <van-popup v-model="show" round position="bottom">
            <van-cascader
              v-model="cascaderValue"
              title="请选择所在地区"
              :options="options"
              @close="show = false"
              @change="onChange"
              @finish="onFinish"
            />
          </van-popup>
        </div>
        <div class="form-item">
          <span class="msg-titile">详细地址</span>
          <textarea
            type="text"
            v-model="formData.address"
            @blur="validateField('address')"
            placeholder="街道门牌、楼层等信息"
            class="input-field address-textarea"
          ></textarea>
          <div v-if="errors.address" class="error-tip">
            {{ errors.address }}
          </div>
        </div>
        <button type="submit" class="submit-btn">保存</button>
      </form>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import { getRegionProvince, getRegionCity, getRegionCounty, setAddAddress } from '@/api/address'

export default {
  components: { TopTitle },
  data () {
    return {
      timerId: null,
      formData: {
        name: '',
        tel: '',
        address: '',
        fieldValue: '' // 地区
      },
      show: false,
      cascaderValue: '',
      options: [],
      errors: {
        name: '',
        tel: '',
        address: '',
        fieldValue: ''
      }
    }
  },
  methods: {
    async goCascader () {
      // 省数据
      const { data } = await getRegionProvince()
      const handleData = data.map(item => ({ ...item, text: item.region_name, value: item.region_id, children: [] }))
      this.options = handleData
      this.show = true
    },

    async onChange ({ value, selectedOptions }) {
      // console.log(value) // 可以拿到region_id
      if (value === selectedOptions[0].value) {
        // 市数据
        const { data } = await getRegionCity(value)
        const handleData = data.map(item => ({ ...item, text: item.region_name, value: item.region_id, children: [] }))
        this.options.filter(item => item.value === value)[0].children = handleData

        // 县数据
      } else if (value === selectedOptions[1].value) {
        const { data } = await getRegionCounty(value)
        const handleData = data.map(item => ({ ...item, text: item.region_name, value: item.region_id }))
        selectedOptions[0].children.filter(item => item.value === value)[0].children = handleData
      }
    },

    onFinish ({ selectedOptions }) {
      this.show = false
      this.formData.fieldValue = selectedOptions.map((option) => option.text).join('/')
    },
    validateField (field) {
      const rules = {
        name: v => v.trim() ? '' : '请输入姓名',
        tel: v => /^1[3-9]\d{9}$/.test(v) ? '' : '手机号格式错误',
        address: v => v.trim().length > 2 ? '' : '地址至少2个字符',
        fieldValue: v => v.trim() ? '' : '请输入省市区'
      }
      this.errors[field] = rules[field](this.formData[field])
    },
    async subimtHandle () {
      // 触发所有检查：姓名、电话、地址都检查一遍
      ['name', 'tel', 'address', 'fieldValue'].forEach(f => this.validateField(f))
      if (Object.values(this.errors).some(msg => msg)) {
        return this.$toast('存在未通过的验证') // 如果有错误，提示不通过
      }
      const { status } = await setAddAddress(this.formData)
      if (status === 0) {
        this.$toast.success('添加成功')
        this.timerId = setTimeout(() => {
          this.$router.replace('/address')
          this.timerId = null
        }, 1000)
      }
    }
  },
  destroyed () {
    // 销毁定时器
    clearTimeout(this.timerId)
  }
}
</script>

<style lang="less" scoped>
.create-address {
  .container {
    display: flex;
    flex-direction: column;
    margin: 54px 0 100px 0;
    padding: 8px;
    .create-form {
      background-color: #fff;
      padding: 8px;
      box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      .form-item {
        margin-bottom: 8px;
        padding: 8px;
        border-bottom: 1px solid rgba(169, 169, 169, 0.2);
        .msg-titile {
          display: inline-block;
          width: 70px;
          font-size: 14px;
        }
        .input-field {
          border: none;
          font-size: 14px;
          padding: 10px;
          width: 78%;
        }
        .address-textarea {
          resize: vertical; //允许用户垂直缩放
          min-height: 60px; //设置最小高度
          width: 100%;
          overflow: auto; // 超出显示滚动条
          vertical-align: top; //顶部对齐
          line-height: 1.5;
        }
        .error-tip {
          color: #ff4444;
          font-size: 12px;
          margin: 4px 0 0 80px;
        }
      }
      .submit-btn {
        width: 100%;
        height: 45px;
        background: red;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        margin-top: 20px;
      }
    }
  }
}
</style>
