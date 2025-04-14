<template>
  <transition name="van-fade">
    <div class="van-modal" v-show="visible" @click.self="handleWrapperClick">
      <div class="van-dialog">
        <div class="van-dialog__header" v-if="title">{{ title }}</div>
        <div class="van-dialog__content">
          <slot>{{ message }}</slot>
        </div>
        <div class="van-dialog__footer">
          <button
            v-if="showCancelButton"
            class="van-dialog__cancel"
            @click="handleAction('cancel')"
          >
            {{ cancelBtnText }}
          </button>
          <button
            class="van-dialog__confirm"
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
      visible: false,
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

<style scoped>
.van-modal {
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
}

.van-dialog {
  width: 320px;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  font-size: 16px;
}

.van-dialog__header {
  padding: 24px 16px 0;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
}

.van-dialog__content {
  padding: 16px;
  text-align: center;
}

.van-dialog__footer {
  display: flex;
  height: 48px;
  line-height: 48px;
}

.van-dialog__confirm,
.van-dialog__cancel {
  flex: 1;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.van-dialog__confirm:active,
.van-dialog__cancel:active {
  background-color: #f2f3f5;
}

.van-dialog__cancel {
  border-right: 1px solid #ebedf0;
}

.van-fade-enter-active,
.van-fade-leave-active {
  transition: opacity 0.3s;
}

.van-fade-enter,
.van-fade-leave-to {
  opacity: 0;
}
</style>
