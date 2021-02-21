<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="15%" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-header style="background:#2c3e50">
          <h3 class="harder_logo">Wenwen</h3>
      </el-header>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>文章管理</template>
          <el-menu-item index="1-1" v-on:click="currentTab = 'tabindex'">新增文章</el-menu-item>
          <el-menu-item index="1-2" v-on:click="currentTab = tab">文章列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>分类标签管理</template>
          <el-menu-item index="2-1" v-on:click="currentTab = tab">添加分类</el-menu-item>
          <el-menu-item index="2-2" v-on:click="currentTab = tab">分类列表</el-menu-item>
          <el-menu-item index="2-3" v-on:click="currentTab = tab">标签管理</el-menu-item>
          <el-menu-item index="2-4" v-on:click="currentTab = tab">标签管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
          <el-menu-item index="3-1" v-on:click="currentTab = tab">修改信息</el-menu-item>
          <el-menu-item index="3-2" v-on:click="currentTab = tab">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    
    
    <el-main>
      <!-- 组件会在 `currentTabComponent` 改变时改变 -->
      <router-view/>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table> -->
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    data() {
      return {
        currentTab: "AdminIndex"
      }
    },
    components:{
      'AdminIndex':this.AdminIndex
    },
    computed: {
      currentTabComponent: function() {
        return "AdminIndex";
      }
    }
}
</script>

<style scoped>
.el-header {
background-color: #B3C0D1;
color: #333;
line-height: 60px;
}
  
.el-aside {
color: #333;
}

.harder_logo{
  color: #2ED573;
  font-family: Cambria Math;
  font-size: 32px;
  line-height: 32px;
  margin: 14px;
  font-weight: bold;
  float: left;
  text-shadow: 2px 2px 1px #000000;
}
</style>