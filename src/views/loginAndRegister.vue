<template>
  <div class="login-main" ref="login" :style="{height:height}">
    <div class="logo">weibo</div>
    <div class="main-box">
      <div class="login-menu">
        <el-menu
          :default-active="active"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000"
          @select="select"
          active-text-color="#ffa00a">
          <el-menu-item index="1">登录</el-menu-item>
          <el-menu-item index="3" disabled>|</el-menu-item>
          <el-menu-item index="2">注册</el-menu-item>
        </el-menu>
      </div>
      <div>
        <!-- <transition-group name="breadcrumb" tag="div"> -->
          <div :key="'login'" v-if="active == '1'" class="login">
            <el-form 
              ref="form" 
              :model="form" 
              label-width="80px" 
              size="medium">
              <el-form-item 
                label="账号"
                prop="username"
                :rules="[
                  {required:true,message:'账号不能为空'}
                ]">
                <el-input 
                  v-model="form.username" 
                  placeholder="请输入账号或者用户名"
                  ></el-input>
              </el-form-item>
              <el-form-item 
                label="密码"
                prop="password"
                :rules="[
                  {required:true,message:'密码不能为空'}
                ]">
                <el-input 
                  v-model="form.password" 
                  placeholder="请输入密码" 
                  show-password></el-input>
              </el-form-item>
              <el-form-item 
                label="验证码"
                prop="checkMsg"
                :rules="[
                  {required:true,message:'验证码不能为空'}
                ]">
                <el-input 
                  v-model="form.checkMsg" 
                  placeholder="请输入验证码"></el-input>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-image
                    @click="load()"
                    style="width: 100px;height: 50px;" :src="msgCode"></el-image>
                  <span class="msg-change" @click="load()">看不清？换一张</span>
                </div>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div :key="'register'" v-if="active == '2'" class="login">
            <el-form ref="form2" :model="form2" label-width="80px" size="medium">
              <el-form-item 
                label="用户名"
                prop="username"
                :rules="[
                  {required:true,message:'用户名不能为空'}
                ]">
                <el-input 
                  v-model="form2.username" 
                  placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item 
                label="密码"
                prop="passwrod"
                :rules="[
                  {required:true,message:'密码不能为空'}
                ]">
                <el-input 
                  v-model="form2.password" 
                  placeholder="请输入密码" 
                  show-password></el-input>
              </el-form-item>
              <el-form-item 
                label="确认密码"
                prop="repassword"
                :rules="[
                  {required:true,message:'密码不能为空'}
                ]">
                <el-input 
                  v-model="form2.repassword" 
                  placeholder="请输入密码" 
                  show-password></el-input>
              </el-form-item>
              <el-form-item 
                label="出生日期"
                prop="birthday"
                :rules="[
                  {required:true,message:'出生日期不能为空'}
                ]">
                <el-date-picker 
                  v-model="form2.birthday" 
                  @change="selectDate" 
                  placeholder="请选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item 
                label="验证码"
                prop="checkMsg"
                :rules="[
                  {required:true,message:'验证码不能为空'}
                ]">
                <el-input 
                  v-model="form2.checkMsg" 
                  placeholder="请输入验证码"></el-input>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-image
                    style="width: 100px;height: 50px;" :src="msgCode" @click="load"></el-image>
                  <span class="msg-change" @click="load">看不起？换一张</span>
                </div>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="register">立即注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        <!-- </transition-group> -->
      </div>
    </div>
    <div style="width: 900px;margin: 0 auto;">
      <foot></foot>
    </div>
  </div>
</template>

<script>
  import globalApi from '@/api/globalApi'
  import foot from '@/components/commonFoot'
  export default {
    data () {
      return {
        active:'1',
        height:'1080px',
        form: {
          username:'',
          password:'',
          checkMsg:''
        },
        form2 : {
          username:'',
          password:'',
          repassword:'',
          checkMsg:'',
          birthday:''
        },
        msgCode:'',
        aa:'data:image/png;base64,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'
      }
    },
    components:{
      foot
    },
    created() {
      this.load()
      this.setHeight();
    },
    mounted() {
    },
    computed:{
      
    },
    methods: {
      load() {
        var that = this;
        globalApi.getCheckMsg().then(res => {
          // console.log(res);
          if(res.success) {
            var data = res.data;
            if(data.status == '1') {
              that.msgCode = data.data;
            }else {
              that.$message.error(data.msg);
            }
          }
        })
      },
      setHeight() {
        console.log(window.innerHeight)
        this.height = window.innerHeight + 'px';
      },
      select(e) {
        this.active = e;
        this.load();
      },
      login() {
        var that = this;
        this.$refs['form'].validate((valid) => {
          if(valid) {
            globalApi.login(that.form).then(res => {
              if(res.success) {
                var _data = res.data;
                if(_data.status == '1') {
                  that.$message.success('登录成功')
                }else {
                  that.load();
                  that.$message.warning(_data.msg);
                }
              }
            })
          } else {
            console.log('error');
          }
        })
      },
      register() {
        this.$refs['form2'].validate((valid) => {
          if(valid) {
            console.log('success')
          } else {
            console.log('error');
          }
        })
      },
      selectDate(e) {
        this.form2.birthday = e;
      }
    }
  }
</script>

<style scoped="scoped">
  .login-main {
    background-color: #bee1f5;
  }
  .logo {
    text-align: center;
    font-size: 46px;
    width: 900px;
    height: 184px;
    line-height: 184px;
    background: url(../assets/logo.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    font-style: italic;
  }
  .main-box {
    width: 900px;
    height: 536px;
    margin: 0 auto;
    border-radius: 6px;
    background-color: white;
    overflow: hidden;
    
  }
  .login-menu {
    padding-left: 20px;
  }
  .login-menu .el-menu--horizontal>.el-menu-item {
    font-size: 22px!important;
  }
  .login {
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .check-msg {
    position: absolute;
    right: 100px;
    /* top: -100px; */
  }
  .msg-change {
    position: relative;
    top: -5px;
    left: 5px;
    cursor: pointer;
  }
</style>
