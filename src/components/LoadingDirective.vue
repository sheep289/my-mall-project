<template>
  <div class="loading" >
    <!-- 遮罩层 -->
    <div class="loading-mask">
      <!-- 容器 -->
      <div class="loading-container">
        <div class="spinner">
          <!-- 加载动画 -->
          <svg class="spinner-icon" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke-width="4" />
          </svg>
        </div>
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // text: '',
      // visible: false
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  .loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    .loading-container {
        padding: 26px 30px;
        border-radius: 8px;
        width: fit-content;
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
        text-align: center;
      .spinner {
        margin-bottom: 8px;
        .spinner-icon {
          animation: rotate 2s linear infinite;
          width: 32px;
          height: 32px;
        }

        .spinner-icon circle {
          stroke: currentColor;
          stroke-linecap: round;
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
      }
      p{
        font-size: 14px;
      }
    }
  }
}
@keyframes rotate {
  100% { transform: rotate(360deg); }
}
</style>
