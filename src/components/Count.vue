<template>
  <div class="count-box">
    <button class="subBtn" @click="handleSub">-</button>
    <input class="inp" @change="handleChange" :value="value" type="text" />
    <button class="addBtn" @click="handleAdd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
    //   console.log(e.target.value)
      const num = +e.target.value // 转数字处理 如果是不是数组 会转成NaN
      //   输入了不合格的文本 或 输入了负值， 回退成原来的 value 值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
      }
      this.$emit('input', num)
    }
  }

}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .subBtn,
  .addBtn {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp{
    width: 40px;
    outline: none;
    border: none;
    text-align: center;
    margin: 0 5px;
    background-color: #efefef;
  }
}
</style>
