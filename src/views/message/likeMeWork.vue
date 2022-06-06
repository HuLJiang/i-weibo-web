<template>
  <div>
    <loading v-if="loading"></loading>
    <div v-if="!loading && rows.length == 0" style="line-height: 500px;text-align: center;">
      还没有被用户点过赞
    </div>
    <div class="like-me-work" v-for="(item,index) in rows" :key="index">
      <div>
        <el-avatar :size="50" :src="item.headImg">
          <img src="../../assets/default.gif"/>
        </el-avatar>
      </div>
      <div style="margin-left: 10px;font-size: 14px;">
        <div style="margin-top: 10px;">
          <div class="work-user-nickname" @click="toUser(item.username)">{{item.nickname}}</div>
          <div class="work-share-datatime">{{item.createTime}}</div>
        </div>
        <div style="margin-top: 10px;">
          <div>赞了这条微博</div>
        </div>
        <div class="up-main" @click="toDetail(item.workId)">
          <div>
            <el-image
              style="width: 100px; height: 100px;border-radius: 8px 0 0 8px"
              :src="item.iheadImg" 
              fit="cover">
              <div slot="error" class="image-slot">
                <img width="100" height="100" src="../../assets/default.gif"/>
              </div>
            </el-image>
          </div>
          <div class="up-content">
            <div>
              @{{item.inickname}}
            </div>
            <div style="font-size: 12px;">
              {{item.workContent.slice(0,100)}}
            </div>
          </div>
        </div>
        <!-- <div class="reply-up">
          <div>
            <i style="font-size: 18px;position: relative;top: 3px;margin-right: 8px" class="el-icon-chat-dot-square"></i>
            <span>回复</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import loading from '@/components/loading'
  export default {
    data() {
      return {
        rows:[],
        user:{},
        page:{
          pageNum:1,
          pageSize:10
        },
        canLoad:true,
        loading:true
      }
    },
    components:{
      loading
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        baseApi.likeMe(this.page).then(res => {
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
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
  .like-me-work {
    display: flex;
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
    background-color: #f9f9f9;
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
</style>