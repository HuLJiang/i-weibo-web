import globalApi from '@/api/globalApi'
export default {
  user:{},
  isLogin:false,
  follower:{},
  getUserInfo() {
    if(!this.isLogin) {
      console.log(1)
      return {
        userNickname:''
      }
    }
    var that = this;
    if(JSON.stringify(this.user) == "{}") {
      globalApi.getUserInfo().then(res => {
        if(res.success) {
          var _data = res.data;
          if(_data.status == '1') {
            that.user = _data.data;
            that.getUserInfo();
          }
        }
      })
    }else {
      return this.user;
    }
  },
  returnUser() {
    
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