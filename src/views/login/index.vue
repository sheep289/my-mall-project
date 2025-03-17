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
            placeholder="请输入用户名/手机号"
            class="input-field"
            v-model="form.username"
          />
        </div>
        <div class="form-item">
          <input
            type="password"
            placeholder="请输入密码"
            class="input-field"
            v-model="form.password"
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
export default {
  components: {
    TopTitle
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      // 后续添加提交逻辑
    },
    goRegister () {
      this.$router.push('/register')
    }
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
