<template>
  <div class="login-container">
    <!-- 顶部导航栏 -->
    <TopTitle>
      <h3>登录</h3>
    </TopTitle>
    <!-- 表单区域 -->
    <div class="form-wrapper">
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-item">
          <input
            type="text"
            placeholder="请输入手机号"
            maxlength="11"
            class="input-field"
            v-model="username"
            required
          />
        </div>
        <div class="form-item">
          <input
            type="password"
            placeholder="请输入密码"
            minlength="6"
            class="input-field"
            v-model="password"
            required
          />
        </div>
        <button class="submit-btn">登录</button>
        <div class="footer-tips">
          还没有账号？<span @click="goRegister">立即注册</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import { setLogin } from '@/api/register'
export default {
  components: {
    TopTitle
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
  },
  computed: {
    verify () {
      if (!/^1[3-9]\d{9}$/.test(this.username)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^[\S]{6,12}$/.test(this.password)) {
        this.$toast('密码长度为6~12位')
        return false
      }
      return true
    }
  },
  methods: {
    // 校验手机号与密码
    async handleSubmit () {
      try {
        if (this.verify) {
          // 发起登录请求
          const res = await setLogin(this.username, this.password)
          // 将用户token权证存储到vuex中
          this.$toast('登录成功')
          this.$store.commit('user/setUserInfo', res.data)
          /*
          如果是其它页面跳转到登录页面，则登录成功后，进行回跳
          这里不能用push进行跳转，因为返回上一步时，又会跳到登录页面，
          所以用replace替代push ,  replace在这的作用是进行页面替换，相当于从详情页跳转到登录页面，登录页面在灰跳直接会到详情页，不会保留回跳前的页面
          */

          const url = this.$route.query.url || '/'
          this.$router.replace(url)
        }
      } catch (error) {
        console.log(error)
      }
    },
    goRegister () {
      this.$router.push('/register')
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
// 颜色变量
@main-color: #ff4400; // 主色
@border-color: #e0e0e0; // 边框色
@placeholder-color: #999; // 提示文字颜色

.login-container {
  min-height: 100vh;
  background: #f5f5f5;
  .form-wrapper {
    padding: 30px 15px;

    .login-form {
      .form-item {
        margin-bottom: 15px;

        .input-field {
          width: 100%;
          height: 45px;
          padding: 10px;
          border: 1px solid @border-color;
          border-radius: 4px;
          font-size: 14px;

          &::placeholder {
            color: @placeholder-color;
          }

          &:focus {
            border-color: @main-color;
          }
        }
      }

      .submit-btn {
        width: 100%;
        height: 45px;
        background: @main-color;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        margin-top: 20px;
      }

      .footer-tips {
        margin-top: 20px;
        text-align: center;
        color: #666;
        font-size: 14px;

        span {
          color: @main-color;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
