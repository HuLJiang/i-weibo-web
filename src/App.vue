<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  
  .search-box .el-input__inner {
    border-radius: 40px!important;
    background-color: #f0f1f4!important;
  }
</style>
