<template>
</template>

<script>
  export default {
    data() {
      return {
        textarea:'',
        scope:'公开'
      }
    },
    components:{
    },
    methods: {
      select(e) {
        console.log(e)
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      }
    }
  }
</script>

<style>
</style>