<template>
  <div>
    <common-head></common-head>
    <div class="main-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import commonHead from '@/components/commonHead'
  export default {
    data () {
      return {
        
      }
    },
    components:{
      commonHead
    }
  }
</script>

<style scoped="scoped">
  .main-body {
    background-color: #f5f5f5;
  }
</style>
