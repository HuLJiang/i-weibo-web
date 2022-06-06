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
          </el-menu>
        </div>
      </div>
    </div>
    <div class="index-mid">
      <!-- <div v-if="loading">
        <loading></loading>
      </div>
      <work-list 
        v-else 
        :showFollow="true"
        :rows="rows"></work-list> -->
        <router-view ref="lazyLoad"></router-view>
    </div>
  </div>
</template>

<script>
  const menu = {
    title:'热门',
    active:'1',
    list: [
      {
        type:'1',
        url:'',
        name:'热门微博',
        icon:'el-icon-s-opportunity'
      },
      {
        type:'2',
        url:'',
        name:'热搜榜',
        icon:'el-icon-search'
      }
    ]
  }
  export default {
    data() {
      return {
        textarea:'',
        scope:'公开',
        menu:menu,
        page:{
          pageNum:1,
          pageSize:10
        },
        rows:[],
        loading:true,
        canLoad:true
      }
    },
    components:{
      // loading,
      // workList
    },
    created() {
    },
    methods: {
      select(e) {
        console.log(e)
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      },
      getTime(date) {
        console.log(typeof date)
        return this.$date.formatDateTime(date,'yyyy-mm-dd HH:mm:ss');
      },
      userInteract(item,type) {
        if(type == 0) {
          item.upNum = item.upNum + 1;
        }else if(type == 1) {
          item.talkNum = item.talkNum + 1;
        }
      },
      lazyLoad() {
        this.$refs.lazyLoad.lazyLoad();
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
</style>