import Layout from "@/layout/Layout"
import Index from "@/views/index"
import Follow from "@/views/home/myFollow"
import Tv from "@/views/tv"
import HotWork from "@/views/hot/hotWork"
import HotWorkList from "@/views/hot/hotList"
import WorkDetail from "@/views/hot/workDetail"
import My from "@/views/mine/mine"
import MyInfo from "@/views/mine/info"
import Like from "@/views/mine/myUp"
import Follower from "@/views/mine/follower"
import Fans from "@/views/mine/fans"
import Setting from "@/views/mine/setting"
import Search from "@/views/search/search"
import Login from "@/views/loginAndRegister"
import tokenLogin from "@/views/tokenLogin"
import Admin from "@/views/admin/index"
import UserList from "@/views/admin/list/user"
import WorkList from "@/views/admin/list/work"
import Mobile from "@/views/mobile/index"


import At from "@/views/message/msg"
import LikeMe from "@/views/message/likeMeWork"
import AtMe from "@/views/message/atMe"
import Talk from "@/views/message/talk"


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
            path:"/wb/index/search",
            name:'search',
            component:Search
          },
          {
            path:"/wb/index/hot",
            name:'hot',
            redirect:"/wb/index/hot/list",
            component:HotWork,
            children: [
              {
                path:"/wb/index/hot/list",
                name:"hotlist",
                component:HotWorkList
              },
              {
                path:"/wb/index/workDetail",
                name:"workDetail",
                component:WorkDetail
              }
            ]
          },
          {
            path:"/wb/index/tv",
            name:'tv',
            component:Tv,
          },
          {
            path:"/wb/index/msg",
            name:'At',
            component:At,
            children:[
              {
                path:"/wb/index/msg/at",
                name:'at',
                component:AtMe,
              },
              {
                path:"/wb/index/msg/like",
                name:'likeMe',
                component:LikeMe,
              },
              {
                path:"/wb/index/msg/talk",
                name:'talk',
                component:Talk,
              },
            ]
          },
          {
            path:"/wb/index/u",
            name:'My',
            component:My,
            children:[
              {
                path:"/wb/index/u/info",
                name:"myInfo",
                component:MyInfo
              },
              {
                path:"/wb/index/u/like",
                name:"like",
                component:Like
              },
              {
                path:"/wb/index/u/follow",
                name:"follow",
                component:Follower
              },
              {
                path:"/wb/index/u/fans",
                name:"fans",
                component:Fans
              },
              {
                path:"/wb/index/u/setting",
                name:"setting",
                component:Setting
              }
            ]
          },
        ]
      }
    ]
  },
  {
    path:"/autoLogin",
    name:"autoLogin",
    component:tokenLogin
  },
  {
    path:"/lag",
    name:"loginAndRegister",
    component:Login
  },
  {
    path:"/admin/index",
    name:"admin",
    component:Admin,
    children:[
      {
        path:"/admin/index/user",
        name:"user",
        component:UserList,
      },
      {
        path:"/admin/index/work",
        name:"work",
        component:WorkList,
      }
    ]
  },
  {
    path:"/mobile/index",
    name:"mobile",
    component:Mobile,
    beforeEnter:(to,from,next) => {
      //电脑打开手机端拦截回电脑端
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      next(true)
      if(!flag) {
        next({path:'/'})
      }
    }
    
  }
]