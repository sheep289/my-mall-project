
import Vue from 'vue'
import Loading from '@/components/LoadingDirective'

const loadingDirective = {
  inserted (el, binding) {
    // 将Loading传入全局api extrend里面 最后能够得到loading组件构造函数
    const LoadingCtor = Vue.extend(Loading)
    // new loadingcotr 可以得到整个组件的实例
    const LoadingComp = new LoadingCtor().$mount()
    el.instance = LoadingComp
    if (binding.value) {
      append(el)
    }
  },
  update (el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}
function append (el) {
  el.appendChild(el.instance.$el)
  document.body.style.overflow = 'hidden'
}
function remove (el) {
  el.removeChild(el.instance.$el)
  document.body.style.overflow = 'auto'
}
export default loadingDirective
