<template>
  <transition name="fade">
    <!-- 遮罩层 -->
    <div class="modal-mask" v-show="visible" @click.self="handleWrapperClick">
      <!-- 弹窗容器 -->
      <div class="modal-container">
        <!-- 标题 -->
        <div class="modal-header" v-if="title">{{ title }}</div>
        <!-- 内容 可以插槽 -->
        <div class="modal-content">
          <slot>{{ message }}</slot>
        </div>
        <!-- 操作按钮 -->
        <div class="modal-footer">
          <button
            v-if="showCancelButton"
            class="modal-cancel"
            @click="handleAction('cancel')"
          >
            {{ cancelBtnText }}
          </button>
          <button
            class="modal-confirm"
            :style="{ color: confirmButtonColor }"
            @click="handleAction('confirm')"
          >
            {{ confirmBtnText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VueDialog',
  props: {
    title: String,
    message: String,
    confirmBtnText: {
      type: String,
      default: '确认'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmButtonColor: {
      type: String,
      default: '#1989fa'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false, // 显示状态控制
      resolve: null,
      reject: null
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
      setTimeout(() => {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }, 200)
    },
    handleAction (action) {
      action === 'confirm' ? this.resolve?.() : this.reject?.()
      this.hide()
    },
    handleWrapperClick () {
      this.closeOnClickModal && this.handleAction('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
/* 遮罩层 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;

  // 容器
  .modal-container {
    width: 320px;
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    font-size: 16px;

    .modal-header {
      padding: 24px 16px 0;
      font-weight: 500;
      line-height: 24px;
      text-align: center;
    }

    .modal-content {
      padding: 16px;
      text-align: center;
    }

    .modal-footer {
      display: flex;
      height: 48px;
      line-height: 48px;
    }

    .modal-confirm,
    .modal-cancel {
      flex: 1;
      margin: 0;
      border: 0;
      background: none;
      cursor: pointer;
    }

    .modal-confirm:active,
    .modal-cancel:active {
      background-color: #f2f3f5;
    }

    .modal-cancel {
      border-right: 1px solid #ebedf0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
