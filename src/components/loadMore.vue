<template>
  <div style="line-height: 100px;text-align: center;">
    <span v-if="load">
      <i style="font-size: 20px;" class="el-icon-loading"></i>
    </span>
    <span style="font-size: 12px;color: #939393;" v-else>没有更多了</span>
  </div>
</template>

<script>
  export default {
    props: {
      load: {
        default:true,
        type:Boolean
      }
    }
  }
</script>

<style>
</style>