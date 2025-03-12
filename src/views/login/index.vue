<template>
  <div class="login-container">
    <!-- 顶部导航 -->
    <TopTitle>
      <h3>账号登录</h3>
    </TopTitle>

    <!-- 登录表单 -->
    <div class="login-form">
      <div class="form-item">
        <input
          type="tel"
          placeholder="请输入手机号"
          class="input-field"
          maxlength="11"
        />
      </div>

      <div class="form-item code-item">
        <input
          type="number"
          placeholder="请输入验证码"
          class="input-field"
          maxlength="6"
        />
        <div class="get-code">获取验证码</div>
      </div>

      <div class="tip-text">未注册的手机号验证后自动注册</div>

      <button class="login-btn">登录</button>
    </div>

    <!-- 协议声明 -->
    <div class="agreement">
      <label class="agreement-check">
        <input type="checkbox" checked />
        <span class="checkmark"></span>
        我已阅读并同意
      </label>
      <a href="#" class="protocol" @click.prevent>《用户协议》《隐私政策》</a>
    </div>
  </div>
</template>
<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  name: 'loginIndex',
  components: {
    TopTitle
  }
}
</script>
<style lang="less" scoped>
.login-container {
  // 登录表单
  .login-form {
    margin: 50px 12px;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

    // 表单元素通用样式
    .form-item {
      margin-bottom: 16px;

      // 输入框样式
      .input-field {
        width: 100%;
        height: 44px;
        padding: 12px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        font-size: 14px;
        outline: none;

        &:focus {
          border-color: #ff5000;
        }
      }

      // 验证码区域特殊样式
      &.code-item {
        display: flex;
        gap: 10px;

        .get-code {
          width: 100px;
          height: 44px;
          line-height: 44px;
          text-align: center;
          background: #fff;
          border: 1px solid #ff5000;
          border-radius: 4px;
          color: #ff5000;
          font-size: 14px;
        }
      }
    }

    // 提示文字
    .tip-text {
      font-size: 12px;
      color: #999;
      margin-top: 8px;
    }

    // 登录按钮
    .login-btn {
      width: 100%;
      height: 44px;
      background: #ff5000;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      margin-top: 20px;
    }
  }

  // 协议声明区域
  .agreement {
    margin: 30px 20px;
    font-size: 12px;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: center;

    .agreement-check {
      display: flex;
      align-items: center;

      input {
        display: none;

        &:checked + .checkmark {
          background: #ff5000;
          border-color: #ff5000;

          &::after {
            content: "";
            position: absolute;
            left: 4px;
            top: 1px;
            width: 5px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        }
      }

      .checkmark {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #e5e5e5;
        border-radius: 2px;
        margin-right: 4px;
        position: relative;
      }
    }

    .protocol {
      color: #ff5000;
      text-decoration: none;
    }
  }
}
</style>
