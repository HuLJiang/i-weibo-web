<template>
  <div class="common-head">
    <div class="head-main">
      <div class="head-logo">weibo</div>
      <div class="search-box">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="page.word"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.enter.native="toSearch"
          placeholder="请输入内容">
          <i
            class="el-input__icon el-icon-search"
            slot="prefix">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.nickname }}</div>
          </template>
        </el-autocomplete>
      </div>
      <div class="head-menu">
        <el-menu
          :default-active="active"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000"
          @select="select"
          active-text-color="#ff8200">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-platform"></i>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-opportunity"></i>
          </el-menu-item>
          <el-menu-item index="4">
            <el-badge :value="news" class="item" :hidden="news == 0">
              <i class="el-icon-message"></i>
            </el-badge>
          </el-menu-item>
          <el-menu-item index="5">
            <el-avatar :size="30" :src="user.headImg">
              <img src="../assets/default.gif"/>
            </el-avatar>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="display: flex;margin: 15px 0 0 50px;">
        <el-dropdown
          trigger="click"
          @command="setting">
          <span class="el-dropdown-link">
            <div class="mini-icon">
              <i class="el-icon-s-tools"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">账号设置</el-dropdown-item>
            <el-dropdown-item command="0">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div 
          @click="toShareWork"
          class="mini-icon" 
          style="background-color: #f56d34;color: white;">
          <i class="el-icon-edit-outline"></i>
        </div>
        <div 
          v-if="isAdmin"
          @click="toAdmin"
          class="mini-icon" 
          style="background-color: #f56d34;color: white;">
          <i class="el-icon-user"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalApi from '@/api/globalApi'
  import baseApi from '@/api/user/baseApi'
  import BASE from '@/config/index'
  export default {
    data() {
      return {
        active: '3',
        state:'',
        page:{
          word:'',
          pageNum:1,
          pageSize:5
        },
        path:[
          '/wb/index/follow','/wb/index/tv','/wb/index/hot','/wb/index/msg','/wb/index/u/info'
        ],
        headImg:'',
        user:{},
        webSocket:null,
        news:0,
        isAdmin:false
      }
    },
    created() {
      if(this.$route.query.wd != null) {
        this.page.word = this.$route.query.wd;
      }
      this.active = this.$route.query.p;
      this.checkLogin();
      var that = this;
      setTimeout(() => {
        if(that.userInfo.getUserInfo().role > 1) {
          that.isAdmin = true;
        }
      },2000);
    },
    methods: {
      load() {
        baseApi.getMsg().then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              _data.rows.forEach(item => {
                this.news += item.num;
              })
            }
          }
        })
      },
      select(e) {
        if(e == 4) {
          this.news = 0;
        }
        if(this.$route.path != this.path[parseInt(e) - 1]) {
          var query = this.$route.query;
          var type = query.type == null ? '1' : query.type;
          query.p = e;
          this.$router.push({
            path:this.path[parseInt(e) - 1],
            query:{
              p:e,
              type:type
            }
          });
        }
      },
      querySearch(word,callback) {
        baseApi.seach(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              return callback(_data.rows)
            }
          }
        })
      },
      checkLogin() {
        var that = this;
        if(localStorage.getItem("token") != null && localStorage.getItem("token") != '') {
          globalApi.session().then(res => {
            if(res.success) {
              this.user = this.userInfo.getUserInfo();
              that.load();
              var _data = res.data;
              if(_data.status == '1') {
                that.userInfo.setIsLogin();
                that.userInfo.init();
                setTimeout(() => {
                  that.openSocket(that.userInfo.getUserInfo().id);
                },2000);
                if(that.$route.query.p != null && that.$route.path == '/wb') {
                  that.select(that.$route.query.p);
                }else {
                  if(that.$route.path == '/wb') {
                    that.select('1');
                  }
                }
                
              } else {
                that.$router.push({
                  path:"/autoLogin"
                })
              }
            }
          })
        }else {
          that.$router.push({
            path:"/wb/index/hot/list",
            query:{
              p:3,
              type:1
            }
          })
        }
      },
      openSocket(id) {
        var that = this;
        if('WebSocket' in window) {
          this.webSocket = new WebSocket(BASE.SOCKET + "/" + id);
          var socket = this.webSocket;
          socket.onopen = function() {
            socket.send("连接成功");
          }
          socket.onmessage = function(event) {
            console.log(1);
            that.newInfo(event.data);
          }
          socket.onerror = function() {
            console.log("发生错误");
          }
          socket.onclose = function() {
            console.log("连接以关闭");
          }
          window.onbeforeunload = function () {
              that.closeSocket();
          }
        }
      },
      closeSocket() {
        this.webSocket.close();
      },
      newInfo() {
        this.news ++;
      },
      toShareWork() {
        this.active = '1';
        this.$router.push({
          path:'/wb/index/follow',
          query:{
            p:1
          }
        })
      },
      followedBtn(e) {
        if(e == 1) {
          baseApi.nofollow({userId:this.user.id}).then(res => {
            if(res.success) {
              var _data = res.data;
              if(_data.status == '1') {
                this.$message.success("取关成功");
                this.user.isFollow = '0';
                this.user.fansNum --;
              }else {
                this.$message.warning(_data.msg);
              }
            }
          })
        }
      },
      toAdmin() {
        if(this.userInfo.getUserInfo().role > 1) {
          this.$router.push({
            path:'/admin/index/user'
          })
        }
      },
      setting(e) {
        if(e == 1) {
          this.$router.push({
            path:'/wb/index/u/setting',
            query:{
              type:1,
              p:5
            }
          })
        }else if(e == 0) {
          baseApi.logout().then(res => {
            if(res.success) {
              var _data = res.data;
              if(_data.status == '1') {
                localStorage.removeItem('token');
                this.$router.push({
                  path:'/wb/index/hot/list',
                  query:{
                    p:3,
                    type:1
                  }
                })
              }
            }
          })
        }
      },
      handleSelect(e) {
        var url = '#/wb/index/u/info?p=5&type=1&u=' + e.username;
        window.open(url);
      },
      toSearch() {
        if(this.page.word == '') {
          this.$message.warning("请输入搜索内容");
          return;
        }
        var url = '#/wb/index/search?p=6&type=1&wd=' + this.page.word;
        if(this.$route.path == '/wb/index/search') {
          location.href = url;
          location.reload();
        }else {
          window.open(url);
        }
      }
    }
  }
</script>

<style>
  .common-head {
    height: 60px;
    background-color: white;
    position: fixed;
    width: 100%;
    z-index: 999;
  }
  .head-main {
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
  .head-menu .el-menu--horizontal>.el-menu-item i {
    font-size: 30px!important;
  }
  .el-menu li {
    margin-left: 30px!important;
  }
  .head-menu>.el-menu {
    border-bottom: none!important;
  }
  .head-logo {
    
    text-align: center;
    font-size: 36px;
    line-height: 57px;
    background: url(../assets/logo.png) no-repeat;
    background-size: 100% 100%;
    font-style: italic;
  }
  .search-box {
    margin: 15px 0 0 20px;
  }
  .mini-icon {
    background-color: #e5e6eb;
    width: 30px;
    height: 30px;
    color: black;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    margin-left: 20px;
    cursor: pointer;
  }
  .el-badge__content.is-fixed {
    top: 15px!important;
  }
</style>
