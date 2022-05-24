<template>
  <div class="common-head">
    <div class="head-main">
      <div class="head-logo">weibo</div>
      <div class="search-box">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容">
          <i
            class="el-input__icon el-icon-search"
            slot="prefix">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
      </div>
      <div class="head-menu">
        <el-menu
          :default-active="active"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000"
          @select="select"
          active-text-color="#ff8200">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-platform"></i>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-opportunity"></i>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-message"></i>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-user-solid"></i>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="display: flex;margin: 15px 0 0 50px;">
        <div class="mini-icon">
          <i class="el-icon-s-tools"></i>
        </div>
        <div class="mini-icon" style="background-color: #f56d34;color: white;">
          <i class="el-icon-edit-outline"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: '1',
        state:'',
        a: [
          {
            value: "12",
            address:"123"
          }
        ],
        path:[
          '/wb/index','/wb/hot','/wb/tv','/wb/at','/wb/my'
        ]
      }
    },
    created() {
      if(this.$route.query.p) {
        this.active = this.$route.query.p;
      }
      this.select(this.active);
    },
    methods: {
      select(e) {
        this.active = e;
        if(this.$route.path != this.path[parseInt(e) - 1]) {
          var query = this.$route.query;
          query.p = e;
          this.$router.push({
            path:this.path[parseInt(e) - 1],
            query:query
          });
        }
      },
      querySearch(word,callback) {
        return callback(this.a)
      }
    }
  }
</script>

<style scoped="scoped">
  .common-head {
    height: 57px;
    background-color: white;
  }
  .head-main {
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
  .head-menu .el-menu--horizontal>.el-menu-item i {
    font-size: 30px!important;
  }
  .el-menu li {
    margin-left: 30px!important;
  }
  .head-menu>.el-menu {
    border-bottom: none!important;
  }
  .head-logo {
    
    text-align: center;
    font-size: 36px;
    line-height: 57px;
    background: url(../assets/logo.png) no-repeat;
    background-size: 100% 100%;
    font-style: italic;
  }
  .search-box {
    margin: 15px 0 0 20px;
  }
  .mini-icon {
    background-color: #e5e6eb;
    width: 30px;
    height: 30px;
    color: black;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 18px;
    margin-left: 20px;
    cursor: pointer;
  }
</style>
