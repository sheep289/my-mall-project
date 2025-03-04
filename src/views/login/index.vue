<template>
  <div class="login">
    <div class="top-title">
      <TopTitle>
        <h4>账号登录</h4>
      </TopTitle>

      <!-- 内容区域 -->
      <div class="container">
        <div class="login-title">
          <div>手机号登录</div>
          <p>亲，未注册的手机号登陆后将自动注册</p>
        </div>
        <!-- 表单注册 -->
        <div class="form">
          <div class="form-item">
            <input type="text" maxlength="11" placeholder="请输入手机号" class="inp" />
          </div>

          <div class="form-item">
            <input type="text" maxlength="4" placeholder="请输入图形验证码" class="inp" />
            <div>
              <img src="@/assets/code.png" alt="code" />
            </div>
          </div>

          <div class="form-item">
            <input type="text" placeholder="请输入短信验证码" class="inp" />
            <div class="get-code">获取验证码</div>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="login-btn">登录</div>
      </div>
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
.login {
  .container {
    display: flex;
    flex-direction: column;
    margin: 10px 20px;
    .login-title {
      margin: 20px 0;
      :nth-child(1) {
        font-size: 24px;
      }
      p {
        padding: 10px 0;
        font-size: 14px;
        color: #7c7a7a;
      }
    }
    .form {
      .form-item {
        // border: 1px solid #000;
        border-bottom: 1px solid #cfcece;
        padding: 8px 0;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        .inp {
          display: block;
          border: none;
          outline: none;
          height: 32px;
          font-size: 14px;
          flex: 1;
          background-color: #f6f6f6;
        }
        img {
          width: 94px;
          height: 32px;
        }
        .get-code{
          font-size: 14px;
          color: #dc9b18ce;
        }
      }
    }
    .login-btn{
      text-align: center;
      padding: 12px 0;
      border-radius: 50px;
      margin-top: 40px;
      color: #fff;
      background: linear-gradient(to bottom right, #f7a709, #fd9615);
    }
  }
}
</style>
