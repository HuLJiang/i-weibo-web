<template>
  <div class="index-main">
    <div id="main-info">
      <router-view ref="loadMore"></router-view>
    </div>
    <div class="index-right">
      <div class="right-info">
        <div class="right-1">
          <div class="hot-search-title">
            <div class="title">
              微博热搜
            </div>
            <div class="refresh" @click="load()">
              <i style="font-size: 16px;position: relative;top: 1px;" class="el-icon-refresh"></i>
              点击刷新
            </div>
          </div>
          <div class="hot-search-body">
            <div class="hot-item" v-for="(item,index) in rows" :key="index">
              <div class="prev-three">{{index + 1}}</div>
              <div class="search-word">
                {{item}}
              </div>
              <div class="hot">
                热
              </div>
            </div>
          </div>
          <div class="to-all-list">
            查看完整榜单
          </div>
        </div>
        <div class="right-2">
          <common-foot></common-foot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonFoot from '@/components/commonFoot'
  import baseApi from '@/api/user/baseApi'
  export default {
    data() {
      return {
        textarea:'',
        scope:'公开',
        rows:[]
      }
    },
    components:{
      commonFoot
    },
    created() {
      this.load();
    },
    methods: {
      load() {
        baseApi.getHotWord().then(res => {
          if(res.success && res.data.status == '1') {
            this.rows = res.data.rows;
          }
        })
      },
      select(e) {
        console.log(e)
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      },
      lazyLoad() {
        this.$refs.loadMore.lazyLoad();
      }
    }
  }
</script>

<style scoped>
  .index-main {
    width: 1122px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  .right-info {
    width: 280px;
    position: fixed;
    top: 70px;
  }
  .right-1 {
    background-color: white;
    padding: 10px 15px 0 15px;
  }
  .hot-search-title {
    height: 40px;
    display: flex;
    line-height: 35px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(200,200,200,0.2);;
  }
  .title {
    font-size: 14px;
  }
  .refresh {
    font-size: 12px;
    color: #939393;
    cursor: pointer;
  }
  .hot-search-body {
    font-size: 12px;
  }
  .hot-item {
    display: flex;
    justify-content: space-between;
    height: 41px;
    border-bottom: 1px solid rgba(200,200,200,0.2);;
  }
  .prev-three {
    font-size: 16px;
    font-weight: 700;
    color: #f26d5f;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-top: 9px;
  }
  .other {
    font-size: 15px;
    color: #ff8200;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-top: 9px;
  }
  .search-word {
    width: 180px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 10px;
  }
  .hot {
    background: rgb(255, 148, 6);
    width: 16px;
    height: 16px;
    text-align: center;
    font-weight: 600;
    color: white;
    border-radius: 4px;
    margin-top: 12px;
  }
  .to-all-list {
    color: #939393;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    cursor: pointer;
  }
  .to-all-list:hover {
    color: darkgray;
  }
  .right-2 {
    background-color: white;
    margin-top: 10px;
    padding: 10px;
    height: 75px;
  }
</style>
