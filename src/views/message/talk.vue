<template>
  <div>
    <div style="padding:10px;background-color: white;margin-bottom: 10px;">
      <div 
        v-if="page.type == '1'" 
        class="active">收到的评论</div>
      <div 
        v-if="page.type != '1'" 
        @click="reload('1')"
        class="base">收到的评论</div>
      <div 
        v-if="page.type == '0'" 
        class="active">发出的评论</div>
      <div 
        v-if="page.type != '0'" 
        @click="reload('0')"
        class="base">发出的评论</div>
    </div>
    <loading v-if="loading"></loading>
    <div v-if="!loading && rows.length == 0" style="line-height: 500px;text-align: center;">
      暂无数据
    </div>
    <div class="like-me-work" v-for="(item,index) in rows" :key="index">
      <div style="display: flex;">
        <div>
          <el-avatar :size="50" :src="page.type == '0' ? item.iheadImg : item.headImg">
            <img src="../../assets/default.gif"/>
          </el-avatar>
        </div>
        <div style="margin-left: 10px;font-size: 14px;">
          <div style="margin-top: 10px;">
            <div class="work-user-nickname" @click="toUser(page.type == '0' ? item.iusername : item.username)">
            {{page.type == '0' ? item.inickname : item.nickname}}</div>
            <div class="work-share-datatime">{{item.createTime}}</div>
          </div>
          <div style="margin-top: 10px;">
            <div v-if="page.type == '1'" class="at-big">
              <span>回复</span>
              <at-user :isAt="true" :username="item.iusername" :nickname="item.inickname"></at-user>
              <span>：{{item.message}}</span>
            </div>
            <div v-else class="at-big">
              <span>回复</span>
              <at-user :isAt="true" :username="item.username" :nickname="item.nickname"></at-user>
              <span>：{{item.message}}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="background-color: #f9f9f9;margin-top: 10px;font-size: 12px;padding: 10px 10px 10px 60px;">
        <div v-if="page.type == '0' && item.level != '0'">
          <at-user :username="item.username" :nickname="item.nickname"></at-user>
          <span>：{{item.msg}}</span>
        </div>
        <div class="up-main" @click="toDetail(item.workId)">
          <div>
            <el-image
              style="width: 100px; height: 100px;border-radius: 8px 0 0 8px"
              :src="item.workImg" 
              fit="cover">
              <div slot="error" class="image-slot">
                <img width="100" height="100" src="../../assets/default.gif"/>
              </div>
            </el-image>
          </div>
          <div class="up-content">
            <div>
              @{{item.workNickname}}
            </div>
            <div style="font-size: 12px;">
              {{item.workContent.slice(0,100)}}
            </div>
          </div>
        </div>
      </div>
      <div class="reply-up" v-if="page.type == '1'" @click="toReply(item)">
        <div>
          <i style="font-size: 18px;position: relative;top: 3px;margin-right: 8px" class="el-icon-chat-dot-square"></i>
          <span>回复</span>
        </div>
      </div>
    </div>
    <el-dialog
      :title="'回复@' + replyUser.nickname"
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
  import atUser from '@/components/atUser'
  import baseApi from '@/api/user/baseApi'
  import loading from '@/components/loading'
  export default {
    data() {
      return {
        rows:[],
        user:{},
        page:{
          pageNum:1,
          pageSize:10,
          type:'1'
        },
        canLoad:true,
        loading:true,
        active:'1',
        replyUser:{},
        replyMessage:'',
        replyIsShow:false
      }
    },
    components:{
      loading,
      atUser
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        baseApi.getReply(this.page).then(res => {
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
      toUser(username) {
        if(username == null || username == '') {
          return;
        }
        var url = '#/wb/index/u/info?p=5&type=1&u=' + username;
        window.open(url)
      },
      toDetail(workId) {
        var url = '#/wb/index/workDetail?id=' + workId;
        window.open(url)
      },
      lazyLoad() {
        if(!this.canLoad) {
          return;
        }
        this.canLoad = false;
        setTimeout(() => {
          this.canLoad = true;
        },3000);
        // this.lazy = true;
        this.page.pageNum ++;
        this.load();
      },
      reload(type) {
        this.page.type = type;
        this.page.pageNum = 1;
        this.loading = true;
        this.rows = []
        this.load();
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
          toUserNickname:item.nickname,
          toUsername:item.username,
          message:this.replyMessage,
          father:item.tid,
          reply:item.tid
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
              that.replyMessage = '';
              that.replyIsShow = false;
            }else {
              that.$message.warning(_data.msg)
            }
          }
        })
      },
      toReply(item) {
        this.replyUser = item;
        this.replyIsShow = true;
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
  .like-me-work {
    /* display: flex; */
    padding: 20px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .up-main {
    border-radius: 8px 0 0 8px;
    overflow: hidden;
    display: flex;
    margin-top: 10px;
    cursor: pointer;
  }
  .up-content {
    background-color: white;
    padding: 20px 5px;
    border-radius: 0 8px 8px 0;
    width: 410px;
  }
  .reply-up {
    color: grey;
    display: flex;
    justify-content: space-around;
    line-height: 20px;
    margin-top: 15px;
    cursor: pointer;
  }
  .reply-up:hover {
    color: #ff8200;
  }
  .active {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    color: #ff8200;
    line-height: 20px;
    cursor: pointer;
    margin-right: 10px;
  }
  .base {
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    margin-right: 10px;
  }
  .base:hover {
    color: #ff8200;
  }
  .at-big>.at-user {
    font-size: 14px!important;
  }
</style>