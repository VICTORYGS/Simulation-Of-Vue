import toast from './index.vue'
/**
 * Usage:
 *In main.js
 import Toast from '@/plugins/Toast'
 Vue.use(Toast)
 *
 * this.$hideToast()
 * this.$showToast({
          title: 'tip',
          content: 'hello World',
          confirm() {
            //...
          },
          cancel() {
            //...
          },
        })
 */
function Toast(Vue) {
  let toastVm, id = 'andyToast', createNode = () => {
    if (document.querySelector('#' + id)) return;
    let newNode = document.createElement('div')
    newNode.setAttribute("id", id)
    document.body.appendChild(newNode)
  }
  this.$showToast = props => {
    createNode()
    props.confirm = cbAdd(props.confirm)
    props.cancel = cbAdd(props.cancel)
    toastVm=new Vue({
      render: h => {
        return h(toast, {attrs: props})
      },
    }).$mount('#' + id)
    toastVm.$el.setAttribute("id", id)
  }
  this.$hideToast = () => {
    if (!toastVm) return;
    document.body.removeChild(toastVm.$el)
    toastVm.$destroy()
    toastVm=null
  }
  const cbAdd = fn => typeof fn === 'function' ? () => {
    fn()
    this.$hideToast()
  } : () => {
    this.$hideToast()
  }
}
Toast.install=function (Vue) {
  Object.assign(Vue.prototype,new Toast(Vue))
}
export default Toast
