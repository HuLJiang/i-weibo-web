<template>
  <div>
    <common-head></common-head>
    <div>
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

<style>
</style>
