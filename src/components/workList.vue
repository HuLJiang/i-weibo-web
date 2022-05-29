<template>
  <div class="mid-info-2">
    <div
      v-for="(item,index) in rows"
      :key="index"
      style="background-color: white;margin-bottom: 10px;"
    >
      <div
        class="share-card">
        <div>
          <el-avatar :size="60" :src="item.headImg">
            <img src="../assets/default.gif"/>
          </el-avatar>
        </div>
        <div class="share-info">
          <div style="display: flex;justify-content: space-between;">
            <div>
              <div class="work-user-nickname">{{item.userNickname}}</div>
              <div class="work-share-datatime">{{item.createTime}}</div>
            </div>
            <div style="display: flex;">
              <div v-if="showFollow && !isMe(item.userNickname)" class="follow-user-btn">+关注</div>
              <div>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link other-work-setting">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>屏蔽此条微博</el-dropdown-item>
                    <el-dropdown-item>屏蔽该博主</el-dropdown-item>
                    <el-dropdown-item>投诉</el-dropdown-item>
                    <el-dropdown-item>复制该微博地址</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
          <div class="work-content">
            {{item.content}}
          </div>
          <div v-if="item.hasAttaches == '1'" style="margin-top: 10px;">
            <div
              style="display: inline-block;"
              v-for="(v,key) in item.imgs"
              fit="cover"
              :key="key">
              <el-image
                style="width: 120px; height: 120px;margin: 0 15px 10px 0;border-radius: 8px"
                :src="v" 
                :preview-src-list="item.imgs">
              </el-image>
            </div>
          </div>
          <div class="reshare-work" v-if="item.isReshare == '1'">
            <at-user :nickname="item.fromUserNickname" :username="item.fromUsername"></at-user>
            <div>{{item.reshareContent}}</div>
          </div>
          <div class="interaction">
            <div
              v-if="item.shareScope != '2'"
              @click="reshare(item)"
              class="user-in-prev"
              >
              <i class="el-icon-s-promotion"></i>
              <span>{{item.reshareNum}}</span>
            </div>
            <div
              v-if="item.myTalk == '0'"
              @click="talk(item)"
              class="user-in-prev">
              <i class="el-icon-chat-dot-square"></i>
              <span>{{item.talkNum}}</span>
            </div>
            <div
              v-else
              @click="talk(item)"
              class="user-in-next">
              <i class="el-icon-chat-dot-square"></i>
              <span>{{item.talkNum}}</span>
            </div>
            <div
              v-if="item.myUp == '0'"
              @click="up(item)"
              class="user-in-prev">
              <i class="el-icon-star-off"></i>
              <span>{{item.upNum}}</span>
            </div>
            <div
              v-else
              @click="up(item)"
              class="user-in-next">
              <i class="el-icon-star-on"></i>
              <span>{{item.upNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.toTalk">
        <div class="user-talk">
          <el-avatar :size="35" :src="user == null ? '' : user.headImg" style="margin-left: 15px;position: relative;top: 3px;">
            <img src="../assets/default.gif"/>
          </el-avatar>
          <el-input
            :class="{'talk-input':!item.focus,'focus':item.focus}"
            @focus="focusInput(item)"
            @blur="blurInput(item)"
            v-model="talkMsg"
            placeholder="发布你的评论"
            maxlength="200"
          >
          </el-input>
        </div>
        <div style="padding: 10px 35px 10px 35px;">
          <div style="display: flex;justify-content: space-between;">
            <div></div>
            <div class="talk-btn" @click="toTalk(item)">评论</div>
          </div>
          <div class="user-talks">
            <div>
              <el-avatar :size="35" :src="user == null ? '' : user.headImg" style="margin-left: 15px;position: relative;top: 3px;">
                <img src="../assets/default.gif"/>
              </el-avatar>
            </div>
            <div>
              <div>
                <div>
                  <span>afaf:</span>
                  <span>aa</span>
                </div>
                <div>
                  2000-2-2-2-1
                </div>
              </div>
              <div style="padding-left: 10px;">
                <div>
                  <div>
                    <span>afaf:</span>
                    <span>aa</span>
                  </div>
                  <div>
                    2000-2-2-2-1
                  </div>
                </div>
                <div>
                  <div>
                    <span>afaf:</span>
                    <span>aa</span>
                  </div>
                  <div>
                    2000-2-2-2-1
                  </div>
                </div>
                <div>
                  <div>
                    <span>afaf:</span>
                    <span>aa</span>
                  </div>
                  <div>
                    2000-2-2-2-1
                  </div>
                </div>
              </div>
            </div>
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
      showFollow: {
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        user:{},
        canUp:true,
        focus:false,
        talkMsg:''
      }
    },
    created() {
      this.load();
    },
    methods:{
      load() {
        this.user = this.userInfo.getUserInfo();
      },
      reshare() {
        
      },
      talk(item) {
        item.toTalk = !item.toTalk;
        console.log(12312)
        if(!this.canUp) {
          return;
        }
        this.canUp = false;
        var that = this;
        setTimeout(function() {
          that.canUp = true;
        },800)
        
      },
      up(item) {
        if(!this.canUp) {
          return;
        }
        this.canUp = false;
        var that = this;
        setTimeout(function() {
          that.canUp = true;
        },800)
        var param = {
          type:'0',
          workId:item.id,
          toUserId:item.userId,
          toUserNickname:item.userNickname,
          message:''
        }
        console.log(param)
        baseApi.interaction(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              if(item.myUp == '1') {
                item.myUp = '0';
                item.upNum = item.upNum - 1;
              }else {
                item.myUp = '1';
                item.upNum = item.upNum + 1;
              }
            }else {
              that.$message.warning(_data.msg)
            }
          }
        })
      },
      isMe(nickname) {
        var user = this.userInfo.getUserInfo()
        if(user == null || JSON.stringify(user) == '{}') {
          return false;
        }
        return nickname == user.nickname;
      },
      focusInput(item) {
        item.focus = true;
      },
      blurInput(item) {
        item.focus = false;
      },
      toTalk(item) {
        var param = {
          type:'1',
          workId:item.id,
          toUserId:item.userId,
          toUserNickname:item.userNickname,
          message:this.talkMsg
        }
        var that = this;
        baseApi.interaction(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              that.$message.success("评论成功");
            }else {
              that.$message.warning(_data.msg)
            }
          }
        })
      }
    }
  }
</script>

<style>
  .talk-input {
  }
  .talk-input>.el-input__inner {
    border: none!important;
    background-color: #f0f1f4!important;
    border-radius: 8px;
    width: 500px;
    margin-right: 15px;
  }
  .focus>.el-input__inner {
    border: 1px solid #ff8200!important;
    background-color: white!important;
    /* border: none!important; */
    border-radius: 8px;
    width: 500px;
    margin-right: 15px;
  }
  .user-talk {
    display: flex;
    justify-content: space-around;
    /* margin-top: 25px; */
    /* position: relative;
    left: -60px; */
  }
  .user-talk>.el-input {
    /* display: inline-block!important; */
    width: auto!important;
  }
  .talk-btn {
    background: #ff8200;
    color: #fff;
    line-height: 34px;
    width: 68px;
    border-radius: 34px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
  .user-talks {
    border-top: 1px solid rgba(200,200,200,0.2);
    margin-top: 20px;
    display: flex;
  }
</style>