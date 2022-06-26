<template>
  <div class="mid-info-2">
    <div
      style="background-color: white;margin-bottom: 10px;"
    >
      <div
        class="share-card">
        <div>
          <el-avatar :size="60" :src="item.headImg">
            <img src="../../assets/default.gif"/>
          </el-avatar>
        </div>
        <div class="share-info">
          <div style="display: flex;justify-content: space-between;">
            <div>
              <div class="work-user-nickname" @click="toUser">{{item.userNickname}}</div>
              <div class="work-share-datatime">{{item.createTime}}</div>
              <span style="color: #939393;font-size: 12px;" v-if="item.shareScope == '2' && item.isMe == '1'">
                <i class="el-icon-lock"></i>
                仅自己可见
              </span>
              <span style="color: #939393;font-size: 12px;" v-else-if="item.shareScope == '1' && item.isMe == '1'">
                <i class="el-icon-lock"></i>
                仅粉丝可见
              </span>
            </div>
            <div style="display: flex;">
              <div 
                v-if="item.isMe == '0' && item.isFollow == '0'" 
                @click="follow(item)"
                class="follow-user-btn">+关注</div>
              <div>
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link other-work-setting">
                    <i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item 
                      :command="{key:1,data:item}"
                      v-if="item.isMe == '0'">屏蔽此条微博</el-dropdown-item>
                    <el-dropdown-item 
                      :command="{key:2,data:item}"
                      v-if="item.isMe == '0'">屏蔽该博主</el-dropdown-item>
                    <el-dropdown-item 
                      :command="{key:3,data:item}"
                      v-if="item.isMe == '0'">投诉</el-dropdown-item>
                    <el-dropdown-item 
                      :command="{key:4,data:item}"
                      v-if="item.isMe == '1' && item.shareScope != '0'">转为公开</el-dropdown-item>
                    <el-dropdown-item 
                      :command="{key:5,data:item}"
                      v-if="item.isMe == '1' && item.shareScope != '1'">转为粉丝可见</el-dropdown-item>
                    <el-dropdown-item 
                      :command="{key:6,data:item}"
                      v-if="item.isMe == '1' && item.shareScope != '2'">转为自己可见</el-dropdown-item>
                    <el-dropdown-item
                      :command="{key:7,data:item}"
                      @click="copyWoriUrl(item.id)"
                      >复制该微博地址</el-dropdown-item>
                    <el-dropdown-item 
                      :command="{key:8,data:item}"
                      v-if="item.isMe == '1'">删除</el-dropdown-item>
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
              v-if="item.myUp == null || item.myTalk == '0'"
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
              v-if="item.myUp == null || item.myUp == '0'"
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
      <div>
        <div class="user-talk">
          <el-avatar :size="35" :src="user == null ? '' : user.headImg" style="margin-left: 15px;position: relative;top: 3px;">
            <img src="../../assets/default.gif"/>
          </el-avatar>
          <el-input
            class="talk-input"
            v-model="message"
            :autofocus="true"
            placeholder="发布你的评论"
            maxlength="200"
          >
          </el-input>
        </div>
        <div style="padding: 10px 35px 10px 35px;">
          <div style="display: flex;justify-content: space-between;">
            <div></div>
            <div class="talk-btn" @click="toTalk()">评论</div>
          </div>
          <div class="user-talks">
            <div 
              v-for="(k,key) in talks"
              :key="key"
              class="talk-template">
              <div
                class="first-level">
                <el-avatar :size="35" :src="user == null ? '' : user.headImg" style="margin-left: 15px;position: relative;top: 3px;">
                  <img src="../../assets/default.gif"/>
                </el-avatar>
              </div>
              <div class="first-level-u">
                <div>
                  <div>
                    <at-user :nickname="k.userNickname" :username="k.username"></at-user>
                    <span>：</span>
                    <span class="talk-msg">{{k.message}}</span>
                  </div>
                  <div class="talk-time">
                    <div>{{k.createTime}}</div>
                    <div class="reply-talk" @click="showReplyBox(k,key)">
                      <i class="el-icon-chat-dot-square"></i>
                    </div>
                  </div>
                </div>
                <div class="second-level-talk">
                  <div
                    v-for="(t,c) in k.list"
                    :key="c">
                    <div>
                      <at-user :nickname="t.userNickname" :username="t.username"></at-user>
                      <span>：</span>
                      <span v-if="t.level == '2'">回复</span>
                      <at-user 
                        v-if="t.level == '2'" 
                        :isAt="true" 
                        :nickname="t.toUserNickname" 
                        :username="t.username"></at-user>
                      <span v-if="t.level == '2'">：</span>
                      <span class="talk-msg">{{t.message}}</span>
                    </div>
                    <div class="talk-time">
                      <div>{{t.createTime}}</div>
                      <div class="reply-talk" @click="showReplyBox(t,key)">
                        <i class="el-icon-chat-dot-square"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="second-level-talk" v-if="k.talkCnt != null && k.talkCnt != '0'">
                  <div class="show-more-talk" @click="showDetailTalk(item,k)">
                    <span>共</span>
                    <span>{{k.talkCnt}}</span>
                    <span>条回复</span>
                    <span>
                      <i class="el-icon-caret-bottom"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户评论弹出框 -->
    <el-dialog
      :title="talkNum + '条回复'"
      :visible.sync="talkIsShow"
      custom-class="talk-dialog"
      >
      <div class="user-talks-for-dialog" v-infinite-scroll="loadMore">
        <div class="talk-template">
          <div
            class="first-level">
            <el-avatar :size="35" :src="showUser.headImg" style="margin-left: 15px;position: relative;top: 3px;">
              <img src="../../assets/default.gif"/>
            </el-avatar>
          </div>
          <div class="first-level-u">
            <div>
              <div>
                <at-user :nickname="showUser.userNickname" :username="showUser.username"></at-user>
                <span>：</span>
                <span class="talk-msg">{{showUser.message}}</span>
              </div>
              <div class="talk-time">
                <div>{{showUser.createTime}}</div>
                <div class="reply-talk" @click="showReplyBox(showUser)">
                  <i class="el-icon-chat-dot-square"></i>
                </div>
              </div>
            </div>
            <div class="second-level-talk">
              <div
                v-for="(item,index) in showTalks"
                :key="index">
                <div>
                  <at-user :nickname="item.userNickname" :username="item.username"></at-user>
                  <span>：</span>
                  <span v-if="item.level == '2'">回复</span>
                  <at-user 
                    v-if="item.level == '2'" 
                    :isAt="true" 
                    :nickname="item.toUserNickname"
                    :username="item.username"></at-user>
                  <span v-if="item.level == '2'">：</span>
                  <span class="talk-msg">{{item.message}}</span>
                </div>
                <div class="talk-time">
                  <div>{{item.createTime}}</div>
                  <div class="reply-talk" @click="showReplyBox(item)">
                    <i class="el-icon-chat-dot-square"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <load-more v-if="talkInfo.isLoad" :load="talkInfo.more"></load-more>
      </div>
    </el-dialog>
    <el-dialog
      :title="'回复@' + replyUser.userNickname"
      :visible.sync="replyIsShow"
      custom-class="talk-send-dialog">
      <div class="share-work">
        <el-input
          class="share-input"
          type="textarea"
          placeholder="发布您的回复"
          :autofocus="true"
          v-model="replyMessage"
          maxlength="200"
        >
        </el-input>
      </div>
      <div style="display: flex;justify-content: space-between;">
        <div></div>
        <div class="talk-btn" style="margin-right: 20px;" @click="reply">回复</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import atUser from '@/components/atUser'
  import loadMore from '@/components/loadMore'
  import BASE from '@/config/index'
  export default {
    data() {
      return {
        workId:'',
        item:{},
        user:{},
        canUp:true,
        focus:false,
        talkMsg:'',
        talkIsShow:false,
        talkNum:0,
        showUser:{},
        showTalks:[],
        replyUser:{},
        replyIsShow:false,
        replyMessage:'',
        now:{
          first:0,
          second:0
        },
        talkInfo: {
          pageNum:1,
          workId:'',
          id:'',
          more:true,
          isLoad:false
        },
        canLoad:true,
        talkPage: {
          pageNum:1,
          pageSize:15
        },
        talks:[],
        message:''
      }
    },
    components:{
      atUser,
      loadMore
    },
    created() {
      this.workId = this.$route.query.id;
      this.load();
    },
    methods:{
      load() {
        var that = this;
        baseApi.getDetailWork({workId:this.workId}).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              that.item = _data.data;
              that.item.focus=true;
              that.talk();
            }else {
              this.$message.warning("作品不见了哦");
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
      reshare() {
        this.$message.warning("功能建设中...")
      },
      talk() {
        var param = {
          pageNum:this.talkPage.pageNum,
          pageSize:this.talkPage.pageSize,
          level:0,
          workId:this.item.id
        }
        var that = this;
        baseApi.getUserTalk(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              _data.rows.forEach(i => {
                i.list = [];
              })
              if(that.talks == null || that.talks.length == 0) {
                that.talks = _data.rows;
              }else {
                _data.rows.forEach(i => {
                  that.talks.push(i);
                })
              }
              
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
        
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
          toUsername:item.username,
          message:''
        }
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
      focusInput() {
        this.item.focus = true;
        
      },
      blurInput() {
        this.item.focus = false;
      },
      toTalk() {
        if(this.message == '') {
          this.$message.warning('请输入回复内容');
          return;
        }
        var param = {
          type:'1',
          workId:this.item.id,
          toUserId:this.item.userId,
          toUserNickname:this.item.userNickname,
          toUsername:this.item.username,
          message:this.message,
          level:0,
          father:this.item.id
        }
        var that = this;
        baseApi.interaction(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              that.$message.success("评论成功");
              that.message = '';
              that.item.talkNum = that.item.talkNum + 1;
              that.item.myTalk = '1';
              that.talks.splice(0,0,_data.data);
            }else {
              that.$message.warning(_data.msg)
            }
          }
        })
      },
      showDetailTalk(item,k) {
        this.talkIsShow = true;
        if(item != null && k != null) {
          this.showTalks=[];
          this.showUser = k;
          this.talkNum = k.talkCnt;
          this.talkInfo = {
            pageNum:1,
            workId:item.id,
            id:k.id,
            more:true,
            isLoad:false
          };
        }
        if(!this.talkInfo.more) {
          return;
        }
        var param = {
          pageNum:this.talkInfo.pageNum,
          pageSize:15,
          level:1,
          workId:this.talkInfo.workId,
          talkId:this.talkInfo.id
        }
        baseApi.getUserTalk(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              if(_data.data == null || _data.data.length == 0) {
                this.talkInfo.more = false;
              }
              if(this.showTalks == null || this.showTalks.length == 0) {
                this.showTalks = _data.rows;
              }else {
                _data.rows.forEach(item => {
                  this.showTalks.push(item);
                })
              }
              
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      },
      closeReply() {
        this.replyMessage = '';
      },
      showReplyBox(item,key) {
        this.replyUser = item;
        this.replyIsShow = true;
        this.now.second = key;
      },
      reply() {
        if(this.replyMessage == '') {
          this.$message.warning('请输入回复内容');
          return;
        }
        var item = this.replyUser;
        var param = {
          type:'1',
          workId:item.workId,
          toUserId:item.userId,
          toUserNickname:item.userNickname,
          toUsername:item.username,
          message:this.replyMessage,
          father:item.id,
          reply:item.id
        };
        if(item.level == '0') {
          param.level = 1;
        }else if(item.level == '1') {
          param.level = 2;
          param.father = item.father;
        }else {
          param.level = 2;
          param.father = item.father;
        }
        var that = this;
        baseApi.interaction(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              that.$message.success("回复成功");
              if(that.talkIsShow) {
                that.showTalks.splice(0,0,_data.data);
              }else {
                that.talks[that.now.second].list.splice(0,0,_data.data);
              }
              that.replyMessage = '';
              that.replyIsShow = false;
            }else {
              that.$message.warning(_data.msg)
            }
          }
        })
      },
      loadMore() {
        if(!this.canLoad) {
          return;
        }
        this.canLoad = false;
        setTimeout(() => {
          this.canLoad = true;
        },2000);
        this.talkInfo.pageNum ++;
        this.talkInfo.isLoad = true;
        this.showDetailTalk()
      },
      lazyLoad() {
        this.talkPage.pageNum ++;
        this.talk();
      },
      resetShareScope(param,data) {
        baseApi.resetShareScope(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              data.shareScope = param.shareScope
              this.$message.success('操作成功')
            }
          }
        })
      },
      handleCommand(info) {
        var key = info.key;
        var data = info.data;
        if(key == 1) {
          this.black(data.id,'1');
        }else if(key == 2){
          this.black(data.userId,'0');
        }else if(key == 3) {
          this.report(data);
        }else if(key == 4) {
          this.resetShareScope({workId:data.id,shareScope:'0'},data);
        }else if(key == 5) {
          this.resetShareScope({workId:data.id,shareScope:'1'},data);
        }else if(key == 6) {
          this.resetShareScope({workId:data.id,shareScope:'2'},data);
        }else if(key == 7) {
          var input = document.createElement("input");
          input.value = BASE.BASE + '/#/wb/index/workDetail?id=' + data.id;
          document.body.appendChild(input)
          input.select();
          document.execCommand("copy");
          input.remove();
          this.$message.success("复制成功")
        }else if(key == 8) {
          this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteWork({workId:data.id});
            })
        }
      },
      deleteWork(param) {
        baseApi.deleteWork(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("删除成功");
              this.$router.push({
                path:"/wb/index/follow",
                query:{
                  p:1
                }
              })
            }
          }
        })
      },
      follow(item) {
        var param = {
          userId:item.userId,
          userNickname:item.userNickname
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
      },
      toUser() {
        if(this.item.username == null || this.item.username == '') {
          return;
        }
        this.$router.push({
          path:'/wb/index/u/info',
          query:{
            p:5,
            type:1,
            u:this.item.username
          }
        })
      },
      report(data) {
        var that = this;
        this.$prompt('请输入投诉内容', '投诉', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '投诉内容不能为空'
        }).then(({ value }) => {
          baseApi.reportWork({workId:data.id,reason:value}).then(res => {
            if(res.success) {
              var _data = res.data;
              if(_data.status == '1') {
                that.$message.success("投诉成功")
              }
            }
          })
        })
      },
      black(id,type) {
        baseApi.black({id:id,type:type}).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("操作成功");
              
              
            }else {
              this.$message.warning(_data.msg)
            }
          }
        })
      },
    }
  }
</script>

<style>
  @import url('../../utils/common.css');
  .talk-input {
  }

</style>