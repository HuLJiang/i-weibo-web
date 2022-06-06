<template>
  <div>
    <div class="head-info">
      <div class="head-info-1">
        <div class="user-info-head">
          <el-image
            style="width: 100px; height: 100px;border-radius: 100px"
            :src="user.headImg" 
            fit="cover"
            :preview-src-list="[user.headImg]">
            <div slot="error" class="image-slot">
              <img width="100" height="100" src="../../assets/default.gif"/>
            </div>
          </el-image>
        </div>
        <div class="user-name">
          <div style="display: flex;justify-content: space-between;width: 470px;">
            <div>
              <div class="user-name-1">{{user.nickname}}</div>
              <div class="user-name-2">
                <span>粉丝</span>
                <span class="follow-val">{{user.fansNum}}</span>
                <span style="margin-left: 10px;">关注</span>
                <span class="follow-val">{{user.followNum}}</span>
              </div>
            </div>
            <div></div>
            <div v-if="user.isMe == '0'" style="display: flex;">
              <div>
                <div 
                  v-if="user.isFollow == '0'" 
                  @click="follow"
                  class="follow-user-btn">
                  + 关注
                </div>
                <el-dropdown v-else @command="followedBtn">
                  <span class="el-dropdown-link">
                    <div class="follow-user-btn-2">
                      已关注
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">取消关注</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div style="margin-left: 10px;">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <div class="report-user">
                      <i class="el-icon-more"></i>
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">
                      <span v-if="user.isBlack == '1'">取消黑名单</span>
                      <span v-else>加入黑名单</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="2">投诉</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="head-info-2">
        <div class="info-item">
          <span>
            <i class="el-icon-document"></i>
          </span>
          <span class="info-v">{{user.about == null || user.about == ''? '暂无简介' : user.about}}</span>
        </div>
        <div class="info-item">
          <span>
            <i class="el-icon-date"></i>
          </span>
          <span class="info-v">
            {{user.creatTime}}
          </span>
          <span>加入微博</span>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 10px;font-size: 14px;background-color: none;">
      全部微博（{{user.allNum}}）
    </div>
    <div>
      <loading v-if="loading"></loading>
      <work-list v-else :rows="rows"></work-list>
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import globalApi from '@/api/globalApi'
  import workList from '@/components/workList'
  import loading from '@/components/loading'
  export default {
    data() {
      return {
        page:{
          pageNum:1,
          pageSize:10,
          username:''
        },
        rows:[],
        canLoad:true,
        noMore:false,
        loading:true,
        user:{},
      }
    },
    components: {
      workList,
      loading
    },
    created() {
      this.user = this.userInfo.getUserInfo();
      if(this.$route.query.u == null) {
        this.load();
        this.getUserInfo();
      }else {
        this.page.username = this.$route.query.u;
        this.load2();
        this.getUserInfo2()
      }
    },
    methods:{
      load() {
        globalApi.getUserInfo().then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.user = _data.data;
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      },
      getUserInfo() {
        baseApi.getMyWorkList(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.loading = false;
              if(this.rows == null || this.rows.length == 0) {
                this.rows = _data.rows;
              }else {
                _data.rows.forEach(item => {
                  this.rows.push(item);
                })
              }
            }
          }
        })
      },
      load2() {
        baseApi.getUserWorkList(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.loading = false;
              if(this.rows == null || this.rows.length == 0) {
                this.rows = _data.rows;
              }else {
                _data.rows.forEach(item => {
                  this.rows.push(item);
                })
              }
            }
          }
        })
      },
      getUserInfo2() {
        baseApi.getOneInfo({u:this.page.username}).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.user = _data.data;
            }else {
              this.$message.warning(_data.msg);
              this.$router.push({
                path:"/wb/index/hot/list",
                query:{
                  p:3
                }
              })
            }
          }
        })
      },
      lazyLoad() {
        if(!this.canLoad) {
          return;
        }
        this.canLoad = false;
        setTimeout(() => {
          this.canLoad = true;
        },3500);
        this.page.pageNum ++;
        if(this.$route.query.u == null) {
          this.load();
        }else {
          this.load2();
        }
      },
      follow() {
        var user = this.user;
        var param = {
          userId:user.id,
          userNickname:user.nickname
        }
        baseApi.follow(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("关注成功");
              user.isFollow = '1';
              this.user.fansNum ++;
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      },
      followedBtn(e) {
        if(e == 1) {
          baseApi.nofollow({userId:this.user.id}).then(res => {
            if(res.success) {
              var _data = res.data;
              if(_data.status == '1') {
                this.$message.success("取关成功");
                this.user.isFollow = '0';
                this.user.fansNum --;
              }else {
                this.$message.warning(_data.msg);
              }
            }
          })
        }
      },
      report(data) {
        var that = this;
        this.$prompt('请输入投诉内容', '投诉', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '投诉内容不能为空'
        }).then(({ value }) => {
          baseApi.reportUser({userId:data.id,reason:value}).then(res => {
            if(res.success) {
              var _data = res.data;
              if(_data.status == '1') {
                that.$message.success("投诉成功")
              }
            }
          })
        })
      },
      handleCommand(e) {
        if(e == '2') {
          this.report(this.user)
        }
        if(e == '1') {
          this.black();
        }
      },
      black() {
        baseApi.black({id:this.user.id,type:'0'}).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("操作成功");
              if(this.user.isBlack == '0') {
                this.user.isBlack = '1';
              }else {
                this.user.isBlack = '0';
              }
            }else {
              this.$message.warning(_data.msg)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .head-info {
    background-color: white;
    padding: 20px 20px 20px 30px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .head-info-1 {
  }
  .user-info-head {
    display: inline-block;
  }
  .user-name {
    display: inline-block;
    line-height: 20px;
    position: relative;
    top: -40px;
    margin-left: 10px;
    
  }
  .user-name-1 {
    font-size: 16px;
    font-weight: 600;
  }
  .user-name-2 {
    font-size: 12px;
    color: #939393;
  }
  .report-user {
    width: 30px;
    line-height: 30px;
    border-radius: 30px;
    border: 1px solid #333;
    text-align: center;
    cursor: pointer;
    position: relative;
    top: -3px;
  }
  .follow-val {
    color: black;
    font-size: 14px;
    margin-left: 5px;
  }
  .head-info-2 {
    line-height: 16px;
    font-size: 12px;
    color: #939393;
    padding-left: 5px;
  }
  .info-item {
    margin-bottom: 10px;
  }
  .info-v {
    margin-left: 10px;
  }
</style>