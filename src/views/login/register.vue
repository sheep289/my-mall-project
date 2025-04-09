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
            minlength="2"
            maxlength="20"
            v-model="form.nickname"
          />
        </div>
        <div class="form-item">
          <input
            type="tel"
            placeholder="请输入手机号"
            required
            class="input-field"
            maxlength="11"
            v-model="form.username"
          />
        </div>
        <div class="form-item">
          <input
            type="password"
            placeholder="请输入密码"
            maxlength="12"
            minlength="6"
            required
            class="input-field"
            v-model="form.password"
          />
        </div>
        <div class="verify-group">
          <input
            type="text"
            maxlength="6"
            placeholder="请输入验证码"
            class="input-field"
            v-model="form.code"
            required
          />
          <button
            class="code-btn"
            :disabled="isCounting"
            @click.prevent="getVerifyCode"
          >
            {{
              seconds === totalSeconds ? codeBtnText : seconds + "秒后重新获取"
            }}
          </button>
        </div>
        <button class="submit-btn">立即注册</button>
        <div class="footer-tips">
          已有账号？<span @click="goLogin">立即登录</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import { setRegister } from '@/api/register'
export default {
  components: {
    TopTitle
  },
  data () {
    return {
      form: {
        nickname: '',
        username: '',
        password: '',
        code: ''
      },
      isCounting: false,
      codeBtnText: '获取验证码',
      timerId: null,
      totalSeconds: 60, // 总秒速
      seconds: 60 // 倒计时秒速
    }
  },
  computed: {
    verify () {
      if (!/^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/.test(this.form.nickname)) {
        throw new Error('用户名无效')
      }
      if (!/^1[3-9]\d{9}$/.test(this.form.username)) {
        throw new Error('请输入正确的手机号，手机长号长度为11')
      }
      if (!/^[\S]{6,12}$/.test(this.form.password)) {
        throw new Error('密码长度为6~12位')
      }
      if (!this.form.code === '123456') {
        throw new Error('测试验证码为123456')
      }
      return true
    }
  },
  methods: {
    async handleSubmit () {
      // 后续添加提交逻辑
      try {
        if (this.verify) {
          const res = await setRegister(this.form.username, this.form.password, this.form.nickname)
          if (res.status === 0) {
            alert('注册成功')
          }
        }
      } catch (error) {
        console.log(error.message)
        alert(error.message)
      }
    },

    getVerifyCode () {
      // 后续添加验证码获取逻辑
      // 当上面的手机号密码符合要求则可以正确获取验证码操作

      if (!this.timerId) {
        this.timerId = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            this.timerId = null
            this.seconds = this.totalSeconds
          }
        }, 1000)
      }
    },
    goLogin () {
      this.$router.replace('/login')
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
