<template>
  <div class="all-main">
    <div class="index-left">
      <div class="left-info">
        <div class="index-title">个人主页</div>
        <div>
          <el-menu
            :default-active="active"
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
          </el-menu>
        </div>
      </div>
    </div>
    <div class="index-mid">
      <router-view ref="mineRef"></router-view>
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
        url:'/wb/index/u/info',
        name:'我的主页',
        icon:'el-icon-user'
      },
      {
        type:'2',
        url:'/wb/index/u/follow',
        name:'我的关注',
        icon:'el-icon-circle-check'
      },
      {
        type:'3',
        url:'/wb/index/u/fans',
        name:'我的粉丝',
        icon:'el-icon-s-flag'
      },
      {
        type:'4',
        url:'/wb/index/u/like',
        name:'我的赞',
        icon:'el-icon-star-on'
      },
      // {
      //   type:'5',
      //   url:'/wb/index/u/like',
      //   name:'我的管理中心',
      //   icon:'el-icon-setting'
      // }
    ]
  }
  export default {
    data() {
      return {
        textarea:'',
        scope:'公开',
        menu:menu,
        active:'1'
      }
    },
    components:{
    },
    created() {
      var query = this.$route.query;
      this.active = query.type;
      if(this.$route.path == '/wb/index/u' && query.type != null) {
        this.active = query.type;
        this.select(query.type);
      }else if(this.$route.path == '/wb/index/u') {
        this.active = '1';
        this.select('1')
      }
    },
    methods: {
      select(e) {
        var query = this.$route.query;
        query.type = e;
        this.$router.push({
          path:this.menu.list[parseInt(e) - 1].url,
          query:{
            type:query.type,
            p:query.p
          }
        })
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      },
      lazyLoad() {
        this.$refs.mineRef.lazyLoad();
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
</style>