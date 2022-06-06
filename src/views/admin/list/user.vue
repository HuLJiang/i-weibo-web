<template>
  <div style="height: 800px;background-color: white;">
    <div>
      <div style="padding: 10px;">
        <el-button icon="el-icon-plus" @click="addUser">添加</el-button>
        <el-select v-model="value" @change="change" placeholder="请选择" style="margin-left: 20px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isDelete == '0'">正常</el-tag>
              <el-tag v-else type="danger">封禁</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="权限"
            width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.role == 0" type="warning">无权限</el-tag>
              <el-tag v-else-if="scope.row.role > 1" type="success">管理员</el-tag>
              <el-tag v-else>用户</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button 
                @click="handleClick(scope.row,scope.$index)" 
                size="small">查看</el-button>
              <el-button 
                v-if="scope.row.show"
                type="parimary" 
                size="small" 
                @click="showRole(scope.row)">权限</el-button>
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                @confirm="reset(scope.row)"
                :title="'确定要重置用户' + scope.row.nickname + '的密码吗？'"
              >
                <el-button
                  style="margin-left: 10px;"
                  type="primary" 
                  size="small"
                  slot="reference">重置密码</el-button>
              </el-popconfirm>
              
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteUser(scope.row,scope.$index)"
                title="确定要对用户执行封禁操作吗？"
              >
                <el-button
                  style="margin-left: 10px;"
                  type="danger" 
                  size="small"
                  slot="reference">封禁</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page.pageNum"
          :total="total"
          @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="权限"
      :visible.sync="dialogVisible"
      width="40%">
      <div style="padding: 50px;">
        <el-checkbox v-model="role.user">用户</el-checkbox>
        <el-checkbox v-model="role.admin">管理员</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import adminApi from '@/api/admin/adminApi'
  export default {
    data() {
      return {
        options: [{
          value: '0',
          label: '所有用户'
        }, {
          value: '1',
          label: '已封禁用户'
        }, {
          value: '2',
          label: '被举报用户'
        }],
        value: '0',
        tableData:[],
        page:{
          pageNum:1,
          pageSize:10,
          type:0
        },
        total:0,
        dialogVisible:false,
        role:{
          user:false,
          admin:false,
          id:''
        },
        item:{}
      }
    },
    created() {
      this.load()
    },
    methods:{
      load() {
        adminApi.getUserList(this.page).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.tableData = _data.rows;
              this.total = _data.total;
            }
          }
        })
      },
      change(e) {
        this.page.pageNum = 1;
        this.page.type = e;
        this.load();
      },
      pageChange(e) {
       this.page.pageNum = e;
       this.load();
      },
      handleClick(e,index) {
        console.log(e)
        console.log(index)
      },
      deleteUser(e,index) {
        console.log(1)
        adminApi.delete({userId:e.id}).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.tableData.splice(index,1);
              this.$message.success("操作成功");
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      },
      addUser() {
        adminApi.addUser().then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              var user = _data.data;
              this.copy(user);
              this.tableData.splice(0,0,user);
            }
          }
        })
      },
      reset(user) {
        adminApi.resetPassword({userId:user.id}).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("操作成功");
              user.password = _data.data;
              this.copy(user);
            }else {
              this.$message.warning(_data.msg);
            }
          }
        })
      },
      copy(user) {
        var input = document.createElement("input");
        input.value = '用户名：' + user.nickname + '，账号：' + user.username + '，密码：' + user.password;
        document.body.appendChild(input)
        input.select();
        document.execCommand("copy");
        input.remove();
        this.$message.success("操作成功，用户信息已复制到剪切板");
      },
      showRole(item) {
        if((item.role & 1) == 1) {
          this.role.user = true;
        }
        if((item.role & 4) == 1) {
          this.role.admin = true;
        }
        this.role.id = item.id;
        this.item = item;
        this.dialogVisible = true;
      },
      setRole() {
        var role = 0;
        if(this.role.user) {
          role += 1;
        }
        if(this.role.admin) {
          role += 4;
        }
        var param = {
          id:this.role.id,
          role:role
        }
        if(role == 0) {
          this.$confirm('此操作将导致用户失去所有权限, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.setR(param);
          })
        }else {
          this.setR(param);
        }
        
      },
      setR(param) {
        adminApi.setRole(param).then(res => {
          if(res.success) {
            var _data = res.data;
            if(_data.status == '1') {
              this.$message.success("操作成功");
              this.dialogVisible = false;
              this.item.role = param.role;
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>