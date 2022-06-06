import globalApi from '@/api/globalApi'
export default {
  user:{},
  isLogin:false,
  follower:{},
  getUserInfo() {
    if(!this.isLogin) {
      return {
        nickname:'',
        id:''
      }
    }
    return this.user;
  },
  init() {
    if(!this.isLogin) {
      return {
        nickname:''
      }
    }
    var that = this;
    if(JSON.stringify(this.user) == "{}") {
      globalApi.getUserInfo().then(res => {
        if(res.success) {
          var _data = res.data;
          if(_data.status == '1') {
            that.user = _data.data;
          }
        }
      })
    }
  },
  setUser(user) {
    this.user = user;
  },
  getUserImg() {
    return this.getUserInfo().headImg;
  },
  setIsLogin() {
    this.isLogin = true;
  },
  getFollowList() {
    
  }
}