<template>
  <div id="app">
    <router-view ref="load"></router-view>
    <a v-if="showUp" href="#" class="to-top">
      <i class="el-icon-upload2"></i>
    </a>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      showUp:false
    }
  },
  components: {
  },
  created() {
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
          that.showUp = true;
          for(var i of left) {
            i.style.top = '60px';
          }
          for(var j of right) {
            j.style.top = '60px';
          }
          
        }else {
          that.showUp = false;
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
    }
  }
  
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  .to-top {
    position: fixed;
    right: 50px;
    bottom: 100px;
    text-decoration: none;
    background-color: white;
    color: #939393;
    text-align: center;
    display: block;
    width: 40px;
    line-height: 40px;
    font-size: 20px;
  }
  .to-top:active {
    color: #939393;
  }
  .to-top:link {
    color: #939393;
  }
  .to-top:hover {
    color: #939393;
  }

</style>
