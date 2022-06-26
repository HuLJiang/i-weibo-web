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
              <div v-if="item.num != 0" class="num">{{item.num}}</div>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="index-mid">
      <div>
        <router-view ref="msgLazy"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  const menu = {
    title:'消息',
    active:'1',
    list: [
      // {
      //   type:'1',
      //   url:'/wb/index/msg/at',
      //   name:'@我的',
      //   icon:'el-icon-paperclip',
      //   num:0
      // },
      {
        type:'1',
        url:'/wb/index/msg/talk',
        name:'评论',
        icon:'el-icon-chat-dot-round',
        num:0
      },
      {
        type:'2',
        url:'/wb/index/msg/like',
        name:'赞',
        icon:'el-icon-star-on',
        num:0
      }
    ]
  }
  export default {
    data() {
      return {
        menu:menu
      }
    },
    components:{
    },
    created() {
      if(this.$route.query.type != null) {
        this.menu.active = this.$route.query.type
      }
      var path = this.$route.path;
      if(path == '/wb/index/msg') {
        if(this.$route.query.type != null) {
          this.select(this.$route.query.type);
        }else {
          this.select('1')
        }
      }
      this.load();
    },
    methods: {
      load() {
        baseApi.getMsg().then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              _data.rows.forEach(item => {
                if(item.type == 0) {
                  this.menu.list[1].num = item.num
                }else {
                  this.menu.list[0].num = item.num;
                }
              })
            }
          }
        })
      },
      select(e) {
        if(e == '1') {
          this.read('1',e);
        }else {
          this.read('0',e)
        }
        this.$router.push({
          path:this.menu.list[parseInt(e) - 1].url,
          query:{
            type:e,
            p:4
          }
        })
      },
      read(type,e) {
        baseApi.readMessage({type:type}).then(res => {
          if(res.success && res.data.status == '1') {
            this.menu.list[parseInt(e) - 1].num = 0;
          }
        })
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      },
      lazyLoad() {
        this.$refs.msgLazy.lazyLoad();
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
  .num {
    line-height: 13px;
    padding: 1px 3px 1px 3px;
    border-radius: 13px;
    color: white;
    font-size: 12px;
    background-color: #ff2026;
    display: inline-block;
    float: right;
    margin-top: 20px;
  }
</style>