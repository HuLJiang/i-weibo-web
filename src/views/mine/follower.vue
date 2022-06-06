<template>
  <div>
    <div v-if="loading">
      <loading></loading>
    </div>
    <user-list v-else :rows="rows" :total="total"></user-list>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import loading from '@/components/loading'
  import userList from '@/components/userList'
  export default {
    data() {
      return {
        page:{
          pageNum:1,
          pageSize:10
        },
        rows:[],
        total:0,
        loading:true,
        canLoad:true
      }
    },
    components: {
      userList,
      loading
    },
    created() {
      this.load();
    },
    methods:{
      load() {
        baseApi.getFollowList(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.loading = false;
              this.total = _data.total;
              if(this.rows == null || this.rows.length == 0) {
                this.rows = _data.rows;
              }else {
                _data.rows.forEach(item => {
                  this.rows.push(item);
                })
              }
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
        },3500);
        this.page.pageNum ++;
        if(this.$route.query.u == null) {
          this.load();
        }else {
          this.load2();
        }
      },
    }
  }
</script>

<style>
</style>