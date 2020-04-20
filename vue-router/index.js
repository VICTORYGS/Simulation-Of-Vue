var Vue;
/**
 * vue-router插件基本功能模拟实现
 * 引入方式与vue-router一样 通过Vue.use()方式注册
 * 目前支持的api
 Router.afterEach((to, from) => {
})
 Router.beforeEach((to, from,next) => {
  next()
})
 * 基于hashchange事件实现
 * 要实现history模式可以通过popstate事件实现
 */
class VueRouter {
  constructor(opt){
    this.opt=opt
    this.routeMap={}
    this.vm=new Vue({
      data(){
        return{
          currentPath:'/'
        }
      }
    })
    this.beforeEachHandle=new Function;
    this.afterEachHandle=new Function;

    const init=()=> {
      initRouteMap()
      initComponent()
      const hashchangeHandle=e=>{
        const getRouteObjArr=e=>{
          let {oldURL,newURL}=e
          return [oldURL,newURL].map(v=>this.routeMap[new URL(v).hash.slice(1) || "/"])
        }
        const next=()=>{
          this.vm.currentPath=location.hash.slice(1)|| "/"
          this.vm.$nextTick(()=>this.afterEachHandle(...getRouteObjArr(e)))
        }
        this.beforeEachHandle(...getRouteObjArr(e),next)
      }
      window.addEventListener('load',()=>{
        hashchangeHandle({'oldURL':location.href,'newURL':location.href})
      })
      window.addEventListener('hashchange',hashchangeHandle)
    }
    const initRouteMap=()=>{
      this.opt.routes.forEach(v=>{
        this.routeMap[v.path]=v
      })
    }
    const initComponent=()=>{
      Vue.component('router-link',{
        props:{
          to:{
            type:String,
          }
        },
        render(h){
          return h('a',{attrs:{href:`#${this.to}`}},this.$slots.default)
          // jsx 写法
          // return <a href={this.to}>{this.$slots.default}</a>
        }
      })
      // currentPath 的改变将会更新router-view所显示的组件
      Vue.component('router-view',{
        render:h=>h(this.routeMap[this.vm.currentPath].component)
      })
    }
    init()
  }
  beforeEach(fn){
    this.beforeEachHandle=fn
  }
  afterEach(fn){
    this.afterEachHandle=fn
  }
}
VueRouter.install=function (vue) {
  Vue=vue
   Vue.mixin({
     beforeCreate(){
       if(this.$options.router){//只有注入了router的根组件才会执行
         Vue.prototype.$router=this.$options.router
       }
     }
   })
}
export default VueRouter
