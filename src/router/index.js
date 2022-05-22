import Vue from "vue"
import Router from "vue-router"
import { constantRouterMap } from "./router.config"

Vue.use(Router)

export const router = new Router({
  mode:"hash",
  routes:constantRouterMap
})