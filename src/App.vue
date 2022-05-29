<template>
  <div id="app">
    <router-view ref="load"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    this.setTop();
  },
  methods: {
    setTop() {
      var that = this;
      document.addEventListener('scroll',function() {
        var left = document.getElementsByClassName("left-info");
        var right = document.getElementsByClassName("right-info");
        if(window.scrollY > 60) {
          for(var i of left) {
            i.style.top = '60px';
          }
          for(var j of right) {
            j.style.top = '60px';
          }
          
        }else {
          for(var l of left) {
            l.style.top = '70px';
          }
          for(var r of right) {
            r.style.top = '70px';
          }
        }
        if(document.getElementById('app').offsetHeight == window.scrollY + window.innerHeight) {
          that.$refs.load.lazyLoad();
        }
      })
    },
    checkLogin() {
      if(localStorage.getItem("token") != null || localStorage.getItem("token") != '') {
        // this.userInfo.setIsLogin();
        // this.userInfo.getUserInfo();
      }
    }
  }
  
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  

</style>
