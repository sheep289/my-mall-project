<template>
  <div class="register-container">
    <!-- 顶部导航栏 -->
    <TopTitle>
      <h3>欢迎注册！</h3>
    </TopTitle>
    <!-- 表单区域 -->
    <div class="form-wrapper">
      <form class="register-form" @submit.prevent="handleSubmit">
        <div class="form-item">
          <input
            type="text"
            placeholder="请输入用户名"
            class="input-field"
            v-model="form.username"
          />
        </div>
        <div class="form-item">
          <input
            type="tel"
            placeholder="请输入手机号"
            class="input-field"
            v-model="form.mobile"
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
        <div class="verify-group">
          <input
            type="text"
            placeholder="请输入验证码"
            class="input-field"
            v-model="form.code"
          />
          <button
            class="code-btn"
            :disabled="isCounting"
            @click.prevent="getVerifyCode"
          >
            {{ codeBtnText }}
          </button>
        </div>
        <button class="submit-btn">立即注册</button>
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
        mobile: '',
        password: '',
        code: ''
      },
      isCounting: false,
      codeBtnText: '获取验证码'
    }
  },
  methods: {
    handleSubmit () {
      // 后续添加提交逻辑
    },
    getVerifyCode () {
      // 后续添加验证码获取逻辑
    }
  }
}
</script>

<style lang="less">
// 颜色变量（与登录页保持一致）
@main-color: #ff4400;
@border-color: #e0e0e0;
@placeholder-color: #999;

.register-container {
  min-height: 100vh;
  background: #f5f5f5;

  .form-wrapper {
    padding: 30px 15px;

    .register-form {
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

      .verify-group {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;

        .input-field {
          flex: 1;
        }

        .code-btn {
          width: 120px;
          height: 45px;
          background: #f5f5f5;
          border: 1px solid @border-color;
          border-radius: 4px;
          color: @main-color;
          font-size: 14px;

          &:disabled {
            color: #999;
            cursor: not-allowed;
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
    }
  }
}
</style>
