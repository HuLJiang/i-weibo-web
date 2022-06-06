<template>
  <div class="at-user" @click="toUserInfo">
    <span v-if="isAt">@</span>
    <span>{{nickname}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      nickname:{
        default:'',
        type:String
      },
      username: {
        default:'',
        type:String
      },
      isAt: {
        default:false,
        type:Boolean
      }
    },
    methods: {
      toUserInfo() {
        if(this.username == null || this.username == '') {
          return;
        }
        var url = '#/wb/index/u/info?p=5&type=1&u=' + this.username;
        window.open(url)
      }
    }
  }
</script>

<style scoped>
  .at-user {
    color: #eb7340;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
    font-size: 12px;
  }
</style>