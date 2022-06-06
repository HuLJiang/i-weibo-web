<template>
  <div class="all-main">
    <div class="index-left">
      <div class="left-info">
        <div class="index-title">{{menu.title}}</div>
        <div>
          <el-menu
            :default-active="menu.active"
            class="el-menu-vertical-demo"
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
      <div style="height: 500px;background-color: white;width: 100%;text-align: center;line-height: 500px;">
        功能建设中
      </div>
    </div>
    
  </div>
</template>

<script>
  const menu = {
    title:'视频',
    active:'0',
    list: [
    ]
  }
  export default {
    data () {
      return {
        menu:menu
      }
    }
  }
</script>

<style>
</style>
