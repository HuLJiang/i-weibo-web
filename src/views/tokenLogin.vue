<template>
  <div>
    正在登录...
  </div>
</template>

<script>
  import globalApi from '@/api/globalApi'
  export default {
    created() {
      this.load();
    },
    methods: {
      load() {
        var that = this;
        globalApi.tokenLogin().then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              setTimeout(() => {
                that.$router.push({
                  path:'/wb/index/follow',
                  query:{
                    p:1
                  }
                })
              },800);
            }else {
              that.$message.warning('用户信息过期，请重新登录');
              that.$router.push({
                path:'/lag'
              })
            }
          }
        })
        
      },
      
    }
  }
</script>

<style>
</style>