import Vue from "vue"
import Router from "vue-router"
import { constantRouterMap } from "./router.config"

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const router = new Router({
  mode:"hash",
  routes:constantRouterMap
})
// 全局路由守卫，手机端打开转到手机端页面
router.beforeEach((to, from, next) => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  // console.log(to,from,next,navigator.userAgent)
  next(true);
  if(flag){
    next({path:'/mobile/index'});
  }
})