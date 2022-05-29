import Layout from "@/layout/Layout"
import Index from "@/views/index"
import Follow from "@/views/home/myFollow"
import Tv from "@/views/tv"
import HotWork from "@/views/hot/hotWork"
import At from "@/views/message/msg"
import My from "@/views/mine/mine"
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
        component:Index,
        children:[
          {
            path:"/wb/index/follow",
            name:'follow',
            component:Follow
          },
          {
            path:"/wb/index/hot",
            name:'hot',
            component:HotWork
          },
          {
            path:"/wb/index/tv",
            name:'tv',
            component:Tv
          },
          {
            path:"/wb/index/msg",
            name:'At',
            component:At
          },
          {
            path:"/wb/index/mine",
            name:'My',
            component:My
          },
        ]
      }
    ]
  },
  {
    path:"/lag",
    name:"loginAndRegister",
    component:Login
  }
]