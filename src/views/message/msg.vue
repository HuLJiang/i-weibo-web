<template>
  <div class="all-main">
    <div class="index-left">
      <div class="left-info">
        <div class="index-title">{{menu.title}}</div>
        <div>
          <el-menu
            :default-active="menu.active"
            class="el-menu-vertical-demo"
            @select="select"
            active-text-color="#ff8200"
            >
            <el-menu-item 
            v-for="(item,index) in menu.list" 
            :index="item.type" 
            :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <!-- <el-menu-item index="1">
              <i class="el-icon-paperclip"></i>
              <span slot="title">@我的</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-chat-dot-round"></i>
              <span slot="title">评论</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-star-on"></i>
              <span slot="title">赞</span>
            </el-menu-item> -->
          </el-menu>
        </div>
      </div>
    </div>
    <div class="index-mid">
      <div class="mid-info-1">
        <div class="share-work">
          <el-input
            class="share-input"
            type="textarea"
            placeholder="有什么新鲜事想分享给大家？"
            v-model="textarea"
            maxlength="200"
          >
          </el-input>
        </div>
        <div style="display: flex;">
          <div class="share-icon" style="margin-left: 20px;">
            <i class="el-icon-picture-outline"></i>
          </div>
          <div class="share-icon">
            <i class="el-icon-paperclip"></i>
          </div>
          <div class="share-scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="cursor: pointer;">
                {{scope}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="setScope(0)">公开</el-dropdown-item>
                <el-dropdown-item @click="setScope(1)">粉丝</el-dropdown-item>
                <el-dropdown-item @click="setScope(2)">仅自己可见</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="share-btn">
            发送
          </div>
        </div>
      </div>
      <div class="mid-info-2">
        <div class="share-card">
          <div>
            <el-avatar :size="60" src="https://empty">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </div>
          <div class="share-info">
            <div style="display: flex;justify-content: space-between;">
              <div>
                <div class="work-user-nickname">测试用户</div>
                <div class="work-share-datatime">2000-20-20 10:10</div>
              </div>
              <div style="display: flex;">
                <div class="follow-user-btn">+关注</div>
                <div>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link other-work-setting">
                      <i class="el-icon-arrow-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="setScope(0)">公开</el-dropdown-item>
                      <el-dropdown-item @click="setScope(1)">粉丝</el-dropdown-item>
                      <el-dropdown-item @click="setScope(2)">仅自己可见</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
            <div class="work-content">
              12312
            </div>
            <div class="reshare-work">
              <at-user :nickname="'1231'" :username="'aaa'"></at-user>
              <div>正文正文</div>
            </div>
            <div class="interaction">
              <div>
                <i class="el-icon-s-promotion"></i>
                <span>123</span>
              </div>
              <div>
                <i class="el-icon-chat-dot-square"></i>
                <span>123</span>
              </div>
              <div>
                <i class="el-icon-star-off"></i>
                <span>123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const menu = {
    title:'消息',
    active:'1',
    list: [
      {
        type:'1',
        url:'',
        name:'@我的',
        icon:'el-icon-paperclip'
      },
      {
        type:'2',
        url:'',
        name:'评论',
        icon:'el-icon-chat-dot-round'
      },
      {
        type:'3',
        url:'',
        name:'赞',
        icon:'el-icon-star-on'
      }
    ]
  }
  export default {
    data() {
      return {
        textarea:'',
        scope:'公开',
        menu:menu
      }
    },
    components:{
    },
    methods: {
      select(e) {
        console.log(e)
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
</style>