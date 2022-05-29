<template>
  <div class="at-user">
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
        this.$router.push({
          path:"",
          query: {
            u:this.username
          }
        })
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
  }
</style>