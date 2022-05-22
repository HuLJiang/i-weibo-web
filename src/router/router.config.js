import Layout from "@/layout/Layout"
import Index from "@/views/index"
import Tv from "@/views/tv"
import Hot from "@/views/hot"
import At from "@/views/at"
import My from "@/views/my"
import Login from "@/views/loginAndRegister"


export const constantRouterMap = [
  {
    path:"/",
    redirect:"/wb",
  },
  {
    path:"/wb",
    name:"layout",
    component:Layout,
    children: [
      {
        path:"/wb/index",
        name:"idnex",
        component:Index
      },
      {
        path:"/wb/tv",
        name:"tv",
        component:Tv
      },
      {
        path:"/wb/hot",
        name:"hot",
        component:Hot
      },
      {
        path:"/wb/at",
        name:"at",
        component:At
      },
      {
        path:"/wb/my",
        name:"my",
        component:My
      },
    ]
  },
  {
    path:"/lag",
    name:"loginAndRegister",
    component:Login
  }
]