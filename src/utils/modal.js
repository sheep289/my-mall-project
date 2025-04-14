import Vue from 'vue'
import ModalComponent from '@/components/Modal.vue'

const Modal = (options = {}) => {
  const instance = new (Vue.extend(ModalComponent))({
    propsData: options
  })

  return new Promise((resolve, reject) => {
    instance.resolve = resolve
    instance.reject = reject

    const el = document.createElement('div')
    document.body.appendChild(el)
    instance.$mount(el)
    instance.show()
  })
}

// 创建快捷方法
const createMethod = (type) => (options) => {
  return Modal({
    ...options,
    showCancelButton: type === 'confirm'
  })
}

export default {
  install () {
    Vue.prototype.$modal = {
      alert: createMethod('alert'),
      confirm: createMethod('confirm')
    }
  }
}
