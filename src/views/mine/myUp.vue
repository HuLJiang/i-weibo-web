<template>
  <div>
    <div v-if="loading">
      <loading></loading>
    </div>
    <work-list 
      v-else 
      :showFollow="true"
      :rows="rows"></work-list>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import loading from '@/components/loading'
  import workList from '@/components/workList'
  export default {
    data() {
      return {
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
      loading,
      workList
    },
    created() {
      this.load();
    },
    methods:{
      load() {
        var that = this;
        baseApi.getLikeWorks(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              _data.rows.forEach(item => {
                item.toTalk = false;
                item.focus = false;
                item.talkMsg = '';
                item.list = [];
              })
              if(that.rows == null || that.rows.length == 0) {
                that.rows = _data.rows;
              }else {
                _data.rows.forEach(item => {
                  that.rows.push(item);
                })
              }
              
            }else {
              that.$message.warning(res.msg);
            }
            that.loading = false;
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
        },3500);
        this.lazy = true;
        this.page.pageNum ++;
        this.load();
      },
      userInteract(item,type) {
        if(type == 0) {
          item.upNum = item.upNum + 1;
        }else if(type == 1) {
          item.talkNum = item.talkNum + 1;
        }
      },
    }
  }
</script>

<style>
</style>