<template>
  <div>
    <div class="head-user" v-if="follow && notSearch">
      <div style="cursor: pointer;">关注的人</div>
    </div>
    <div class="list-user">
      <div v-if="notSearch">
        <div v-if="follow" class="all-user">全部关注（{{total}}）</div>
        <div v-else class="all-user">全部粉丝（{{total}}）</div>
        <div v-if="follow && (rows == null || rows.length == 0)" style="line-height: 300px;text-align: center;">
          你还没有关注过用户哦
        </div>
        <div v-if="!follow && (rows == null || rows.length == 0)" style="line-height: 300px;text-align: center;">
          粉丝居然是空的
        </div>
      </div>
      <div style="line-height: 300px;text-align: center;" v-if="!notSearch && rows.length == 0">
        没有找到用户
      </div>
      <div>
        <div 
          v-for="(item,index) in rows"
          :key="index"
          class="user-item">
          <div @click="detail(item)">
            <el-avatar :size="50" :src="item.headImg">
              <img src="../assets/default.gif"/>
            </el-avatar>
          </div>
          <div style="margin-left: 10px;width: 450px;" @click="detail(item)">
            <div class="user-nickname">{{item.nickname}}</div>
            <div class="user-about">
              <span>{{item.about == 'null' || item.about == null || item.about == '' ? '暂无简介' : item.about.slice(0,35)}}</span>
              <span v-if="item.about != null && item.about.length > 35">...</span>
            </div>
          </div>
          <div>
            <div
              @click="followUser(item)"
              v-if="item.isFollow == '0'"
              class="follow-user-btn top">+关注</div>
            <el-dropdown 
              v-else
              @command="followedBtn">
              <span class="el-dropdown-link">
                <div class="follow-user-btn-2 top">
                  已关注
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{key:1,data:item}">取消关注</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  export default {
    props: {
      rows: {
        type:Array,
        default: () => {
          return [];
        }
      },
      follow: {
        type:Boolean,
        default:true
      },
      total: {
        type:Number,
        default:0
      },
      notSearch: {
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      followedBtn(e) {
        var key = e.key;
        var item = e.data;
        if(key == 1) {
          baseApi.nofollow({userId:item.id}).then(res => {
            if(res.success) {
              var _data = res.data;
              if(_data.status == '1') {
                this.$message.success("取关成功");
                item.isFollow = '0';
              }else {
                this.$message.warning(_data.msg);
              }
            }
          })
        }
      },
      detail(item) {
        var url = '#/wb/index/u/info?p=5&u=' + item.username;
        window.open(url);
      },
      followUser(item) {
        console.log(item)
        var param = {
          userId:item.id,
          userNickname:item.nickname
        }
        baseApi.follow(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("关注成功");
              item.isFollow = '1';
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .head-user {
    background-color: white;
    border-radius: 2px;
    font-weight: 700;
    color: #ff8200;
    font-size: 14px;
    line-height: 20px;
    padding: 12px 20px 12px 30px;
  }
  .list-user {
    margin-top: 10px;
    border-radius: 2px;
    background-color: white;
  }
  .all-user {
    background-color: white;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    line-height: 20px;
    padding: 12px 0 12px 30px;
    border-bottom: 1px solid #f9f9f9;
    margin-bottom: 10px;
  }
  .user-item {
    padding: 20px;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    cursor: pointer;
    border-bottom: 1px solid #f9f9f9;
  }
  .user-item:hover {
    background-color: #f2f2f2;
  }
  .user-nickname {
    font-weight: 700;
    white-space: nowrap;
    font-size: 12px;
    margin-top: 8px;
  }
  .user-about {
    color: #939393;
    white-space: nowrap;
    margin-top: 5px;
  }
  .top {
    margin-top: 13px;
  }
</style>