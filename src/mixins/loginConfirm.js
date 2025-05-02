export default {
  methods: {
    handleConfirm () {
      if (!this.$store.getters.getToken) {
        // 在Vue组件中
        this.$modal.confirm({
          title: '温馨提示',
          message: '你还没有登录，无法进行此操作哦！',
          confirmButtonColor: '#ee0a24',
          cancelBtnText: '去逛逛',
          confirmBtnText: '去登录',
          closerOnClickModal: false
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                url: this.$route.fullPath // 当前的路径地址
              }
            })
            this.$emit('input', false) // 关闭底层弹框
          })
          .catch(() => { })
        return true
      }
      return false
    }
  }
}
