<template>
    <el-menu :default-openeds="['1']">
        <el-header style="background:#2c3e50">
            <h3 class="harder_logo">Wenwen</h3>
        </el-header>
        <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>文章管理</template>
            <el-menu-item index="1-1" @click="goTo('/admin/redact')">新增文章</el-menu-item>
            <el-menu-item index="1-2" @click="goTo('/admin/adminArticleList')">文章列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>分类标签管理</template>
            <el-menu-item index="2-1" @click="goTo('/admin/redact')">添加分类</el-menu-item>
            <el-menu-item index="2-2" @click="goTo('/admin/redact')">分类列表</el-menu-item>
            <el-menu-item index="2-3" @click="goTo('/admin/redact')">标签管理</el-menu-item>
            <el-menu-item index="2-4" @click="goTo('/admin/redact')">标签管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>个人信息</template>
            <el-menu-item index="3-1" @click="goTo('/admin/me')">修改信息</el-menu-item>
            <el-menu-item index="3-2" @click="goTo('/admin/updatePassword')">修改密码</el-menu-item>
        </el-submenu>
    </el-menu>
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
    },
    methods:{
        goTo(path){
            this.$router.replace(path);
        }
    }
}
</script>

<style scoped>
.el-header {
background-color: #B3C0D1;
color: #333;
line-height: 70px;
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
ul{
  margin: 0;
}
</style>