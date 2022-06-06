<template>
  <div>
    <el-container>
      <el-header>
        <div style="display: flex;justify-content: space-between;">
          <div>weibo后台管理系统</div>
          <div style="margin-right: 150px;">
            
            <el-dropdown trigger="click" @command="handleCommand">
              <el-avatar :size="40" :src="''" class="head-img">
                <img src="../../assets/default.gif"/>
              </el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                  command="1">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            :default-active="active"
            class="el-menu-vertical-demo"
            @select="select">
            <el-menu-item 
              v-for="(item,index) in menu" 
              :index="item.type"
              :key="index">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu:[
          {
            name:'用户列表',
            url:'/admin/index/user',
            type:'1'
          },
          {
            name:'作品列表',
            url:'/admin/index/work',
            type:'2'
          }
        ],
        active:'1'
      }
    },
    methods:{
      select(e) {
        this.$router.push({
          path:this.menu[parseInt(e) - 1].url
        })
      },
      handleCommand() {
        
      }
    }
  }
</script>

<style>
  .head-img {
    margin-top: 10px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    background-color: #fafafa;
  }
  .el-aside {
    padding-top: 30px;
  }
</style>