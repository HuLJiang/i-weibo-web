<template>
  <div class="setting-info">
    <div class="setting-1">
      <div>
        账号信息
      </div>
      <div style="padding: 20px 0;">
        <div style="margin: 0 auto;width: 100px;border-radius: 100px;cursor: pointer">
          <el-image 
            style="width: 100px; height: 100px;border-radius: 100px"
            :src="user.headImg" 
            fit="cover"
            :preview-src-list="[user.headImg]">
            <div slot="error" class="image-slot">
              <img width="100" height="100" src="../../assets/default.gif"/>
            </div>
          </el-image>
          <el-upload
            :headers="{
              'token':token
            }"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="success">
            <el-button
              style="margin-left: 25px;" 
              type="text" 
              size="small">更换头像</el-button>
          </el-upload>
          
        </div>
      </div>
      <div>
        <el-form label-width="80px" :model="user">
          <el-form-item class="focus" label="账号">
            <el-input v-model="user.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="focus" label="昵称">
            <el-input v-model="user.nickname"></el-input>
          </el-form-item>
          <el-form-item class="focus" label="简介">
            <el-input placeholder="介绍一下自己吧" v-model="user.about"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="user.sex" label="0">男</el-radio>
            <el-radio v-model="user.sex" label="1">女</el-radio>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              class="date-birth"
              v-model="user.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="setting-2"></div>
  </div>
</template>

<script>
  import BASE from '@/config/index'
  import globalApi from '@/api/globalApi'
  import baseApi from '@/api/user/baseApi'
  export default {
    data () {
      return {
        user:{},
        uploadUrl:BASE.UPLOAD,
        token:'',
      }
    },
    created() {
      this.token = localStorage.getItem("token");
      this.load();
    },
    methods:{
      load() {
        var that = this;
        globalApi.getUserInfo().then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              that.user = _data.data;
            }
          }
        })
      },
      lazyLoad() {
        
      },
      success(res) {
        if(res.success) {
          if(res.data.status == '1') {
            console.log(res.data)
            this.user.headImg = res.data.data.url;
          }else {
            this.$message.warning(res.data.msg);
          }
        }
      },
      save() {
        var user = this.user;
        if(user.nickname == null || user.nickname == '') {
          this.$message.warning("用户名不能为空");
          return;
        }
        baseApi.update(this.user).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.userInfo.setUser(_data.data);
              this.$message.success("保存成功");
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      }
    }
  }
</script>

<style>
  @import url('../../utils/common.css');
  .setting-info {
  }
  .setting-1 {
    padding: 20px;
    background-color: white;
  }
  .setting-2 {
    padding: 20px;
  }
  .date-birth .el-input__inner {
    border-radius: 8px!important;
  }
  .date-birth .el-input__inner:focus {
    border: 1px solid #ff8200!important;
  }
</style>