<template>
  <div class="all-main">
    <div class="index-left">
      <div class="left-info">
        <div class="index-title">首页</div>
        <div>
          <el-menu
            :default-active="menu.active"
            class="el-menu-vertical-demo"
            @select="select"
            active-text-color="#ff8200"
            >
            
            <el-menu-item v-for="(item,index) in menu.list" :index="item.type" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="index-mid">
      <div class="mid-info-1">
        <div class="share-work">
          <el-input
            class="share-input"
            type="textarea"
            placeholder="有什么新鲜事想分享给大家？"
            v-model="textarea"
            maxlength="200"
          >
          </el-input>
        </div>
        <div>
          <div 
            style="display: inline-block;"
            v-for="(item,index) in imgs"
            :key="index">
            <el-image
              style="width: 100px; height: 100px;margin-left: 20px;"
              :src="item.url" 
              fit="cover"
              :preview-src-list="[item.url]">
            </el-image>
          </div>
          <el-upload
            v-show="imgs.length > 0"
            class="avatar-uploader"
            :headers="{
              'token':token
            }"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="success">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div style="display: flex;justify-content: space-around;width: 100px;">
            <el-upload
              :headers="{
                'token':token
              }"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="success"
            >
              <div class="share-icon" style="margin-left: 20px;">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-upload>
            <div class="share-icon" @click="atUser">
              <i class="el-icon-paperclip"></i>
            </div>
          </div>
          <div>
            <div class="share-scope">
                <el-select 
                  v-model="value" 
                  placeholder="请选择"
                  :style="{'width':widths[value]}"
                  >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <button class="share-btn" @click="shareWork">
              发送
            </button>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <loading></loading>
      </div>
      <work-list 
        v-else 
        ref="workList"
        id="workList"
        :rows="rows"></work-list>
      <div v-if="lazy" style="line-height: 50px;text-align: center">
        <i class="el-icon-loading"></i>
        加载中
      </div>
    </div>
  </div>
</template>

<script>
  import baseApi from '@/api/user/baseApi'
  import BASE_URL from '@/config/index'
  import loading from '@/components/loading'
  import workList from '@/components/workList'
  const menu = {
    title:'消息',
    active:'0',
    list: [
      {
        type:'0',
        url:'',
        name:'我的关注',
        icon:'el-icon-menu'
      },
      {
        type:'1',
        url:'',
        name:'最新微博',
        icon:'el-icon-star-on'
      }
    ]
  }
  const options = [
    {
      value:'0',
      label:'公开'
    },
    {
      value:'1',
      label:'粉丝'
    },
    {
      value:'2',
      label:'仅自己可见'
    }
  ]
  export default {
    data() {
      return {
        textarea:'',
        scope:'公开',
        menu:menu,
        value: '0',
        options: options,
        widths:['70px!important','70px!important','110px!important'],
        canShare:true,
        attaches:[],
        rows:[],
        imageUrl:'',
        uploadUrl:BASE_URL + '/user/uploadImg',
        token:'',
        fileName:'',
        imgs:[],
        page:{
          pageNum:1,
          pageSize:10,
          newest:0
        },
        loading:true,
        lazy:false,
        canLoad:true
      }
    },
    components:{
      loading,
      workList
    },
    created() {
      this.token = localStorage.getItem("token");
      this.load();
    },
    mounted() {
    },
    methods: {
      load() {
        
        var param = this.page;
        if(this.menu.active == '0') {
          param.newest = 0;
        }else {
          param.newest = 1;
        }
        var that = this;
        baseApi.getFollowerWorkList(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              _data.rows.forEach(item => {
                item.toTalk = false;
                item.focus = false;
              })
              if(that.rows.length == 0) {
                that.rows = _data.rows;
              } else {
                _data.rows.forEach(item => {
                  that.rows.push(item);
                })
              }
              that.loading = false;
              that.lazy = false;
            }else {
              that.$message.warning(_data.msg);
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
        },1000);
        this.lazy = true;
        this.page.pageNum ++;
        this.load();
      },
      select(e) {
        this.menu.active = e;
        this.loading = true;
        this.rows = [];
        this.page.pageNum = 1;
        this.load();
      },
      setScope(e) {
        const scopes = ['公开','粉丝','仅自己可见'];
        this.scope = scopes[e];
      },
      shareWork() {
        if(this.textarea.length == 0) {
          this.$message.warning("请输入分享内容")
          return;
        }
        var that = this;
        if(this.canShare) {
          this.canShare = false;
          var param = {
            content:this.textarea,
            attaches:this.imgs,
            shareScope:this.value
          }
          baseApi.shareWork(param).then(res => {
            if(res.success) {
              that.canShare = true;
              var _data = res.data;
              if(_data.status == '1') {
                // that.$message.success("分享成功");
                that.rows.splice(0,0,_data.data);
                that.textarea = '';
                that.imgs = [];
              }else {
                that.$message.warning(_data.msg);
              }
            }
          })
        }
      },
      atUser() {
        this.textarea = this.textarea + '@';
      },
      success(res) {
        if(res.success) {
          var _data = res.data;
          if(_data.status == '1') {
            this.$message.success('上传成功');
            this.imgs.push(_data.data);
          }else {
            this.$message.warning(_data.msg)
          }
        }
      },
      before(file) {
        this.fileName = file.name;
        return true;
      }
    }
  }
</script>

<style scoped>
  @import url('../../utils/common.css');
    
</style>