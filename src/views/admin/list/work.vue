<template>
  <div style="height: 800px;background-color: white;">
    <div>
      <div style="padding: 10px;">
        <!-- <el-button icon="el-icon-plus" @click="addUser">添加</el-button> -->
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
            prop="userNickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容">
          </el-table-column>
          <el-table-column
            prop="report"
            label="举报次数">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button 
                @click="handleClick(scope.row,scope.$index)" 
                size="small">查看</el-button>
              <!-- <el-button type="parimary" size="small">编辑</el-button> -->
              <el-popconfirm
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteUser(scope.row,scope.$index)"
                title="确定要删除作品吗？"
              >
                <el-button
                  style="margin-left: 10px;"
                  type="danger" 
                  size="small"
                  slot="reference">删除</el-button>
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
  </div>
</template>

<script>
  import adminApi from '@/api/admin/adminApi'
  export default {
    data() {
      return {
        options: [{
          value: '0',
          label: '所有作品'
        }, {
          value: '1',
          label: '已删除作品'
        }, {
          value: '2',
          label: '被举报作品'
        }],
        value: '0',
        tableData:[],
        page:{
          pageNum:1,
          pageSize:10,
          type:0
        },
        total:0
      }
    },
    created() {
      this.load()
    },
    methods:{
      load() {
        adminApi.getWorkList(this.page).then(res => {
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
      handleClick(e) {
        var url = "#/wb/index/workDetail?id=" + e.id;
        window.open(url);
      },
      deleteUser(e,index) {
        adminApi.delete({id:e.id,type:'1'}).then(res => {
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
              var input = document.createElement("input");
              input.value = '用户名：' + user.nickname + '，账号：' + user.username + '，密码：' + user.password;
              document.body.appendChild(input)
              input.select();
              document.execCommand("copy");
              input.remove();
              this.$message.success("添加成功，用户信息已复制到剪切板");
              this.tableData.splice(0,0,user);
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>