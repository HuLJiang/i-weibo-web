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
            <el-menu-item v-for="(item,index) in menu.list" :index="item.type" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="index-mid">
      <div style="background-color: white;">
        <div v-if="loading">
          <loading></loading>
        </div>
        <user-list
          :notSearch="false"
          :rows="rows">
        </user-list>
      </div>
      <!-- <div v-if="lazy" style="line-height: 50px;text-align: center">
        <i class="el-icon-loading"></i>
        加载中
      </div> -->
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import loading from '@/components/loading'
  import userList from '@/components/userList'
  const menu = {
    title:'搜索结果',
    active:'1',
    list: [
      {
        type:'1',
        url:'',
        name:'用户',
        icon:'el-icon-user-solid'
      }
    ]
  }
  export default {
    data() {
      return {
        menu:menu,
        loading:true,
        lazy:false,
        canLoad:true,
        rows:[],
        page:{
          word:'',
          pageNum:1,
          pageSize:10
        }
      }
    },
    components:{
      loading,
      userList
    },
    created() {
      this.page.word = this.$route.query.wd;
      this.load();
    },
    mounted() {
    },
    methods: {
      load() {
        var that = this;
        baseApi.seach(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              if(that.rows.length == 0) {
                that.rows = _data.rows;
              } else {
                _data.rows.forEach(item => {
                  that.rows.push(item);
                })
              }
              that.loading = false;
              that.lazy = false;
            }else {
              that.$message.warning(_data.msg);
            }
          }
        })
      },
      lazyLoad() {
        if(!this.canLoad) {
          return;
        }
        this.canLoad = false;
        setTimeout(() => {
          this.canLoad = true;
        },1000);
        this.lazy = true;
        this.page.pageNum ++;
        this.load();
      },
      select() {
        
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
    
</style>